import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

const AddMarathon = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const email = user.email;
    console.log(email);
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        startRegistrationDate: "",
        endRegistrationDate: "",
        startDate: "",
        distance: "3k",
        description: "",
        image: "",
        email: user.email,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (
            !formData.title ||
            !formData.location ||
            !formData.startRegistrationDate ||
            !formData.endRegistrationDate ||
            !formData.startDate ||
            !formData.description ||
            !formData.image
        ) {
           Swal.fire({
                title: "Error!",
                text: "Please fill out all fields.",
                icon: "error",
                draggable: true,
            });
            return;
        }

        try {
            // Add email to form data
            const dataToSubmit = { ...formData, email };

            // Send data to the server
            const response = await fetch("http://localhost:5000/marathons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSubmit),
            });

            if (!response.ok) {
                throw new Error("Failed to add marathon");
            }

            // Reset form and show success message
            setFormData({
                title: "",
                location: "",
                startRegistrationDate: "",
                endRegistrationDate: "",
                startDate: "",
                distance: "3k",
                description: "",
                image: "",
            });

           Swal.fire({
                title: "Success!",
                text: "Marathon added successfully.",
                icon: "success",
                draggable: true,
            }).then(() => {
                navigate("/marathons"); // Navigate to the desired route
            });
        } catch (error) {
            console.error("Error submitting marathon:", error);
           Swal.fire({
                title: "Error!",
                text: "Failed to add marathon. Please try again.",
                icon: "error",
                draggable: true,
            });
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Marathon</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Title Input */}
                    <div>
                        <label className="label">
                            <span className="label-text">Marathon Title</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Marathon Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Location Input */}
                    <div>
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Start Registration Date */}
                    <div>
                        <label className="label">
                            <span className="label-text">Start Registration Date</span>
                        </label>
                        <input
                            type="date"
                            name="startRegistrationDate"
                            value={formData.startRegistrationDate}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* End Registration Date */}
                    <div>
                        <label className="label">
                            <span className="label-text">End Registration Date</span>
                        </label>
                        <input
                            type="date"
                            name="endRegistrationDate"
                            value={formData.endRegistrationDate}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="label">
                            <span className="label-text">Marathon Start Date</span>
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Distance Selector */}
                    <div>
                        <label className="label">
                            <span className="label-text">Distance</span>
                        </label>
                        <select
                            name="distance"
                            value={formData.distance}
                            onChange={handleChange}
                            className="select select-bordered w-full max-w-xs">
                            <option disabled selected value="3k">3k</option>
                            <option value="10k">10k</option>
                            <option value="25k">25k</option>
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-4">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        required
                    />
                </div>

                {/* Image URL */}
                <div className="mt-4">
                    <label className="label">
                        <span className="label-text">Marathon Image URL</span>
                    </label>
                    <input
                        type="url"
                        name="image"
                        placeholder="Marathon Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button className="btn btn-primary mt-6 w-full">Submit</button>
            </form>
        </div>
    );
};

export default AddMarathon;
