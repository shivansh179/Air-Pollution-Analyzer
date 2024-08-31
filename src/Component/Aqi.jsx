import React, { useState, useEffect } from 'react';
import logo from '../Images/tree.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";
import { useNavigate } from 'react-router-dom';

const Aqi = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [aqi, setAqi] = useState(null);
  const [airvalue, setAirvalue] = useState(null);
  const [pollutants, setPollutants] = useState({});

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
      console.log("Signed out successfully");
    }).catch((error) => {
      console.error("An error happened during sign out:", error);
    });
  }

  const app_id = "08410c7e83987e29aeec9d51286971ee";
  const link = "https://api.openweathermap.org/data/2.5/air_pollution";

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onPositionGathered);
    } else {
      alert("Can't access location. Enter coordinates manually");
    }
  };

  const onPositionGathered = (pos) => {
    setLat(pos.coords.latitude.toFixed(4));
    setLon(pos.coords.longitude.toFixed(4));
    const { latitude, longitude } = pos.coords;
    getAirQuality(latitude.toFixed(4), longitude.toFixed(4));
  };

  const getAirQuality = async (lat, lon) => {
    try {
      const rawData = await fetch(`${link}?lat=${lat}&lon=${lon}&appid=${app_id}`);
      const airData = await rawData.json();
      setAqi(airData.list[0].main.aqi);
      setValuesOfAir(airData);
      setPollutants(airData.list[0].components);
    } catch (error) {
      console.error("There is a problem:", error);
    }
  };

  const setValuesOfAir = airData => {
    const aqi = airData.list[0].main.aqi;
    let airStat = "";

    setAqi(aqi);

    switch (aqi) {
      case 1:
        airStat = "Good";
        break;
      case 2:
        airStat = "Fair";
        break;
      case 3:
        airStat = "Moderate";
        break;
      case 4:
        airStat = "Poor";
        break;
      case 5:
        airStat = "Very Poor";
        break;
      default:
        airStat = "Unknown";
    }

    setAirvalue(airStat);
  };

  const getColorForAirValue = (airvalue) => {
    switch (airvalue) {
      case 'Good':
        return 'text-green-400';
      case 'Fair':
        return 'text-yellow-300';
      case 'Moderate':
        return 'text-orange-400';
      case 'Poor':
        return 'text-red-500';
      case 'Very Poor':
        return 'text-red-700';
      default:
        return 'text-white';
    }
  };

  const getPollutantFullName = (key) => {
    switch (key) {
      case 'co':
        return 'Carbon Monoxide';
      case 'no':
        return 'Nitrogen Monoxide';
      case 'no2':
        return 'Nitrogen Dioxide';
      case 'o3':
        return 'Ozone';
      case 'so2':
        return 'Sulphur Dioxide';
      case 'pm2_5':
        return 'Fine Particles Matter';
      case 'pm10':
        return 'Coarse Particulate Matter';
      case 'nh3':
        return 'Ammonia';
      default:
        return key;
    }
  };

  const handleSearch = () => {
    if (lat && lon) {
      getAirQuality(lat, lon);
      toast.success("Data Fetched!");
    } else {
      alert("Please enter latitude and longitude values.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/air.jpg')` }} // Use your background image URL
    >
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-6 font-serif text-white">Air Pollution Analyzer</h1>

      <div className="backdrop-blur-lg bg-opacity-80 p-6 rounded-lg shadow-2xl border border-gray-200 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-white ">Your Location:</h2>
        <div className="flex flex-col mb-4">
          <label htmlFor="latitude" className="text-lg font-medium text-white">Latitude</label>
          <input
            type="number"
            name="lat"
            placeholder="Latitude"
            id="latitude"
            className="mt-2 p-2 border border-gray-300 font-serif rounded"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="longitude" className="text-lg font-medium text-white">Longitude</label>
          <input
            type="number"
            name="lon"
            placeholder="Longitude"
            id="longitude"
            className="mt-2 p-2 border border-gray-300 font-serif rounded"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-shadow shadow-lg hover:shadow-xl mb-4"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {aqi && (
        <div className="backdrop-blur-sm bg-opacity-80 p-6 rounded-lg shadow-2xl border border-gray-200 w-full max-w-md mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">Air Quality Index:</h2>
          <div className="flex items-center">
            <span className="text-4xl font-bold text-white">{aqi}</span>
            <span className="text-4xl mx-2 text-white">&rarr;</span>
            <span className={`text-4xl font-bold ${getColorForAirValue(airvalue)}`}>{airvalue}</span>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-4 text-white">Concentration of pollutants in air:</h2>
            {Object.entries(pollutants).map(([key, value]) => (
              <div key={key} className="flex justify-between mb-2">
                <h3 className="text-lg font-medium text-white">{getPollutantFullName(key)}:</h3>
                <span className="text-lg text-white">{value} µg/m³</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="flex items-center mt-6">
        <span className="text-white text-lg">Plant more</span>
        <img src={logo} alt="logo" className="ml-2 w-9 h-9" />
      </footer>
      
      <button
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-shadow shadow-lg hover:shadow-xl"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Aqi;
