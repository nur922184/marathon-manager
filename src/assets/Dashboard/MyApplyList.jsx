import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const MyApplyList = () => {
  const { user } = useContext(AuthContext)
  const email = user.email; 
  const [appliedMarathons, setAppliedMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Fetch logged-in user's email (assuming stored in localStorage)
  // const email = localStorage.getItem("userEmail");

  // Fetch applied marathons for the logged-in user
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!email) {
          toast.error("User email not found. Please login again.");
          return;
        }

        // API call with email as a query parameter
        const response = await fetch(
          `http://localhost:5000/applications?email=${email}`
        );
        const data = await response.json();

        if (response.ok) {
          setAppliedMarathons(data);
        } else {
          throw new Error(data.message || "Failed to fetch applications.");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error("Failed to load applied marathons.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [email]);

  // Handle delete application
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/applications/${id}`, {
        method: "DELETE",
      });

      setAppliedMarathons(
        appliedMarathons.filter((application) => application._id !== id)
      );
      toast.success("Application deleted successfully.");
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application.");
    }
  };

  // Handle update application
  const handleUpdate = async (updatedApplication) => {
    try {
      const response = await fetch(
        `http://localhost:5000/applications/${updatedApplication._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedApplication),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setAppliedMarathons((prev) =>
          prev.map((application) =>
            application._id === updatedApplication._id
              ? updatedData
              : application
          )
        );
        toast.success("Application updated successfully.");
      } else {
        throw new Error("Failed to update application.");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error("Failed to update application.");
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading applications...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Applied Marathons</h2>
      {appliedMarathons.length === 0 ? (
        <div>No applications found.</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Start Date</th>
              <th className="border border-gray-300 px-4 py-2">Contact</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appliedMarathons.map((application) => (
              <tr key={application._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {application.marathonTitle}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(application.marathonStartDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {application.contactNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="btn btn-info btn-sm mr-2"
                    onClick={() => setSelectedApplication(application)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDelete(application._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Update Modal */}
      {selectedApplication && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Update Application</h3>
            <input
              type="text"
              value={selectedApplication.firstName}
              onChange={(e) =>
                setSelectedApplication({
                  ...selectedApplication,
                  firstName: e.target.value,
                })
              }
              className="input input-bordered w-full mb-4"
            />
            <input
              type="text"
              value={selectedApplication.lastName}
              onChange={(e) =>
                setSelectedApplication({
                  ...selectedApplication,
                  lastName: e.target.value,
                })
              }
              className="input input-bordered w-full mb-4"
            />
            <input
              type="text"
              value={selectedApplication.contactNumber}
              onChange={(e) =>
                setSelectedApplication({
                  ...selectedApplication,
                  contactNumber: e.target.value,
                })
              }
              className="input input-bordered w-full mb-4"
            />
            <button
              className="btn btn-primary mr-2"
              onClick={() => {
                handleUpdate(selectedApplication);
                setSelectedApplication(null);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setSelectedApplication(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplyList;
