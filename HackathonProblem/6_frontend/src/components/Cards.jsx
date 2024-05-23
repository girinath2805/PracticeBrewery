import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import {SiReactos} from 'react-icons/si'

function Cards({ category, onFlip }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    setIsFlipped((prevIsFlipped) => !prevIsFlipped);

    if (!isFlipped) {
      // Pass the category name to the onFlip function when the card is flipped
      onFlip(category.name);
    }
  };

  return (
    <div className='m-4'>
      
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className='flex md:h-123 h-456 md:w-123 w-456 bg-[#fff] items-center justify-center' onClick={handleClick}>
          {/* Add the fire element here */}
         <SiReactos fontSize={70}/>
        </div>

        <div className='flex md:h-123 h-456 md:w-123 w-456 bg-[#fff] text-center justify-center items-center my-auto' onClick={handleClick}>
          {/* Your Back Component */}
          <h2>{category.name}</h2>
          <button></button>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default Cards;
