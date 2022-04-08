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
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
        var pic = document.getElementById("response")
        pic.innerHTML = '<img class="sad-response" src="sad-face.png"/>'
      });
    }
  }


  return (
    <div className="App-header">
      <div className="App">
        <div id="response"> <CgArrowLongDownR className="arrowDown" /> </div>
        <button onClick={getLocation}>get location</button>
        <p>{status}</p>
        {lat && <p>Latitude: {lat}</p>}
        {lng && <p>Longitude: {lng}</p>}
      </div>
    </div>
  );
}

export default App;