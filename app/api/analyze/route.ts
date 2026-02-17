import { NextRequest, NextResponse } from 'next/server'

interface AnalyzeRequest {
  name: string
  email: string
  currentRole: string
  yearsOfExperience: string
  currentSalary: string
  targetRole: string
  skills: string
  timeline: string
  resumeText?: string
}

// Hardcoded mock data for prototype
function generateMockCareerReport(body: AnalyzeRequest) {
  const yearsExp = parseInt(body.yearsOfExperience) || 3
  const hasResume = !!body.resumeText && body.resumeText.length > 50
  
  // Calculate job readiness score based on experience and skills
  let readinessScore = Math.min(40 + (yearsExp * 5), 85)
  if (hasResume) readinessScore += 10
  if (body.skills.toLowerCase().includes('react') || body.skills.toLowerCase().includes('node')) {
    readinessScore += 5
  }
  readinessScore = Math.min(readinessScore, 95)

  // Determine salary potential based on current salary
  const salaryRanges: Record<string, { target: string; increase: string }> = {
    '0-30k': { target: '$50,000 - $75,000', increase: '150-250%' },
    '30k-50k': { target: '$75,000 - $100,000', increase: '100-150%' },
    '50k-75k': { target: '$100,000 - $150,000', increase: '50-100%' },
    '75k-100k': { target: '$120,000 - $180,000', increase: '40-80%' },
    '100k-150k': { target: '$150,000 - $220,000', increase: '30-60%' },
    '150k-200k': { target: '$180,000 - $250,000', increase: '20-40%' },
    '200k+': { target: '$220,000 - $300,000+', increase: '10-30%' },
  }
  
  const salaryInfo = salaryRanges[body.currentSalary] || { 
    target: '$100,000 - $150,000', 
    increase: '50-100%' 
  }

  return {
    jobReadinessScore: readinessScore,
    skillGaps: {
      critical: [
        `Lack of ${body.targetRole.toLowerCase()} specific experience`,
        'Missing leadership and team management skills',
        'Limited experience with modern development tools'
      ],
      moderate: [
        'Need to strengthen communication skills',
        'Gap in cloud infrastructure knowledge',
        'Limited project management experience'
      ],
      minor: [
        'Could benefit from certifications',
        'Networking and industry connections needed'
      ]
    },
    salaryPotential: {
      current: body.currentSalary.replace(/-/g, ' - $').replace(/k/g, 'k'),
      target: salaryInfo.target,
      potentialIncrease: salaryInfo.increase,
      marketInsights: `Based on current market trends, ${body.targetRole} positions are in high demand. With ${yearsExp} years of experience and the right skill development, you can expect significant salary growth. The market shows a 15-20% year-over-year increase in compensation for this role.`
    },
    roadmap: {
      phase1: {
        title: 'Foundation Building',
        duration: '1-2 months',
        actions: [
          'Complete online courses in key technologies',
          'Build 2-3 portfolio projects demonstrating target skills',
          'Join relevant professional communities and networks',
          'Update LinkedIn profile and resume with new skills'
        ]
      },
      phase2: {
        title: 'Skill Enhancement & Certification',
        duration: '2-4 months',
        actions: [
          'Obtain industry-recognized certifications',
          'Contribute to open-source projects',
          'Attend industry conferences and workshops',
          'Start applying to entry-level positions in target role'
        ]
      },
      phase3: {
        title: 'Career Transition & Growth',
        duration: '3-6 months',
        actions: [
          'Secure position in target role',
          'Focus on on-the-job learning and mentorship',
          'Take on challenging projects to demonstrate capabilities',
          'Build track record of success in new role'
        ]
      }
    },
    nextSteps: [
      `Enroll in a ${body.targetRole} focused course or bootcamp`,
      'Update your resume highlighting transferable skills',
      'Build a portfolio showcasing relevant projects',
      'Network with professionals in your target industry'
    ],
    learningPath: {
      foundational: [
        'Introduction to Core Technologies',
        'Basic Programming Concepts',
        'Version Control with Git'
      ],
      intermediate: [
        'Advanced Framework Development',
        'Database Design and Management',
        'API Development and Integration'
      ],
      advanced: [
        'System Architecture and Design',
        'Performance Optimization',
        'Leadership and Team Management'
      ]
    },
    timeline: {
      realistic: `${Math.max(6, Math.ceil(yearsExp * 2))} - ${Math.max(12, Math.ceil(yearsExp * 3))} months`,
      optimistic: `${Math.max(3, Math.ceil(yearsExp * 1.5))} - ${Math.max(6, Math.ceil(yearsExp * 2))} months`,
      factors: [
        `Your ${yearsExp} years of experience provides a solid foundation`,
        'The gap between current and target role requires focused skill development',
        'Market demand and networking will significantly impact timeline'
      ]
    },
    summary: `Based on your profile as a ${body.currentRole} with ${yearsExp} years of experience, you're ${readinessScore}% ready for a ${body.targetRole} position. Your current skills in ${body.skills.substring(0, 50)}... provide a good foundation, but you'll need to focus on developing ${body.targetRole.toLowerCase()}-specific competencies. The transition timeline of ${body.timeline} is ${yearsExp < 3 ? 'ambitious but achievable' : 'realistic'} with dedicated effort. Your salary potential shows significant growth opportunity, with the market offering ${salaryInfo.increase} increase potential. Focus on the critical skill gaps identified, particularly in leadership and specialized technical skills, to maximize your readiness score and market value.`
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.currentRole || !body.targetRole) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Simulate API delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Generate mock career report
    const reportData = generateMockCareerReport(body)

    // Return the report
    return NextResponse.json(reportData)
  } catch (error) {
    console.error('Error generating career report:', error)
    
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
