import { Col, message, Row } from "antd";
import React, { useState } from "react";
import forgotPasswordImage from "../../assets/images/forgotPassword.png";
import { useNavigate } from "react-router-dom";
import { forgotPasswordHandler } from "../../api/auth";
import ImageComponent from "../../components/ImageComponent";
import { useLoading } from "../../hooks/useLoading";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const [setLoading] = useLoading();

  const GoToLoginPage = () => {
    navigate("/login");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await forgotPasswordHandler(email);
      if (response.status == "success") {
        message.success("Password reset link send to email.");
      } else {
        message.error("Please retry again!");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error(error.message);
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-[#01010f] text-white">
      <Row className="flex items-center min-h-screen">
        {/* Left Section: Registration Form */}
        <Col xs={24} md={10} className="">
          <div className="mx-7">
            <h1 className="text-[20px] font-normal text-[#CCCCCC]">
              Forgot Password
            </h1>
            <p className="text-xs text-[#777777] mb-6">
              Lorem ipsum dolor sit amet, consectetur
            </p>

            <form onSubmit={handleSubmit}>
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <div className="relative">
                    <input
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      name="email" // Assigning the name to the input field
                      className={`block rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-[#FFFFFFE5] bg-[#141422] dark:bg-[#141422] appearance-none focus:outline-none focus:ring-0 focus:border-[#000000] dark:focus:border-[#000000] peer`} // Adding a class for date type
                      placeholder=" "
                    />
                    <label htmlFor="email" className="input-label">
                      Email
                    </label>
                  </div>
                </Col>
              </Row>

              <div className="mt-6">
                <button type="submit" className="w-full btn-primary">
                  Get Reset Code
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

            <p className="text-[#FFFFFF80] text-xs mt-5">
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
            {/* Main Crypto Bull Image */}
            <ImageComponent
              src={forgotPasswordImage}
              alt="Crypto Bull"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
