import React, { useState } from 'react';
import {client} from '../client'
function NameInput({ onSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit function with the entered name
    onSubmit(name);
  };
  const doc = {
    _id: name,
    _type: 'quizScores',
    playerName : name

  }
  client.createIfNotExists(doc)
    

  return (
    <div className="name-input">
      <h2>Enter Your Name</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Start</button>
      </form>
    </div>
  );
}

export default NameInput;
