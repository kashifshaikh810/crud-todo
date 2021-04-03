import React, { useState } from "react";
import "./index.css";

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

  const editTodoHandlerSubmit = (event, index, todo) => {
    event.preventDefault();
    if (inpuText) {
      editTodoFromState(index, inpuText, todo);
      toggleEditing();
    }
  };

  if (isEdtiing) {
    return (
      <li
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          listStyleType: "none",
        }}
      >
        <form onSubmit={(event) => editTodoHandlerSubmit(event, index, todo)}>
          <input
            type="text"
            defaultValue={todo.text}
            onChange={(e) => setInpuText(e.target.value)}
          />
          <></>
          <button className="button" type="submit">
            Save
          </button>
          <></>
          <button className="cancelButton" onClick={toggleEditing}>
            Cancel
          </button>
          <br />
          <br />
        </form>
      </li>
    );
  }
  return (
    <ul
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <li
        style={{ listStyleType: "none" }}
        className={todo.completed ? "completed" : ""}
      >
        <span style={{ minWidth: 10 }} onClick={() => clickHandler(index)}>
          {todo.text}
        </span>
        <button
          className="cancelButton"
          onClick={() => deleteTodoFromState(index, todo)}
        >
          Delete
        </button>
        <button className="button" onClick={() => toggleEditing(index)}>
          Edit
        </button>
      </li>
    </ul>
  );
}

export default TodoItem;
