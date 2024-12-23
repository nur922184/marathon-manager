import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";


const MarathonDetails = () => {
  const { id } = useParams(); // Get dynamic ID from the URL
  const { user } = useContext(AuthContext); // Get user info from context
  const navigate = useNavigate(); // Initialize navigation hook
  const [marathon, setMarathon] = useState(null);
  const [loading, setLoading] = useState(true);


  const handleApplyDisabled = () => {
    const currentDate = new Date();
    const startDate = new Date(marathon.startRegistrationDate);
    const endDate = new Date(marathon.endRegistrationDate);
    return currentDate < startDate || currentDate > endDate;
  };

  useEffect(() => {
    // Fetch the specific marathon details by ID
    const fetchMarathonDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/marathons/${id}`);
        const data = await response.json();
        setMarathon(data);
      } catch (error) {
        console.error("Error fetching marathon details:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to load marathon details. Please try again later.",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMarathonDetails();
  }, [id]);

  const handleApply = async () => {
    if (!user?.email) {
      Swal.fire({
        title: "Error",
        text: "You need to log in to apply!",
        icon: "error",
      });
      return;
    }

    const applicationData = {
      email: user.email,
      marathonId: marathon._id,
      title: marathon.title,
      location: marathon.location,
      date: new Date(),
    };

    try {
      const response = await fetch("http://localhost:5000/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: "You have applied successfully!",
          icon: "success",
        }).then(() => {
          navigate("/dashboard/my-apply-list"); // Navigate after success
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to apply. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error applying:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!marathon) {
    return <div className="text-center py-12">No marathon found!</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <img
          src={marathon.image || "https://via.placeholder.com/600x400"}
          alt={marathon.title}
          className="w-full rounded-lg mb-4"
        />
        <h2 className="text-3xl font-bold mb-4">{marathon.title}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Location:</strong> {marathon.location}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Description:</strong> {marathon.description}
        </p>
        <p className="text-gray-600">
          Registration Dates: {new Date(marathon.startRegistrationDate).toLocaleDateString()} -{" "}
          {new Date(marathon.endRegistrationDate).toLocaleDateString()}
        </p>
        <button
          onClick={handleApply}
          disabled={handleApplyDisabled()} // Check if the button should be disabled
          className={`btn btn-primary w-full mt-4 ${handleApplyDisabled() ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default MarathonDetails;
