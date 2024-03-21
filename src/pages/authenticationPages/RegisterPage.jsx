import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import HashLoader from "react-spinners/HashLoader";
import signupImg from "../../assets/images/signup.gif";
import authenticationService from "../../services/AuthenticationService.js";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterPage = () => {
  const userSchema = z.object({
    fullName: z
      .string("Fullname Can Not Be Empty")
      .min(3, "Fullname Must Be Minimum 3 Character")
      .max(20, "Fullname Must Be In 20 Character Limit"),
    email: z
      .string("Please Enter Valid Email ID")
      .email("Please Enter Valid Email ID"),
    password: z
      .string(
        "Password Must Contain 6 to 16 character including lowercase,uppercase,number"
      )
      .min(
        6,
        "Password Must Contain 6 to 16 character including lowercase,uppercase,number"
      )
      .max(
        16,
        "Password Must Contain 6 to 16 character including lowercase,uppercase,number"
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        "Password Must Contain 6 to 16 character including lowercase,uppercase,number"
      ),
    role: z.string(),
  });

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "patient",
    },
    resolver: zodResolver(userSchema),
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // logic of registraction
      await authenticationService
        .registerUser(data)
        .then((response) => {
          // check the status and save the user
          if (response.status === 201) {
            reset();
            setLoading(false);
            toast.success("User Registration Success");
            navigate("/login");
          } else {
            setLoading(false);
            toast.success("User Registration Failed");
          }

          //----------
        })
        .catch((axiosError) => {
          if (axiosError.response) {
            const errorMessage = axiosError.response.data.errors.errors;
            setLoading(false);
            toast.error(errorMessage);
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <input
                  {...register("fullName")}
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                />
              </div>
              {errors.fullName && (
                <div className="text-red-500">{errors.fullName.message}</div>
              )}

              <div className="mb-5">
                <input
                  {...register("email")}
                  type="text"
                  name="email"
                  placeholder="Enter Your Email"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                />
              </div>
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}

              <div className="mb-5">
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                />
              </div>
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}

              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:
                  <select
                    {...register("role")}
                    name="role"
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
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
