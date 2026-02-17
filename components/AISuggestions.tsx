'use client'

import { useState } from 'react'
import { Sparkles, Loader2, Zap } from 'lucide-react'
import { Task } from '@/types/task'

interface AISuggestionsProps {
  onGenerate: (tasks: Task[]) => void
  existingTasks: Task[]
  isGenerating: boolean
}

export default function AISuggestions({ onGenerate, existingTasks, isGenerating }: AISuggestionsProps) {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  const generateTasks = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/generate-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          existingTasks: existingTasks.map(t => t.title),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate tasks')
      }

      const data = await response.json()
      const generatedTasks: Task[] = data.tasks.map((title: string, index: number) => ({
        id: `ai-${Date.now()}-${index}`,
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      }))

      onGenerate(generatedTasks)
      setPrompt('')
    } catch (error) {
      console.error('Error generating tasks:', error)
      alert('Failed to generate tasks. Make sure you have set up your OpenAI API key.')
    } finally {
      setLoading(false)
    }
  }

  const quickPrompts = [
    'Plan a software project',
    'Daily work tasks',
    'Marketing campaign',
    'Product launch checklist',
  ]

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-md p-6 mb-6 border-2 border-primary-200">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-primary-600" />
        <h2 className="text-xl font-bold text-gray-900">AI Task Generator</h2>
        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
          Powered by OpenAI
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Describe what you need to accomplish, and AI will generate a task list for you.
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !loading && generateTasks()}
          placeholder="e.g., 'Plan a product launch event'"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={generateTasks}
          disabled={loading || isGenerating || !prompt.trim()}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Generate
            </>
          )}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-gray-600">Quick prompts:</span>
        {quickPrompts.map((quickPrompt) => (
          <button
            key={quickPrompt}
            onClick={() => {
              setPrompt(quickPrompt)
              setTimeout(() => generateTasks(), 100)
            }}
            disabled={loading || isGenerating}
            className="text-xs px-3 py-1 bg-white border border-gray-300 rounded-full hover:bg-primary-50 hover:border-primary-300 transition-colors disabled:opacity-50"
          >
            {quickPrompt}
          </button>
        ))}
      </div>
    </div>
  )
}

