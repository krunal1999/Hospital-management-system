import React, { useState, useEffect } from 'react';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     // Fetch doctors data from the backend API
//     fetch('/api/doctors')
//       .then(response => response.json())
//       .then(data => setDoctors(data))
//       .catch(error => console.error('Error fetching doctors:', error));
//   }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Doctors List</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Specialization</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {doctors.map(doctor => (
              <tr key={doctor._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{doctor.fullName}</td>
                <td className="py-3 px-6">{doctor.specialization}</td>
                <td className="py-3 px-6">{doctor.email}</td>
                <td className="py-3 px-6">{doctor.approved ? 'Approved' : 'Pending'}</td>
                <td className="py-3 px-6">
                  <button
                    className={`${
                      doctor.approved ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'
                    } text-white font-bold py-2 px-4 rounded`}
                  >
                    {doctor.approved ? 'Block' : 'Approve'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsList;