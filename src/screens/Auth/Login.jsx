import { Col, Row } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../redux/actions/authApis";
import { getReducer } from "../../redux/reducer";
import { useDispatch } from "react-redux";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setToken = getReducer("token");
  const setLoginData = getReducer("userInfo");
  const setLayout = getReducer("layout");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({ username: "", password: "" }); // New state for input values
  const [showPassword, setShowPassword] = useState(false);

  const GoToRegisterPage = () => {
    navigate("/register");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value })); // Update state based on input changes
  };

  return (
    <div className="min-h-screen bg-[#01010f] text-white">
      <Row className="flex items-center min-h-screen">
        {/* Left Section: Registration Form */}
        <Col xs={24} md={10} className="">
          <div className="mx-7">
            <h1 className="text-[20px] font-normal text-[#CCCCCC]">Login</h1>
            <p className="text-xs text-[#777777] mb-6">
              Lorem ipsum dolor sit amet, consectetur
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                authApi(
                  dispatch,
                  data,
                  setToken,
                  setLoginData,
                  setLoader,
                  setLayout,
                  "auth/login",
                  navigate
                );
              }}
            >
              <Row gutter={[20, 20]}>
                <Col span={12}>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      value={data.username}
                      onChange={handleInputChange}
                      className={`block rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-[#FFFFFFE5] bg-[#141422] dark:bg-[#141422] appearance-none focus:outline-none focus:ring-0 focus:border-[#000000] dark:focus:border-[#000000] peer`}
                      placeholder=" "
                    />
                    <label htmlFor="username" className="input-label">
                      Username
                    </label>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={data.password}
                      onChange={handleInputChange}
                      className={`block rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-[#FFFFFFE5] bg-[#141422] dark:bg-[#141422] appearance-none focus:outline-none focus:ring-0 focus:border-[#000000] dark:focus:border-[#000000] peer`}
                      placeholder=" "
                    />
                    <label htmlFor="password" className="input-label">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 m-4 text-[#000000e5]"
                    >
                      {!showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                    </button>
                  </div>
                </Col>
              </Row>
              <div className="mt-6">
                <button disabled={loader} className="w-full btn-primary">
                  Login
                </button>
              </div>
              <div className="mt-6">
                <button
                  onClick={GoToRegisterPage}
                  className="w-full btn-outline-green"
                >
                  Register Yourself
                </button>
              </div>
            </form>

            <div className="mt-9">
              <Link
                to="/forgot/password"
                className="flex items-center justify-center cursor-pointer bg-transparent text-[#349800] hover:text-[#349800]  text-[15px] font-medium"
              >
                Forgot Password?
              </Link>
            </div>

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
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
