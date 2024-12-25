import React from 'react';
import { useNavigate } from 'react-router-dom';
import animation from '../Images/yalantis-interactive-404.gif'

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${animation})`,
      }}
      className="flex flex-col bg-cover bg-center items-center justify-center min-h-screen text-center">
      
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 mt-56 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
