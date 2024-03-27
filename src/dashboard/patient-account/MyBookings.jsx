import HashLoader from "react-spinners/HashLoader";

import DoctorCard from "../../pages/public/DoctorCard";

// import DoctorCard from "./../../components/Doctors/DoctorCard";
// import { BASE_URL } from "./../../config";
// import useFetchData from "./../../hooks/useFetchData";

const MyBookings = () => {
  // const {
  //   data: myAppointments,
  //   loading,
  //   error,
  // } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);
  // console.log(myAppointments);

  let userData = JSON.parse(localStorage.getItem("user"));
  const storedStatus = localStorage.getItem("status") === "true" ? true : false;

  return (
    <div>
      {!storedStatus && (
        <div className="flex items-center justify-center w-full h-full">
          <HashLoader color="#0067FF" />
        </div>
      )}

      {/* {error && (
        <div className="flex items-center justify-center w-full h-full">
          <h3 className="text-headingColor text-[20px] font-semibold leading-[30px]">
            {error}
          </h3>
        </div>
      )} */}

      {storedStatus && (
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-5">
          {/* {myAppointments?.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor.id} />
          ))} */}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
