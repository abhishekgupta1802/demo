import React, { createContext, useState, useEffect } from 'react';
import questions from '../data/questions.json';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    setQuizzes(questions.quizzes);
    // console.log("From QuizContext",questions);
  }, []);

  return (
    <QuizContext.Provider value={{ quizzes }}>
      {children}
    </QuizContext.Provider>
  );
};
