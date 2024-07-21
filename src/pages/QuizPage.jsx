import React, { useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import Quiz from '../components/Quiz';

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      // Cleanup function to delete local storage items
      localStorage.removeItem(`results-${id}`);
      localStorage.removeItem('examStartTime');
      localStorage.removeItem('examExpiryTime');
    };
  }, [id, navigate]);

  if (!id || isNaN(parseInt(id))) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      {/* <Link to={`/`}> Home</Link> */}

      <Quiz quizId={id} />
    </div>
  );
};

export default QuizPage;