import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../components/Loading";
import '../layouts/Styles/btn.css';

const RegisterPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const email = user?.email || "";
  const navigate = useNavigate();
  const [marathon, setMarathon] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // ✅ লোডিং স্টেট
  const [formData, setFormData] = useState({
    email: email,
    firstName: "",
    lastName: "",
    contactNumber: "",
    additionalInfo: "",
  });

  // Fetch marathon details
  useEffect(() => {
    fetch(`https://asserment-eleven-server.vercel.app/marathons/${id}`)
      .then((response) => response.json())
      .then((data) => setMarathon(data))
      .catch((error) => console.error("Error loading marathon details:", error));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // ✅ লোডিং শুরু

    try {
      // Validate email
      const emailCheckResponse = await fetch(
        `https://asserment-eleven-server.vercel.app/applications/check-email?email=${formData.email}&marathonId=${id}`
      );
      const emailCheckResult = await emailCheckResponse.json();

      if (emailCheckResult.exists) {
        Swal.fire({
          title: "Error",
          text: "You have already registered for this marathon!",
          icon: "error",
        });
        setIsLoading(false); // ✅ লোডিং বন্ধ
        return;
      }

      // Submit the form if email doesn't exist
      const registrationData = {
        ...formData,
        marathonTitle: marathon.title,
        marathonStartDate: marathon.registrationStart,
        date: new Date(),
      };

      const response = await fetch(
        "https://asserment-eleven-server.vercel.app/applications",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registrationData),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: "Registration completed successfully!",
          icon: "success",
        }).then(() => {
          navigate("/dashboard/my-apply-list");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to register. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred. Please try again.",
        icon: "error",
      });
    } finally {
      setIsLoading(false); // ✅ লোডিং বন্ধ
    }
  };

  if (!marathon) return <Loading />;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Register for {marathon.title}
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            readOnly
            className="mt-1 block w-full p-2 border rounded-md bg-gray-200 dark:bg-slate-900"
          />
        </div>
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
            className="mt-1 block w-full p-2 border dark:bg-slate-900 rounded-md"
          />
        </div>
        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
            className="mt-1 block w-full p-2 border rounded-md dark:bg-slate-900"
          />
        </div>
        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Contact Number
          </label>
          <input
            type="number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter your contact number"
            required
            className="mt-1 block w-full p-2 border rounded-md dark:bg-slate-900"
          />
        </div>
        {/* Additional Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Additional Info
          </label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Enter any additional information"
            className="mt-1 block w-full p-2 border rounded-md dark:bg-slate-900"
          ></textarea>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="buttons flex justify-center items-center"
          disabled={isLoading} // ✅ লোডিং হলে বাটন ডিজেবল
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Registering...
            </span>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
