import HashLoader from "react-spinners/HashLoader";

import DoctorCard from "../../pages/public/DoctorCard";
import patientService from "../../services/patientService";
import { useEffect, useState } from "react";
import PatientAppointmentTable from "./PatientAppointmentTable";

const MyBookings = () => {
  let userData = JSON.parse(localStorage.getItem("user"));
  const storedStatus = localStorage.getItem("status") === "true" ? true : false;

  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await patientService.getPatientAppointments(
          userData?.loggedUser._id
        );
        setAppointment(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {};
  }, [userData?.loggedUser._id]);

  console.log(appointment);

  return (
    <div>
      {!storedStatus && (
        <div className="flex items-center justify-center w-full h-full">
          <HashLoader color="#0067FF" />
        </div>
      )}

      {/* {storedStatus && (
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-5">
          {appointment?.map((doctor) => (
            <DoctorCard doctor={doctor.doctorId} key={doctor._id} />
          ))}
        </div>
      )} */}

      {storedStatus && (
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-5">
          <div className="max-w-3xl mx-auto">
            
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-8">Booking Status</th>
                    <th className="py-3 px-12">Date</th>
                    <th className="py-3 px-8">Doctor</th>
                    <th className="py-3 px-8">Specialization</th>
                    <th className="py-3 px-8">Start Time</th>
                  </tr>
                </thead>
                {appointment?.map((doctor) => (
                  // <DoctorCard doctor={doctor.doctorId} key={doctor._id} />
                  <PatientAppointmentTable key={doctor._id} booking={doctor} />
                ))}
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
