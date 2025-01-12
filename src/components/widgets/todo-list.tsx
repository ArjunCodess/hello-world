import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    
    setTodos([...todos, {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false
    }])
    setNewTodo('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h2 className="text-lg font-semibold mb-4">Todo List</h2>
      <form onSubmit={addTodo} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2 text-base">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center gap-2 rounded-lg border border-border p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <label className="flex items-center gap-2 flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
              />
              <span className={`${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                {todo.text}
              </span>
            </label>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete todo</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
} 