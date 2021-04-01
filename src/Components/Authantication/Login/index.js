import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import firebase from "firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (err) {
        console.log(err);
      }
    }
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  return (
    <div className="container">
      <div className="login">
        <h2 className="loginTxt">Sign In</h2>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="emailInput">
            <div className="label">
              <label>
                Email address <br />
              </label>
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="label">
              <label>
                Password <br />
              </label>
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                security={true}
              />
            </div>
          </div>
          <div>
            <div className="btn">
              <Link to="/dashboard">
                <button type="submit" disabled={!email || !password}>
                  Log In
                </button>
              </Link>
            </div>
            <div className="routTxt">
              <p className="NeedTxt">You need to signup</p>
              <Link to="/signup">
                <p className="clickTxt">Click here.</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
