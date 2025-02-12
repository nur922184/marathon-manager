import React, { useEffect, useState } from "react";

const UpcomingMarathons = () => {
    const [marathons, setMarathons] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch("https://asserment-eleven-server.vercel.app/upcoming")
            .then((response) => response.json())
            .then((data) => setMarathons(data))
            .catch((error) => console.error("Error fetching marathons:", error));
    }, []);

    return (
        <section className="bg-gray-100 dark:bg-gray-800 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">Upcoming Marathons</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marathons.map((marathon) => (
                        <div
                            key={marathon._id}
                            className="border rounded-lg overflow-hidden shadow-lg bg-white dark:bg-slate-900 flex flex-col"
                        >
                            <img
                                src={marathon.image}
                                alt={marathon.title}
                                className="w-full h-48 sm:h-64 object-cover rounded-t-lg"
                            />
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="text-lg sm:text-xl font-bold mb-2">{marathon.title}</h3>
                                <p className="text-gray-600 mb-1">📍 Location: {marathon.location}</p>
                                <p className="text-gray-600">📅 Date: {new Date(marathon.startDate).toLocaleDateString()}</p>
                                <div className="mt-auto">
                                    <button
                                        class="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-gray-50 bg-orange-400 backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-1 overflow-hidden border-2 rounded-2xl group mt-7"
                                        type="submit"
                                    >
                                        Learn More
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingMarathons;
