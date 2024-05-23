import React, { useState, useRef } from 'react';
import Cards from './Cards'; // Assuming 'Cards' is the component that displays category cards
import Quiz from './Quiz'; // Import the Quiz component
import NameInput from './NameInput';

function Mainpage() {
    const [categories] = useState([
        { name: 'Sports' },
        { name: 'Geography' },
        { name: 'Comics' },
        { name: 'Videogames' },
        { name: 'Mathematics' },
        { name: 'Animals' },
    ]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const quizContainerRef = useRef(null);


    // Function to handle the selection of a category to start a quiz
    const handleCategorySelect = async (categoryName) => {
        setSelectedCategory(categoryName);
        await fetchQuestions(categoryName);
        const pixelOffset = 100;

        // Scroll to the quiz container when a card is flipped
        if (quizContainerRef.current) {
            quizContainerRef.current.scrollIntoView({
                behavior: 'smooth', block: 'start', inline: 'nearest',offsetTop: -pixelOffset,
            });
        }
    };

    async function fetchQuestions(categoryName) {
        try {
            // Use a mapping of category names to API endpoints (adjust these URLs as needed)
            const apiUrls = {
                'Geography': 'https://opentdb.com/api.php?amount=10&category=22',
                'Sports': 'https://opentdb.com/api.php?amount=10&category=21',
                'Comics': 'https://opentdb.com/api.php?amount=10&category=29',
                'Videogames': 'https://opentdb.com/api.php?amount=10&category=15',
                'Mathematics': 'https://opentdb.com/api.php?amount=10&category=19',
                'Animals': 'https://opentdb.com/api.php?amount=10&category=27',
            };

            const response = await fetch(apiUrls[categoryName]);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // Update the state with the fetched questions
            setQuestions(data.results);
            console.log(questions)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to handle quiz completion

    // Function to reset the quiz and allow flipping the card again
    const handleTryAgain = () => {
        setSelectedCategory(null);
        window.location.reload()
        document.documentElement.scrollTop = 0
    };
    const [username, setUsername] = useState(null);

    // Function to handle the name submission
    const handleNameSubmit = (name) => {
      setUsername(name);
    };
    
    return (
        <div className='flex flex-col items-center justify-center background'>
            <div className='font-titleFont text-5xl text-titleColor flex justify-center p-7 text-center'>
                Q&A Gathering
            </div>
            <div className='text-3xl text-titleColor flex justify-center my-9'>Click one of the Cards</div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-10'>
                {categories.map((category, index) => (
                    <Cards
                        key={index}
                        category={category}
                        onFlip={() => handleCategorySelect(category.name)} // Pass the handleCategorySelect function without ref
                    />
                ))}
            </div>
            <div className='h-screen'></div>
            <div className='flex text-titleFont text-2xl justify-center text-center' ref={quizContainerRef}>
                {/* Render the Quiz component based on the selected category */}
                {selectedCategory && (
                    <Quiz categoryName={selectedCategory} questions={questions} onCompletion={handleTryAgain} />
                )}
            </div>

        </div>
    );
}

export default Mainpage;
