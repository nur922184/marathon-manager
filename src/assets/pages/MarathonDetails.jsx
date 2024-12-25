import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Loading from "../components/Loading";

const MarathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marathon, setMarathon] = useState(null);

  useEffect(() => {
    fetch(`https://asserment-eleven-server.vercel.app/marathons/${id}`) // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setMarathon(data))
      .catch((error) => console.error("Error loading details:", error));
  }, [id]);

  if (!marathon)
    return (
      <Loading></Loading>
    );

  const currentDate = new Date();
  const startRegistrationDate = new Date(marathon.startRegistrationDate);
  const endRegistrationDate = new Date(marathon.endRegistrationDate);

  // Calculate time left until registration ends
  const timeUntilRegistrationEnds = Math.max(
    (endRegistrationDate - currentDate) / 1000, // সেকেন্ডে সময় গণনা
    0 // নেগেটিভ সময় এড়ানোর জন্য
  );

  // Check if registration is open
  const isRegistrationOpen =
    currentDate >= startRegistrationDate && currentDate <= endRegistrationDate;

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
          Registration Dates: {startRegistrationDate.toLocaleDateString()} -{" "}
          {endRegistrationDate.toLocaleDateString()}
        </p>

        {/* Countdown Timer */}
        <div className="my-6 flex justify-center">
          <CountdownCircleTimer
            isPlaying
            duration={timeUntilRegistrationEnds} // রেজিস্ট্রেশন শেষ হওয়ার সময়
            colors={[
              ["#004777", 0.33],
              ["#F7B801", 0.33],
              ["#A30000", 0.33],
            ]}
            size={120}
            onComplete={() => {
              console.log("Countdown completed");
              return { shouldRepeat: false };
            }}
          >
            {({ remainingTime }) => {
              const days = Math.floor(remainingTime / (60 * 60 * 24));
              const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
              const minutes = Math.floor((remainingTime % (60 * 60)) / 60);

              return (
                <div className="text-center">
                  <div className="text-lg font-bold">{days}d</div>
                  <div className="text-sm">
                    {hours}h {minutes}m
                  </div>
                </div>
              );
            }}
          </CountdownCircleTimer>
        </div>

        {/* Register Button */}
        <button
          className={`mt-4 py-2 px-4 rounded ${
            isRegistrationOpen
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          onClick={() => isRegistrationOpen && navigate(`/registers/${id}`)}
          disabled={!isRegistrationOpen}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default MarathonDetails;
