import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'


const WeatherApp = ({isAuth}) => {

    const [searchWord,setSearchWord] = useState("");
    const [humidity,setHumidity]=useState(0);
    const [wind,setWind]=useState(0);
    const [temp,setTemp]=useState(0);
    const [location,setLocation]=useState("");
    const [icon,setIcon]=useState("");
    const [data,setData]=useState(null);

    const api_key="b81e9926405cf1092efed53bc5b70b86";

    const search= async ()=>{
        if(searchWord.length===0)return 0;
        try{
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchWord}&units=Metric&appid=${api_key}`
            let res = await fetch(url);
            let data =await res.json();
            setData(data);
            setTemp(Math.floor(data.main.temp));
            setWind(Math.floor(data.wind.speed));
            setLocation(data.name)
            setHumidity(data.main.humidity);
            switch(data.weather.icon){
                case "01d"||"01n":
                    setIcon(clear_icon);
                    break;
                case "02d"||"02n":
                    setIcon(cloud_icon);
                    break;
                case "04d"||"04n":
                    setIcon(drizzle_icon);
                    break;
                case "11d"||"11n":
                    setIcon(wind_icon);
                    break;
                case "09d"||"09n":
                    setIcon(rain_icon);
                    break;
                case "10d"||"10n":
                    setIcon(rain_icon);
                    break;
                case "13d"||"13n":
                    setIcon(snow_icon);
                    break;
                default: setIcon(clear_icon)
            }
            
        }catch(err){
            console.error(err);
        }


        
    }

  return (
    <>
        {!isAuth&& <div>Please login to see the weather app</div>}
        {isAuth&&(
            <div className='Container'>
            <h3 className='header'>Weather App</h3>
            <div className='top-bar'>
                <input type="text" className="cityInput" placeholder='Search' value={searchWord} onChange={(e)=>setSearchWord(e.target.value)}/>
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="search icon" />
                </div>
            </div>
            {data && (
                <>
                    <div className="weather-image">
                    <img src={icon.length>0?icon:cloud_icon} alt="cloud" />
                    </div>
                    <div className="weather-temp">{temp} °C</div>
                    <div className="weather-location">{location}</div>
                    <div className="data-container">
                        <div className="element">
                            <img src={humidity_icon} alt="humid icon" className="icon" />
                            <div className="data">
                                <div className="humidity-percent">{humidity}%</div>
                                <div className="text">Humidity</div>
                            </div>
                        </div>
    
                        <div className="element">
                            <img src={wind_icon} alt="wind icon" className="icon" />
                            <div className="data">
                                <div className="humidity-percent">{wind}km/h</div>
                                <div className="text">wind speed</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            
          
        </div>
        )}
    </>
    



  )
}

export default WeatherApp
