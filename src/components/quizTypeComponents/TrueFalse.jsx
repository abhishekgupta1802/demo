import React, { useState, useEffect } from 'react';

const TrueFalse = ({ question, setResults, results, questionNo }) => {
  const [selectedOption, setSelectedOption] = useState('');
  
  useEffect(() => {
    if (results && results.questions && results.questions[questionNo]) {
      let answer = results.questions[questionNo].answer;
      setSelectedOption(answer);
    }
  }, [results, questionNo]);

  const calculatePoints = (selected) => {
    const isCorrect = selected === question.answer;
    return isCorrect ? question.positivePoint : question.negativePoint;
  };

  const isAnswerCorrect = (selected) => {
    const isCorrect = selected === question.answer;
    return isCorrect;
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setResults((prevResults) => {
      const newResult = {...prevResults};
      newResult.currentQuestionIndex = questionNo;
      newResult.questions[questionNo].attended = true;
      newResult.questions[questionNo].isAnswerCorrect = isAnswerCorrect(option);
      newResult.questions[questionNo].points = calculatePoints(option);
      newResult.questions[questionNo].answer = option;
      return {...newResult };
    });

  };

  return (
    <div className="quiz-options-container">
      {question.options.map((option, index) => (
        <div key={index} className="quiz-option">
          <input
            type="radio"
            id={`option-${index}`}
            name={question.id}
            value={option}
            checked={selectedOption.trim().toLowerCase() === option.trim().toLowerCase()}
            onChange={() => handleOptionChange(option)}
            className="quiz-option-input"
          />
          <label htmlFor={`option-${index}`} className="quiz-option-label ml-2">
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TrueFalse;
