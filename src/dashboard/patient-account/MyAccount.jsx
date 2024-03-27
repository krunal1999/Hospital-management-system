import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import MyBookings from "./MyBookings";
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/authenticationSlice";
import patientService from "../../services/patientService";

const MyAccount = () => {
  const dispatch = useDispatch();

  const [tab, setTab] = useState("bookings");

  let userData = JSON.parse(localStorage.getItem("user"));
  const storedStatus = localStorage.getItem("status") === "true" ? true : false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await patientService.getCurrentPatient(
          userData?.loggedUser._id
        );
        console.log(res.data.data);
        userData = { ...userData, loggedUser: res.data.data };
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    return () => {};
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {!storedStatus && (
          <div className="flex items-center justify-center w-full h-full">
            <HashLoader color="#0067FF" />
          </div>
        )}

        {storedStatus && (
          <div className="grid md:grid-cols-3 gap-10 ">
            <div className=" px-[30px] pb-[50px] rounded-md  ">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-[#0067FF]">
                  <img
                    className="w-full rounded-full "
                    src={
                      userData?.loggedUser.photo
                        ? userData?.loggedUser.photo
                        : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    }
                    alt="Profile Photo"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData?.fullName}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData?.email}
                </p>

                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type:
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData?.loggedUser.bloodType}
                  </span>
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Age:
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData?.loggedUser.age}
                  </span>
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Gender:
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData?.loggedUser.gender}
                  </span>
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] p-3 rounded-md text-white text-[16px] leading-7"
                >
                  Logout
                </button>
                <button
                  disabled
                  className="w-full bg-red-600 mt-4 p-3 rounded-md text-white text-[16px] leading-7 disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:cursor-not-allowed"
                >
                  Delete Account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab === "bookings" && "bg-[#0067FF] text-white font-normal"
                  }  p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7  border border-solid border-[#0067FF]`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings" && "bg-[#0067FF] text-white font-normal"
                  } py-2 px-5 rounded-md font-semibold text-headingColor text-[16px] leading-7  border border-solid border-[#0067FF]`}
                >
                  Settings
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === "bookings" && (
                  <div>
                    <h2 className="heading text-[30px]">My bookings</h2>
                    <MyBookings />
                  </div>
                )}
                {tab === "settings" && (
                  <div>
                    <h2 className="heading text-[30px]">Profile Settings</h2>
                    <Profile userData={userData} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
