import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/login/login'; // Adjust the import based on your file structure

const Header = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl">Online Examination App</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/dashboard" className="text-white">Dashboard</a>
          </li>
          <li>
            <button onClick={handleLogout} className="text-white">Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;