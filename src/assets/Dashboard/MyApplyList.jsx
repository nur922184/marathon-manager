import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loading from "../components/Loading";

const MyApplyList = () => {
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [updateData, setUpdateData] = useState({});

  // Fetch applications for logged-in user

  useEffect(() => {
    // Simulate an API call or some asynchronous operation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Replace with your actual loading logic
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://asserment-eleven-server.vercel.app/applications?email=${user.email}`)
        .then((response) => response.json())
        .then((data) => setApplications(data))
        .catch((error) => console.error("Error fetching applications:", error));
    }
  }, [user]);

  // Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://asserment-eleven-server.vercel.app/applications/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Deleted!", "Your application has been deleted.", "success");
              setApplications(applications.filter((app) => app._id !== id));
            }
          })
          .catch((error) => console.error("Error deleting application:", error));
      }
    });
  };

  // Handle update
  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`https://asserment-eleven-server.vercel.app/applications/${selectedApplication._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Updated!", "Your application has been updated.", "success");
          setApplications(
            applications.map((app) =>
              app._id === selectedApplication._id
                ? { ...app, ...updateData }
                : app
            )
          );
          setSelectedApplication(null);
        }
      })
      .catch((error) => console.error("Error updating application:", error));
  };

  // Update modal input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  if (loading) {
    return <Loading></Loading>
      ;
  }


  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">My Apply List</h1>
        <input
          type="text"
          placeholder="Search by title..."
          value={''}
          onChange={''}
          className="border p-2 rounded w-1/3"
        />
      </div>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Start Date</th>
            <th className="border border-gray-300 px-4 py-2">Contact</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td className="border border-gray-300 px-4 py-2">{app.marathonTitle}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(app.date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">{app.contactNumber}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => setSelectedApplication(app)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(app._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Registration</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={selectedApplication.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={selectedApplication.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label>Contact Number</label>
                <input
                  type="number"
                  name="contactNumber"
                  defaultValue={selectedApplication.contactNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                onClick={() => setSelectedApplication(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplyList;
