import React, { useState } from "react";

function TodoItem({
  todo,
  toggleComplete,
  index,
  deleteTodoFromState,
  editTodoFromState,
}) {
  const [isEdtiing, setIsEditing] = useState(false);
  const [inpuText, setInpuText] = useState("");
  const clickHandler = (index) => {
    toggleComplete(index);
  };

  const toggleEditing = () => {
    setIsEditing(!isEdtiing);
  };

  const editTodoHandlerSubmit = (event, index) => {
    event.preventDefault();
    if (inpuText) {
      editTodoFromState(index, inpuText);
      toggleEditing();
    }
  };

  if (isEdtiing) {
    return (
      <li style={{ listStyleType: "none" }}>
        <form onSubmit={(event) => editTodoHandlerSubmit(event, index, todo)}>
          <input
            type="text"
            defaultValue={todo.text}
            onChange={(e) => setInpuText(e.target.value)}
          />
          <></>
          <button type="submit">Save</button> <></>
          <button onClick={toggleEditing}>Cancel</button>
          <br />
          <br />
        </form>
      </li>
    );
  }
  return (
    <ul>
      <li
        style={{ listStyleType: "none" }}
        className={todo.completed ? "completed" : ""}
      >
        <span onClick={() => clickHandler(index)}>{todo.text}</span>
        <></>
        <button onClick={() => deleteTodoFromState(index)}>Delete</button>
        <button onClick={() => toggleEditing(index)}>Edit</button>
      </li>
    </ul>
  );
}

export default TodoItem;
