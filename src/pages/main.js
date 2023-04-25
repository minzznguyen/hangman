import React, { useState } from "react";
import { Link } from "react-router-dom";

const words = [
  "apple",
  "banana",
  "orange",
  "strawberry",
  "blueberry",
  "raspberry",
];

const maxGuesses = 6;

function MainScreen() {
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState(new Set());
  const [correct, setCorrect] = useState(new Set());
  const [remainingGuesses, setRemainingGuesses] = useState(maxGuesses);

  function newGame() {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setWord(newWord);
    setGuesses(new Set());
    setCorrect(new Set());
    setRemainingGuesses(maxGuesses);
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
    return <div>{display}</div>;
  }

  function displayGuesses() {
    let display = "Guesses: ";
    for (const letter of guesses) {
      display += letter;
      display += " ";
    }
    return <div>{display}</div>;
  }

  function checkGameOver() {
    console.log(remainingGuesses, 'in checkGameOver')
    if (remainingGuesses === 0) {
      alert("Game over! The word was " + word);
      newGame();
    } else if (correct.size === word.length) {
      alert("You win!");
      newGame();
    }
  }

  function guess(letter) {
    if (guesses.has(letter)) {
      alert("You already guessed that letter!");
      return;
    }
    const newGuesses = new Set(guesses);
    newGuesses.add(letter);
    setGuesses(newGuesses);

    if (word.includes(letter)) {
      const newCorrect = new Set(correct);
      newCorrect.add(letter);
      setCorrect(newCorrect);
    } else {
      setRemainingGuesses(remainingGuesses - 1);
    }
    console.log(remainingGuesses)
    checkGameOver();
  }

  function handleKeyDown(event) {
    console.log('keyPress')
    const letter = event.key.toLowerCase();
    if (letter.match(/[a-z]/)) {
      guess(letter);
    }
  }
  
  function renderKeyboard() {
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    return (
      <div>
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => guess(letter)}
            disabled={guesses.has(letter)}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>Hangman</h1>
      {word && displayWord()}
      {displayGuesses()}
      {remainingGuesses > 0 && correct.size < word.length && (
        <div>Guess a letter:</div>
      )}
      {remainingGuesses > 0 && correct.size < word.length && (
        // <input type="text" onKeyDown={handleKeyDown} />
        renderKeyboard()
      )}
      {true && (
        <button onClick={newGame}>New Game</button>
      )}
    </div>
  );
}

export default MainScreen;

