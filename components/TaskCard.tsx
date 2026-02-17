import { CheckCircle2, Circle, Trash2 } from 'lucide-react'
import { Task } from '@/types/task'
import { format } from 'date-fns'

interface TaskCardProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-lg ${
      task.completed ? 'opacity-60' : ''
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className="mt-1 text-gray-400 hover:text-green-600 transition-colors"
        >
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>
        <div className="flex-1">
          <h3 className={`text-lg font-medium ${
            task.completed ? 'line-through text-gray-500' : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
          <div className="flex items-center gap-4 mt-2">
            <span className="text-xs text-gray-500">
              Created: {format(new Date(task.createdAt), 'MMM d, yyyy')}
            </span>
            {task.priority && (
              <span className={`text-xs px-2 py-1 rounded ${
                task.priority === 'high' ? 'bg-red-100 text-red-700' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {task.priority}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-600 transition-colors p-2"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

