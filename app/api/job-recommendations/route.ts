import { NextRequest, NextResponse } from 'next/server'

interface JobRecommendationsRequest {
  resumeText: string
  currentRole?: string
  targetRole?: string
  skills?: string
  location?: string
}

interface JobRecommendation {
  id: string
  title: string
  company: string
  location: string
  salary?: string
  matchScore: number
  matchReasons: string[]
  requiredSkills: string[]
  missingSkills: string[]
  jobDescription: string
  source: string
  url: string
  postedDate?: string
  type?: string
}

// Hardcoded mock job data
function generateMockJobRecommendations(body: JobRecommendationsRequest): {
  recommendedJobs: JobRecommendation[]
  summary: string
  suggestions: string[]
} {
  const targetRole = body.targetRole || 'Software Engineer'
  const skills = body.skills?.toLowerCase() || ''
  const resumeLower = body.resumeText.toLowerCase()
  
  // Determine match scores based on skills and resume
  const hasReact = skills.includes('react') || resumeLower.includes('react')
  const hasNode = skills.includes('node') || resumeLower.includes('node')
  const hasPython = skills.includes('python') || resumeLower.includes('python')
  const hasJava = skills.includes('java') || resumeLower.includes('java')
  const hasAWS = skills.includes('aws') || resumeLower.includes('aws')
  
  const baseJobs: JobRecommendation[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp Solutions',
      location: 'Bangalore, India',
      salary: '₹15-25 LPA',
      matchScore: hasReact || hasNode ? 92 : 85,
      matchReasons: [
        'Strong alignment with your technical background',
        'Company values match your experience level',
        'Growth opportunities align with your career goals'
      ],
      requiredSkills: ['React', 'Node.js', 'TypeScript', '5+ years experience'],
      missingSkills: hasAWS ? [] : ['AWS', 'Docker'],
      jobDescription: 'We are looking for an experienced software engineer to join our growing team. You will work on building scalable web applications and collaborate with cross-functional teams.',
      source: 'linkedin',
      url: 'https://linkedin.com/jobs/view/123456',
      postedDate: '2024-01-15',
      type: 'full-time'
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Mumbai, India',
      salary: '₹12-20 LPA',
      matchScore: hasReact && hasNode ? 88 : 75,
      matchReasons: [
        'Perfect match for your full-stack skills',
        'Startup environment offers rapid growth',
        'Technologies align with your expertise'
      ],
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', '3+ years experience'],
      missingSkills: hasAWS ? [] : ['AWS', 'CI/CD'],
      jobDescription: 'Join our dynamic team as a full stack developer. You will be responsible for developing end-to-end features and working closely with product and design teams.',
      source: 'naukri',
      url: 'https://naukri.com/job/789012',
      postedDate: '2024-01-14',
      type: 'full-time'
    },
    {
      id: '3',
      title: 'Software Development Engineer',
      company: 'BigTech Inc',
      location: 'Hyderabad, India',
      salary: '₹18-30 LPA',
      matchScore: hasJava || hasPython ? 85 : 78,
      matchReasons: [
        'Large company with excellent benefits',
        'Strong learning and development programs',
        'Opportunity to work on cutting-edge projects'
      ],
      requiredSkills: ['Java', 'Spring Boot', 'Microservices', '4+ years experience'],
      missingSkills: hasAWS ? [] : ['AWS', 'Kubernetes'],
      jobDescription: 'We are hiring talented engineers to build scalable backend systems. You will work on microservices architecture and cloud infrastructure.',
      source: 'linkedin',
      url: 'https://linkedin.com/jobs/view/345678',
      postedDate: '2024-01-13',
      type: 'full-time'
    },
    {
      id: '4',
      title: 'React Developer',
      company: 'Digital Solutions',
      location: 'Pune, India',
      salary: '₹10-18 LPA',
      matchScore: hasReact ? 90 : 70,
      matchReasons: [
        'Focus on React development matches your skills',
        'Great work-life balance',
        'Modern tech stack and development practices'
      ],
      requiredSkills: ['React', 'Redux', 'HTML/CSS', '2+ years experience'],
      missingSkills: ['TypeScript', 'Testing frameworks'],
      jobDescription: 'Looking for React developers to join our frontend team. You will build responsive user interfaces and work with modern React patterns.',
      source: 'naukri',
      url: 'https://naukri.com/job/456789',
      postedDate: '2024-01-12',
      type: 'full-time'
    },
    {
      id: '5',
      title: 'Backend Developer',
      company: 'CloudTech',
      location: 'Delhi, India',
      salary: '₹14-22 LPA',
      matchScore: hasNode || hasPython ? 87 : 72,
      matchReasons: [
        'Backend focus aligns with your experience',
        'Cloud-first company with modern infrastructure',
        'Strong engineering culture'
      ],
      requiredSkills: ['Node.js', 'MongoDB', 'Docker', '3+ years experience'],
      missingSkills: hasAWS ? [] : ['AWS', 'Kubernetes'],
      jobDescription: 'Backend developer position focusing on API development and database design. You will work on scalable backend systems.',
      source: 'linkedin',
      url: 'https://linkedin.com/jobs/view/567890',
      postedDate: '2024-01-11',
      type: 'full-time'
    },
    {
      id: '6',
      title: 'Python Developer',
      company: 'DataTech Solutions',
      location: 'Chennai, India',
      salary: '₹13-21 LPA',
      matchScore: hasPython ? 89 : 68,
      matchReasons: [
        'Python-focused role matches your skills',
        'Data-driven company with interesting projects',
        'Good growth trajectory'
      ],
      requiredSkills: ['Python', 'Django/Flask', 'SQL', '2+ years experience'],
      missingSkills: ['Data Science', 'Machine Learning'],
      jobDescription: 'Python developer role focusing on web application development and data processing. Work with modern Python frameworks.',
      source: 'naukri',
      url: 'https://naukri.com/job/678901',
      postedDate: '2024-01-10',
      type: 'full-time'
    },
    {
      id: '7',
      title: 'DevOps Engineer',
      company: 'InfraCloud',
      location: 'Bangalore, India',
      salary: '₹16-24 LPA',
      matchScore: hasAWS ? 86 : 65,
      matchReasons: [
        'DevOps skills are in high demand',
        'Cloud infrastructure focus',
        'Excellent compensation and benefits'
      ],
      requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', '3+ years experience'],
      missingSkills: hasAWS ? ['Kubernetes'] : ['AWS', 'Kubernetes', 'Terraform'],
      jobDescription: 'DevOps engineer position focusing on cloud infrastructure and CI/CD pipelines. You will ensure scalable and reliable deployments.',
      source: 'linkedin',
      url: 'https://linkedin.com/jobs/view/789012',
      postedDate: '2024-01-09',
      type: 'full-time'
    },
    {
      id: '8',
      title: 'Full Stack Engineer',
      company: 'InnovateLabs',
      location: 'Gurgaon, India',
      salary: '₹15-23 LPA',
      matchScore: (hasReact && hasNode) ? 91 : 80,
      matchReasons: [
        'Full stack role matches your diverse skills',
        'Innovative product company',
        'Strong engineering team'
      ],
      requiredSkills: ['React', 'Node.js', 'PostgreSQL', '4+ years experience'],
      missingSkills: ['GraphQL', 'Redis'],
      jobDescription: 'Full stack engineer role working on a modern SaaS product. You will work across the entire stack from frontend to backend.',
      source: 'naukri',
      url: 'https://naukri.com/job/890123',
      postedDate: '2024-01-08',
      type: 'full-time'
    }
  ]

  // Sort by match score and return top 6-8
  const sortedJobs = baseJobs
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 8)

  return {
    recommendedJobs: sortedJobs,
    summary: `Based on your resume and profile, we've identified ${sortedJobs.length} highly relevant job opportunities. These positions match ${targetRole} roles and align with your skills in ${skills.substring(0, 50)}... The top matches show ${sortedJobs[0].matchScore}% compatibility, indicating strong alignment with your background. Focus on positions with match scores above 80% for the best fit.`,
    suggestions: [
      'Customize your resume for each application using keywords from the job description',
      'Highlight projects and experience that match the required skills',
      'Consider obtaining certifications for missing skills like AWS or Kubernetes',
      'Network with professionals at target companies through LinkedIn',
      'Prepare for technical interviews by practicing common coding problems'
    ]
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: JobRecommendationsRequest = await request.json()

    if (!body.resumeText || body.resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: 'Resume text is required for job matching' },
        { status: 400 }
      )
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate mock job recommendations
    const jobData = generateMockJobRecommendations(body)

    return NextResponse.json({
      ...jobData,
      note: 'Job listings are prototype mock data. Integrate LinkedIn and Naukri APIs for real job data.'
    })
  } catch (error) {
    console.error('Error generating job recommendations:', error)
    
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
