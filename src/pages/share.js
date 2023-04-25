import React, { useState } from 'react'
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';
import { Link } from "react-router-dom";
import { generatePath } from 'react-router-dom';

function ShareScreen()  {
    //Encryption setup
    const key = CryptoJS.enc.Hex.parse('0123456789ABCDEF0123456789ABCDEF');
    const iv = CryptoJS.enc.Hex.parse('0123456789ABCDEF');
    
    const [input, setInput] = useState("")
    const [hashcode, setHashcode] = useState("")

    
    const generateLink = () => {
        const ciphertext = CryptoJS.AES.encrypt(input, key, { iv }).toString();
        setHashcode(generatePath('/join/:ciphertext', { ciphertext }))
        console.log(generatePath('/join/:ciphertext', { ciphertext }))        
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