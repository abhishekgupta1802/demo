import React from 'react';
import QuizList from '../components/QuizList';
import { Link } from 'react-router-dom';


const Home = () => (
  <div>
    <h1 className="text-4xl font-bold text-center text-gray-800 my-8">Welcome to the Online Examination App</h1>
    <QuizList />
    {/* <Link to="/dashboard">Dashboard</Link> */}
  </div>
);

export default Home;
