import "./styles.css"
import { useState, useEffect } from "react";
import NewTodoForm from './NewTodoForm'
import TodoList from './TodoList'

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("TODOS");
    return storedTodos ? JSON.parse(storedTodos) : [];
  })

  console.log("rendering")

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos))
  }, [todos])

  const addTodo = (newTitle: string) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        title: newTitle,
        completed: false,
      }
    ])
  }

  const handleToggleTodo = (id: string, completed: boolean) => {
    setTodos((currentTodos) => {
      return currentTodos.map(todo => {
        if (todo.id === id) return { ...todo, completed }
        return todo
      })
    })
  }

  const handleDeleteTodo = (id: string) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id)
    })
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">TODO List</h1>
      <TodoList
        todos={todos}
        handleToggleTodo={handleToggleTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
    </>
  )
}

export default App
