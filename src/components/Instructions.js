import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import './Instructions.css';

let instructionsText = '';

const Instructions = () => {
  const [toggleState, setToggle] = useState(false)

  // Fetch the content of the 'readme.md' file located in the public directory
  fetch(`${process.env.PUBLIC_URL}/data/readme.md`)
    .then((response) => response.text())
    .then((text) => {
      instructionsText = text; // Store the fetched text in the 'instructionsText' variable
    });

  return (
    <div>
      <button type='submit' className='instructions-button' onClick={() => setToggle(!toggleState)}>
        Toggle Instructions
      </button>

      {toggleState &&
        <div className="instructions">
        {/* Render the content of 'readme.md' as markdown */}
        <ReactMarkdown children={instructionsText} />
      </div>
      }
    </div>
  );
};

export default Instructions;
