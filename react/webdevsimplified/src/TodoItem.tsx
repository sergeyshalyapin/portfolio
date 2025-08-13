type TodoItemProps = {
  id: string
  title: string
  completed: boolean
  handleToggleTodo: (id: string, completed: boolean) => void
  handleDeleteTodo: (id: string) => void
};

const TodoItem = ({ id, title, completed, handleToggleTodo, handleDeleteTodo }: TodoItemProps) => {
  return (
    <li>
      <label>
        <input type="checkbox" checked={completed} onChange={e => handleToggleTodo(id, e.target.checked)} />
        {title}
      </label>
      <button className="btn btn-danger" onClick={() => handleDeleteTodo(id)}>Delete</button>
    </li>
  )
}

export default TodoItem
