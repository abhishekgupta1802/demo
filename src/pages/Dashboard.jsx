import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { increment } from '../redux/counter/counterSlice';

const questions = [
  {
    id: '1',
    text: 'What is 2 + 2?',
    options: ['3', '4', '5'],
    answer: '4',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '2',
    text: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris'],
    answer: 'Paris',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '3',
    text: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter'],
    answer: 'Mars',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '4',
    text: 'What is the largest mammal?',
    options: ['Elephant', 'Blue Whale', 'Giraffe'],
    answer: 'Blue Whale',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '5',
    text: 'What is the smallest prime number?',
    options: ['1', '2', '3'],
    answer: '2',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '6',
    text: 'Which element has the chemical symbol O?',
    options: ['Gold', 'Oxygen', 'Silver'],
    answer: 'Oxygen',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '7',
    text: 'Who wrote "Hamlet"?',
    options: ['Charles Dickens', 'Mark Twain', 'William Shakespeare'],
    answer: 'William Shakespeare',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '8',
    text: 'Which country is known as the Land of the Rising Sun?',
    options: ['China', 'Japan', 'South Korea'],
    answer: 'Japan',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '9',
    text: 'What is the boiling point of water?',
    options: ['90°C', '100°C', '110°C'],
    answer: '100°C',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '10',
    text: 'Which organ in the human body is responsible for pumping blood?',
    options: ['Lungs', 'Heart', 'Liver'],
    answer: 'Heart',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '11',
    text: 'What is the capital of Italy?',
    options: ['Rome', 'Milan', 'Venice'],
    answer: 'Rome',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '12',
    text: 'What is the largest continent?',
    options: ['Africa', 'Asia', 'Europe'],
    answer: 'Asia',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '13',
    text: 'Which gas do plants absorb from the atmosphere?',
    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide'],
    answer: 'Carbon Dioxide',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '14',
    text: 'Who is the author of "Pride and Prejudice"?',
    options: ['Jane Austen', 'Emily Brontë', 'George Eliot'],
    answer: 'Jane Austen',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '15',
    text: 'What is the tallest mountain in the world?',
    options: ['K2', 'Mount Everest', 'Kangchenjunga'],
    answer: 'Mount Everest',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '16',
    text: 'What is the main ingredient in guacamole?',
    options: ['Tomato', 'Avocado', 'Onion'],
    answer: 'Avocado',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '17',
    text: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Mercury', 'Earth'],
    answer: 'Mercury',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '18',
    text: 'What is the chemical symbol for gold?',
    options: ['Au', 'Ag', 'Pb'],
    answer: 'Au',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '19',
    text: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso'],
    answer: 'Leonardo da Vinci',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '20',
    text: 'Which country is home to the kangaroo?',
    options: ['South Africa', 'India', 'Australia'],
    answer: 'Australia',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '21',
    text: 'What is the speed of light?',
    options: ['300,000 km/s', '150,000 km/s', '450,000 km/s'],
    answer: '300,000 km/s',
    positivePoint: 1,
    negativePoint: 0,
  },
  {
    id: '22',
    text: 'Which ocean is the largest?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean'],
    answer: 'Pacific Ocean',
    positivePoint: 1,
    negativePoint: 0,
  },
];

const Timer = ({ initialMinutes = 0, initialSeconds = 0, onTimeUp }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes === 0) {
          clearInterval(timer);
          onTimeUp();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <div className="text-xl font-semibold">
      {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
    </div>
  );
};

const Question = ({ question, selectedOption, handleOptionChange }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-semibold mb-4">{question.text}</h3>
      <ul>
        {question.options.map((option, index) => (
          <li key={index} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
                className="mr-2"
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const QuestionNavigation = ({ totalQuestions, currentQuestion, navigateToQuestion }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: totalQuestions }, (_, index) => (
        <button
          key={index}
          onClick={() => navigateToQuestion(index)}
          className={`p-2 rounded-lg ${currentQuestion === index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const dispatch = useDispatch();

  const handleOptionChange = (option) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion]: option,
    });
  };

  const navigateToQuestion = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleTimeUp = () => {
    alert('Time is up!');
  };

  return ( 
    <div className="container mx-auto p-4 min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4 text-center mb-4">
        <h1 className="text-2xl font-bold">Examination Panel</h1>
      </header>
      <div className="flex justify-between items-center mb-4">
        <Timer initialMinutes={10} initialSeconds={0} onTimeUp={handleTimeUp} />
        <QuestionNavigation
          totalQuestions={questions.length}
          currentQuestion={currentQuestion}
          navigateToQuestion={navigateToQuestion}
        />
      </div>
      <Question
        question={questions[currentQuestion]}
        selectedOption={selectedOptions[currentQuestion]}
        handleOptionChange={handleOptionChange}
      />
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-300 rounded-lg"
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          disabled={currentQuestion === questions.length - 1}
        >
          Next
        </button>
      </div>
      <button onClick={() => dispatch(increment())}>+</button>

    </div>
  );
};

export default Dashboard;
