import React, { useState } from "react";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("addMarathon");

  // Sections' components
  const renderSection = () => {
    switch (activeSection) {
      case "addMarathon":
        return <AddMarathon />;
      case "myMarathonList":
        return <MyMarathonList />;
      case "myApplyList":
        return <MyApplyList />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 font-bold text-xl text-center">Dashboard</div>
        <nav className="flex flex-col mt-4">
          <button
            className={`p-3 text-left hover:bg-gray-700 ${
              activeSection === "addMarathon" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveSection("addMarathon")}
          >
            Add Marathon
          </button>
          <button
            className={`p-3 text-left hover:bg-gray-700 ${
              activeSection === "myMarathonList" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveSection("myMarathonList")}
          >
            My Marathon List
          </button>
          <button
            className={`p-3 text-left hover:bg-gray-700 ${
              activeSection === "myApplyList" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveSection("myApplyList")}
          >
            My Apply List
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
};

// Add Marathon Section
const AddMarathon = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Marathon</h2>
      <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Marathon Title"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Location"
            className="input input-bordered w-full"
          />
          <input
            type="date"
            placeholder="Start Registration Date"
            className="input input-bordered w-full"
          />
          <input
            type="date"
            placeholder="End Registration Date"
            className="input input-bordered w-full"
          />
          <input
            type="date"
            placeholder="Marathon Start Date"
            className="input input-bordered w-full"
          />
          <select className="input input-bordered w-full">
            <option value="3k">3k</option>
            <option value="10k">10k</option>
            <option value="25k">25k</option>
          </select>
        </div>
        <textarea
          placeholder="Description"
          className="input input-bordered w-full mt-4"
        />
        <button className="btn btn-primary mt-4 w-full">Submit</button>
      </form>
    </div>
  );
};

// My Marathon List Section
const MyMarathonList = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">My Marathon List</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Dynamic rows */}
          {[1, 2, 3].map((_, index) => (
            <tr key={index}>
              <td>Marathon {index + 1}</td>
              <td>City Name</td>
              <td>2024-01-01</td>
              <td>
                <button className="btn btn-sm btn-secondary mr-2">Edit</button>
                <button className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// My Apply List Section
const MyApplyList = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">My Apply List</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Marathon Title</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Dynamic rows */}
          {[1, 2, 3].map((_, index) => (
            <tr key={index}>
              <td>Marathon {index + 1}</td>
              <td>2024-02-15</td>
              <td>
                <button className="btn btn-sm btn-secondary mr-2">Edit</button>
                <button className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
