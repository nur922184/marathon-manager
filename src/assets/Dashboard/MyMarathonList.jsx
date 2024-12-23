import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Provider/AuthProvider";

const MyMarathonList = () => {
  const { user } = useContext(AuthContext); // Context থেকে ব্যবহারকারীর তথ্য পাওয়া
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarathon, setSelectedMarathon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const fetchMarathons = async () => {
      try {
        if (!user?.email) {
          toast.error("User email not found. Please login again.");
          return;
        }

        // API call to fetch marathons filtered by email
        const response = await fetch(
          `http://localhost:5000/marathons?email=${user.email}`
        );
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
  }, [user?.email]);

  // Handle delete marathon
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this marathon?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/marathons/${id}`, {
        method: "DELETE",
      });

      setMarathons(marathons.filter((marathon) => marathon._id !== id));
      toast.success("Marathon deleted successfully.");
    } catch (error) {
      console.error("Error deleting marathon:", error);
      toast.error("Failed to delete marathon.");
    }
  };

  // Handle update marathon
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/marathons/${selectedMarathon._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedMarathon),
        }
      );

      if (response.ok) {
        const updatedMarathons = marathons.map((marathon) =>
          marathon._id === selectedMarathon._id ? selectedMarathon : marathon
        );
        setMarathons(updatedMarathons);
        setIsModalOpen(false);
        toast.success("Marathon updated successfully.");
      } else {
        throw new Error("Failed to update marathon.");
      }
    } catch (error) {
      console.error("Error updating marathon:", error);
      toast.error("Failed to update marathon.");
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
        <>
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
                      onClick={() => {
                        setSelectedMarathon(marathon);
                        setIsModalOpen(true);
                      }}
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

          {/* Update Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h3 className="text-xl font-bold mb-4">Update Marathon</h3>
                <div className="mb-4">
                  <label className="block text-gray-700">Title:</label>
                  <input
                    type="text"
                    value={selectedMarathon.title}
                    onChange={(e) =>
                      setSelectedMarathon({
                        ...selectedMarathon,
                        title: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Location:</label>
                  <input
                    type="text"
                    value={selectedMarathon.location}
                    onChange={(e) =>
                      setSelectedMarathon({
                        ...selectedMarathon,
                        location: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Start Date:</label>
                  <input
                    type="date"
                    value={new Date(selectedMarathon.startDate)
                      .toISOString()
                      .split("T")[0]}
                    onChange={(e) =>
                      setSelectedMarathon({
                        ...selectedMarathon,
                        startDate: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="btn btn-primary mr-2"
                    onClick={handleUpdate}
                  >
                    Update Now
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyMarathonList;
