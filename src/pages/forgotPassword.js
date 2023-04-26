import React, { useState } from 'react';
import { doc, getDoc, collection, updateDoc } from 'firebase/firestore';
import { db } from "../services/firebase"; 
import "./styles/forms.css";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const changeUserPassword = async (username, password) => {
  const userRef = doc(collection(db, 'Players'), username);
  const userData = {
    password: password,
  };

  try {
    updateDoc(userRef, userData).then(() => {console.log(`Updated ${username}'s password`)});

} catch (error) {
    console.error(`Error editing user ${username}: ${error}`);
  }
};

function ForgotPassword() {
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
            const userData = docSnap.data();
  
          // If both passwords match
          if (confPassword === password) {
            // Show success message
            setErrorMessage("Account Password Change Successful");

            // Update the user's password
            await changeUserPassword(username.toLowerCase(), password);

            // Go to login page
            sleep(2000);
            window.location = './';
          } else {
            setErrorMessage("Passwords do not match");
          }
        } else {
          setErrorMessage("User does not exist")
        
        }
      } catch (e) {
        // print error message
        console.error("Error getting user document:", e);
  
        // display error message
        setErrorMessage("An error occurred. Please try again later.");
      }
    };
  
    return (
      <div className="form-container">
        <h1>Forgot Password</h1>
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
              placeholder="New Password"
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
          <button type="submit">Reset Password</button>
          <div className='links'>
            <a href="./">Login</a>
            <a href="./signup">Sign Up</a>
          </div>
        </form>
      </div>
    );
  }
  
  export default ForgotPassword;