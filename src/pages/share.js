import React, { useState } from 'react'
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';
import { Link } from "react-router-dom";
import { generatePath } from 'react-router-dom';
import "./index.css";

function ShareScreen()  {
    //Encryption setup
    const {Base64} = require('js-base64');

    
    const [input, setInput] = useState("")
    const [hashcode, setHashcode] = useState("")

    
    const generateLink = () => {
        // const ciphertext = CryptoJS.AES.encrypt(input, key, { iv }).toString();
        const encodedCiphertext = Base64.encode(input)
        setHashcode(generatePath('/join/:encodedCiphertext', { encodedCiphertext }))
        console.log(generatePath('/join/:encodedCiphertext', { encodedCiphertext }))    
        console.log(encodedCiphertext)
    
    } 
  return (
    <div>
        <input value={input} onChange={event => {setInput(event.target.value)}}/>
        <button type='submit' onClick={generateLink}>submit</button>
        <p></p>
        <Link to={hashcode}>share this link</Link>
    </div>
  )
}

export default ShareScreen