import HashLoader from "react-spinners/HashLoader";

import DoctorCard from "../../pages/public/DoctorCard";
import patientService from "../../services/patientService";
import { useEffect, useState } from "react";
import PatientAppointmentTable from "./PatientAppointmentTable";
import CompletBookingTable from "./CompletBookingTable";

const MyCompletedBooking = () => {
  let userData = JSON.parse(localStorage.getItem("user"));
  const storedStatus = localStorage.getItem("status") === "true" ? true : false;

  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await patientService.getPatientCompletedAppointments(
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

      {storedStatus && (
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-5">
          <div className="max-w-3xl mx-auto">
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-8">Booking Date</th>
                    <th className="py-3 px-12">Booking Status</th>
                    <th className="py-3 px-8">Visited Date</th>
                    <th className="py-3 px-6">Payment</th>
                    <th className="py-3 px-6">Bill Status</th>
                    <th className="py-3 px-10">PayNow</th>
                  </tr>
                </thead>
                {appointment?.map((doctor) => (
                  // <DoctorCard doctor={doctor.doctorId} key={doctor._id} />
                  <CompletBookingTable key={doctor._id} booking={doctor} />
                ))}
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCompletedBooking;
