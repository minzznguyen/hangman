import React, { useState } from 'react';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { db } from "../services/firebase"; 
import "./styles/forms.css";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const addUserToDatabase = async (username, password) => {
  const userRef = doc(collection(db, 'Players'), username);
  const userData = {
    name: username,
    password: password,
    scores: []
  };

  try {
    await setDoc(userRef, userData);
    console.log(`User ${username} added to the database.`);
  } catch (error) {
    console.error(`Error adding user ${username}: ${error}`);
  }
};


function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setconfPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleconfPasswordChange = (event) => {
        setconfPassword(event.target.value);
      };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Get the reference of the username/id in the database
      const userRef = doc(db, "Players", username.toLowerCase());
      try {
        const docSnap = await getDoc(userRef);
  
        if (docSnap.exists()) {
          setErrorMessage("User already exists")
        } else {
            const userData = docSnap.data();
  
          // If both passwords match
          if (confPassword === password) {
            // Show success message
            setErrorMessage("Account Created")

            // Add the new user to the database
            await addUserToDatabase(username.toLowerCase(), password);

            // Go to login page
            sleep(2000);
            window.location = './';
          } else {
            setErrorMessage("Passwords do not match");
          }

        }
      } catch (e) {
        // print error message
        console.error("Error getting user document:", e);
  
        // display error message
        setErrorMessage("An error occurred. Please try again later.");
      }
    };
  
    return (
      <div className="signup-page">
        <h1 className="hangman-heading">Hangman</h1>
      <div className="form-container">
        <h1>Sign Up</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confPassword}
              onChange={handleconfPasswordChange}
            />
          </div>
          <div className="signup-cta">
          <button type="submit" className="signup-btn">Sign up</button>
          </div>
          <div className='links'>
            <a href="./">Login</a>
            <a href="./forgot">Forgot Password?</a>
          </div>
        </form>
      </div>
      </div>
    );
  }
  
  export default Signup;