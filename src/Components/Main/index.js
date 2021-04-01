import React, { useState } from "react";
import AddTodo from "../AddToDo/index";
import "../../App.css";
import TodoItem from "../ToDoItem/index";

function ToDo() {
  const [todos, setTodos] = useState([
    { text: "Buy Milk", completed: false },
    { text: "Buy Egg", completed: true },
  ]);

  const addTodoState = (text) => {
    if (text) {
      const newTodos = todos.concat({
        text,
        completed: false,
      });
      setTodos(newTodos);
    }
  };

  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (index === i) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  //   if (index === i) {
  //     return false;
  //   }
  //   return true;
  // });
  // setTodos(newTodo);

  const deleteTodoFromState = (index) => {
    const newTodo = todos.filter((todo, i) => {
      return index === i ? false : true;
    });
    setTodos(newTodo);
  };

  const editTodoFromState = (index, newTxt) => {
    const newTodos = todos.map((todo, i) => {
      if (index === i) {
        return {
          ...todo,
          text: newTxt,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className="ToDo">
      <h1>Todo Practice</h1>
      <AddTodo addTodoState={addTodoState} />
      {todos.map((todo, index) => {
        return (
          <TodoItem
            toggleComplete={toggleComplete}
            index={index}
            todo={todo}
            key={index}
            deleteTodoFromState={deleteTodoFromState}
            editTodoFromState={editTodoFromState}
          />
        );
      })}
    </div>
  );
}

export default ToDo;
