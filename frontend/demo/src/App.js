import React, { useState } from 'react';
import { CgArrowLongDownR } from 'react-icons/cg';
import './App.css';

const App = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  return (
    <div className="App-header">
      <div className="App">
        <h2> <CgArrowLongDownR class="arrowDown" /> </h2>
        <button onClick={getLocation}>get location</button>
        <p>{status}</p>
        {lat && <p>Latitude: {lat}</p>}
        {lng && <p>Longitude: {lng}</p>}
      </div>
    </div>
  );
}

export default App;