import HashLoader from "react-spinners/HashLoader";

import DoctorCard from "../../pages/public/DoctorCard";
import patientService from "../../services/patientService";
import { useEffect, useState } from "react";

// import DoctorCard from "./../../components/Doctors/DoctorCard";

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

      {storedStatus && (
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-5">
          {appointment?.map((doctor) => (
            <DoctorCard doctor={doctor.doctorId} key={doctor._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
