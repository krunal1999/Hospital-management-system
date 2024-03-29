import React from 'react';

const PatientProfile = ({ patientData }) => {
  const {
    photo,
    gender,
    age,
    bloodType,
    address,
    phone,
  } = patientData.patientId;

  return (
    <div className="flex bg-white rounded-lg shadow-md p-4">
      <div className="mr-8">
        <img
          src={photo}
          alt="Patient"
          className="w-32 h-32  object-cover"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-2">Patient Information</h2>
        <div className="mb-2">
          <span className="font-bold">Full Name:</span> {patientData?.patientId.userId.fullName}
        </div>
        <div className="mb-2">
          <span className="font-bold">Gender:</span> {gender}
        </div>
        <div className="mb-2">
          <span className="font-bold">Age:</span> {age}
        </div>
        <div className="mb-2">
          <span className="font-bold">Blood Type:</span> {bloodType}
        </div>
        <div className="mb-2">
          <span className="font-bold">Address:</span> {address}
        </div>
        <div>
          <span className="font-bold">Phone:</span> {phone}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;