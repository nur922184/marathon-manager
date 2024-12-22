import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMarathon = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    startRegistrationDate: "",
    endRegistrationDate: "",
    startDate: "",
    distance: "3k",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
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
      toast.error("Please fill out all fields");
      return;
    }

    // Send data to the backend (replace with your API call)
    console.log("Submitted Marathon Data:", formData);

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
    toast.success("Marathon added successfully!");
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
              className="input input-bordered w-full"
            >
              <option value="3k">3k</option>
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
          />
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary mt-6 w-full">Submit</button>
      </form>
    </div>
  );
};

export default AddMarathon;
