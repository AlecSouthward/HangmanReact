import React from 'react';

// Define hangman images based on the number of incorrect guesses
const hangman1 = `${process.env.PUBLIC_URL}/data/hangman-drawings/state1.png`;
const hangman2 = `${process.env.PUBLIC_URL}/data/hangman-drawings/state2.png`;
const hangman3 = `${process.env.PUBLIC_URL}/data/hangman-drawings/state3.png`;
const hangman4 = `${process.env.PUBLIC_URL}/data/hangman-drawings/state4.png`;
const hangman5 = `${process.env.PUBLIC_URL}/data/hangman-drawings/state5.png`;
const hangman6 = `${process.env.PUBLIC_URL}/data/hangman-drawings/state6.png`;
const hangman7 = `${process.env.PUBLIC_URL}/data/hangman-drawings/state7.png`;
const hangman8 = `${process.env.PUBLIC_URL}/data/hangman-drawings/state8.png`;
const hangman9 = `${process.env.PUBLIC_URL}/data/hangman-drawings/state9.png`;
const hangman10 = `${process.env.PUBLIC_URL}/data/hangman-drawings/state10.png`;
const hangman11 = `${process.env.PUBLIC_URL}/data/hangman-drawings/state11.png`;


const Hangman = ({ incorrectGuesses }) => {
    // Select the hangman image to display based on the number of incorrect guesses
    const getImageSource = (incorrectGuesses) => {
        const imageIndex = Math.min(incorrectGuesses, 10); // Limit to 11 images
        const images = [hangman1, hangman2, hangman3, hangman4, hangman5,
            hangman6, hangman7, hangman8, hangman9, hangman10, hangman11];
        
        return images[imageIndex];
    };  
    
    const imageSrc = getImageSource(incorrectGuesses);
    
    return (
        <div className="Hangman">
            {/* Display the hangman image */}
            <img src={imageSrc} alt={`Hangman`} />
        </div>
    );
};

export default Hangman;