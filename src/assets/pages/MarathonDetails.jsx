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
        <div 
         style={{
          backgroundImage: `url(${marathon.image })`,
        }}
        className="bg-sky-700 rounded-2xl shadow-sm shadow-sky-500 outline outline-slate-400 -outline-offset-8">
          <div className="group overflow-hidden relative after:duration-500 before:duration-500  duration-500 hover:after:duration-500 hover:after:translate-x-24 hover:before:translate-y-12 hover:before:-translate-x-32 hover:duration-500 after:absolute after:w-24 after:h-24 after:bg-sky-700 after:rounded-full  after:blur-xl after:bottom-32 after:right-16 after:w-12 after:h-12  before:absolute before:w-20 before:h-20 before:bg-sky-400 before:rounded-full  before:blur-xl before:top-20 before:right-16 before:w-12 before:h-12  hover:rotate-12 flex justify-center items-center h-96 w-full  bg-neutral-900 rounded-2xl outline outline-slate-400 -outline-offset-8">
            <img
              src={marathon.image || "https://via.placeholder.com/600x400"}
              alt={marathon.title}
              className="w-full h-full rounded-lg mb-4"
            />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 mt-6">{marathon.title}</h2>
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
          className={`mt-4 py-2 px-4 rounded ${isRegistrationOpen
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
