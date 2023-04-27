import React, { useEffect, useState } from "react";
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from "../services/firebase"; 
import "./index.css";

const wordRef = collection(db, 'Words');

// Arrays of words for games grouped by difficulty
let easyWords = [];
let mediumWords = [];
let hardWords = [];

// Total games played in the current session
let gamesPlayed = 0;

// Generate the indexes used for each difficulty (0 -> max)
function generateUniqueIndexes(max) {
  let numbers = new Set();
  
  while (numbers.size < 5) {
    let num = Math.floor(Math.random() * (max + 1));
    numbers.add(num);
  }
  
  return Array.from(numbers);
}

// Get the words for each difficulty level
function generateWordArrays() {
  getDocs(wordRef).then((querySnapshot) => {
    console.log('------------------------------------');
    querySnapshot.forEach((doc) => {
      
      // 0 - 19 => 20 words total for each difficulty level
      generateUniqueIndexes(19).forEach((item) => {

        easyWords.push(doc.data().easy[item]);
        mediumWords.push(doc.data().medium[item]);
        hardWords.push(doc.data().hard[item]);

      })
      //TODO: should remove this after debugging (displays all possible words)
      console.log("Easy:  ");
      console.log(easyWords);
      console.log("Medium:  ");
      console.log(mediumWords);
      console.log("hard:  ");
      console.log(hardWords);
      console.log('------------------------------------');
    });
  });
}
generateWordArrays();


//TODO: Add a selection function for the difficulty
// Assign the appropriate array based on the aforementioned
const words = easyWords;

// Total number of guesses
const maxGuesses = 6;

function MainScreen() {
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState(new Set());
  const [correct, setCorrect] = useState(new Set());
  const [remainingGuesses, setRemainingGuesses] = useState(maxGuesses);
  const [remainingChars, setRemainingChars] = useState(0);

  // This function sets the initial state of the game to start a new round
  function newGame() {
    const newWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
    console.log('For testing purposes, answer is ', newWord)     //TODO: delete this

    setWord(newWord);
    setGuesses(new Set());
    setCorrect(new Set());
    setRemainingGuesses(maxGuesses);
    setRemainingChars(new Set(newWord).size);
  }

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
    console.log('remainingChars = ', remainingChars)
    if (remainingGuesses === 0) {
      const score = calculateScore(remainingChars, remainingGuesses);
      alert("Game over! The word was " + word + " You gained " + score + ' points!');
      newGame();
    } else if (correct.size !== 0 && remainingChars === 0 ) {
      const score = calculateScore(remainingChars, remainingGuesses);
      alert("You win! You gained " + score + ' points for this round');

      newGame();
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
  function calculateScore( remainingChars, remainingGuesses) {
    if (remainingChars === 0) { //win
      return remainingGuesses * 10 + 100;
    } else { //lose
      return Math.floor((1 - remainingChars / word.length) * 70); // partial credit for wrong guesses
  }

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
      {true && (
        <button onClick={newGame} className="new-game-btn">New Game</button>
      )}
    </div>
  );
}

export default MainScreen;

