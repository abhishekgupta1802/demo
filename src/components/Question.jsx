import React, { useState, useEffect } from 'react';
import McqSingleCorrect from './quizTypeComponents/McqSingleCorrect';
import McqMultipleCorrect from './quizTypeComponents/McqMultipleCorrect';
import TrueFalse from './quizTypeComponents/TrueFalse';
import FillInTheBlanks from './quizTypeComponents/FillInTheBlanks';

const componentMap = {
  'mcq-single-correct': McqSingleCorrect,
  'mcq-multiple-correct': McqMultipleCorrect,
  'true-false': TrueFalse,
  'fill-in-the-blanks': FillInTheBlanks,
};

const Question = ({ question, handleUpdate ,results , setResults, questionNo }) => {

const QuizComponent = componentMap[question.quizType];

  return (
    <div>
      <h3>{question.text}</h3>
      <QuizComponent  
      question={question} 
      results={results} 
      setResults={setResults} 
      questionNo={questionNo} 
      handleUpdate={handleUpdate} 
      />
    </div>
  );
};

export default Question;
