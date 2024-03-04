
import { useEffect, useState } from "react"
import Search from "../search"

export default function Weather() {
  const [search,setSearch] = useState('');
  const [loading,setLoading] = useState(false);
  const [weatherData,setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    if(!param){
      param = "Hyderabad";
    }
    setLoading(true);
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=ff4539fe52329a3b53a217399a808f25`);
      const data = await response.json();
      console.log(data);
      if(data){
        setWeatherData(data);
        setLoading(false);
      }

    }catch(e){
      setLoading(false);
      console.log(e);
    }
  }

  function handleSearch() {
    fetchWeatherData(search);
  }
  
  function toProperCase(str) {
    if (typeof str !== 'string') {
      return ''; // Return an empty string if the input is not a string
    }
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  
  

  useEffect(() => {
    fetchWeatherData('chennai');
  },[]);

  return <div>
    <Search
      search={search}
      setSearch={setSearch}
      handleSearch={handleSearch}
    />
    {
      loading ? (
        <div>Loading ....</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name},
              <span>
                {' '}
                {weatherData?.sys?.country}
              </span>
            </h2>
          </div>
          <div className="date">
            <span>
              {new Date().toLocaleDateString('en-us',{
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          <div className="temperature">
            {(weatherData?.main?.temp - 273.15).toFixed(2)}
            <span>
            {''}
            °C
            </span>
            <p className="feels-like">
              <span style={{fontWeight: 'bold',fontStyle: 'italic'}}>Feels Like : </span>
              {(weatherData?.main?.feels_like - 273.15).toFixed(2)}
              <span>
            °C
            </span>
            </p>
          </div>
          <p className="description">
            <span style={{fontWeight: 'bold',fontStyle: 'italic'}}>Description : </span>
            {toProperCase(weatherData?.weather[0]?.description)}
          </p>
          <div className="weather-info">
            <div className="weather-box">
              <div>
                <p className="parameter">Wind Speed</p>
                <p className="wind">{weatherData?.wind?.speed}{' mph'}</p>
              </div>
            </div>
            <div className="weather-box">
              <div>
                <p className="parameter">Humidity</p>
                <p className="humidity">{weatherData?.main?.humidity}{"%"}</p>
              </div>
            </div>
            <div className="weather-box">
              <div>
                <p className="parameter">Time</p>
                <p>{new Date().getHours()} : {new Date().getMinutes()} : {new Date().getSeconds()}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  </div>
}