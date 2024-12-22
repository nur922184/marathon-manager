import React, { useEffect, useState } from "react";

const Marathon = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    const fetchMarathons = async () => {
      try {
        const response = await fetch("http://localhost:5000/marathons");
        const data = await response.json();
        setMarathons(data); // Set the fetched data in state
      } catch (error) {
        console.error("Error fetching marathons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarathons();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Marathons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marathons.map((marathon) => (
            <div
              key={marathon._id}
              className="border rounded-lg overflow-hidden shadow-lg bg-white"
            >
              <img
                src={marathon.image || "https://via.placeholder.com/300x200"}
                alt={marathon.title}
                className="w-full"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{marathon.title}</h3>
                <p className="text-gray-600">Location: {marathon.location}</p>
                <p className="text-gray-600">
                  Registration Dates: {new Date(marathon.startRegistrationDate).toLocaleDateString()} -{" "}
                  {new Date(marathon.endRegistrationDate).toLocaleDateString()}
                </p>
                <button className="mt-4 btn btn-primary w-full">See Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marathon;
