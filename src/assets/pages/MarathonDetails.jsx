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
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 dark:text-white p-6 rounded-lg shadow-lg">
        <div
          style={{
            backgroundImage: `url(${marathon.image})`,
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
        <p className="text-gray-700 dark:text-gray-400 mb-2">
          <strong>Location:</strong> {marathon.location}
        </p>
        <p className="text-gray-700 dark:text-gray-400 mb-4">
          <strong>Description:</strong> {marathon.description}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
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
            ? "card-button font-sans flex justify-center gap-2 items-center shadow-xl text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-1 overflow-hidden border-2 rounded-2xl group"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          onClick={() => isRegistrationOpen && navigate(`/registers/${id}`)}
          disabled={!isRegistrationOpen}
        >
          Register
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 19"
            class="w-8 h-8 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
          >
            <path
              class="fill-gray-800 group-hover:fill-gray-800"
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MarathonDetails;
