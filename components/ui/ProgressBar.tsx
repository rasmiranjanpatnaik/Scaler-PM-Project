interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  className?: string
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  className = ''
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const getColorClass = () => {
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-blue-500'
    if (percentage >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showValue && (
            <span className="text-sm font-bold text-gray-900">{value}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-out ${getColorClass()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

