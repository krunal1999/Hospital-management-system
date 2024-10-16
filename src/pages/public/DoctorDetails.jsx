import { useEffect, useState } from "react";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "../doctor/DoctorAbout.jsx";
import { useParams } from "react-router-dom";

import Feedback from "./Feedback.jsx";
import HashLoader from "react-spinners/HashLoader";
import SidePanel from "./SidePanel";
import doctoreService from "../../services/DoctorService.js";
import reviewService from "../../services/ReviewService.js";
const DoctorDetails = () => {
  const [tab, setTab] = useState("feedback");
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await doctoreService.getDoctorById(id);
        const getReview = await reviewService.getAllReview();

        setDoctor(fetchedData.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (!doctor) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <HashLoader color="#0067FF" />
      </div>
    );
  }

  const {
    fullName,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    avgRating,
    totalRating,
    specialization,
    ticketPrice,
    photo,
  } = doctor;

  return (
    <section>
      <div className="max-w-[1170px] px-[20px] mx-auto">
        {!doctor && (
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

        {/* {!loading && !error && ( */}
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex gap-5 items-center">
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={photo} alt="" className="w-full" />
              </figure>
              <div>
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-[600]">
                  {specialization}
                </span>
                <h3 className="text-headingColor text-[22px] leading-[36px] mt-3 font-bold">
                  {fullName}
                </h3>
                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[600] text-headingColor">
                    <img src={starIcon} alt="" /> {avgRating}
                  </span>
                  <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                    ({totalRating})
                  </span>
                </div>
                <p className="text__para text-[14px] md:text-[15px] leading-6 lg:max-w-[390px]">
                  {bio}
                </p>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <div>
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" && "border-b border-solid border-[#0067FF]"
                  }  p-2 mr-5 px-5  text-headingColor font-semibold text-[16px] leading-7  `}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab === "feedback" &&
                    "border-b border-solid border-[#0067FF]"
                  } py-2 px-5  font-semibold text-headingColor text-[16px] leading-7 `}
                >
                  Feedback
                </button>
              </div>
            </div>

            <div className="mt-[50px]">
              {tab === "about" && (
                <div>
                  <DoctorAbout
                    name={fullName}
                    about={about}
                    qualifications={qualifications}
                    experiences={experiences}
                  />
                </div>
              )}
              {tab === "feedback" && (
                <div>
                  <Feedback reviews={reviews} totalRating={totalRating} />
                </div>
              )}
            </div>
          </div>
          <div>
            <SidePanel
              doctorId={doctor._id}
              ticketPrice={ticketPrice}
              timeSlots={timeSlots}
              doctorInfo={doctor}
            />
          </div>
        </div>
        {/* )} */}
      </div>
    </section>
  );
};

export default DoctorDetails;
