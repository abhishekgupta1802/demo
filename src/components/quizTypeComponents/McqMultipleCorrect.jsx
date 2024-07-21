import React, { useState ,useEffect} from 'react';

const McqMultipleCorrect = ({  question, setResults ,results, questionNo }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  

  useEffect(() => {
    if (results && results.questions && results.questions[questionNo]) {
      let answer = results.questions[questionNo].answer;
      setSelectedOptions(answer);
    }
  }, [questionNo,results]);
  
  const calculatePoints = (selectedOptions) => {
    const correctAnswers = new Set(question.answer); 
    const userAnswers = new Set(selectedOptions);
    const isCorrect = correctAnswers.size === userAnswers.size && [...userAnswers].every(answer => correctAnswers.has(answer));
    return isCorrect ? question.positivePoint : question.negativePoint;
  };

  const isAnswerCorrect = (selectedOptions) => {
    const correctAnswers = new Set(question.answer); 
    const userAnswers = new Set(selectedOptions);
    const isCorrect = correctAnswers.size === userAnswers.size && [...userAnswers].every(answer => correctAnswers.has(answer));
    return isCorrect;
  };

  const handleOptionChange = (option) => {
    const updatedOptions = selectedOptions.includes(option)
                          ? selectedOptions.filter(opt => opt !== option) :  [...selectedOptions, option];
    setSelectedOptions(updatedOptions);

    setResults((prevResults) => {
      const newResult = {...prevResults};
      newResult.currentQuestionIndex = questionNo;
      newResult.questions[questionNo].attended = true;
      newResult.questions[questionNo].isAnswerCorrect = isAnswerCorrect(updatedOptions);
      newResult.questions[questionNo].points = calculatePoints(updatedOptions);
      newResult.questions[questionNo].answer = updatedOptions;
      return {...newResult };
    });

  };

  return (
    <div className="quiz-container">
      {question.options.map(option => (
        <div key={option} className="option-container">
          <input
            id={`option-${option}`}
            type="checkbox"
            className="option-checkbox"
            checked={selectedOptions.includes(option)}
            onChange={() => handleOptionChange(option)}
          />
          <label htmlFor={`option-${option}`} className="option-label ml-2">
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default McqMultipleCorrect;
