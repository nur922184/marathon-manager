import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Provider/AuthProvider";

const MyApplyList = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const email = user?.email;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!email) {
          toast.error("User email not found. Please login again.");
          return;
        }

        const response = await fetch(`http://localhost:5000/applications?email=${email}`);
        const data = await response.json();

        if (response.ok) {
          setApplications(data);
        } else {
          throw new Error(data.message || "Failed to fetch applications.");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [email]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this application?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/applications/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setApplications(applications.filter((app) => app._id !== id));
        toast.success("Application deleted successfully.");
      } else {
        throw new Error("Failed to delete application.");
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
        <h2 className="text-center text-2xl font-bold py-2">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Application List</h2>
      {applications.length === 0 ? (
        <div>No applications found.</div>
      ) : (
        <div>
          {isEditing ? (
            <div className="p-4 border rounded bg-gray-100">
              <h3 className="text-lg font-bold mb-2">Edit Application</h3>
              <input
                type="text"
                value={selectedApplication?.status || ""}
                onChange={(e) =>
                  setSelectedApplication({
                    ...selectedApplication,
                    status: e.target.value,
                  })
                }
                placeholder="Update status"
                className="input input-bordered mb-4"
              />
              <button
                className="btn btn-success mr-2"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Marathon Title</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {application.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {application.status || "Pending"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex items-center justify-center space-x-2">
                      <button
                        className="btn btn-info btn-sm mr-2"
                        onClick={() => handleEdit(application)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDelete(application._id)}
                      >
                        Delete
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default MyApplyList;
