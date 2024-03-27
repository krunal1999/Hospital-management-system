import { useCallback, useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import Testimonial from "../public/Testimonial";
import doctoreService from "../../services/DoctorService";

import DoctorCard from "../public/DoctorCard";
// import { BASE_URL } from "../../config";
// import useFetchData from "../../hooks/useFetchData";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");


  // let doctorsQueryData;
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await doctoreService.getAllDoctor(debouncedQuery);
  //       console.log(res.data.data);
  //       doctorsQueryData = res.data.data
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  //   return () => {};
  // },[]);

  // const handleSearch = () => {
  //   setQuery(query.trim());
  // };

  // useEffect(() => {
  //   // Debounce the query value after 500ms of inactivity
  //   const timeoutId = setTimeout(() => {
  //     setDebouncedQuery(query);
  //   }, 700);

  //   // Clean up the timeout
  //   return () => clearTimeout(timeoutId);
  // }, [query]);

  const [doctorsQueryData, setDoctorsQueryData] = useState([]);
  console.log(doctorsQueryData);
  const fetchData = useCallback(async (query) => {
    try {
      const res = await doctoreService.getAllDoctor(query);
      setDoctorsQueryData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        setDebouncedQuery(query);
        fetchData(query);
      } else {
        setDebouncedQuery("");
        fetchData("");
      }
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [query, fetchData]);

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mx-auto mt-[30px] bg-[#0066ff2c] rounded-md flex items-center justify-between ">
            <input
              className="py-4 pl-4 pr-2 focus:outline-none cursor-pointer w-full bg-transparent placeholder:text-textColor"
              type="search"
              placeholder="Search by doctor name or specialization"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {/* {loading && (
            <div className="flex items-center justify-center w-full h-full">
              <HashLoader color="#0067FF" />
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center w-full h-full">
              <h3 className="text-headingColor text-[20px] font-semibold leading-[30px]">
                {error}
              </h3>
            </div>
          )} */}

          {/* {!loading && !error && ( */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {doctorsQueryData?.map((doctor) => (
                <DoctorCard doctor={doctor} key={doctor._id} />
              ))}
            </div>
          {/* )} */}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patient say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
            </p>
          </div>

          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
