import React, { Component, useState } from 'react';
import './App.css';
import Hangman from './components/Hangman';
import WordDisplay from './components/WordDisplay';
import Keyboard from './components/Keyboard';
import RestartButton from './components/RestartButton';
import Instructions from './components/Instructions';


class App extends Component {
  constructor() {
    super();
    // Initialize the state for the game
    this.state = {
      word: '',
      guessedLetters: [],
      incorrectGuesses: 0,
      dictionary: [],
      gameStatus: 'ongoing', // 'ongoing', 'won', or 'lost'
    };
  }

  componentDidMount() {
    // Load the dictionary data from an external text file
    this.loadDictionary();
  }

  // Load the dictionary data from the text file
  async loadDictionary() {
    try {
      // Fetch the dictionary text file
      const dictionaryResponse = await fetch(`${process.env.PUBLIC_URL}/data/dictionary.txt`);
      const dictionaryText = await dictionaryResponse.text();

      // Split the text into an array of words, filtering out empty lines
      const dictionaryArray = dictionaryText.split('\n').map((word) => word.trim());
      this.dictionary = dictionaryArray.filter((word) => word !== '');

      // Check if the dictionary is empty
      if (this.dictionary.length === 0) {
        console.error('Dictionary is empty.');
      }

      // Starts the game
      this.startGame();
    }
    catch (error) {
      console.error('Error loading dictionary:', error);
    }
  }

  // Start a new game
  startGame() {
    const word = this.getRandomWord();
    this.setState({
      word,
      guessedLetters: [],
      incorrectGuesses: 0,
      dictionary: [],
      gameStatus: 'ongoing',
    });
  }

  // Generate a random word from the dictionary
  getRandomWord() {
    const randomIndex = Math.floor(Math.random() * this.dictionary.length);
    return this.dictionary[randomIndex].toUpperCase();
  }

  // Checks if the guessed letters match the given word
  checkGuess(guessedLetters) {
    const { word } = this.state;
    const guessedLettersStr = guessedLetters.join(',');

    return Array.prototype.every.call(word, function (c) {
      return guessedLettersStr.replace(',', '').indexOf(c) > -1;
    }, this);
  };

  // Handle user's letter guesses
  handleGuess = (event, letter) => {
    const { word, guessedLetters, incorrectGuesses, gameStatus } = this.state;


    // Don't allow guesses if the game is not ongoing
    if (gameStatus !== 'ongoing') {
      return;
    }

    if (!guessedLetters.includes(letter)) {
      const newGuessedLetters = [...guessedLetters, letter];

      if (!word.includes(letter)) {
        const newIncorrectGuesses = incorrectGuesses + 1;

        // Changing the letter button's class to show that it has been guessed wrong
        event.currentTarget.classList.add('incorrect-letter');

        if (newIncorrectGuesses >= 11) {
          // Player lost the game
          this.setState({
            incorrectGuesses: newIncorrectGuesses,
            gameStatus: 'lost',
          });
        }
        else {
          // Update guessed letters and incorrect guesses
          this.setState({
            guessedLetters: newGuessedLetters,
            incorrectGuesses: newIncorrectGuesses,
          });
        }
      }
      else {
        // Changing the letter button's class to show that it has been guessed right
        event.currentTarget.classList.add('correct-letter');

        // Update guessed letters
        this.setState({ guessedLetters: newGuessedLetters });
      }
      
      if (this.checkGuess(newGuessedLetters)) {
        // Player won the game if all letters in the word have been guessed
        this.setState({ gameStatus: 'won' });
      }
    }
  };

  // Restart the game
  restartGame = () => {
    window.location.reload();
  };

  render() {
    const { word, guessedLetters, incorrectGuesses, gameStatus } = this.state;

    // Define the message to display based on the game status
    let message;
    if (gameStatus === 'won') {
      message = 'Congratulations! You won!';
    }
    else if (gameStatus === 'lost') {
      message = 'Sorry, you lost. The word was: ' + word;
    }

    return (
      <div className="App">
        <h1>Hangman Game</h1>
        {gameStatus === 'ongoing' && <Hangman incorrectGuesses={incorrectGuesses} />}
        {gameStatus !== 'ongoing' && <p>{message}</p>}

        <WordDisplay word={word} guessedLetters={guessedLetters} />

        {/* Displays the total amount of guesses left */}
        <a>{12 - (this.state.incorrectGuesses + 1)} guess{12 - (this.state.incorrectGuesses + 1) == 1 ? '' : 'es'} left.</a>
        <Keyboard onClick={this.handleGuess} />
        <RestartButton onClick={this.restartGame} />
        <Instructions/>
      </div>
    );
  }
}

export default App;
