import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import axios from 'axios';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import FlagIcon from '@mui/icons-material/Flag';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Box from '@mui/material/Box';




export default function Employees() {
  const [employees, setEmployees] = React.useState([]);
  const [filterPopupOpen, setFilterPopupOpen] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('');
  const [selectedCities, setSelectedCities] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/EMS/employee/allEmployees");
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }

  const handleSearch = async (e) => {
    const key = e.target.value;

    if (key) {
      const response = await axios.get(`http://localhost:5000/EMS/employee/search/${key}`)
      if (response.data) {
        setEmployees(response.data);
      }
    } else {
      getEmployees();
    }
  }

  const handleFilterIconClick = () => {
    setFilterPopupOpen(!filterPopupOpen);
  }

  const handleSortChange = (value) => {
    setSortBy(value);
    setFilterPopupOpen(false);
  }

  const handleCityCheckboxChange = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter(c => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  }

  // Sorting logic
  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortBy === 'asc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'desc') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  // Filtering logic
  const filteredEmployees = sortedEmployees.filter(employee => {
    if (selectedCities.length === 0) return true;
    return selectedCities.includes(employee.city);
  });

  return (
    <div>
      <div className="flex justify-center gap-5 mx-5 my-5 align-middle">
        <Card  sx={{ minWidth: 180, minHeight:250}} className="p-0 flex gap-3 justify-center bg-gradient-to-r from-gray-100 to-stone-100"> 
          <CardContent className="m-0 p-0">
            
                <img src="../../public/employee.svg" className="h-10"/>
            
            <h3 className="text-gray-600 text-xs font-bold mt-2">Total Employees</h3>
            <h1 className="text-gray-700 text-2xl font-bold">2102</h1>
            <div className="flex">
              <h3 className="text-green-400 font-semibold text-sm mx-1">+25% </h3>
              <h4 className="text-gray-600 text-sm font-semibold"> This Month</h4></div>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 180, height: 150 }} className="flex justify-center bg-gradient-to-r from-gray-100 to-stone-100"> 
          <CardContent>
            <div className="flex justify-center">
                <img src="../../public/totalTasks.svg" className="h-14"/>
            </div>
            <h3 className="text-gray-600 text-xs font-bold text-center mt-2">Total Employees</h3>
            <h1 className="text-gray-700 text-2xl font-bold text-center">2102</h1>
            <div className="flex justify-center">
              <h3 className="text-green-400 font-semibold text-sm mx-1">+25% </h3>
              <h4 className="text-gray-600 text-sm font-semibold"> This Month</h4></div>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 180, height: 150 }} className="flex justify-center bg-gradient-to-r from-gray-100 to-stone-100"> 
          <CardContent>
            <div className="flex justify-center">
                <img src="../../public/taskCompleted.svg" className="h-14"/>
            </div>
            <h3 className="text-gray-600 text-xs font-bold text-center mt-2">Completed Tasks</h3>
            <h1 className="text-gray-700 text-2xl font-bold text-center">2102</h1>
            <div className="flex justify-center">
              <h3 className="text-green-400 font-semibold text-sm mx-1">+25% </h3>
              <h4 className="text-gray-600 text-sm font-semibold"> This Month</h4></div>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 180, height: 150 }} className="flex justify-center bg-gradient-to-r from-gray-100 to-stone-100"> 
          <CardContent>
            <div className="flex justify-center">
                <img src="../../public/pendingTask.svg" className="h-14"/>
            </div>
            <h3 className="text-gray-600 text-xs font-bold text-center mt-2">Incompleted Tasks</h3>
            <h1 className="text-gray-700 text-2xl font-bold text-center">2102</h1>
            <div className="flex justify-center">
              <h3 className="text-green-400 font-semibold text-sm mx-1">+25% </h3>
              <h4 className="text-gray-600 text-sm font-semibold"> This Month</h4></div>
          </CardContent>
        </Card>

      </div>

      <h1 className="text-3xl font-semibold text-violet-500 dark:text-white my-3 py-2 text-center">Employees</h1>
      <div>
        <div className=" searchAndFilter flex mx-auto items-center justify-between md:px-10 px-3 mt-3">

          <div className="flex items-center">
            <div className='flex bg-white rounded-3xl w-80 mx-2 justify-center bg-gray-200 relative'>
              <input
                onChange={handleSearch}
                type="text"
                name="q"
                className="w-full bg-gray-200 h-12 p-4 rounded-full focus:outline-none"
                placeholder="Search..."
              />
              <button className='p-2 text-gray-600 absolute inset-y-0 right-0'>
                <SearchSharpIcon />
              </button>
            </div>

            <div className="relative">
              <FilterListIcon className="mr-2 hover:cursor-pointer" onClick={handleFilterIconClick} />
              {filterPopupOpen && (
                <div className="popup absolute bg-white border border-gray-300 rounded p-2 mt-2 right-0 z-10 w-60 px-4" sx={{ borderRadius: '25px' }}>
                  <div className="border-b-2 pb-2">
                    <button className="sort px-1 my-1" onClick={() => handleSortChange('asc')}>Sort by Name (A-Z)</button>
                    <button className="sort px-1 my-1" onClick={() => handleSortChange('desc')}>Sort by Name (Z-A)</button>
                  </div>
                  <div>
                    <h3 className="mt-3 mb-2">Filter by City:</h3>
                    <div>
                      <label>

                        <input className="mx-2 my-2" type="checkbox" checked={selectedCities.includes('New York')} onChange={() => handleCityCheckboxChange('New York')} />
                        New York
                      </label>
                    </div>
                    <div>
                      <label>

                        <input className="mx-2 my-2" type="checkbox" checked={selectedCities.includes('Delhi')} onChange={() => handleCityCheckboxChange('Delhi')} />
                        Delhi
                      </label>
                    </div>
                    <div>
                      <label>

                        <input className="mx-2 my-2" type="checkbox" checked={selectedCities.includes('Mumbai')} onChange={() => handleCityCheckboxChange('Mumbai')} />
                        Mumbai
                      </label>
                    </div>
                    <div>
                      <label>

                        <input className="mx-2 my-2" type="checkbox" checked={selectedCities.includes('Bangalore')} onChange={() => handleCityCheckboxChange('Bangalore')} />
                        Bangalore

                      </label>
                    </div>
                    <div>
                      <label>

                        <input className="mx-2 my-2" type="checkbox" checked={selectedCities.includes('Ahemdabad')} onChange={() => handleCityCheckboxChange('Ahemdabad')} />
                        Ahemdabad
                      </label>
                    </div>
                    <div>
                      <label>

                        <input className="mx-2 my-2" type="checkbox" checked={selectedCities.includes('Dehradun')} onChange={() => handleCityCheckboxChange('Dehradun')} />
                        Dehradun
                      </label>
                    </div>
                    <div>
                      <label>

                        <input className="mx-2 my-2" type="checkbox" checked={selectedCities.includes('Lucknow')} onChange={() => handleCityCheckboxChange('Lucknow')} />
                        Lucknow
                      </label>
                    </div>
                    <div>
                      <label>

                        <input className="mx-2 my-2" type="checkbox" checked={selectedCities.includes('Sheinghai')} onChange={() => handleCityCheckboxChange('Sheinghai')} />
                        Sheinghai

                      </label>
                    </div>
                    <div>
                      <label>

                        <input className="mx-2 my-2" type="checkbox" checked={selectedCities.includes('London')} onChange={() => handleCityCheckboxChange('London')} />
                        London
                      </label>
                    </div>
                    {/*I can add more cities as needed */}
                  </div>
                </div>
              )}
            </div>
          </div>


          <div>
            <button type="button" onClick={() => { navigate('/addEmployee') }} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700  hover:cursor-pointer hover:scale-105 hover:duration-200 hover:transition-transform hover:ease-in-out shadow-2xl"><AddIcon />Add Employee</button>
          </div>
        </div>
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-4 md:px-10 py-4 grid-cols-2 px-3">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee, index) => (
            <Card
              key={index}
              sx={{ maxWidth: 345, borderRadius: '25px', boxShadow: '0px 5px 20px rgba(0, 10, 5, 0.2)' }}
              className="card m-3 hover:cursor-pointer hover:scale-105 hover:duration-200 hover:transition-transform hover:ease-in-out shadow-2x"

              onClick={() => {
                navigate(`/employeeDetails/${employee._id}`);
              }}
            >
              <CardHeader
                className="bg-gradient-to-r from-violet-200 to-violet-400"
                avatar={
                  <Avatar sx={{ bgcolor: 'black' }} aria-label="recipe">
                    {employee.name.charAt(0).toUpperCase()}
                  </Avatar>
                }
                title={employee.name}
                subheader={employee.joiningDate}
              />
              <CardMedia
                component="img"
                height="194"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDY5FlTbWIatHXzVDLQbK8bZaQLQcFjXlCuc6ok0LnZg&s"
                alt="Employee Avatar"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <h2><PhoneIcon />: {employee.email}</h2>
                  <h2 className="mt-1"><PlaceIcon />: {employee.city}</h2>
                  <h2 className="mt-1"><FlagIcon />: {employee.country}</h2>
                  <h2 className="mt-1"><AcUnitIcon />: {employee.gender}</h2>
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>Employee Doesn't Exist</p>
        )}
      </div>
    </div>
  );
}
