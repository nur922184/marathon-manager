import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Provider/AuthProvider";

const MyMarathonList = () => {
  const { user } = useContext(AuthContext)
    console.log(user?.email)
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarathon, setSelectedMarathon] = useState(null);

  // Fetch logged-in user's email (assuming stored in localStorage)
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchMarathons = async () => {
      try {
        if (!email) {
          toast.error("User email not found. Please login again.");
          return;
        }

        const response = await fetch(`http://localhost:5000/applications?email=${email}`);
        const data = await response.json();

        if (response.ok) {
          setMarathons(data);
        } else {
          throw new Error(data.message || "Failed to fetch marathons");
        }
      } catch (error) {
        console.error("Error fetching marathons:", error);
        toast.error("Failed to load marathons.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarathons();
  }, [email]);

  // Handle delete marathon
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this marathon?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/applications/${id}`, {
        method: "DELETE",
      });

      setMarathons(marathons.filter((marathon) => marathon._id !== id));
      toast.success("Marathon deleted successfully.");
    } catch (error) {
      console.error("Error deleting marathon:", error);
      toast.error("Failed to delete marathon.");
    }
  };

  if (loading) {
    return <span className="loading loading-bars justify-center loading-lg"></span>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Marathon List</h2>
      {marathons.length === 0 ? (
        <div>No marathons found.</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Start Date</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {marathons.map((marathon) => (
              <tr key={marathon._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {marathon.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {marathon.location}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(marathon.startDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="btn btn-info btn-sm mr-2"
                    onClick={() => setSelectedMarathon(marathon)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDelete(marathon._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyMarathonList;
