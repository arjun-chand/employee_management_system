import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Alert } from '@mui/joy';
import LinearProgress from '@mui/material/LinearProgress';

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const collectData = async () => {
    if (password !== confirmPassword) {
      setPasswordError("Password and Confirm Password do not match");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3100/signup', {
        name,
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      setAlertMessage("Verification email sent. Please check your inbox. Link will Expire in 5 minutes");
      setAlertSeverity("success");
      setShowAlert(true);
      setLoading(false);

      setTimeout(() => {
        setShowAlert(false);
        navigate('/signin');
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage("Error during signup. Please try again.");
      setAlertSeverity("error");
      setShowAlert(true);
      setLoading(false);
    }
  }

  const handleSignin = () => {
    navigate('/signin');
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      {showAlert && (
        <Alert
          variant="soft"
          color={alertSeverity}
          style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}
        >
          {alertMessage}
        </Alert>
      )}
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1 relative">
      {loading && <LinearProgress style={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100%' }} />}
        <div className="flex-1 bg-violet-100 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 relative">
         
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-violet-500">
                Sign up
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your name"
                />
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email"
                />
                {emailError && (
                  <p className="text-red-500 text-sm">{emailError}</p>
                )}
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                />
                <input
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordError("");
                  }}
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Confirm Password"
                />
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
                <button
                  onClick={collectData}
                  className="mt-5 tracking-wide font-semibold bg-violet-500 text-gray-100 w-full py-4 rounded-lg hover:bg-violet-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link to="/signin">
                    <span className="text-violet-400 font-semibold" onClick={handleSignin}>Sign in</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
