'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, BookOpen, GraduationCap, CheckCircle2, ArrowRight, TrendingUp, FileText, Briefcase, ExternalLink, AlertCircle, Lightbulb } from 'lucide-react'
import Card from '@/components/ui/Card'
import ProgressBar from '@/components/ui/ProgressBar'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface ReportData {
  jobReadinessScore: number
  skillGaps: {
    critical: string[]
    moderate: string[]
    minor: string[]
  }
  salaryPotential: {
    current: string
    target: string
    potentialIncrease: string
    marketInsights: string
  }
  roadmap: {
    phase1: {
      title: string
      duration: string
      actions: string[]
    }
    phase2: {
      title: string
      duration: string
      actions: string[]
    }
    phase3: {
      title: string
      duration: string
      actions: string[]
    }
  }
  nextSteps: string[]
  learningPath: {
    foundational: string[]
    intermediate: string[]
    advanced: string[]
  }
  timeline: {
    realistic: string
    optimistic: string
    factors: string[]
  }
  summary: string
}

interface ResumeAnalysis {
  overallScore: number
  strengths: string[]
  weaknesses: string[]
  suggestions: {
    critical: Array<{ category: string; issue: string; suggestion: string; priority: string }>
    important: Array<{ category: string; issue: string; suggestion: string; priority: string }>
    optional: Array<{ category: string; issue: string; suggestion: string; priority: string }>
  }
  atsOptimization: {
    score: number
    issues: string[]
    recommendations: string[]
  }
  keywordAnalysis: {
    missingKeywords: string[]
    suggestedKeywords: string[]
  }
  summary: string
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

interface JobRecommendationsData {
  recommendedJobs: JobRecommendation[]
  summary: string
  suggestions: string[]
}

export default function ReportPage() {
  const router = useRouter()
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysis | null>(null)
  const [jobRecommendations, setJobRecommendations] = useState<JobRecommendationsData | null>(null)
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load report data from sessionStorage
    const storedReport = sessionStorage.getItem('careerReport')
    const storedResumeAnalysis = sessionStorage.getItem('resumeAnalysis')
    const storedJobRecommendations = sessionStorage.getItem('jobRecommendations')
    const storedUserData = sessionStorage.getItem('userData')

    if (storedReport) {
      try {
        setReportData(JSON.parse(storedReport))
        if (storedResumeAnalysis) {
          setResumeAnalysis(JSON.parse(storedResumeAnalysis))
        }
        if (storedJobRecommendations) {
          setJobRecommendations(JSON.parse(storedJobRecommendations))
        }
        setUserData(storedUserData ? JSON.parse(storedUserData) : null)
      } catch (error) {
        console.error('Error parsing report data:', error)
        router.push('/analysis')
      }
    } else {
      router.push('/analysis')
    }
    
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading your report..." />
      </main>
    )
  }

  if (!reportData) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Career Growth Report
          </h1>
          {userData && (
            <p className="text-xl text-gray-600">
              Prepared for {userData.name}
            </p>
          )}
        </div>

        {/* Job Readiness Score - Prominent Display */}
        <Card className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Readiness Score</h2>
            <p className="text-gray-600">Your readiness for your target role</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-primary-600 mb-2">
                {reportData.jobReadinessScore}
              </div>
              <div className="text-2xl text-gray-600">/ 100</div>
            </div>
            <ProgressBar
              value={reportData.jobReadinessScore}
              max={100}
              showValue={false}
            />
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {reportData.summary}
          </p>
        </Card>

        {/* Skill Gaps */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Skill Gaps Analysis</h2>
          <div className="space-y-6">
            {reportData.skillGaps.critical.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  Critical Gaps
                </h3>
                <ul className="space-y-2 ml-4">
                  {reportData.skillGaps.critical.map((gap, index) => (
                    <li key={index} className="text-gray-700 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {reportData.skillGaps.moderate.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
                  Moderate Gaps
                </h3>
                <ul className="space-y-2 ml-4">
                  {reportData.skillGaps.moderate.map((gap, index) => (
                    <li key={index} className="text-gray-700 flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {reportData.skillGaps.minor.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Minor Gaps
                </h3>
                <ul className="space-y-2 ml-4">
                  {reportData.skillGaps.minor.map((gap, index) => (
                    <li key={index} className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>

        {/* Salary Potential */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary-600" />
            Salary Potential
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Current Range</div>
              <div className="text-xl font-bold text-gray-900">{reportData.salaryPotential.current}</div>
            </div>
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Target Range</div>
              <div className="text-xl font-bold text-primary-600">{reportData.salaryPotential.target}</div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 mb-4">
            <div className="text-sm text-gray-600 mb-1">Potential Increase</div>
            <div className="text-2xl font-bold text-green-600">{reportData.salaryPotential.potentialIncrease}</div>
          </div>
          <p className="text-gray-700">{reportData.salaryPotential.marketInsights}</p>
        </Card>

        {/* Roadmap */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Career Roadmap</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-primary-600 pl-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</span>
                <h3 className="text-xl font-semibold text-gray-900">{reportData.roadmap.phase1.title}</h3>
                <span className="text-sm text-gray-500">({reportData.roadmap.phase1.duration})</span>
              </div>
              <ul className="space-y-2 ml-10">
                {reportData.roadmap.phase1.actions.map((action, index) => (
                  <li key={index} className="text-gray-700 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-l-4 border-primary-600 pl-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</span>
                <h3 className="text-xl font-semibold text-gray-900">{reportData.roadmap.phase2.title}</h3>
                <span className="text-sm text-gray-500">({reportData.roadmap.phase2.duration})</span>
              </div>
              <ul className="space-y-2 ml-10">
                {reportData.roadmap.phase2.actions.map((action, index) => (
                  <li key={index} className="text-gray-700 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-l-4 border-primary-600 pl-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</span>
                <h3 className="text-xl font-semibold text-gray-900">{reportData.roadmap.phase3.title}</h3>
                <span className="text-sm text-gray-500">({reportData.roadmap.phase3.duration})</span>
              </div>
              <ul className="space-y-2 ml-10">
                {reportData.roadmap.phase3.actions.map((action, index) => (
                  <li key={index} className="text-gray-700 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Immediate Next Steps</h2>
          <div className="space-y-3">
            {reportData.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Learning Path */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Learning Path</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Foundational</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {reportData.learningPath.foundational.map((item, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-3 text-sm text-gray-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Intermediate</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {reportData.learningPath.intermediate.map((item, index) => (
                  <div key={index} className="bg-purple-50 rounded-lg p-3 text-sm text-gray-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Advanced</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {reportData.learningPath.advanced.map((item, index) => (
                  <div key={index} className="bg-orange-50 rounded-lg p-3 text-sm text-gray-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Timeline Estimates</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Realistic Timeline</h3>
              <p className="text-2xl font-bold text-blue-600">{reportData.timeline.realistic}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Optimistic Timeline</h3>
              <p className="text-2xl font-bold text-green-600">{reportData.timeline.optimistic}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Factors</h3>
            <ul className="space-y-2">
              {reportData.timeline.factors.map((factor, index) => (
                <li key={index} className="text-gray-700 flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Resume Analysis Section */}
        {resumeAnalysis && (
          <Card className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Resume Analysis & Improvement Suggestions</h2>
            </div>

            {/* Overall Score */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Resume Score</span>
                <span className="text-2xl font-bold text-primary-600">{resumeAnalysis.overallScore}/100</span>
              </div>
              <ProgressBar value={resumeAnalysis.overallScore} max={100} showValue={false} />
            </div>

            {/* Summary */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{resumeAnalysis.summary}</p>
            </div>

            {/* Strengths */}
            {resumeAnalysis.strengths.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {resumeAnalysis.strengths.map((strength, index) => (
                    <li key={index} className="text-gray-700 flex items-start gap-2 bg-green-50 rounded-lg p-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weaknesses */}
            {resumeAnalysis.weaknesses.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-red-600 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {resumeAnalysis.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-gray-700 flex items-start gap-2 bg-red-50 rounded-lg p-3">
                      <span className="text-red-600 mt-1">•</span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvement Suggestions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Detailed Improvement Suggestions
              </h3>

              {/* Critical Suggestions */}
              {resumeAnalysis.suggestions.critical.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-md font-semibold text-red-600 mb-2">Critical (High Priority)</h4>
                  <div className="space-y-3">
                    {resumeAnalysis.suggestions.critical.map((suggestion, index) => (
                      <div key={index} className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <div className="font-semibold text-gray-900 mb-1">{suggestion.category}</div>
                        <div className="text-sm text-gray-600 mb-2">{suggestion.issue}</div>
                        <div className="text-sm text-gray-700">{suggestion.suggestion}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Important Suggestions */}
              {resumeAnalysis.suggestions.important.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-md font-semibold text-yellow-600 mb-2">Important (Medium Priority)</h4>
                  <div className="space-y-3">
                    {resumeAnalysis.suggestions.important.map((suggestion, index) => (
                      <div key={index} className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                        <div className="font-semibold text-gray-900 mb-1">{suggestion.category}</div>
                        <div className="text-sm text-gray-600 mb-2">{suggestion.issue}</div>
                        <div className="text-sm text-gray-700">{suggestion.suggestion}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Suggestions */}
              {resumeAnalysis.suggestions.optional.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-md font-semibold text-blue-600 mb-2">Optional (Low Priority)</h4>
                  <div className="space-y-3">
                    {resumeAnalysis.suggestions.optional.map((suggestion, index) => (
                      <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <div className="font-semibold text-gray-900 mb-1">{suggestion.category}</div>
                        <div className="text-sm text-gray-600 mb-2">{suggestion.issue}</div>
                        <div className="text-sm text-gray-700">{suggestion.suggestion}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ATS Optimization */}
            {resumeAnalysis.atsOptimization && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">ATS Optimization Score</h3>
                <div className="mb-3">
                  <ProgressBar value={resumeAnalysis.atsOptimization.score} max={100} label="ATS Score" />
                </div>
                {resumeAnalysis.atsOptimization.issues.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Issues Found:</h4>
                    <ul className="space-y-1">
                      {resumeAnalysis.atsOptimization.issues.map((issue, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {resumeAnalysis.atsOptimization.recommendations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Recommendations:</h4>
                    <ul className="space-y-1">
                      {resumeAnalysis.atsOptimization.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Keyword Analysis */}
            {resumeAnalysis.keywordAnalysis && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Keyword Analysis</h3>
                {resumeAnalysis.keywordAnalysis.missingKeywords.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Missing Keywords:</h4>
                    <div className="flex flex-wrap gap-2">
                      {resumeAnalysis.keywordAnalysis.missingKeywords.map((keyword, index) => (
                        <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {resumeAnalysis.keywordAnalysis.suggestedKeywords.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Suggested Keywords:</h4>
                    <div className="flex flex-wrap gap-2">
                      {resumeAnalysis.keywordAnalysis.suggestedKeywords.map((keyword, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        )}

        {/* Job Recommendations Section */}
        {jobRecommendations && jobRecommendations.recommendedJobs && jobRecommendations.recommendedJobs.length > 0 && (
          <Card className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-8 h-8 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Job Recommendations</h2>
            </div>

            {jobRecommendations.summary && (
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{jobRecommendations.summary}</p>
              </div>
            )}

            <div className="space-y-4 mb-6">
              {jobRecommendations.recommendedJobs.map((job, index) => (
                <div key={job.id || index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                          <p className="text-lg text-gray-600 mb-2">{job.company}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span>{job.location}</span>
                            {job.salary && <span>{job.salary}</span>}
                            {job.postedDate && <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>}
                            <span className="capitalize">{job.source}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-600">{job.matchScore}%</div>
                          <div className="text-xs text-gray-500">Match</div>
                        </div>
                      </div>

                      <div className="mt-3 mb-3">
                        <ProgressBar value={job.matchScore} max={100} showValue={false} />
                      </div>

                      {job.jobDescription && (
                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{job.jobDescription}</p>
                      )}

                      {job.matchReasons && job.matchReasons.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Why this job matches:</h4>
                          <ul className="space-y-1">
                            {job.matchReasons.map((reason, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-4 mt-4">
                        {job.requiredSkills && job.requiredSkills.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold text-gray-700 mb-1">Required Skills:</h4>
                            <div className="flex flex-wrap gap-1">
                              {job.requiredSkills.slice(0, 5).map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {job.missingSkills && job.missingSkills.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold text-gray-700 mb-1">Skills to Develop:</h4>
                            <div className="flex flex-wrap gap-1">
                              {job.missingSkills.slice(0, 3).map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => window.open(job.url, '_blank')}
                      className="flex-1"
                    >
                      View Job
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {jobRecommendations.suggestions && jobRecommendations.suggestions.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Suggestions for Better Job Matches:</h3>
                <ul className="space-y-1">
                  {jobRecommendations.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> Job recommendations are AI-generated. For real-time job listings, integrate with LinkedIn Jobs API and Naukri API. See documentation in <code className="bg-yellow-100 px-1 rounded">app/api/job-recommendations/route.ts</code>
              </p>
            </div>
          </Card>
        )}

        {/* CONVERSION SECTION - CRITICAL */}
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Ready to Accelerate Your Career Growth?
          </h2>
          <p className="text-xl text-center mb-8 opacity-90 max-w-2xl mx-auto">
            Take the next step with our expert-led programs designed to help you achieve your career goals.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* CTA 1: Free Masterclass */}
            <Card className="bg-white text-gray-900">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Free Masterclass</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Join our live session and learn from industry experts
                </p>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    // In production, this would redirect to masterclass signup
                    console.log('Masterclass signup clicked')
                    alert('Masterclass signup - integrate with your booking system')
                  }}
                >
                  Join Free Live Class
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* CTA 2: Career Consultation */}
            <Card className="bg-white text-gray-900">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Career Consultation</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Book a 1-on-1 call with a career advisor
                </p>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    // In production, this would embed Calendly or redirect to booking
                    console.log('Consultation booking clicked')
                    // Placeholder for Calendly embed
                    const calendlyUrl = 'https://calendly.com/your-username/consultation'
                    window.open(calendlyUrl, '_blank')
                  }}
                >
                  Book a Career Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* CTA 3: Premium Course */}
            <Card className="bg-white text-gray-900">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Premium Program</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Explore our comprehensive 12-month career transformation program
                </p>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    // In production, this would redirect to course page
                    console.log('Premium course clicked')
                    alert('Premium course - integrate with your course platform')
                  }}
                >
                  Explore 12-Month Program
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </main>
  )
}

