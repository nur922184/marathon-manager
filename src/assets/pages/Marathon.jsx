import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Marathon.css'

const Marathon = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0)
  // const { count } = useLoaderData();
  // const count = 76
  const [count, setCount] = useState(0)
  const numberOfPages = Math.ceil(count / itemsPerPage);

  const pages = [...Array(numberOfPages).keys()]


  const handleItemsParPages = e => {
    const val = parseInt(e.target.value);
    console.log(val)
    setItemsPerPage(val);
    setCurrentPage(0)

  }

  const handlePrevBtn = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextBtn = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    fetch('http://localhost:5000/productsCount')
      .then(res => res.json())
      .then(data => setCount(data.count))
  }, [])


  useEffect(() => {
    fetch(`http://localhost:5000/marathons?page=${currentPage}&size=${itemsPerPage}`)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [currentPage, itemsPerPage]);

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
    return <div className="flex flex-col justify-center items-center h-screen">
      <span className="loading loading-bars loading-lg"></span>
      <h2 className="text-center text-2xl font-bold py-2">Loading...</h2>
    </div>
      ;
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
                <Link to={`/marathons/${marathon._id}`}>
                  <button className="mt-4 btn btn-primary w-full">See Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className='pagination'>
          <p>current pages {currentPage}</p>
          <button onClick={handlePrevBtn}>Prev</button>
          {
            pages.map(page =>
              <button
                className={currentPage === page ? 'selected btn gap-4' : undefined}
                onClick={() => setCurrentPage(page)}
                key={page}>{page}
              </button>)
          }
          <button onClick={handleNextBtn}>Next</button>
          <select value={itemsPerPage} onChange={handleItemsParPages} name="" id="">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

    </section>
  );
};

export default Marathon;
