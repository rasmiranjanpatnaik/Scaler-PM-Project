'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Upload, CheckCircle2, X, FileText } from 'lucide-react'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Card from '@/components/ui/Card'
import Navigation from '@/components/Navigation'

interface FormData {
  // Step 1
  name: string
  email: string
  
  // Step 2
  currentRole: string
  yearsOfExperience: string
  currentSalary: string
  targetRole: string
  
  // Step 3
  skills: string
  timeline: string
  resumeText: string
}

export default function AnalysisPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    currentRole: '',
    yearsOfExperience: '',
    currentSalary: '',
    targetRole: '',
    skills: '',
    timeline: '',
    resumeText: ''
  })
  
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isReadingResume, setIsReadingResume] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }
    
    if (step === 2) {
      if (!formData.currentRole.trim()) newErrors.currentRole = 'Current role is required'
      if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required'
      if (!formData.currentSalary) newErrors.currentSalary = 'Current salary range is required'
      if (!formData.targetRole.trim()) newErrors.targetRole = 'Target role is required'
    }
    
    if (step === 3) {
      if (!formData.skills.trim()) newErrors.skills = 'Please list your skills'
      if (!formData.timeline) newErrors.timeline = 'Timeline is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleFileUpload = async (file: File) => {
    setIsReadingResume(true)
    setResumeFile(file)
    
    try {
      // Check file type
      const fileType = file.type
      const fileName = file.name.toLowerCase()
      
      let text = ''
      
      if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
        // Read text file
        text = await file.text()
      } else if (fileName.endsWith('.pdf')) {
        // PDF files - show message that full PDF parsing requires additional library
        setErrors({ resume: 'PDF parsing requires additional setup. Please copy and paste your resume text, or upload a .txt file.' })
        setIsReadingResume(false)
        return
      } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
        // DOCX files - show message
        setErrors({ resume: 'DOCX parsing requires additional setup. Please copy and paste your resume text, or upload a .txt file.' })
        setIsReadingResume(false)
        return
      } else {
        // Try to read as text anyway
        try {
          text = await file.text()
        } catch (e) {
          setErrors({ resume: 'Unable to read file. Please upload a .txt file or paste your resume text.' })
          setIsReadingResume(false)
          return
        }
      }
      
      updateField('resumeText', text)
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.resume
        return newErrors
      })
    } catch (error) {
      console.error('Error reading file:', error)
      setErrors({ resume: 'Error reading file. Please try again or paste your resume text manually.' })
      setResumeFile(null)
    } finally {
      setIsReadingResume(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ resume: 'File size must be less than 5MB' })
        return
      }
      handleFileUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ resume: 'File size must be less than 5MB' })
        return
      }
      handleFileUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const removeResume = () => {
    setResumeFile(null)
    updateField('resumeText', '')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return
    
    setIsSubmitting(true)
    setErrors({}) // Clear previous errors
    
    try {
      // Log lead capture (in production, this would go to a database)
      console.log('Lead captured:', {
        name: formData.name,
        email: formData.email,
        completedAt: new Date().toISOString(),
        hasResume: !!formData.resumeText
      })
      
      // Call main analysis API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `Failed to generate report (${response.status})`)
      }

      const reportData = await response.json()
      
      // If resume is provided, also analyze it
      let resumeAnalysis = null
      if (formData.resumeText && formData.resumeText.length > 50) {
        try {
          const resumeResponse = await fetch('/api/analyze-resume', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              resumeText: formData.resumeText,
              currentRole: formData.currentRole,
              targetRole: formData.targetRole
            }),
          })
          
          if (resumeResponse.ok) {
            resumeAnalysis = await resumeResponse.json()
          }
        } catch (error) {
          console.error('Error analyzing resume:', error)
          // Continue even if resume analysis fails
        }
      }
      
      // Get job recommendations
      let jobRecommendations = null
      if (formData.resumeText && formData.resumeText.length > 50) {
        try {
          const jobsResponse = await fetch('/api/job-recommendations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              resumeText: formData.resumeText,
              currentRole: formData.currentRole,
              targetRole: formData.targetRole,
              skills: formData.skills
            }),
          })
          
          if (jobsResponse.ok) {
            jobRecommendations = await jobsResponse.json()
          }
        } catch (error) {
          console.error('Error getting job recommendations:', error)
          // Continue even if job recommendations fail
        }
      }
      
      // Store report data in sessionStorage to pass to report page
      sessionStorage.setItem('careerReport', JSON.stringify(reportData))
      if (resumeAnalysis) {
        sessionStorage.setItem('resumeAnalysis', JSON.stringify(resumeAnalysis))
      }
      if (jobRecommendations) {
        sessionStorage.setItem('jobRecommendations', JSON.stringify(jobRecommendations))
      }
      sessionStorage.setItem('userData', JSON.stringify({
        name: formData.name,
        email: formData.email
      }))
      
      router.push('/report')
    } catch (error) {
      console.error('Error generating report:', error)
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to generate report. Please check your OpenAI API key and try again.'
      setErrors({ submit: errorMessage })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Career Info' },
    { number: 3, title: 'Skills & Goals' }
  ]

  if (isSubmitting) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-gradient-dark flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <LoadingSpinner size="lg" text="Analyzing your career profile..." />
          </Card>
        </main>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-dark py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep >= step.number
                        ? 'bg-gradient-primary text-white'
                        : 'bg-dark-800 text-gray-500 border border-dark-700'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-400">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all ${
                      currentStep > step.number ? 'bg-primary-500' : 'bg-dark-800'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Basic Information</h2>
                <p className="text-gray-400">Let's start with your contact details</p>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`w-full px-4 py-3 bg-dark-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-500 ${
                    errors.name ? 'border-red-500' : 'border-dark-700'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={`w-full px-4 py-3 bg-dark-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-500 ${
                    errors.email ? 'border-red-500' : 'border-dark-700'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Career Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Career Information</h2>
                <p className="text-gray-400">Tell us about your current role and goals</p>
              </div>
              
              <div>
                <label htmlFor="currentRole" className="block text-sm font-medium text-gray-300 mb-2">
                  Current Job Role *
                </label>
                <input
                  type="text"
                  id="currentRole"
                  value={formData.currentRole}
                  onChange={(e) => updateField('currentRole', e.target.value)}
                  className={`w-full px-4 py-3 bg-dark-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-500 ${
                    errors.currentRole ? 'border-red-500' : 'border-dark-700'
                  }`}
                  placeholder="e.g., Software Engineer, Product Manager"
                />
                {errors.currentRole && <p className="mt-1 text-sm text-red-400">{errors.currentRole}</p>}
              </div>

              <div>
                <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <input
                  type="number"
                  id="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={(e) => updateField('yearsOfExperience', e.target.value)}
                  min="0"
                  max="50"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="5"
                />
                {errors.yearsOfExperience && <p className="mt-1 text-sm text-red-500">{errors.yearsOfExperience}</p>}
              </div>

              <div>
                <label htmlFor="currentSalary" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Salary Range *
                </label>
                <select
                  id="currentSalary"
                  value={formData.currentSalary}
                  onChange={(e) => updateField('currentSalary', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.currentSalary ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select salary range</option>
                  <option value="0-30k">$0 - $30,000</option>
                  <option value="30k-50k">$30,000 - $50,000</option>
                  <option value="50k-75k">$50,000 - $75,000</option>
                  <option value="75k-100k">$75,000 - $100,000</option>
                  <option value="100k-150k">$100,000 - $150,000</option>
                  <option value="150k-200k">$150,000 - $200,000</option>
                  <option value="200k+">$200,000+</option>
                </select>
                {errors.currentSalary && <p className="mt-1 text-sm text-red-500">{errors.currentSalary}</p>}
              </div>

              <div>
                <label htmlFor="targetRole" className="block text-sm font-medium text-gray-700 mb-2">
                  Target Role *
                </label>
                <input
                  type="text"
                  id="targetRole"
                  value={formData.targetRole}
                  onChange={(e) => updateField('targetRole', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.targetRole ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Senior Software Engineer, Tech Lead"
                />
                {errors.targetRole && <p className="mt-1 text-sm text-red-500">{errors.targetRole}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Skills & Goals */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills & Goals</h2>
                <p className="text-gray-600">Help us understand your skills and timeline</p>
              </div>
              
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Skills *
                </label>
                <textarea
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => updateField('skills', e.target.value)}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.skills ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="List your key skills, technologies, and competencies (e.g., JavaScript, React, Project Management, Data Analysis)"
                />
                {errors.skills && <p className="mt-1 text-sm text-red-500">{errors.skills}</p>}
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline for Career Change *
                </label>
                <select
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => updateField('timeline', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.timeline ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select timeline</option>
                  <option value="0-3 months">0 - 3 months</option>
                  <option value="3-6 months">3 - 6 months</option>
                  <option value="6-12 months">6 - 12 months</option>
                  <option value="12-24 months">12 - 24 months</option>
                  <option value="24+ months">24+ months</option>
                </select>
                {errors.timeline && <p className="mt-1 text-sm text-red-500">{errors.timeline}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume Upload (Optional)
                </label>
                
                {resumeFile ? (
                  <div className="border-2 border-primary-200 bg-primary-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-primary-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{resumeFile.name}</p>
                          <p className="text-xs text-gray-500">
                            {(resumeFile.size / 1024).toFixed(1)} KB
                            {formData.resumeText && ` • ${formData.resumeText.length} characters extracted`}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeResume}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isReadingResume 
                        ? 'border-primary-400 bg-primary-50' 
                        : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="resume-upload"
                      accept=".txt,.pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {isReadingResume ? (
                      <LoadingSpinner size="md" text="Reading resume..." />
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Drag and drop your resume here, or{' '}
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            browse files
                          </button>
                        </p>
                        <p className="text-xs text-gray-500">
                          Supported formats: .txt (recommended), .pdf, .doc, .docx (max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                )}
                
                {errors.resume && (
                  <p className="mt-2 text-sm text-red-500">{errors.resume}</p>
                )}
                
                {formData.resumeText && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resume Text Preview (you can edit this)
                    </label>
                    <textarea
                      value={formData.resumeText}
                      onChange={(e) => updateField('resumeText', e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      placeholder="Resume text will appear here..."
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      {formData.resumeText.length} characters
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </Button>
            
            {currentStep < 3 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Generating Report...' : 'Generate Report'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </main>
  )
}

