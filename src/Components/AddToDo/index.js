import React, { useState } from "react";

function AddTodo({ addTodoState }) {
  const [inputVal, setInputVal] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
    addTodoState(inputVal);
    setInputVal("");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <br />
    </div>
  );
}

export default AddTodo;
