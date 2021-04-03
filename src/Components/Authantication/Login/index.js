import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css";
import firebase from "firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errMyMsg, setErrMyMsg] = useState("");
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        history.push("/dashboard");
        setEmail("");
        setPassword("");
      } catch (err) {
        console.log(err?.message);
        setErrMsg(err?.message);
      }
    } else {
      setErrMyMsg("All Fields Are Required");
    }
  };

  const emailHandleChange = (event) => {
    setEmail(event.target.value);
    setErrMsg("");
    setErrMyMsg("");
  };

  const passwordHandleChange = (event) => {
    setPassword(event.target.value);
    setErrMsg("");
    setErrMyMsg("");
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setErrMsg("");
    setErrMyMsg("");
  }, []);

  if (firebase.auth()?.currentUser?.uid) {
    history.push("/dashboard");
  }
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
                onChange={(event) => emailHandleChange(event)}
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
                onChange={(event) => passwordHandleChange(event)}
                security={true}
              />
            </div>
          </div>
          <div>
            <div style={{ textAlign: "center", color: "red" }}>
              <p>{errMsg}</p>
            </div>
            <div style={{ textAlign: "center", color: "red" }}>
              <p>{errMyMsg}</p>
            </div>
            <div className="btn">
              <button type="submit">Log In</button>
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
