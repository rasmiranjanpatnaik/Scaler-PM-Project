export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: string
  dueDate?: string
  priority?: 'low' | 'medium' | 'high'
  description?: string
}

