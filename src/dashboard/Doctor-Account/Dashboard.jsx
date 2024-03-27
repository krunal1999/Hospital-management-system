import { useEffect, useState } from "react";
import starIcon from "../../assets/images/Star.png";
import HashLoader from "react-spinners/HashLoader";
import Tabs from "./Tabs";
import Profile from "./Profile";
import DoctorAbout from "../../pages/doctor/DoctorAbout";
import Appointments from "./Appointments";
import doctoreService from "../../services/DoctorService";

// import doctorImg from "../../assets/images/doctor-img02.png";
// import { BASE_URL } from "../../config";
// import useGetProfile from "../../hooks/useFetchData";

const Dashboard = () => {
  const [tab, setTab] = useState("overview");
  // const {
  //   data: doctorData,
  //   loading,
  //   error,
  // } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

  let doctorData = JSON.parse(localStorage.getItem("user"));
  const storedStatus = localStorage.getItem("status") === "true" ? true : false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await doctoreService.getCurrentDoctor(
          doctorData?.loggedUser._id
        );
        console.log(res.data.data);
        doctorData = { ...doctorData, loggedUser: res.data.data };
        localStorage.setItem("user", JSON.stringify(doctorData));
      } catch (error) {
        console.log(error);
      }
    };

    
    fetchData();
    return () => {};
  });

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {!storedStatus && (
          <div className="flex items-center justify-center w-full h-full">
            <HashLoader color="#0067FF" />
          </div>
        )}
        {/* {error && (
          <div>
            <h3>{error.message}</h3>
          </div>
        )} */}
        {/* {!loading && !error && ( */}
        {true && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px] ">
            <Tabs tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {/* // add pending here */}
              {doctorData?.loggedUser.isApproved === "pending" && (
                <div
                  id="alert-4"
                  className="flex p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 "
                  role="alert"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    To get approval please complete your profile. We&apos;ll
                    review manually and approve within 3days.
                  </div>
                </div>
              )}
              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex gap-5 items-center mb-10">
                      <figure className="max-w-[200px] max-h-[200px]">
                        {/* <img
                          src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=640:*"
                          alt=""
                          className="w-full"
                        /> */}
                        <img
                          className="w-full "
                          src={
                            doctorData?.loggedUser.photo
                              ? doctorData?.loggedUser.photo
                              : "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=640:*"
                          }
                          alt="Profile Photo"
                        />
                      </figure>
                      <div>
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-[600]">
                          {doctorData?.loggedUser.specialization}
                        </span>
                        <h3 className="text-headingColor text-[22px] leading-[36px] mt-3 font-bold">
                          {doctorData.fullName}
                        </h3>
                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[600] text-headingColor">
                            <img src={starIcon} alt="" />{" "}
                            {doctorData?.loggedUser.avgRating
                              ? doctorData?.loggedUser.avgRating
                              : 0}
                          </span>
                          <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                            (
                            {doctorData?.loggedUser.totalRating
                              ? doctorData?.loggedUser.totalRating
                              : 0}
                            )
                          </span>
                        </div>
                        <p className="text__para text-[15px] leading-6 lg:max-w-[390px]">
                          {doctorData?.loggedUser.bio}
                        </p>
                      </div>
                    </div>
                    <DoctorAbout
                      name={doctorData.fullName}
                      about={doctorData?.loggedUser.about}
                      qualifications={doctorData?.loggedUser.qualifications}
                      experiences={doctorData?.loggedUser.experiences}
                    />
                  </div>
                )}
                {tab === "settings" && <Profile doctorData={doctorData} />}
                {tab === "appointments" && (
                  <Appointments
                    appointments={doctorData?.loggedUser.appointments}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
