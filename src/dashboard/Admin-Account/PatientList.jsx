import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import patientService from "../../services/patientService";

const PatientList = () => {
  const navigate = useNavigate();

  const [patient, setPatient] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await patientService.getAllPatient();
        const { data } = fetchedData.data;
        console.log(data);
        setPatient(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (item) => {
    console.log(item._id);
    navigate(`/patient/${item._id}`);
  };

  console.log(patient);
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6">Profile</th>
            <th className="py-3 px-6">gender</th>
            <th className="py-3 px-6">age</th>
            <th className="py-3 px-6">Status</th>
            <th className="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {patient.length > 0 &&
            patient.map((patient) => (
              <tr
                key={patient._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={patient?.photo}
                    alt=" image"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {patient?.userId?.fullName ? patient.userId.fullName : ""}
                    </div>
                    <div className="font-normal text-gray-500">
                      {patient.userId.email}
                    </div>
                  </div>
                </th>

                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {patient.gender}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {patient.age}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {!patient.isBlocked ? "Normal" : "Blocked"}
                </td>

                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleClick(patient)}
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

export default PatientList;
