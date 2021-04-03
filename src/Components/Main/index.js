import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import AddTodo from "../AddToDo/index";
import "./index.css";
import TodoItem from "../ToDoItem/index";

function ToDo() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsLoading(true);
      if (user) {
        let uid = user.uid;
        firebase
          .database()
          .ref(`/todoData/${uid}`)
          .on("value", (snapshot) => {
            let newData = snapshot.val() ? Object.values(snapshot.val()) : [];
            let keys = snapshot.val() ? Object.keys(snapshot.val()) : [];
            newData = newData.map((item, i) => ({ ...item, key: keys[i] }));
            setTodos(newData);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
        console.log("New User");
      }
    });
  }, []);

  const addTodoState = (text) => {
    if (text) {
      let newTodos = {
        text,
        completed: false,
      };
      let newTodo = todos.concat(newTodos);
      setTodos(newTodo);
      const uid = firebase.auth()?.currentUser?.uid;
      firebase.database().ref(`/todoData/${uid}`).push(newTodos);
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

  const deleteTodoFromState = (index, todo) => {
    const newTodo = todos.filter((todo, i) => {
      return index === i ? false : true;
    });
    setTodos(newTodo);
    const uid = firebase.auth()?.currentUser?.uid;
    firebase.database().ref(`/todoData/${uid}/${todo.key}`).remove();
  };

  // setTodos((previousData) => {
  //   let preData = [...previousData];
  //   preData[index].text = newTxt;
  //   return preData;
  // });

  const editTodoFromState = (index, newTxt, todo) => {
    const newTodos = todos.map((todo, i) => {
      if (index === i) {
        return {
          ...todo,
          text: newTxt,
        };
      }
      return todo;
    });
    let [my] = newTodos;
    let com = my.completed;
    let textt = my.text;
    const uid = firebase.auth()?.currentUser?.uid;
    firebase.database().ref(`/todoData/${uid}/${todo.key}`).update({
      completed: com,
      text: textt,
    });
    setTodos(newTodos);
  };

  return (
    <div className="ToDo">
      <h1 style={{ textAlign: "center", margin: 0, padding: 0 }}>Todo App</h1>
      <AddTodo addTodoState={addTodoState} />
      {isLoading ? (
        <p
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            fontSize: "40px",
          }}
        >
          Loading...
        </p>
      ) : (
        todos.map((todo, index) => {
          return (
            <TodoItem
              toggleComplete={toggleComplete}
              index={index}
              todo={todo}
              key={index}
              deleteTodoFromState={deleteTodoFromState}
              editTodoFromState={editTodoFromState}
              isLoading={isLoading}
            />
          );
        })
      )}
    </div>
  );
}

export default ToDo;
