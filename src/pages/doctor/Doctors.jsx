import { useEffect, useState } from "react";
import DoctorCard from "../public/DoctorCard";
import Testimonial from "../public/Testimonial";

import HashLoader from "react-spinners/HashLoader";
import doctoreService from "../../services/DoctorService";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Doctors = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const doctorType = searchParams.get('type'); 

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genderFilter, setGenderFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

 

  const handleGenderFilter = (gender) => {
    setGenderFilter(gender);
  };

  const handleRatingFilter = (rating) => {
    setRatingFilter(rating);
  };

  const filteredDoctors = doctors
    .filter((doctor) => {
      if (genderFilter && doctor.gender !== genderFilter.toLowerCase()) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (ratingFilter === "lowToHigh") {
        return a.avgRating - b.avgRating;
      } else if (ratingFilter === "highToLow") {
        return b.avgRating - a.avgRating;
      }
      return 0;
    });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        // const res = await doctoreService.getAllDoctor(debouncedQuery);
        const res = await axios.get(
          `http://localhost:8000/api/v1/doctor?query=${debouncedQuery}`
        );

        let allowedDr = res.data.data;
        allowedDr = allowedDr.filter((dr)=> {if(dr.isAllowed && dr.isApproved === "approved"){
          return dr;
        }})
        // console.log("asdasdasd", allowedDr);
        // setDoctors(res.data.data);
        setDoctors(allowedDr);

        
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchdata();
  }, [debouncedQuery]);

  const handleSearch = () => {
      setQuery(doctorType);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    // Get the query parameter 'type' from the URL
    const searchParams = new URLSearchParams(location.search);
    const doctorType = searchParams.get('type');

    // Set the query state to the value of the query parameter, or "" if it doesn't exist
    setQuery(doctorType || "");
}, [location.search]);


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

        <div className="container text-center mt-4">
          <div className="flex justify-center space-x-4">
            <div>
              <label className="block text-xl font-semibold mb-2">
                Filter by Gender
              </label>
              <select
                value={genderFilter}
                onChange={(e) => handleGenderFilter(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xl font-semibold mb-2">
                Sort by Rating
              </label>
              <select
                value={ratingFilter}
                onChange={(e) => handleRatingFilter(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">None</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && (
            <div className="flex items-center justify-center w-full h-full">
              <HashLoader color="#0067FF" />
            </div>
          )}

          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredDoctors.map((doctor) => (
                <DoctorCard doctor={doctor} key={doctor._id} />
              ))}
            </div>
          )}
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
