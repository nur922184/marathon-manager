import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MarathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marathon, setMarathon] = useState(null);

  useEffect(() => {
    fetch(`https://asserment-eleven-server.vercel.app/marathons/${id}`) // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setMarathon(data))
      .catch((error) => console.error('Error loading details:', error));
  }, [id]);

  if (!marathon) return <div className="flex flex-col justify-center items-center h-screen">
    <span className="loading loading-bars loading-lg"></span>
    <h2 className="text-center text-2xl font-bold py-2">Loading...</h2>
  </div>

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <img
          src={marathon.image || "https://via.placeholder.com/600x400"}
          alt={marathon.title}
          className="w-full rounded-lg mb-4"
        />
        <h2 className="text-3xl font-bold mb-4">{marathon.title}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Location:</strong> {marathon.location}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Description:</strong> {marathon.description}
        </p>
        <p className="text-gray-600">
          Registration Dates: {new Date(marathon.startRegistrationDate).toLocaleDateString()} -{" "}
          {new Date(marathon.endRegistrationDate).toLocaleDateString()}
        </p>

        <button
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={() => navigate(`/registers/${id}`)}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default MarathonDetails;
