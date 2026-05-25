import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todo, setTodo] = useState('') 
  const [deadline, setDeadline] = useState('')  
  const [todos, setTodos] = useState(()=> {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  },[todos])

  function addTodo(){
    if(todo.trim() === ''){return}
    setTodos([...todos, {
      id: Date.now(),
      text: todo,
      deadline: deadline || null,
      completed: false
    }])
    setTodo('')
    setDeadline('')
  }

  function deleteTodo(id){
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function toggleComplete(id){
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ))
  }

  // 期限ありだけ取り出す
  const scheduledTodos = todos.filter(t => t.deadline !== null)
  scheduledTodos.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) // 期限順にソート
  // 期限なしだけ取り出す
  const unscheduledTodos = todos.filter(t => t.deadline === null)
  
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center py-10'>
      <h1>To Do App</h1>
      <div className='bg-white rounded-xl shadow-md p-6 max-w-lg w-full'>
        <div className='flex gap-2 mb-6'>
          <input 
            type='text' 
            value={todo}
            placeholder='add a new task'
            onChange={(e)=>setTodo(e.target.value)}
          />
          <input 
            type="date" 
            value={deadline}
            onChange={(e)=>setDeadline(e.target.value)}
          />
          <button 
            className='bg-blue-200 text-blue-500 px-4 py-2 rounded'
            onClick={addTodo}
          >Add Task</button>
        </div>

        <h2>Scheduled Tasks</h2>
        <ul>
          {scheduledTodos.map((task, index) => (
            <li key={task.id} className='flex items-center justify-between py-2 border-b'>
              <div className='flex items-center gap-2'>
                <input 
                  type='checkbox' 
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                {task.completed ? <s>{task.text}</s> : task.text} (Due: {task.deadline})
              </div>
              <button 
                className='bg-red-200 text-red-500 px-4 py-2 rounded'
                onClick={() => deleteTodo(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <h2>Unscheduled Tasks</h2>
        <ul>
          {unscheduledTodos.map((task, index) => (
            <li key={task.id} className='flex items-center justify-between py-2 border-b'>
              <div className='flex items-center gap-2'>
                <input 
                  type='checkbox' 
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                {task.completed ? <s>{task.text}</s> : task.text}
              </div>
              <button 
                className='bg-red-200 text-red-500 px-4 py-2 rounded'
                onClick={() => deleteTodo(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
