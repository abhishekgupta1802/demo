import React, { useState, useEffect } from 'react';
import { QuizContext } from '../context/QuizContext';
import Question from './Question';
import Result from './Result'; // Import the Result component
import Timer from './Timer'; // Import the Timer component

const Quiz = ({ quizId }) => {
    // Function to load `currentQuestionIndex` from results localStorage 
    const loadCurrentQuestionIndex = () => {
      const savedResults = localStorage.getItem(`results-${quizId}`);
      return savedResults ? JSON.parse(savedResults).currentQuestionIndex : 0;
    };

    const loadResults = () => {
      const savedResults = localStorage.getItem(`results-${quizId}`);
      return savedResults ? JSON.parse(savedResults) 
                            : { 
                                currentQuizId: quizId, 
                                currentQuestionIndex: 0,
                                examStartTime: null,
                                examExpiryTime: null,
                                examSubmitType: "auto",
                                questions: []
                              };
    };

     const loadDuration = () => {
      const examDurationInSeconds = 30 * 60; // 30 minutes as an example
        // const examDurationInSeconds =  10; //10 seconds example
        const examStartTime = localStorage.getItem('examStartTime');
        const examExpiryTime = localStorage.getItem('examExpiryTime');
        
        if (!examStartTime || !examExpiryTime) {
          const currentTime = new Date().getTime();
          localStorage.setItem('examStartTime', new Date(currentTime).toISOString());
          localStorage.setItem('examExpiryTime', new Date(currentTime + examDurationInSeconds * 1000).toISOString());
          return examDurationInSeconds; 
        }
        
        const currentTime = new Date().getTime();
        const endTime = new Date(examExpiryTime).getTime();
        
        if (currentTime >= endTime) {
          return 0; // Return 0 seconds if current time is past the exam expiry time
        }
        
        return Math.floor((endTime - currentTime) / 1000); // Return remaining time in seconds
      };

     // Function to load results from localStorage
  const { quizzes } = React.useContext(QuizContext);
  const [results, setResults] = useState(loadResults());
  const [loading, setLoading] = useState(true); // Add a loading state
  const quiz = quizzes.find(q => q.id === quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(loadCurrentQuestionIndex()); // Track current question index
  const [showResults, setShowResults] = useState(false); // State to toggle results view
  const [duration, setDuration] = useState(loadDuration()); 

 // Update currentQuestionIndex in `results` whenever it changes
 useEffect(() => {
    const newResults = {...results};
    newResults.currentQuestionIndex = currentQuestionIndex;
    setResults(newResults);
  }, [currentQuestionIndex]);


  // Save results to localStorage whenever results change
  useEffect(() => {
    localStorage.setItem(`results-${quizId}`, JSON.stringify(results));
  }, [quizzes,results, quizId]);


  // Initialize default result for all questions when the Quiz page is first visited
  useEffect(() => {
    if (quiz !== undefined && results.questions !== undefined) {
      const newResult = {...results};
      quiz.questions.forEach((question, index) => {
        if (newResult.questions[index] === undefined || newResult.questions[index] === null) {
          newResult.questions[index] = {
            question_id: question.id,
            attended: false,
            quiz_type: question.quizType,
            points: 0,
            answer: '',
            isAnswerCorrect: null
          };
        }
      });

        newResult.examStartTime = localStorage.getItem('examStartTime');
        newResult.examExpiryTime = localStorage.getItem('examExpiryTime');
  
    setResults(newResult);
    }
  }, [quiz, results.questions]);


  const handleUpdate = (updatedQuestion) => {
    console.log('Updated Question:', updatedQuestion);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const updatedResults = {
      ...results,
      examSubmitType: "bySubmitButton"
    };
    setResults(updatedResults);
    setShowResults(true); // Show results after submission
  };


  useEffect(() => {
    if (quizzes.length > 0) {
      setLoading(false); // Set loading to false when quizzes are loaded
    }
  }, [quizzes]); // Depend on quizzes


  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is loading
  }

  if (showResults) {
    //delete results from localStorage
    localStorage.removeItem(`results-${quizId}`);
    localStorage.removeItem('examStartTime');
    localStorage.removeItem('examExpiryTime');
    return <Result results={results}  questions={quiz.questions} />; // Display results
  }


  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-center">{quiz.title}</h2>
      <Timer duration={duration} onTimeUp={() => setShowResults(true)} />
      <div className="flex justify-center space-x-4 my-4">
        {quiz.questions.map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${index === currentQuestionIndex ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`}
            onClick={() => setCurrentQuestionIndex(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <Question
        question={quiz.questions[currentQuestionIndex]}
        setResults={setResults}  
        results={results}  
        questionNo={currentQuestionIndex}  
        handleUpdate={handleUpdate}
      />
      <div className="flex justify-between mt-4">
        <button 
          className={`px-4 py-2 rounded text-white font-bold ${currentQuestionIndex > 0 ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          onClick={handlePrevious}
          disabled={currentQuestionIndex <= 0}
        >
          Previous
        </button>
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button 
            className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button 
            className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
