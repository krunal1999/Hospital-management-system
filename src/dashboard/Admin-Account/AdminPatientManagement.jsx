import React, { useState } from "react";

const AdminPatientManagement = () => {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="container mx-auto py-2">
      <div className="flex justify mb-8">
        <button
          className={`${
            activeTab === "pending"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-l-md`}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
        <button
          className={`${
            activeTab === "patient"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-l-md`}
          onClick={() => setActiveTab("patient")}
        >
          Patient
        </button>
        <button
          className={`${
            activeTab === "bookings"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-r-md`}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeTab === "pending" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">pending List</h2>
            {/* Your doctors list component goes here */}
          </div>
        )}
        {activeTab === "patient" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">patient List</h2>
            {/* Your doctors list component goes here */}
          </div>
        )}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Bookings</h2>
            {/* Your bookings component goes here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPatientManagement;
