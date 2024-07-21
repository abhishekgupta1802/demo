import React from 'react';
import '../styles/ResultStyles.css';

const Result = ({ results,questions }) => {
  const totalQuestions = results.questions.length;
  const attendedQuestions = results.questions.filter(q => q.attended).length;
  const notAttendedQuestions = totalQuestions - attendedQuestions;
  const correctAnswers = results.questions.filter(q => q.isAnswerCorrect).length;
  const wrongAnswers = attendedQuestions - correctAnswers;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold border-b pb-4">Quiz Results Summary</h3>
      <div className="grid grid-cols-2 gap-4 my-4">
        <p>Total Questions: <span className="font-semibold">{totalQuestions}</span></p>
        <p>Questions Attended: <span className="font-semibold">{attendedQuestions}</span></p>
        <p>Questions Not Attended: <span className="font-semibold">{notAttendedQuestions}</span></p>
        <p>Correct Answers: <span className="font-semibold">{correctAnswers}</span></p>
        <p>Wrong Answers: <span className="font-semibold">{wrongAnswers}</span></p>
        <p>Correct Answers Percentage: <span className="font-semibold">{(correctAnswers / totalQuestions * 100).toFixed(2)}%</span></p>
        <p>Wrong Answers Percentage: <span className="font-semibold">{(wrongAnswers / totalQuestions * 100).toFixed(2)}%</span></p>
        <p>Questions Attended Percentage: <span className="font-semibold">{(attendedQuestions / totalQuestions * 100).toFixed(2)}%</span></p>
        <p>Questions Not Attended Percentage: <span className="font-semibold">{(notAttendedQuestions / totalQuestions * 100).toFixed(2)}%</span></p>
      </div>
      
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="border-b">
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Q. No
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Question
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Attended
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Right/Wrong
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                My Answer
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Correct Answer
              </th>
            </tr>
          </thead>
          <tbody>
            {results.questions.map((result, index) => (
              <tr key={index} className="border-b">
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  Q{index + 1}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {questions[index].text}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {result.attended ? 'Attended' : 'Not Attended'}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {result.attended ? (result.isAnswerCorrect ? 'Right' : 'Wrong') : '-'}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {result.attended ? (Array.isArray(result.answer) ? result.answer.join(', ') : result.answer) : '-'}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {Array.isArray(questions[index].answer) ? questions[index].answer.join(', ') : questions[index].answer}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;