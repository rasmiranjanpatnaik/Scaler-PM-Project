'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, TrendingUp, Users, Clock, Target, Award, Sparkles, Zap, Shield } from 'lucide-react'
import Button from '@/components/ui/Button'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-dark">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full mb-6">
              <Zap className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-300">AI-Powered Career Analysis</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Get Your Personalized{' '}
              <span className="gradient-text">Career Growth Report</span>{' '}
              in 60 Seconds
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover your job readiness, skill gaps, salary potential, and get matched with top opportunities from LinkedIn & Naukri.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/analysis">
                <Button size="lg" className="text-lg px-8 py-4 group">
                  Start Free Analysis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>100% Free • No Credit Card Required</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary-400 mb-1">10K+</div>
              <div className="text-sm text-gray-400">Users Analyzed</div>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary-400 mb-1">95%</div>
              <div className="text-sm text-gray-400">Accuracy Rate</div>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary-400 mb-1">50K+</div>
              <div className="text-sm text-gray-400">Jobs Matched</div>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary-400 mb-1">4.8/5</div>
              <div className="text-sm text-gray-400">User Rating</div>
            </div>
          </div>

          {/* How It Works */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-gray-400 text-lg">Get your career analysis in three simple steps</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass rounded-xl p-8 text-center hover:border-primary-500/50 transition-all group">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Share Your Profile</h3>
                <p className="text-gray-400 leading-relaxed">
                  Tell us about your current role, experience, and career goals in our quick 3-step form.
                </p>
              </div>
              <div className="glass rounded-xl p-8 text-center hover:border-primary-500/50 transition-all group">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">AI Analysis</h3>
                <p className="text-gray-400 leading-relaxed">
                  Our AI analyzes your profile and generates a comprehensive career growth report.
                </p>
              </div>
              <div className="glass rounded-xl p-8 text-center hover:border-primary-500/50 transition-all group">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Get Your Report</h3>
                <p className="text-gray-400 leading-relaxed">
                  Receive personalized insights, skill gaps, salary potential, and a roadmap to success.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Choose AI Career Copilot?
              </h2>
              <p className="text-gray-400 text-lg">Everything you need to accelerate your career growth</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6 flex items-start gap-4 hover:border-primary-500/30 transition-all group">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Job Readiness Score</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Get an accurate assessment of how ready you are for your target role.
                  </p>
                </div>
              </div>
              <div className="glass rounded-xl p-6 flex items-start gap-4 hover:border-primary-500/30 transition-all group">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Salary Potential</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Discover your earning potential based on your skills and experience.
                  </p>
                </div>
              </div>
              <div className="glass rounded-xl p-6 flex items-start gap-4 hover:border-primary-500/30 transition-all group">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Personalized Roadmap</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Get a step-by-step plan to bridge skill gaps and reach your career goals.
                  </p>
                </div>
              </div>
              <div className="glass rounded-xl p-6 flex items-start gap-4 hover:border-primary-500/30 transition-all group">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Timeline Estimates</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Understand how long it will take to transition to your target role.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What Our Users Say
              </h2>
              <p className="text-gray-400 text-lg">Join thousands of professionals who transformed their careers</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass rounded-xl p-8 hover:border-primary-500/30 transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  "The AI analysis helped me identify skills I didn't know I was missing. The roadmap was incredibly detailed and actionable."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Sarah M.</div>
                    <div className="text-sm text-gray-400">Software Engineer</div>
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-8 hover:border-primary-500/30 transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  "I was able to negotiate a 30% salary increase using the salary potential insights from my report."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Michael R.</div>
                    <div className="text-sm text-gray-400">Product Manager</div>
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-8 hover:border-primary-500/30 transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  "The personalized learning path saved me months of research. I knew exactly what to focus on."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Emily L.</div>
                    <div className="text-sm text-gray-400">Data Analyst</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-gradient-primary rounded-2xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Get your free AI-powered career analysis in just 60 seconds. No credit card required.
              </p>
              <Link href="/analysis">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4 group">
                  Start Free Analysis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </section>
        </section>
      </main>
    </>
  )
}
