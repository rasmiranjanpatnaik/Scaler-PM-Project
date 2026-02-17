# API Integration Guide - LinkedIn & Naukri Job Data

This guide explains how to integrate real job data from LinkedIn and Naukri APIs into the AI Career Copilot application.

## Current Implementation

Currently, the application uses AI-generated job recommendations. To get real-time job listings, you need to integrate with:

1. **LinkedIn Jobs API**
2. **Naukri API** (or web scraping)

## LinkedIn Jobs API Integration

### Step 1: Get LinkedIn API Credentials

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Create a new app
3. Request access to "Jobs API" product
4. Get your Client ID and Client Secret
5. Set up OAuth 2.0 redirect URLs

### Step 2: Install Required Packages

```bash
npm install axios
# or
npm install node-linkedin-v2
```

### Step 3: Update Environment Variables

Add to `.env.local`:

```env
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:3000/auth/linkedin/callback
```

### Step 4: Implement LinkedIn API Calls

Update `app/api/job-recommendations/route.ts`:

```typescript
import axios from 'axios'

async function fetchLinkedInJobs(query: string, location?: string): Promise<JobListing[]> {
  try {
    // Step 1: Get OAuth token
    const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', {
      grant_type: 'client_credentials',
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    })

    const accessToken = tokenResponse.data.access_token

    // Step 2: Search for jobs
    const jobsResponse = await axios.get('https://api.linkedin.com/v2/jobSearch', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        keywords: query,
        locationName: location || 'India',
        count: 10,
      },
    })

    // Step 3: Transform LinkedIn job data to our format
    return jobsResponse.data.elements.map((job: any) => ({
      id: job.id,
      title: job.title,
      company: job.companyDetails?.name || 'Unknown',
      location: job.locationDescription || location || 'Unknown',
      salary: job.salaryRange ? `${job.salaryRange.min}-${job.salaryRange.max}` : undefined,
      type: job.jobType || 'full-time',
      matchScore: 0, // Calculate based on resume matching
      source: 'linkedin',
      url: job.jobPostingUrl || `https://linkedin.com/jobs/view/${job.id}`,
      description: job.description?.text || '',
      requirements: extractRequirements(job.description?.text),
      postedDate: job.listedAt || new Date().toISOString(),
    }))
  } catch (error) {
    console.error('LinkedIn API Error:', error)
    return []
  }
}
```

### LinkedIn API Documentation

- [LinkedIn Jobs API](https://docs.microsoft.com/en-us/linkedin/talent/job-search/)
- [LinkedIn Authentication](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authentication)

## Naukri API Integration

### Option 1: Official API (If Available)

Check Naukri's official API documentation:
- Contact Naukri for API access
- They may provide REST API endpoints for job listings

### Option 2: Web Scraping (Use with Caution)

**Important:** Always check Naukri's Terms of Service and robots.txt before scraping.

```bash
npm install cheerio axios
```

```typescript
import axios from 'axios'
import * as cheerio from 'cheerio'

async function fetchNaukriJobs(query: string, location?: string): Promise<JobListing[]> {
  try {
    const searchUrl = `https://www.naukri.com/jobs-in-${location || 'india'}?k=${encodeURIComponent(query)}`
    
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    const $ = cheerio.load(response.data)
    const jobs: JobListing[] = []

    // Parse job listings from HTML
    $('.jobTuple').each((index, element) => {
      const title = $(element).find('.title a').text().trim()
      const company = $(element).find('.companyName').text().trim()
      const location = $(element).find('.location').text().trim()
      const salary = $(element).find('.salary').text().trim()
      const url = $(element).find('.title a').attr('href') || ''

      jobs.push({
        id: `naukri-${index}`,
        title,
        company,
        location,
        salary,
        type: 'full-time',
        matchScore: 0,
        source: 'naukri',
        url: url.startsWith('http') ? url : `https://www.naukri.com${url}`,
        description: '',
        requirements: [],
        postedDate: new Date().toISOString(),
      })
    })

    return jobs
  } catch (error) {
    console.error('Naukri scraping error:', error)
    return []
  }
}
```

### Option 3: Use Third-Party Job Aggregator APIs

Consider using job aggregator APIs that combine multiple sources:

- **Adzuna API**: https://developer.adzuna.com/
- **Indeed API**: https://ads.indeed.com/jobroll/xmlfeed
- **RapidAPI Job Search**: https://rapidapi.com/hub

## Implementation Steps

### 1. Update Job Recommendations API

In `app/api/job-recommendations/route.ts`, replace the mock data section:

```typescript
// Replace this section:
const enhancedJobs = jobData.recommendedJobs?.map(...)

