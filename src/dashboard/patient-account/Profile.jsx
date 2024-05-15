/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";
import { toast } from "react-toastify";
import patientService from "../../services/patientService.js";

const Profile = ({ userData }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    // password: "",
    gender: "",
    bloodType: "",
    photo: null,
    phone: "",
    address: "",
    age: "",
  });

  useEffect(() => {
    setFormData({
      fullName: userData.fullName,
      email: userData.email,
      // password: userData?.password ? userData?.password : "",
      bloodType: userData?.loggedUser.bloodType,
      gender: userData?.loggedUser.gender,
      photo: userData?.loggedUser.photo,
      phone: userData?.loggedUser.phone,
      address: userData?.loggedUser.address,
      age: userData?.loggedUser.age,
    });
  }, [userData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const updateUserHandler = async (e) => {
    e.preventDefault();

    try {
      const id = userData?.loggedUser._id;

      const res = await patientService.updatePatientProfile(id, formData);

      if (res.status === 200) {
        toast.success("Profile data Updated");
      } else {
        toast.error("Profile data Not Updated");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={updateUserHandler}>
        <div className="mb-5">
          <input
            type="text"
            name="name"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
            readOnly
            aria-readonly
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            readOnly
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            placeholder="Enter Your Email"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
            aria-readonly
          />
        </div>

        {/* <div className="mb-5">
          <input
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            placeholder="Password"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div> */}

        <div className="mb-5">
          <input
            required
            min={0}
            type="number"
            value={formData.phone}
            onChange={handleInputChange}
            name="phone"
            placeholder="phone number"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>

        <div className="mb-5">
          <input
          required
            type="string"
            value={formData.address}
            onChange={handleInputChange}
            name="address"
            placeholder="Address"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>

        <div className="mb-5">
          <input
          required
          min={1}
            type="number"
            value={formData.age}
            onChange={handleInputChange}
            name="age"
            placeholder="Age"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>

        <div className="mb-5">
          <input
          required
            type="text"
            value={formData.bloodType}
            onChange={handleInputChange}
            name="bloodType"
            placeholder="Blood Group"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>

        <div className="mb-5 flex items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7]">
            Gender:
            <select
            required
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-[#0067FF] flex items-center justify-center">
              <img
                src={formData.photo}
                alt="Preview"
                className="w-full rounded-full"
              />
            </figure>
          )}
          <div className="relative inline-block w-[130px] h-[50px]">
            <input
            required
              className="custom-file-input absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              id="customFile"
              name="photo"
              type="file"
              accept=".jpg,.png"
              placeholder="Upload Profile"
              onChange={handleFileInputChange}
            />

            <label
              className="custom-file-label absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
              htmlFor="customFile"
            >
              {selectedFile ? "Photo Selected" : "Upload Photo"}
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            type="submit"
            className="w-full bg-[#0067FF] text-white py-3 px-4 rounded-lg text-[18px] leading-[30px]"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
