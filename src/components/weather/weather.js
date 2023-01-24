import React from 'react';
import './styles.css';

const weatherIcons = {
    "01d": "01d.gif",
    "01n": "01n.gif",
    "02d": "02d.gif",
    "02n": "02n.gif",
    "03d": "03d.gif",
    "03n": "03d.gif",
    "04d": "03d.gif",
    "04n": "03d.gif",
    "09d": "09d.gif",
    "09n": "09d.gif",
    "10d": "09d.gif",
    "10n": "09d.gif",
    "11d": "11d.gif",
    "11n": "11d.gif",
    "13d": "13d.gif",
    "13n": "13d.gif",
    "50d": "50d.gif",
    "50n": "50d.gif"
};

const descriptions = {
    "01d": "Clear skies with plenty of sunshine.",
    "01n": "Clear skies tonight with plenty of stars.",
    "02d": "A few clouds with peaks sunshine.",
    "02n": "Partly cloudy tonight with intermittent stars.",
    "03d": "Cloudy with peaks of sunshine.",
    "03n": "Cloudy tonight with intermittent stars.",
    "04d": "Cloudy with peaks of sunshine.",
    "04n": "Cloudy tonight with intermittent stars.",
    "09d": "Rain with intermittent sunshine.",
    "09n": "Rain tonight with intermittent stars.",
    "10d": "Rain with intermittent sunshine.",
    "10n": "Rain tonight with intermittent stars.",
    "11d": "Thunderstorms, severe at times with peaks of sunshine.",
    "11n": "Thunderstorms tonight, severe at times, with intermittent stars.", 
    "13d": "Snow showers with peaks of sunshine.",
    "13n": "Snow showers tonight with intermittent stars.",
    "50d": "Fog today, likely clearling later with peaks of sunshine.",
    "50n": "Fog tonight with intermittent stars."
}

const CardExampleCard = ({weatherData}) => (
  <div className='main'>
        <div className='greeting'>
            <h1>Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}</h1>
            <p>Here is the weather for today:</p>
        </div>
        <div className='container'>
        <div className='forecast'>
            <div className='forecast-header'>
                <h2 className='city-name'>{weatherData[1].name}</h2>
                <h3>{new Date().toLocaleString('en-US', {weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true})}</h3>
            </div>
            <div className='forecast-content'>
                <div className='temp-container'>
                    <h3>{Math.round(weatherData[0].current.temp)} &deg;C</h3>
                    <img src={require(`./${weatherIcons[weatherData[0].current.weather[0].icon]}`)} alt="weather-icon"></img>
                </div>
                <p className='description'>{descriptions[weatherData[0].current.weather[0].icon]}</p>
            </div>
            <div className='detail-row'>
                    <div className='inner-detail'>
                        <img src={require('./wind.gif')} alt="wind-gif" className='inner-detail-img'></img>
                        <p>Wind</p>
                        <hr></hr>
                        <p id='windspeed'>{Math.round(weatherData[0].current.wind_speed)} km/h</p>
                    </div>
                    <div className='inner-detail'>
                        <img src={require('./feels-like.gif')} alt="pop-gif" className='feels-like'></img>
                        <p>Feels Like</p>
                        <hr></hr>
                        <p id='feels-like'>{Math.round(weatherData[0].current.feels_like)} &deg;C</p>
                    </div>
                    <div className='inner-detail'>
                        <img src={require('./rain.gif')} alt="pop-gif" className='inner-detail-img'></img>
                        <p>P.O.P</p>
                        <hr></hr>
                        <p id='precipitation'>{Math.round((weatherData[0].daily[0].pop)*100)}%</p>
                    </div>
            </div>
        </div>
        <div className='side-container'>
            <div className='forecast second-forecast'>
                <h5>Hourly Forecast</h5>
                <div className='detail-row'>
                    <div className='inner-detail'>
                        <p>{new Date(weatherData[0].hourly[1].dt*1000).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}</p>
                        <img src={require(`./${weatherIcons[weatherData[0].hourly[1].weather[0].icon]}`)} alt="weather-icon"></img>
                        <p>{Math.round(weatherData[0].hourly[1].temp)} &deg;C</p>
                        <hr></hr>
                        <p id='precipitation'>{(weatherData[0].hourly[1].pop)*100}%</p>
                    </div>
                    <div className='inner-detail'>
                    <p>{new Date(weatherData[0].hourly[2].dt*1000).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}</p>
                        <img src={require(`./${weatherIcons[weatherData[0].hourly[2].weather[0].icon]}`)} alt="weather-icon"></img>
                        <p>{Math.round(weatherData[0].hourly[2].temp)} &deg;C</p>
                        <hr></hr>
                        <p id='precipitation'>{(weatherData[0].hourly[2].pop)*100}%</p>
                    </div>
                    <div className='inner-detail'>
                    <p>{new Date(weatherData[0].hourly[3].dt*1000).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}</p>
                        <img src={require(`./${weatherIcons[weatherData[0].hourly[3].weather[0].icon]}`)} alt="weather-icon"></img>
                        <p>{Math.round(weatherData[0].hourly[3].temp)} &deg;C</p>
                        <hr></hr>
                        <p id='precipitation'>{(weatherData[0].hourly[3].pop)*100}%</p>
                    </div>
                </div>
            </div>
            <div className='forecast second-forecast'>
                <h5>3 Day Forecast</h5>
                <div className='detail-row'>
                    <div className='inner-detail'>
                        <p>{new Date(weatherData[0].daily[1].dt*1000).toLocaleString('en-US', {weekday: 'long'})}</p>
                        <img src={require(`./${weatherIcons[weatherData[0].daily[1].weather[0].icon]}`)} alt="weather-icon"></img>
                        <p>{Math.round(weatherData[0].daily[1].temp.day)} &deg;C</p>
                        <hr></hr>
                        <p id='precipitation'>{(weatherData[0].daily[1].pop)*100}%</p>
                    </div>
                    <div className='inner-detail'>
                        <p>{new Date(weatherData[0].daily[2].dt*1000).toLocaleString('en-US', {weekday: 'long'})}</p>
                        <img src={require(`./${weatherIcons[weatherData[0].daily[2].weather[0].icon]}`)} alt="weather-icon"></img>
                        <p>{Math.round(weatherData[0].daily[2].temp.day)} &deg;C</p>
                        <hr></hr>
                        <p id='precipitation'>{(weatherData[0].daily[2].pop)*100}%</p>
                    </div>
                    <div className='inner-detail'>
                        <p>{new Date(weatherData[0].daily[3].dt*1000).toLocaleString('en-US', {weekday: 'long'})}</p>
                        <img src={require(`./${weatherIcons[weatherData[0].daily[3].weather[0].icon]}`)} alt="weather-icon"></img>
                        <p>{Math.round(weatherData[0].daily[3].temp.day)} &deg;C</p>
                        <hr></hr>
                        <p id='precipitation'>{(weatherData[0].daily[3].pop)*100}%</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <footer>
            <p>&copy; 2023 - Jacob Pantuso</p>
            <p>Weather data provided by <a href="https://openweathermap.org/">OpenWeatherMap</a></p>
        </footer>
  </div>
)

export default CardExampleCard;