// With:
let realJobs: JobListing[] = []

// Fetch from LinkedIn
const linkedinJobs = await fetchLinkedInJobs(
  body.targetRole || body.currentRole || 'software engineer',
  body.location
)

// Fetch from Naukri
const naukriJobs = await fetchNaukriJobs(
  body.targetRole || body.currentRole || 'software engineer',
  body.location
)

// Combine and match with AI recommendations
realJobs = [...linkedinJobs, ...naukriJobs]

// Calculate match scores based on resume
const matchedJobs = realJobs.map(job => ({
  ...job,
  matchScore: calculateMatchScore(job, body.resumeText, body.skills)
})).sort((a, b) => b.matchScore - a.matchScore)

return NextResponse.json({
  recommendedJobs: matchedJobs.slice(0, 10), // Top 10 matches
  summary: jobData.summary,
  suggestions: jobData.suggestions
})
```

### 2. Add Match Score Calculation

```typescript
function calculateMatchScore(
  job: JobListing,
  resumeText: string,
  skills: string
): number {
  let score = 0
  const resumeLower = resumeText.toLowerCase()
  const skillsLower = skills.toLowerCase()
  const jobTitleLower = job.title.toLowerCase()
  const jobDescLower = job.description.toLowerCase()

  // Check for skill matches
  const skillKeywords = skillsLower.split(',').map(s => s.trim())
  skillKeywords.forEach(skill => {
    if (jobDescLower.includes(skill) || resumeLower.includes(skill)) {
      score += 10
    }
  })

  // Check for role match
  if (jobTitleLower.includes('senior') && resumeLower.includes('senior')) {
    score += 15
  }

  // Check for technology matches
  const technologies = ['react', 'node', 'python', 'java', 'javascript', 'typescript']
  technologies.forEach(tech => {
    if (jobDescLower.includes(tech) && resumeLower.includes(tech)) {
      score += 5
    }
  })

  return Math.min(score, 100)
}
```

## Rate Limiting & Caching

To avoid hitting API rate limits:

```typescript
import { LRUCache } from 'lru-cache'

const jobCache = new LRUCache<string, JobListing[]>({
  max: 100,
  ttl: 1000 * 60 * 60, // 1 hour cache
})

async function getCachedJobs(query: string, location: string): Promise<JobListing[]> {
  const cacheKey = `${query}-${location}`
  
  if (jobCache.has(cacheKey)) {
    return jobCache.get(cacheKey)!
  }

  const jobs = await fetchLinkedInJobs(query, location)
  jobCache.set(cacheKey, jobs)
  return jobs
}
```

## Error Handling

Always implement proper error handling:

```typescript
try {
  const jobs = await fetchLinkedInJobs(query, location)
  return jobs
} catch (error) {
  console.error('Failed to fetch LinkedIn jobs:', error)
  // Fallback to AI-generated recommendations
  return aiGeneratedJobs
}
```

## Legal Considerations

1. **Terms of Service**: Always read and comply with LinkedIn and Naukri's Terms of Service
2. **Rate Limits**: Respect API rate limits
3. **Data Usage**: Only use job data as permitted
4. **Attribution**: Credit the source when displaying jobs
5. **User Privacy**: Don't store or share user data with third parties

## Testing

Test your integration:

```typescript
// Test endpoint
POST /api/job-recommendations
{
  "resumeText": "Your resume text here...",
  "targetRole": "Software Engineer",
  "location": "Bangalore"
}
```

## Next Steps

1. Get API credentials from LinkedIn
2. Implement authentication flow
3. Update `fetchLinkedInJobs` function
4. Implement Naukri integration (API or scraping)
5. Add match score calculation
6. Test with real resumes
7. Deploy and monitor

## Support

For issues:
- LinkedIn API: https://www.linkedin.com/help/linkedin
- Check API status: https://status.linkedin.com/

