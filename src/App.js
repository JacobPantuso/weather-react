import './App.css';
import React, {useEffect, useState} from "react";
import Weather from './components/weather/weather';
import { Dimmer, Loader } from 'semantic-ui-react';

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState([]);
  const array = [data, current];

  useEffect(() => {
    const fetchData = async () => {
      // use cached result if available (if user has already allowed location services)
        // otherwise, get location from browser
        navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });
    await
    fetch(`${process.env.REACT_APP_API_URL}/onecall?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)      
      .then(res => res.json())
      .then(result => {
        setData(result)
      });
    
    await
    fetch(`${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)      
      .then(res => res.json())
      .then(result => {
        setCurrent(result)
      });
    }
    fetchData();
}, [lat,long])

  return (
    
    <div className="App">
      {(typeof data.current != 'undefined') ? (
        console.log(data),
        <Weather weatherData={array}/>
      ): (
        <div>
          <Dimmer active>
            <Loader active>Fetching the weather (Taking too long? Allow location services)...</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}