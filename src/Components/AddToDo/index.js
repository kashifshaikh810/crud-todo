import React, { useState } from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import "../Main/index.css";
import "./index.css";

function AddTodo({ addTodoState }) {
  const [inputVal, setInputVal] = useState("");
  let history = useHistory();
  const submitHandler = (event) => {
    event.preventDefault();
    addTodoState(inputVal);
    setInputVal("");
  };

  const handleLogOut = async () => {
    await firebase.auth().signOut();
    history.push("/login");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={submitHandler} style={{ marginTop: 10 }}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button type="submit" className="button">
          Add
        </button>
      </form>
      <br />
      <button className="button" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
}

export default AddTodo;
