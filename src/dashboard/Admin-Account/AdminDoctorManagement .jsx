import React, { useEffect, useState } from "react";
import DoctorList from "./DoctorList ";
import doctoreService from "../../services/DoctorService";
import DateInputForm from "./DateInputForm";

const AdminDoctorManagement = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const [doctors, setDoctors] = useState({ approved: [], notApproved: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await doctoreService.getAllDoctor();
        const { data } = fetchedData.data;
        console.log(data);

        // Separate doctors based on the isApproved property
        const approvedDoctors = data.filter(
          (doctor) => doctor.isApproved === "pending"
        );
        const notApprovedDoctors = data.filter(
          (doctor) => doctor.isApproved !== "pending"
        );

        setDoctors({
          approved: approvedDoctors,
          notApproved: notApprovedDoctors,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
            activeTab === "doctors"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-l-md`}
          onClick={() => setActiveTab("doctors")}
        >
          Doctors
        </button>
        <button
          className={`${
            activeTab === "Generate Slots"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-r-md`}
          onClick={() => setActiveTab("Generate Slots")}
        >
          Generate Slots
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {activeTab === "pending" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Pending Doctors</h2>
            <DoctorList doctors={doctors.approved} />
          </div>
        )}
        {activeTab === "doctors" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Doctors Information</h2>
            <DoctorList doctors={doctors.notApproved} />
          </div>
        )}
        {activeTab === "Generate Slots" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Generate Slots</h2>
            <DateInputForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDoctorManagement;
