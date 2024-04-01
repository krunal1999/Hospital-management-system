import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import authenticationService from "../../services/AuthenticationService.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/authenticationSlice.js";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userSchema = z.object({
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
  });

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data) => {
    try {
      // logic of login
      await authenticationService
        .loginUser(data)
        .then((response) => {
          if (response.status === 200) {
            let res = response.data.data;

            reset();

            console.log(res.loggedUser.isBlocked);
            if (res.role === "doctor") {
              dispatch(login(res));
              navigate("/doctor/profile");
              toast.success("User Login Success");
            } else if (res.role === "patient") {
              if (res.loggedUser.isBlocked) {
                toast.error("User Has Been Blocked");
                dispatch(logout());
                navigate("/login");
              } else {
                dispatch(login(res));
                navigate("/patient/profile");
                toast.success("User Login Success");
              }
            } else {
              dispatch(login(res));
              navigate("/admin/profile");
              toast.success("User Login Success");
            }
          }
        })
        .catch((axiosError) => {
          if (axiosError.response) {
            const errorMessage = axiosError.response.data.errors.errors;
            toast.error(errorMessage);
          }
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="px-5 md:px-0">
      <div className=" w-full max-w-[570px] mx-auto rounded-lg shadow-lg md:p-10">
        <div>
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Hello! <span className="text-[#0067FF]">Welcome</span> Back 🎉
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="py-4 md:py-0">
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

            <div className="mt-7">
              <button
                type="submit"
                disabled={isSubmitting && true}
                className="w-full bg-[#0067FF] text-white py-3 px-4 rounded-lg text-[18px] leading-[30px]"
              >
                {isSubmitting ? <HashLoader size={25} color="#fff" /> : "Login"}
              </button>
            </div>

            <p className="mt-5 text-textColor text-center">
              Don&apos;t have an account?
              <Link to="/register" className="text-[#0067FF] font-medium ml-1">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
