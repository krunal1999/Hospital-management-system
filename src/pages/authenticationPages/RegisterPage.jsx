import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import HashLoader from "react-spinners/HashLoader";
import signupImg from "../../assets/images/signup.gif";
import authenticationService from "../../services/AuthenticationService.js";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "patient",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // logic or registraction
      authenticationService
        .registerUser(formData)
        .then((response) => {
          console.log(response.data);

          setLoading(false);
          toast.success("asasdda");
          navigate("/login");
        })
        .catch((axiosError) => {
          if (axiosError.response) {
            const errorMessage = axiosError.response.data.errors.errors;

            setLoading(false);
            toast.error(errorMessage);
            console.log(errorMessage);
            navigate("/register");
          } 
        });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
    
  };
  return (
    <section className="px-5 mt-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          {/* ============ img box ========= */}

          <div className="flex flex-row  md:flex-col bg-[#0067FF] rounded-l-lg">
            <figure className="rounded-l-lg">
              <img className="w-full rounded-l-lg" src={signupImg} alt="" />
            </figure>
          </div>

          <div className="rounded-l-lg  lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-[#0067FF]">Account</span>
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  name="email"
                  placeholder="Enter Your Email"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  name="password"
                  placeholder="Password"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                  required
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:
                  <select
                    name="role"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                    required
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  disabled={loading && true}
                  className="w-full bg-[#0067FF] text-white py-3 px-4 rounded-lg text-[18px] leading-[30px]"
                >
                  {loading ? <HashLoader size={25} color="#fff" /> : "Sign Up"}
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-[#0067FF] font-medium">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
