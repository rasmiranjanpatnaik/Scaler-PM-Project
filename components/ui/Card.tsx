import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={cn('glass rounded-xl p-6 border border-dark-700/50', className)}>
      {children}
    </div>
  )
}

