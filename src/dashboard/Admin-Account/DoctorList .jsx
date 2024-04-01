import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctors }) => {
  const navigate = useNavigate();
  const handleClick = (item) => {
    //     console.log(item._id);
    navigate(`/doctors/${item._id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Specialty</th>
            <th className="py-3 px-6">Approved</th>
            <th className="py-3 px-6">Available</th>
            <th className="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {doctors.length > 0 &&
            doctors.map((doctor) => (
              <tr
                key={doctor._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {doctor.fullName}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {doctor.specialization}
                </td>

                <td className="py-3 px-6 text-center">
                  <span
                    className={`inline-block py-1 px-3 font-bold rounded-full ${
                      doctor.isApproved !== "pending"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {doctor.isApproved !== "pending" ? "Approved" : "Pending"}
                  </span>
                </td>

                <td className="py-3 px-6 text-center">
                  <span
                    className={`inline-block py-1 px-3 font-bold rounded-full ${
                      doctor.isAllowed
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {doctor.isAllowed ? "Available" : "Not Available"}
                  </span>
                </td>

                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleClick(doctor)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorList;
