'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Button from './ui/Button'

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/analysis', label: 'Get Analysis' },
  ]

  return (
    <nav className="sticky top-0 z-50 glass border-b border-dark-700/50 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              AI Career Copilot
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-primary-400'
                    : 'text-gray-300 hover:text-primary-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/analysis">
              <Button size="sm" variant="primary">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-primary-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-700/50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-primary-400'
                      : 'text-gray-300 hover:text-primary-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/analysis" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" variant="primary" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

