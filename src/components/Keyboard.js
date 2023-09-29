import React from 'react';
import './Keyboard.css'

const Keyboard = ({ onClick }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="keyboard">
      {/* Creates a button for each letter */}
      {alphabet.map((letter) => (
        // If the button is pressed it will style itself and send the letter to App.js
        <button type="button" className='key-button' key={letter} onClick={(event) => {
          onClick(event, letter);
        }}>
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;