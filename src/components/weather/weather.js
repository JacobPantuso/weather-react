import React from 'react';
import './styles.css';
import Alert from './alert';

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
    "03d": "Mainly cloudy today.",
    "03n": "Cloudy tonight with intermittent stars.",
    "04d": "Mainly cloudy today with some blue skies.",
    "04n": "Cloudy tonight with intermittent stars.",
    "09d": "Rain with intermittent sunshine.",
    "09n": "Rain tonight with intermittent stars.",
    "10d": "Rain with intermittent sunshine.",
    "10n": "Rain tonight with intermittent stars.",
    "11d": "Thunderstorms, severe at times with peaks of sunshine.",
    "11n": "Thunderstorms tonight, severe at times, with intermittent stars.",
    "13d": "Snow, at times heavy, road conditions may be affected.",
    "13n": "Snow showers tonight with intermittent stars.",
    "50d": "Fog today, likely clearling later with peaks of sunshine.",
    "50n": "Fog tonight with intermittent stars."
}

function WeatherAlert({ weatherData }) {
    const [open, setOpen] = React.useState(false)
    if (weatherData.alerts.length > 0) {
        var data = weatherData.alerts[0];
        const toggleOpen = () => setOpen(!open);
        return (
            <div onClick={() => { if (!open) toggleOpen(); }} className='alert-card'>
                <div className='alert-header'>
                    <img src={require("./warning-icon.png")} alt='warning-icon' className='warning-icon' />
                    <h3>Weather Alert</h3>
                </div>
                <p>{data.event.charAt(0).toUpperCase() + data.event.slice(1)} Warning issued by {data.sender_name}</p>
                <Alert data={data} open={open} toggleOpen={toggleOpen} />
            </div>
        )
    }
}

function HourlyForecast({weatherData}) {
    var precip = [];
    var precip_type = []
    for (var i=1; i<4; i++) {
        // check to see if weatherData[i] has a snow property
        if (weatherData[i].snow) {
            precip[i-1] = weatherData[i].snow['1h'];
            precip_type[i-1] = "cm";
        } else if (weatherData[i].rain) {
            precip[i-1] = weatherData[i].rain['1h'];
            precip_type[i-1] = "mm";
        } else {
            precip[i-1] = 0;
            precip_type[i-1] = '';
        }
    }
    return (
        <div className='forecast second-forecast'>
            <h5>Hourly Forecast</h5>
            <div className='detail-row'>
                <div className='inner-detail'>
                    <p>{new Date(weatherData[1].dt * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                    <img src={require(`./${weatherIcons[weatherData[1].weather[0].icon]}`)} alt="weather-icon"></img>
                    <p>{Math.round(weatherData[1].temp)} &deg;C</p>
                    <hr></hr>
                    <p id='snow'>{precip[0]} {precip_type[0]}</p>
                </div>
                <div className='inner-detail'>
                    <p>{new Date(weatherData[2].dt * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                    <img src={require(`./${weatherIcons[weatherData[2].weather[0].icon]}`)} alt="weather-icon"></img>
                    <p>{Math.round(weatherData[2].temp)} &deg;C</p>
                    <hr></hr>
                    <p id='snow'>{precip[1]} {precip_type[1]}</p>
                </div>
                <div className='inner-detail'>
                    <p>{new Date(weatherData[3].dt * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                    <img src={require(`./${weatherIcons[weatherData[3].weather[0].icon]}`)} alt="weather-icon"></img>
                    <p>{Math.round(weatherData[3].temp)} &deg;C</p>
                    <hr></hr>
                    <p id='snow'>{precip[2]} {precip_type[2]}</p>
                </div>
            </div>
        </div>
    )
}

function FutureForecast({weatherData}) {
    return (
        <div className='forecast second-forecast'>
            <h5>3 Day Forecast</h5>
            <div className='detail-row'>
                <div className='inner-detail'>
                    <p>{new Date(weatherData[0].daily[1].dt * 1000).toLocaleString('en-US', { weekday: 'long' })}</p>
                    <img src={require(`./${weatherIcons[weatherData[0].daily[1].weather[0].icon]}`)} alt="weather-icon"></img>
                    <p>{Math.round(weatherData[0].daily[1].temp.day)} &deg;C</p>
                    <hr></hr>
                    <p id='precipitation'>{(weatherData[0].daily[1].pop) * 100}%</p>
                </div>
                <div className='inner-detail'>
                    <p>{new Date(weatherData[0].daily[2].dt * 1000).toLocaleString('en-US', { weekday: 'long' })}</p>
                    <img src={require(`./${weatherIcons[weatherData[0].daily[2].weather[0].icon]}`)} alt="weather-icon"></img>
                    <p>{Math.round(weatherData[0].daily[2].temp.day)} &deg;C</p>
                    <hr></hr>
                    <p id='precipitation'>{(weatherData[0].daily[2].pop) * 100}%</p>
                </div>
                <div className='inner-detail'>
                    <p>{new Date(weatherData[0].daily[3].dt * 1000).toLocaleString('en-US', { weekday: 'long' })}</p>
                    <img src={require(`./${weatherIcons[weatherData[0].daily[3].weather[0].icon]}`)} alt="weather-icon"></img>
                    <p>{Math.round(weatherData[0].daily[3].temp.day)} &deg;C</p>
                    <hr></hr>
                    <p id='precipitation'>{(weatherData[0].daily[3].pop) * 100}%</p>
                </div>
            </div>
        </div>
    )
}
const Forecast = ({ weatherData }) => (
    <div className='main'>
        <div className='greeting'>
            <h1>Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}</h1>
            <p>Here is the weather for today:</p>
        </div>
        <WeatherAlert weatherData={weatherData[0]} />
        <div className='container'>
            <div className='forecast'>
                <div className='forecast-header'>
                    <h2 className='city-name'>{weatherData[1].name}</h2>
                    <h3>{new Date().toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true })}</h3>
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
                        <p id='precipitation'>{Math.round((weatherData[0].daily[0].pop) * 100)}%</p>
                    </div>
                </div>
            </div>
            <div className='side-container'>
                <HourlyForecast weatherData={weatherData[0].hourly} />
                <FutureForecast weatherData={weatherData} />
            </div>
        </div>
        <footer>
            <p>&copy; 2023 - Jacob Pantuso</p>
            <p>Weather data provided by <a href="https://openweathermap.org/">OpenWeatherMap</a></p>
        </footer>
    </div>
);

export default Forecast;