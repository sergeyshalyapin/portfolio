import type { Todo } from './App'
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: Todo[]
  handleToggleTodo: (id: string, completed: boolean) => void
  handleDeleteTodo: (id: string) => void
};


const TodoList = ({ todos, handleToggleTodo, handleDeleteTodo }: TodoListProps) => {


  return (
    <ul className="list">
      {todos.length === 0 && <li className="list-item">No todos found</li>}
      {todos.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            {...todo}
            handleToggleTodo={handleToggleTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        )
      })}
    </ul>
  )
}

export default TodoList
