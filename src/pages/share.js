import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { generatePath } from 'react-router-dom';
import "./styles/index.css";

function ShareScreen()  {
    //Encryption setup
    const {Base64} = require('js-base64');

    
    const [input, setInput] = useState("")
    const [hashcode, setHashcode] = useState("")

    
    const generateLink = () => {
      if(input == "")
        return;

        const shareLink = document.querySelector('.hide-element');
        if(shareLink != null)
          shareLink.classList.toggle('hide-element');
        // const ciphertext = CryptoJS.AES.encrypt(input, key, { iv }).toString();
        const encodedCiphertext = Base64.encode(input.toLowerCase())
        setHashcode(generatePath('/join/:encodedCiphertext', { encodedCiphertext }))
        console.log(generatePath('/join/:encodedCiphertext', { encodedCiphertext }))    
        console.log(encodedCiphertext)
    
    } 
  return (
    <div className='share-container'>
      <h1 className='share-title'>Create your own!</h1>
        <input value={input} onChange={event => {setInput(event.target.value)}}/>
        <div className='space-btn'>
          <button className='share-btn' type='submit' onClick={generateLink}>submit</button>
        </div>
        <div className='share-box hide-element'>
          <Link className='share-link ' to={hashcode} style={{ textDecoration: 'none' }} >https://hang-man-three.vercel.app/{hashcode}</Link>
        </div>
    </div>
  )
}

export default ShareScreen