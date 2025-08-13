import { useState } from "react";

const NewTodoForm = ({ onSubmit }: { onSubmit: (newTitle: string) => void }) => {
  const [newTitle, setNewTitle] = useState<string>("")
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newTitle === "") return
    onSubmit(newTitle)
  }

  return (
    <form className="new-item-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input value={newTitle} onChange={handleInputChange} type="text" id="item" />
      </div>
      <button className="btn">Add</button>
    </form>
  )
}

export default NewTodoForm;