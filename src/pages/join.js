import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import "./index.css";


const maxGuesses = 6;

function JoinScreen()  {
    //Decryption the string
    const {Base64} = require('js-base64');
    const {encodedCiphertext} = useParams()
    const decrypted = Base64.decode(encodedCiphertext)
 
    const words = [decrypted]

    const [word, setWord] = useState(decrypted);
    const [guesses, setGuesses] = useState(new Set());
    const [correct, setCorrect] = useState(new Set());
    const [remainingGuesses, setRemainingGuesses] = useState(maxGuesses);
    const [remainingChars, setRemainingChars] = useState(new Set(decrypted).size);


  
    function displayWord() {
      let display = "";
      for (const letter of word) {
        if (correct.has(letter)) {
          display += letter;
        } else {
          display += "_";
        }
        display += " ";
      }
      return <div className="display-word">{display}</div>;
    }
    // This function displays the letters that have already been guessed during gameplay
    function displayGuesses() {
      let display = "Guesses: ";
      for (const letter of guesses) {
        display += letter;
        display += " ";
      }
      return <div className="display-guess">{display}</div>;
    }
  
    // This useEffect hook checks if the game is over after every guess
    useEffect(() => {
      function calculateScore( remainingChars, remainingGuesses) {
        if (remainingChars === 0) { //win
          return remainingGuesses * 10 + 100;
        } else { //lose
          return Math.floor((1 - remainingChars / word.length) * 70); // partial credit for wrong guesses
      }
    
      }
      console.log('remainingChars = ', remainingChars)
      if (remainingGuesses === 0) {
        const score = calculateScore(remainingChars, remainingGuesses);
        alert("Game over! The word was " + word + " You gained " + score + ' points!');
      } else if (correct.size !== 0 && remainingChars === 0 ) {
        const score = calculateScore(remainingChars, remainingGuesses);
        alert("You win! You gained " + score + ' points for this round');
  
      }
    }, [remainingGuesses, correct, word, remainingChars]);
  
    function guess(letter) {
      if (guesses.has(letter)) {
        alert("You already guessed that letter!");
        return;
      }
      const newGuesses = new Set(guesses);
      newGuesses.add(letter);
      setGuesses(newGuesses);
  
      if (word.includes(letter)) {
        setRemainingChars(remainingChars-1);
        const newCorrect = new Set(correct);
        newCorrect.add(letter);
        setCorrect(newCorrect);
      } else {
        setRemainingGuesses(remainingGuesses - 1);
      }
    }
    //this part render the virtual keyboard component
    function renderKeyboard() {
      const letters = "abcdefghijklmnopqrstuvwxyz".split("");
      return (
        <div className="keyword-btn-grp">
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => guess(letter)}
              disabled={guesses.has(letter)}
              className="keyword-btn"
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
      );
    }
    
  
    return (
      <div className="app-container">
        <h1 className="hangman-heading">Hangman</h1>
        {word && displayWord()}
        {displayGuesses()}
        {remainingGuesses > 0 && correct.size < word.length && (
          <div className="guess-letters">Guess a letter</div>
        )}
        {remainingGuesses > 0 && correct.size < word.length && (
          // <input type="text" onKeyDown={handleKeyDown} />
          renderKeyboard()
        )}

      </div>
    );
    
  
}

export default JoinScreen