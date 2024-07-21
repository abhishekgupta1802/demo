import React, { useState, useEffect } from 'react';

const FillInTheBlanks = ({  question, setResults ,results, questionNo }) => {
  const [userInput, setUserInput] = useState('');
  
  useEffect(() => {
    if (results && results.questions && results.questions[questionNo]) {
      let answer = results.questions[questionNo].answer;
      setUserInput(answer);
    }
  }, [questionNo,results]);


  // Function to calculate points based on correct or incorrect answers
  const calculatePoints = (input) => {
    const isCorrect = input.trim().toLowerCase() === question.answer.trim().toLowerCase();
    return isCorrect ? question.positivePoint : question.negativePoint;
  };

  const isAnswerCorrect = (input) =>{
    const isCorrect = input.trim().toLowerCase() === question.answer.trim().toLowerCase();
    return isCorrect;
  };

  // Handle input change and update the results
  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    setResults((prevResults) => {
      const newResult = {...prevResults};
      newResult.currentQuestionIndex = questionNo;
      newResult.questions[questionNo].attended = true;
      newResult.questions[questionNo].isAnswerCorrect = isAnswerCorrect(input);
      newResult.questions[questionNo].points = calculatePoints(input);
      newResult.questions[questionNo].answer = input;
      return {...newResult };
    });
  };

  return (
    <div className="quiz-options-container mt-2">
      <label htmlFor="userInput" className="quiz-option-label ml-2">Your Answer:</label>
      <input
        id="userInput"
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Type your answer here..."
        className="w-full p-2.5 m-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
      />
    </div>
  );
};

export default FillInTheBlanks;
