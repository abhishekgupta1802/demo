import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import { Link } from 'react-router-dom'; // Import Link

const QuizList = () => {
  const { quizzes } = useContext(QuizContext);
  return (
    <div className="p-4">
      {quizzes.map(quiz => (
        // Wrap each quiz title with a Link
        <Link to={`/quiz/${quiz.id}`} key={quiz.id} className="block mb-4">
          <div className="inline-block p-4 bg-green-700 shadow-md rounded-lg hover:bg-green-500 transition duration-300">
            {quiz.title} Start
          </div> 
        </Link>
      ))}
    </div>
  );
};

export default QuizList;