import { NextRequest, NextResponse } from 'next/server'

interface ResumeAnalysisRequest {
  resumeText: string
  currentRole?: string
  targetRole?: string
}

// Hardcoded mock data for resume analysis
function generateMockResumeAnalysis(body: ResumeAnalysisRequest) {
  const resumeLower = body.resumeText.toLowerCase()
  const hasTechSkills = resumeLower.includes('javascript') || resumeLower.includes('python') || resumeLower.includes('java')
  const hasExperience = resumeLower.includes('experience') || resumeLower.includes('worked') || resumeLower.includes('years')
  const hasEducation = resumeLower.includes('education') || resumeLower.includes('degree') || resumeLower.includes('university')
  const hasProjects = resumeLower.includes('project') || resumeLower.includes('built') || resumeLower.includes('developed')
  
  // Calculate overall score
  let score = 50
  if (hasTechSkills) score += 15
  if (hasExperience) score += 15
  if (hasEducation) score += 10
  if (hasProjects) score += 10
  if (resumeLower.length > 500) score += 5
  if (resumeLower.length > 1000) score += 5
  
  score = Math.min(Math.max(score, 45), 92)

  return {
    overallScore: score,
    strengths: [
      'Clear professional experience section with quantifiable achievements',
      'Good use of action verbs and technical keywords',
      'Well-structured format that is easy to scan',
      'Demonstrates relevant technical skills for the target role'
    ],
    weaknesses: [
      'Missing specific metrics and quantifiable results',
      'Could benefit from more industry-specific keywords',
      'Education section could be more detailed',
      'Limited mention of soft skills and leadership experience'
    ],
    suggestions: {
      critical: [
        {
          category: 'ATS Optimization',
          issue: 'Resume may not pass Applicant Tracking Systems due to formatting',
          suggestion: 'Use standard fonts (Arial, Calibri), avoid tables and graphics, and ensure keywords match job descriptions. Save as .docx or .pdf format.',
          priority: 'high'
        },
        {
          category: 'Quantifiable Achievements',
          issue: 'Lack of specific metrics and numbers',
          suggestion: 'Add quantifiable achievements like "Increased performance by 30%", "Managed team of 5 developers", "Reduced costs by $50K". Numbers make your impact clear.',
          priority: 'high'
        }
      ],
      important: [
        {
          category: 'Keywords',
          issue: 'Missing important industry keywords',
          suggestion: `Add keywords relevant to ${body.targetRole || 'your target role'} such as specific technologies, methodologies, and industry terms that appear in job postings.`,
          priority: 'medium'
        },
        {
          category: 'Skills Section',
          issue: 'Skills could be better organized',
          suggestion: 'Group skills by category (Technical, Tools, Soft Skills) and list proficiency levels. Include both hard and soft skills.',
          priority: 'medium'
        }
      ],
      optional: [
        {
          category: 'Design',
          issue: 'Resume design could be more modern',
          suggestion: 'Consider using a modern template with better visual hierarchy. Ensure it remains ATS-friendly while being visually appealing.',
          priority: 'low'
        },
        {
          category: 'Summary',
          issue: 'Professional summary could be more compelling',
          suggestion: 'Add a 2-3 line professional summary at the top highlighting your key strengths and career goals. Make it specific and tailored to your target role.',
          priority: 'low'
        }
      ]
    },
    atsOptimization: {
      score: hasTechSkills && hasExperience ? 75 : 60,
      issues: [
        'May contain formatting that ATS systems cannot parse',
        'Missing some standard section headers',
        'Keywords may not match job description requirements'
      ],
      recommendations: [
        'Use standard section headers: Experience, Education, Skills',
        'Include keywords from job descriptions naturally throughout',
        'Avoid headers, footers, and complex formatting',
        'Use simple bullet points instead of tables or columns'
      ]
    },
    keywordAnalysis: {
      missingKeywords: [
        body.targetRole?.split(' ')[0] || 'Senior',
        'Agile',
        'CI/CD',
        'Microservices',
        'Cloud Computing'
      ],
      suggestedKeywords: [
        'Problem-solving',
        'Team collaboration',
        'Code review',
        'Technical leadership',
        'Best practices'
      ]
    },
    summary: `Your resume shows a solid foundation with ${hasExperience ? 'good experience' : 'some experience'} and ${hasTechSkills ? 'relevant technical skills' : 'technical background'}. The overall score is ${score}/100, indicating ${score >= 75 ? 'strong' : score >= 60 ? 'moderate' : 'room for improvement'} readiness. ${hasProjects ? 'Your project experience is a strong point.' : 'Consider adding more project examples.'} Focus on adding quantifiable achievements and ensuring ATS compatibility to maximize your chances. The resume ${hasEducation ? 'includes education details' : 'could benefit from more education information'}, which is important for many roles. With the suggested improvements, particularly around metrics and keywords, you can significantly improve your resume's effectiveness.`
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ResumeAnalysisRequest = await request.json()

    if (!body.resumeText || body.resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: 'Resume text is required and must be at least 50 characters' },
        { status: 400 }
      )
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200))

    // Generate mock resume analysis
    const analysisData = generateMockResumeAnalysis(body)

    return NextResponse.json(analysisData)
  } catch (error) {
    console.error('Error analyzing resume:', error)
    
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
