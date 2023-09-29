import React from 'react';
import './WordDisplay.css'

const WordDisplay = ({ word, guessedLetters }) => {
  // Create a display word where guessed letters are shown, and others are replaced with underscores
  const displayWord = word
    .split('') // Split the word into an array of characters
    .map((letter) => (guessedLetters.includes(letter) ? letter : '_')) // Map each character to letter or underscore
    .join(' '); // Join the characters to form the display word with spaces

  return (
    <div className="display">
      {/* Render the display word */}
      <p>{displayWord}</p>
    </div>
  );
};

export default WordDisplay;
