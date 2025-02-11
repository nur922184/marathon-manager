import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddMarathon = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const email = user.email;
    const [loading, setLoading] = useState(false); // Loading state added

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
        setLoading(true); // Start loading

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
            setLoading(false); // Stop loading on error
            return;
        }

        try {
            const dataToSubmit = { ...formData, email };

            const response = await fetch("https://asserment-eleven-server.vercel.app/marathons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSubmit),
            });

            if (!response.ok) {
                throw new Error("Failed to add marathon");
            }

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
                navigate("/marathons");
            });
        } catch (error) {
            console.error("Error submitting marathon:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to add marathon. Please try again.",
                icon: "error",
                draggable: true,
            });
        } finally {
            setLoading(false); // Stop loading after request
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Marathon</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="label">
                            <span className="label-text dark:text-white">Marathon Title</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Marathon Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="input input-bordered w-full dark:bg-slate-900"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text dark:text-white">Location</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                            className="input input-bordered w-full dark:bg-slate-900"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text dark:text-white">Start Registration Date</span>
                        </label>
                        <input
                            type="date"
                            name="startRegistrationDate"
                            value={formData.startRegistrationDate}
                            onChange={handleChange}
                            className="input input-bordered w-full dark:bg-slate-900"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text dark:text-white">End Registration Date</span>
                        </label>
                        <input
                            type="date"
                            name="endRegistrationDate"
                            value={formData.endRegistrationDate}
                            onChange={handleChange}
                            className="input input-bordered w-full dark:bg-slate-900"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text dark:text-white">Marathon Start Date</span>
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="input input-bordered w-full dark:bg-slate-900"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text dark:text-white">Distance</span>
                        </label>
                        <select
                            name="distance"
                            value={formData.distance}
                            onChange={handleChange}
                            className="select select-bordered w-full dark:bg-slate-900 max-w-xs">
                            <option disabled selected value="3k">3k</option>
                            <option value="10k">10k</option>
                            <option value="25k">25k</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="label">
                        <span className="label-text dark:text-white">Description</span>
                    </label>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered dark:bg-slate-900 w-full"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="label">
                        <span className="label-text dark:text-white">Marathon Image URL</span>
                    </label>
                    <input
                        type="url"
                        name="image"
                        placeholder="Marathon Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        className="input input-bordered w-full dark:bg-slate-900"
                        required
                    />
                </div>

                <button
                    disabled={loading}
                    className=" card-button font-sans flex justify-center gap-2 items-center shadow-xl text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-1 overflow-hidden border-2 w-full rounded-2xl group mt-7"
                    type="submit"
                >
                    {loading ? "Submitting..." : "Submit"}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 19"
                        class="w-8 h-8 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                    >
                        <path
                            class="fill-gray-800 group-hover:fill-gray-800"
                            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                        ></path>
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default AddMarathon;
