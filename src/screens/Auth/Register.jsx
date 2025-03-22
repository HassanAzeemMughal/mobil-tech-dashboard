import React, { useState } from "react";
// import RegisterImage from "../../assets/images/register.png";
import { Col, notification, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../redux/actions/authApis";
import { getReducer } from "../../redux/reducer";
import { useDispatch } from "react-redux";
import ApiService from "../../services/ApiService";
// import ImageComponent from "../../components/ImageComponent";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setToken = getReducer("token");
  const setLoginData = getReducer("userInfo");
  const setLayout = getReducer("layout");
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Update state
  };

  const GoToLoginPage = () => {
    navigate("/login");
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    setLoader(true);

    try {
      const response = await ApiService.post("/auth/register", formData);

      if (response.success) {
        const { authToken, user, message } = response;
        // Store in localStorage
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("user", JSON.stringify(user));

        notification.success({
          message: "Success",
          description: message,
          placement: "topRight", // Position of the notification
        });
        // Reset specific fields instead of clearing the entire form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });

        navigate("/admin/dashboard");
      } else {
        alert("An error occurred during registration");
      }
    } catch (error) {
      console.error("Error during registration:", error);

      alert("An error occurred during registration");
    } finally {
      setLoader(false); // Set loader to false after the request is complete
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Row className="flex items-center min-h-screen">
        {/* Left Section: Registration Form */}
        <Col xs={24} md={10} className="">
          <div className="mx-7">
            <h1 className="text-[20px] font-normal text-[#CCCCCC]">
              Register Yourself
            </h1>
            <p className="text-xs text-[#777777] mb-6">
              Lorem ipsum dolor sit amet, consectetur
            </p>
            <form onSubmit={handleRegister}>
              <Row gutter={[20, 20]}>
                <Col span={12}>
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName" // Assigning the name to the input field
                      value={formData.firstName} // Bind input value to state
                      onChange={handleInputChange} // Add onChange handler
                      className={`block rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-[#FFFFFFE5] bg-[#141422] dark:bg-[#141422] appearance-none focus:outline-none focus:ring-0 focus:border-[#000000] dark:focus:border-[#000000] peer`}
                      placeholder=" "
                    />
                    <label htmlFor="firstName" className="input-label">
                      First Name
                    </label>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName" // Assigning the name to the input field
                      value={formData.lastName} // Bind input value to state
                      onChange={handleInputChange} // Add onChange handler
                      className={`block rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-[#FFFFFFE5] bg-[#141422] dark:bg-[#141422] appearance-none focus:outline-none focus:ring-0 focus:border-[#000000] dark:focus:border-[#000000] peer`} // Adding a class for date type
                      placeholder=" "
                    />
                    <label htmlFor="lastName" className="input-label">
                      Last Name
                    </label>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="relative">
                    <input
                      type="text"
                      name="email" // Assigning the name to the input field
                      value={formData.email} // Bind input value to state
                      onChange={handleInputChange} // Add onChange handler
                      className={`block rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-[#FFFFFFE5] bg-[#141422] dark:bg-[#141422] appearance-none focus:outline-none focus:ring-0 focus:border-[#000000] dark:focus:border-[#000000] peer`} // Adding a class for date type
                      placeholder=" "
                    />
                    <label htmlFor="email" className="input-label">
                      Email
                    </label>
                  </div>
                </Col>
                {/* <Col span={12}>
                  <div className="relative">
                    <input
                      type="date"
                      name="birthdate" // Assigning the name to the input field
                      value={formData.birthdate} // Bind input value to state
                      onChange={handleInputChange} // Add onChange handler
                      className={`block rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-[#FFFFFFE5] bg-[#141422] dark:bg-[#141422] appearance-none focus:outline-none focus:ring-0 focus:border-[#000000] dark:focus:border-[#000000] peer`} // Adding a class for date type
                      placeholder=" "
                    />
                    <label htmlFor="birthdate" className="input-label">
                      Date of birth
                    </label>
                  </div>
                </Col> */}
                <Col span={12}>
                  <div className="relative">
                    <input
                      type="password" // Change type to password for security
                      name="password" // Assigning the name to the input field
                      value={formData.password} // Bind input value to state
                      onChange={handleInputChange} // Add onChange handler
                      className={`block rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-[#FFFFFFE5] bg-[#141422] dark:bg-[#141422] appearance-none focus:outline-none focus:ring-0 focus:border-[#000000] dark:focus:border-[#000000] peer`} // Adding a class for date type
                      placeholder=" "
                    />
                    <label htmlFor="password" className="input-label">
                      Password
                    </label>
                  </div>
                </Col>
                {/* <Col span={12}>
                  <div className="relative">
                    <input
                      type="password" // Change type to password for security
                      name="confirmPassword" // Assigning the name to the input field
                      value={formData.confirmPassword} // Bind input value to state
                      onChange={handleInputChange} // Add onChange handler
                      className={`block rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-[#FFFFFFE5] bg-[#141422] dark:bg-[#141422] appearance-none focus:outline-none focus:ring-0 focus:border-[#000000] dark:focus:border-[#000000] peer`} // Adding a class for date type
                      placeholder=" "
                    />
                    <label htmlFor="confirmPassword" className="input-label">
                      Confirm Password
                    </label>
                  </div>
                </Col> */}
              </Row>

              <div className="mt-6">
                <button disabled={loader} className="w-full btn-primary">
                  Sign Up
                </button>
              </div>
              <div className="mt-6">
                <button
                  onClick={GoToLoginPage}
                  className="w-full btn-outline-green"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="text-[#FFFFFF80] text-xs mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              pretium porta eros imperdiet posuere. Nulla sagittis blandit
              sodales. Donec lobortis dapibus nunc vel vehicula. Ut a efficitur
              purus. Duis id mollis massa.
            </p>
          </div>
        </Col>

        {/* Right Section: Image Grid */}
        <Col xs={24} md={14}>
          <div className="w-full h-[97vh] p-2">
            {/* <ImageComponent
              src={RegisterImage}
              alt="Crypto Bull"
              className="w-full h-full object-cover rounded-3xl"
            /> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
