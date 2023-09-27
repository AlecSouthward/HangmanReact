import React from 'react';

const RestartButton = ({ onClick }) => {
  return (
    <div className="RestartButton">
      {/* Render a button with an onClick event handler */}
      <button onClick={onClick}>Restart Game</button>
    </div>
  );
};

export default RestartButton;
