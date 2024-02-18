import './App.css';
import Swal from 'sweetalert2';
import search from "./images/search.png";
import hum from "./images/humidity.png";
import wind from "./images/wind.png";
import clear from "./images/clear.png";//clear-day
import clouds from "./images/clouds.png";//cloudy
import drizzle from "./images/drizzle.png";//drizzle 
import mist from "./images/mist.png";//partly-cloudy-day
import rain from "./images/rain.png";//rain
import snow from "./images/snow.png";//snow  
import clearNight from "./images/cloudy-night_1200407.png";//clear-night
import partly from "./images/lightning_3226431.png";//partly-cloudy-night

import { useState, useEffect } from 'react';
function App() {
  let x = new Date();
  const [Weather, setWeather] = useState([]);
  const [country, setCountry] = useState("Egypt");
  const [addCountry, setAddCountry] = useState("Egypt");
  const [Icon, setIcon] = useState(clear);
  useEffect(() => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Egypt?unitGroup=metric&key=JTA9CWUQPKBJACPKG74QQVXSU&contentType=json`)
      .then((res) => res.json()).then((data) => setWeather(data.days[0].hours[x.getHours()]));
  }, []);
  let formSubmit = () => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}?unitGroup=metric&key=JTA9CWUQPKBJACPKG74QQVXSU&contentType=json`)
      .then((r) => r.json()).then((info) => setWeather(info.days[0].hours[x.getHours()])).catch(() => FoundErrror());
  };
  let FoundErrror = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "country not found",
      footer: 'Please check syntax'
    });
  }
  useEffect(() => {
    if (Weather.icon === "clear-day")
      setIcon(clear)
    else if (Weather.icon === "cloudy")
      setIcon(clouds)
    else if (Weather.icon === "drizzle")
      setIcon(drizzle)
    else if (Weather.icon === "partly-cloudy-day")
      setIcon(mist)
    else if (Weather.icon === "rain")
      setIcon(rain)
    else if (Weather.icon === "snow")
      setIcon(snow);
    else if (Weather.icon === "partly-cloudy-night")
      setIcon(partly)
    else if (Weather.icon === "clear-night")
      setIcon(clearNight)
    else
      setIcon(clouds);


  }, [Weather])

  useEffect(() => {
    setAddCountry(country.toUpperCase());
  }, [Weather])

  return (
    <div className="container">
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input id="a1" type="search" name="Search" placeholder="Search" onChange={(e) => setCountry(e.target.value)} />
          <label htmlFor="a1" onClick={() => formSubmit()}><img src={search} alt="not found.." /> </label>
        </div>
      </form>
      <div className="image">
        <img src={Icon} alt="not found" />
      </div>
      <div className="temp">
        <h1>{Math.ceil(Weather.temp)}°C</h1>
        <h2>{addCountry}</h2>
      </div>
      <div className="air">
        <div className="humidity">
          <img src={hum} alt="not found" />
          <p><span>{Weather.humidity}%</span>Humidity</p>
        </div>
        <div className="wind">
          <img src={wind} alt="not found" />
          <p><span>{Weather.windspeed} km/h</span>Wind Speed</p>
        </div>
      </div>
    </div>
  );
}

export default App;
