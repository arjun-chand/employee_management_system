import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FitbitIcon from '@mui/icons-material/Fitbit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FlagIcon from '@mui/icons-material/Flag';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';

export default function EmployeeDetails() {
    const { id } = useParams();
    const [employee, setEmployee] = React.useState(null);
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const [updatedEmployee, setUpdatedEmployee] = React.useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        country: '',
        gender: '',
        education: '',
        hobbies: ''
    });
    const [countries, setCountries] = React.useState([]);
    const [states, setStates] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const [selectedCountry, setSelectedCountry] = React.useState(null);
    const [selectedState, setSelectedState] = React.useState(null);

    React.useEffect(() => {
        getEmployeeDetails();
        setCountries(Country.getAllCountries());
    }, []);

    const getEmployeeDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3100/emp/employeeDetail/${id}`);
            setEmployee(response.data);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    }

    if (!employee) {
        return <div>Loading...</div>;
    }

    const handleDelete = async (id) => {
        const confirmed = confirm("Are You Sure You want to Delete the Employee?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:3100/emp/delete/${id}`);
                alert("Employee Deleted Successfully");
                navigate('/');
            } catch (error) {
                console.error("Error deleting employee:", error);
                alert("An error occurred while deleting the employee");
            }
        }
    }

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        setStates(State.getStatesOfCountry(selectedOption.value));
        setSelectedState(null);
        setCities([]);
        setUpdatedEmployee(prevState => ({
            ...prevState,
            country: selectedOption.label,
            state: '',
            city: ''
        }));
    };

    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption);
        setCities(City.getCitiesOfState(selectedCountry.value, selectedOption.value));
        setUpdatedEmployee(prevState => ({
            ...prevState,
            state: selectedOption.label,
            city: ''
        }));
    };

    const handleCityChange = (selectedOption) => {
        setUpdatedEmployee(prevState => ({
            ...prevState,
            city: selectedOption.label
        }));
    };

    const handleUpdate = async () => {
        setIsPopupOpen(false);
        try {
            await axios.put(`http://localhost:3100/emp/update/${employee.id}`, updatedEmployee);
            alert("Employee Updated Successfully");
            navigate('/');
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    }

    const handleEdit = () => {
        setIsPopupOpen(true);
        setUpdatedEmployee({ ...employee });
        setSelectedCountry(countries.find(country => country.name === employee.country));
        setStates(State.getStatesOfCountry(countries.find(country => country.name === employee.country).isoCode));
        setSelectedState(states.find(state => state.name === employee.state));
        setCities(City.getCitiesOfState(
            countries.find(country => country.name === employee.country).isoCode,
            states.find(state => state.name === employee.state).isoCode
        ));
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className='flex justify-center'>
            <Card className='employeeDetailCard mt-5 shadow-2xl' sx={{ display: 'flex', boxShadow: '0px 5px 20px rgba(0, 10, 5, 0.3)', width: '40%', borderRadius: '25px', marginTop: '4rem' }}>
                <Box className="mx-4" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <div className='flex'>
                            <BadgeIcon className='mx-2' />
                            <Typography className='text-4xl font-black text-violet-500 dark:text-white' component="div" variant="h5">
                                {employee.name}
                            </Typography>
                        </div>
                        <div className='flex mt-2'>
                            <EmailIcon className='mx-2' />
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {employee.email}
                            </Typography>
                        </div>

                        <div className='flex mt-1'>
                            <PhoneIcon className='mx-2 flex gap-3' />
                            <h2 className='mr-2'>Phone :</h2> <p>{employee.phone}</p>
                        </div>
                        <div className='flex mt-1'>
                            <AcUnitIcon className='mx-2' />
                            <h2 className='mr-2'>Gender :</h2>{employee.gender}
                        </div>
                        <div className='flex mt-1'>
                            <MenuBookIcon className='mx-2' />
                            <h2 className='mr-2'>Education :</h2>{employee.education}
                        </div>
                        <div className='flex mt-1'>
                            <FitbitIcon className='mx-2' />
                            <h2 className='mr-2'>Hobbies :</h2>{employee.hobbies}
                        </div>
                        <div className='flex mt-1'>
                            <FlagIcon className='mx-2' />
                            <h2 className='mr-2'>Country :</h2>{employee.country}
                        </div>
                        <div className='flex mt-1'>
                            <LocationOnIcon className='mx-2' />
                            <h2 className='mr-2'>State :</h2>{employee.state}
                        </div>
                        <div className='flex mt-1'>
                            <LocationCityIcon className='mx-2' />
                            <h2 className='mr-2'>City :</h2>{employee.city}
                        </div>
                    </CardContent>
                    <Box className="my-4" sx={{ display: 'flex' }}>
                        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ml-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 hover:cursor-pointer hover:scale-105 hover:duration-200 hover:transition-transform hover:ease-in-out shadow-2xl" onClick={() => handleDelete(employee._id)}>Delete
                            <DeleteIcon className='mx-2' />
                        </button>
                        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ml-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 hover:cursor-pointer hover:scale-105 hover:duration-200 hover:transition-transform hover:ease-in-out shadow-2xl" onClick={handleEdit}>Update
                            <EditIcon className='mx-2' />
                        </button>
                    </Box>
                </Box>
                <CardMedia
                    className='py-6 flex justify-center'
                    component="img"
                    sx={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDY5FlTbWIatHXzVDLQbK8bZaQLQcFjXlCuc6ok0LnZg&s"
                    alt="Employee avatar"
                />
            </Card>
            {isPopupOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Update Employee Details</h3>
                                        <div className="mb-2">
                                            <input type="text" name="name" value={updatedEmployee.name} onChange={handleInputChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Name" />
                                        </div>
                                        <div className="mb-2">
                                            <input type="email" name="email" value={updatedEmployee.email} onChange={handleInputChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Email" />
                                        </div>
                                        <div className="mb-2">
                                            <input type="tel" name="phone" value={updatedEmployee.phone} onChange={handleInputChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Phone" />
                                        </div>
                                        <div className="mb-2">
                                            <Select
                                                options={countries.map(country => ({ value: country.isoCode, label: country.name }))}
                                                value={selectedCountry}
                                                onChange={handleCountryChange}
                                                placeholder="Select Country"
                                                styles={{ control: (base) => ({ ...base, height: 40, minHeight: 40 }) }}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <Select
                                                options={states.map(state => ({ value: state.isoCode, label: state.name }))}
                                                value={selectedState}
                                                onChange={handleStateChange}
                                                placeholder="Select State"
                                                isDisabled={!selectedCountry}
                                                styles={{ control: (base) => ({ ...base, height: 40, minHeight: 40 }) }}
                                            />
                                        </div>
                                        <Select
                                            options={cities.map(city => ({ value: city.name, label: city.name }))}
                                            value={updatedEmployee.city ? { value: updatedEmployee.city, label: updatedEmployee.city } : null}
                                            onChange={handleCityChange}
                                            placeholder="Select City"
                                            isDisabled={!selectedState}
                                            styles={{ control: (base) => ({ ...base, height: 40, minHeight: 40 }) }}
                                        />
                                        <div className="mb-2">
                                            <input type="text" name="education" value={updatedEmployee.education} onChange={handleInputChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Education" />
                                        </div>
                                        <div className="mb-2">
                                            <input type="text" name="hobbies" value={updatedEmployee.hobbies} onChange={handleInputChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Hobbies" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleUpdate}>Save</button>
                                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={() => setIsPopupOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
