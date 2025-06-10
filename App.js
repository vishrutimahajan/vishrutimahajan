import { useState } from 'react';
import './App.css';

const apikey= "8da84079af567e5160f1b6208020e095"

export function App(){
  const [weather, setWeather]= useState({})
  function handleSubmit (event){
    event.preventDefault()

    let city = event.target.city.value
    if(!city)
    {
      alert("Please provide your city name")
      return
    }

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey)
    .then(response => {
      if(!response.ok){
        throw new Error()
      }
      return response.json()
    })
    .then (data =>{
      setWeather({
        icon: "https://openweathermap.org/img/wn/"+ data.weather[0].icon + "@2x.png",
        temp: data.main.temp,
        city: data.name,
        humidity: data.main.humidity,
        speed :data.wind.speed
      });
    })
    .catch(error =>{
      alert("Unable to fetch the weather forecast")
    }); 
  } 
  return (
   <div className="container my-5">
            <div className="mx-auto rounded border text-center text-white p-4"
                style={{ backgroundColor: "#3B5FAB", width: "400px" }}>
                <h2 className="fw-bold mb-5">Weather Forecast</h2>

                <form className="d-flex mb-3" onSubmit={handleSubmit}>
                    <input className="form-control me-2" placeholder="City" name="city" />
                    <button className="btn btn-outline-light" type="submit">Search</button>
                </form>

                <img src= {weather.icon} alt="..." />
                <h1 className="display-4 fw-medium">{weather.temp} °K</h1>
                
                <h1 className="mb-5">{weather.city}</h1>
                <div className="row mb-3">
                    <div className="col">
                        <i className="bi bi-water"></i> Humidity<br />
                        {weather.humidity}%
                    </div>
                    <div className="col">
                        <i className="bi bi-wind"></i> Wind Speed<br />
                       {weather.speed}km/h
                    </div>
                </div>
            </div>
        </div>
  );


}
export default App;





