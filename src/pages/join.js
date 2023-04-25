import React from 'react'
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
function JoinScreen()  {
    //Decryption setup
    const key = CryptoJS.enc.Hex.parse('0123456789ABCDEF0123456789ABCDEF');
    const iv = CryptoJS.enc.Hex.parse('0123456789ABCDEF');


    const {ciphertext} = useParams()
    const bytes = CryptoJS.AES.decrypt(ciphertext, key, { iv });
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    
  return (
    <div>the word is "{decrypted}"</div>
  )
}

export default JoinScreen