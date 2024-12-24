import React, { useEffect, useState } from "react";

const UpcomingMarathons = () => {
    const [marathons, setMarathons] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch("http://localhost:5000/upcoming")
            .then((response) => response.json())
            .then((data) => setMarathons(data))
            .catch((error) => console.error("Error fetching marathons:", error));
    }, []);

    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6">Upcoming Marathons</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Dynamic Marathon Cards */}
                    {marathons.map((marathon) => (
                        <div
                            key={marathon._id}
                            className="border rounded-lg overflow-hidden shadow-lg bg-white flex flex-col"
                        >
                            <img
                                src={marathon.image}
                                alt={marathon.title}
                                className="w-full"
                            />
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold">{marathon.title}</h3>
                                <p className="text-gray-600">Location: {marathon.location}</p>
                                <p className="text-gray-600">Date: {new Date(marathon.startDate).toLocaleDateString()}</p>
                                <div className="mt-auto">
                                    <button className="btn btn-secondary w-full">Learn More</button>
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
