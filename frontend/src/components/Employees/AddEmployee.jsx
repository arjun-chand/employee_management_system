import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';


const steps = ['Fill Employee Peronal Details', 'Contact Details', 'Form Submission'];

export default function AddEmployee() {

  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [emailError, setEmailError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const countries = Country.getAllCountries().map(country => ({
      value: country.isoCode,
      label: country.name
    }));
    setCountryOptions(countries);
  }, []);

  useEffect(() => {
    if (country) {
      const states = State.getStatesOfCountry(country);
      setStateOptions(states.map(state => ({
        value: state.isoCode,
        label: state.name
      })));
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      const cities = City.getCitiesOfState(country, state);
      setCityOptions(cities.map(city => ({
        value: city.name,
        label: city.name
      })));
    }
  }, [country, state]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption.value);
    setCountry(selectedOption.value); // Update country state
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption.value);
    setState(selectedOption.value); // Update state state
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption.value);
    setCity(selectedOption.value); // Update city state
  };



  // Function to validate email using regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    // Validate email before submitting
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3100/emp/add', {
        name,
        email,
        phone,
        city,
        state,
        country,
        gender,
        education,
        hobbies
      },
        {
          headers: {
            "Content-Type": "application/json"
          }
        });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
    navigate('/')
  };

  return (
    <>
      <div className='px-4'>
        <Box className="px-4" sx={{ width: '100%' }}>
          <Stepper className='mx-6 my-6' nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={index < activeStep}>
                <StepButton onClick={() => setActiveStep(index)}>{label}</StepButton>
              </Step>
            ))}
          </Stepper>
          <div className='px-5 w-auto' >
            {activeStep === 0 && (
              <div className='flex flex-col justify-center w-2/4 px-2 gap-4 py-4 mx-auto'>
                <h1 className='text-lg leading-6 md:w-auto font-medium text-gray-900 my-6 text-center'>Employee Details</h1>

                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  name="name"
                  id="name"
                  className={`p-4 block w-full md:w-auto rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6 ${name.trim() === '' ? 'border-red-500' : ''}`}
                  placeholder="Enter Full Name"
                />
                {name.trim() === '' && (
                  <p className="text-red-500">Name cannot be empty</p>
                )}
                <select
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                  id="gender"
                  name="gender"
                  className="p-4 block w-full md:w-auto rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <Select
                  value={{ value: selectedCountry, label: selectedCountry }}
                  onChange={handleCountryChange}
                  options={countryOptions}
                  placeholder="Select Country"
                />

                <Select
                  value={{ value: selectedState, label: selectedState }}
                  onChange={handleStateChange}
                  options={stateOptions}
                  placeholder="Select State"
                />

                <Select
                  value={{ value: selectedCity, label: selectedCity }}
                  onChange={handleCityChange}
                  options={cityOptions}
                  placeholder="Select City"
                />




                <input
                  onChange={(e) => setEducation(e.target.value)}
                  value={education}
                  type="text"
                  name="education"
                  id="education"
                  className="block mb-2 md:mr-2 md:mb-0 w-full md:w-auto rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                  placeholder="Education"
                />
                <input
                  onChange={(e) => setHobbies(e.target.value)}
                  value={hobbies}
                  type="text"
                  name="hobbies"
                  id="hobbies"
                  className="block w-full md:w-auto rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                  placeholder="Enter the Hobbies"
                />
              </div>

            )}
            {activeStep === 1 && (
              <div>
                <h1 className='text-lg leading-6 font-medium text-gray-900 text-center my-6'>Employee Contact Details</h1>
                <div className='flex justify-center gap-2'>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    name="email"
                    id="email"
                    className={`w-full md:w-auto rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6`}
                    placeholder="Email"
                  />
                  {emailError && <p className="text-red-500">{emailError}</p>}
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    type="tel"
                    name="phone"
                    id="phone"
                    className="w-full md:w-auto rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            )}
            <div>
              {activeStep === steps.length - 1 && (
                <div className='pb-10 mx-auto'>
                  <div className='p-6 w-3/5 mx-auto rounded-3xl bg-violet-100' sx={{ display: 'flex', boxShadow: '0px 5px 20px rgba(0, 10, 5, 0.3)', width: '40%' }}>
                    <h1 className='text-lg leading-6 font-medium text-gray-900 text-center my-6'>Employee Details</h1>
                    <div className='flex justify-between'><p>Name</p><p>:</p><p> {name}</p></div>
                    <div className='flex justify-between mt-2'><p>Email</p><p>:</p><p>{email}</p></div>
                    <div className='flex justify-between  mt-2'><p>City</p><p>:</p><p>{city}</p></div>
                    <div className='flex justify-between  mt-2'><p>State</p><p>:</p><p>{state}</p></div>
                    <div className='flex justify-between  mt-2'><p>Country</p><p>:</p><p>{country}</p></div>
                    <div className='flex justify-between  mt-2'><p>Gender</p><p>:</p><p>{gender}</p></div>
                    <div className='flex justify-between  mt-2'><p>Education</p><p>:</p><p>{education}</p></div>
                    <div className='flex justify-between  mt-2 mb-5'><p>Hobbies</p><p>:</p><p>{hobbies}</p></div>
                  </div>
                  <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700  hover:cursor-pointer hover:scale-105 hover:duration-200 hover:transition-transform hover:ease-in-out shadow-2xl' onClick={handleSubmit}>Submit <TurnedInIcon className='mx-1' /></button>
                </div>
              )}
            </div>
            <div className="flex justify-between mt-10">
              {activeStep !== 0 && (
                <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700  hover:cursor-pointer hover:scale-105 hover:duration-200 hover:transition-transform hover:ease-in-out shadow-2xl" onClick={handleBack} sx={{ mr: 1 }}>
                  <KeyboardReturnIcon className='mx-1' />
                  Back
                </button>
              )}
              {activeStep !== steps.length - 1 && (
                <div>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700  hover:cursor-pointer hover:scale-105 hover:duration-200 hover:transition-transform hover:ease-in-out shadow-2xl" onClick={handleNext} sx={{ mr: 1 }}>
                    Next <ArrowRightAltIcon className='mx-1' />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
