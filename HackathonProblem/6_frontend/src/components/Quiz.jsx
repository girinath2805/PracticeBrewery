import React, { useState } from 'react';
import he from 'he';

function Quiz({ questions, categoryName, onCompletion }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);

  // Function to handle the user's answer for a question
  const handleAnswer = (answer) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedUserAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  // Display loading message while fetching questions
  if (!questions || questions.length === 0) {
    return <div>Loading...</div>;
  }

  // Display quiz questions and handle user's answers
  if (!showResults) {
    const currentQuestion = questions[currentQuestionIndex];
    const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5);

    return (
      <div className='text-2xl text-titleColor flex flex-col text-center items-center gap-5 pb-7'>
        <h2>Category: {categoryName}</h2>
        <h2>Question {currentQuestionIndex + 1}</h2>
        <p className='font-question md:text-3xl text-2xl'>{he.decode(currentQuestion.question)}</p>
        <div className='flex flex-col items-start font-answer gap-5'>
          {answers.map((answer, index) => (
            <label key={index}>
              <input
                className='cursor-pointer mx-4'
                type="radio"
                name={`answer-${currentQuestionIndex}`} // Use a unique name for each question
                value={answer}
                checked={userAnswers[currentQuestionIndex] === answer}
                onChange={() => handleAnswer(answer)}
              />
              {he.decode(answer)}
            </label>
          ))}
        </div>
        <button onClick={() => handleAnswer('')} className="mt-2 h-full mx-5 px-5 py-2 rounded-2xl bg-[#3A057F]">
          Skip
        </button>
      </div>
    );
  }

  // Display quiz results
  return (
    <div className='text-titleColor flex justify-center flex-col items-center'>
      <h2 className='py-6'>Quiz Results</h2>
      {questions.map((question, index) => (
        <div key={index} className='py-3'>
          <p className='py-5 font-question'>{index + 1} . {he.decode(question.question)}</p>
          <div className='flex flex-row gap-5 justify-center items-center mx-10 pb-2 font-answer'>
            <p>Correct Answer: {he.decode(question.correct_answer)}</p>
            <p>|</p>
            <p>Your Answer: {he.decode(userAnswers[index])}</p>
          </div>
        </div>
      ))}
      <button onClick={onCompletion} className="mt-2 h-full mx-5 px-5 py-2 rounded-2xl bg-[#3A057F]">
          Try again
        </button>
    </div>
  );
}

export default Quiz;
