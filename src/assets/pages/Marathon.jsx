import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Marathon = () => {
  const [marathons, setMarathons] = useState([]);
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10); // প্রতি পেজে কত আইটেম দেখাবে
  const [currentPage, setCurrentPage] = useState(0); // বর্তমান পেজ নম্বর

  const numberOfPages = Math.ceil(count / itemsPerPage); // মোট পেজ সংখ্যা

  // Items Per Page পরিবর্তনের হ্যান্ডলার
  const handleItemsPerPage = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(0); // নতুন পেজ সাইজ সেট করার পর প্রথম পেজে ফিরে যাবে
  };

  // API থেকে মোট সংখ্যা ফেচ করা
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/productsCount");
        const data = await response.json();
        setCount(data.count); // মোট প্রোডাক্ট সংখ্যা
      } catch (error) {
        console.error("Error fetching total count:", error);
      }
    };

    fetchCount();
  }, []);

  // API থেকে পেজ ভিত্তিক ডেটা ফেচ করা
  useEffect(() => {
    const fetchMarathons = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/marathons?page=${currentPage}&size=${itemsPerPage}`
        );
        const data = await response.json();
        setMarathons(data); // বর্তমান পেজের ডেটা সেট করা
      } catch (error) {
        console.error("Error fetching marathons:", error);
      }
    };

    fetchMarathons();
  }, [currentPage, itemsPerPage]);

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-6">Marathons</h2>

      {marathons.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No marathons available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marathons.map((marathon) => (
            <div
              key={marathon._id}
              className="border rounded-lg overflow-hidden shadow-lg bg-white flex flex-col"
            >
              <img
                src={marathon.image || "https://via.placeholder.com/300x200"}
                alt={marathon.title}
                className="w-full"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold">{marathon.title}</h3>
                <p className="text-gray-600">Location: {marathon.location}</p>
                <p className="text-gray-600">
                  Registration:{" "}
                  {new Date(marathon.startRegistrationDate).toLocaleDateString()} -{" "}
                  {new Date(marathon.endRegistrationDate).toLocaleDateString()}
                </p>
                <div className="mt-auto">
                  <Link to={`/marathons/${marathon._id}`}>
                    <button className="btn btn-primary mt-4 w-full">See Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      )}

      {/* Pagination */}
      <div className="pagination mt-10 flex items-center justify-center gap-2">
        <button
          className="bg-gray-300 p-2 rounded-md hover:bg-gray-400"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          Prev
        </button>

        {[...Array(numberOfPages).keys()].map((num) => (
          <button
            key={num}
            className={`p-2 rounded-md ${currentPage === num ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            onClick={() => setCurrentPage(num)}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="bg-gray-300 p-2 rounded-md hover:bg-gray-400"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, numberOfPages - 1))
          }
          disabled={currentPage === numberOfPages - 1}
        >
          Next
        </button>

        {/* Items per page */}
        <select
          className="ml-4 p-2 bg-gray-200 rounded-md"
          value={itemsPerPage}
          onChange={handleItemsPerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default Marathon;
