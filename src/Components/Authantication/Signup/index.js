import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "./signUp.css";
import { Link } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (firstName && lastName && email && password) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = firebase.auth()?.currentUser?.uid;
        firebase.database().ref(`/newUser/${uid}`).set({
          firstName,
          lastName,
          email,
          password,
        });
      } catch (err) {
        console.log(err);
      }
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    firebase.auth().signOut();
  };

  useEffect(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }, []);

  return (
    <div className="FirstContainer">
      <div className="signup">
        <h2 className="signupTxt">Sign Up</h2>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="emailInput">
            <div className="signupLabel">
              <label>
                First Name <br />
              </label>
            </div>
            <div className="signUpInput">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="signupLabel">
              <label>
                Last Name <br />
              </label>
            </div>
            <div className="signUpInput">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>

          <div className="emailInput">
            <div className="signupLabel">
              <label>
                Email <br />
              </label>
            </div>
            <div className="signUpInput">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="signupLabel">
              <label>
                Password <br />
              </label>
            </div>
            <div className="signUpInput">
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
            <div className="submitBtn">
              <button
                type="submit"
                disabled={!firstName || !lastName || !email || !password}
              >
                Sign Up
              </button>
            </div>
            <div className="signupRoutTxt">
              <p className="navTxt">Already Have An Account</p>
              <Link to="/login">
                <p className="clickHereTxt">Click here.</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
