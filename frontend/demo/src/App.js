import React, { useState } from 'react';
import { CgArrowLongDownR } from 'react-icons/cg';
import './App.css';
var axios = require("axios");

const App = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [MBTAInput, setMBTAInput] = useState("");
  const [MBTALine, setMBTALine] = useState(null);
  const [invalidLine, setInvalidLine] = useState(null);

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
  
  // Takes in MBTAInput from state and POSTs to flask backend
  const getLineData = () => {
    var data = JSON.stringify({
      "line": MBTAInput
    });
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/get_trains_by_line",
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      if (!('errors' in response.data['response'])) {
        setMBTALine(response.data['response']) 
        setInvalidLine(null)
        console.log(MBTALine)
      }
      else {
        console.log(response.data)
        console.log('No input given')
      }
    })
    .then(console.log("Success"))
    .catch(function (error) {
      setInvalidLine(error)
    })
  }


  return (
    <div className="App-header">
      <div className="App">
        <div id="response"> <CgArrowLongDownR className="arrowDown" /> </div>
        <button onClick={getLocation}>get location</button>
        <p>{status}</p>
        {lat && <p>Latitude: {lat}</p>}
        {lng && <p>Longitude: {lng}</p>}
        <p>Enter an MBTA Bus or Train Line:</p>
        <input type="text" onChange={(e) => setMBTAInput(e.target.value)} value={MBTAInput}></input>
        <p/>
        <button onClick={getLineData}>get MBTA line endpoints</button>
        {MBTALine && !invalidLine && <p>{MBTALine['data']['attributes']['direction_destinations'][0]} - {MBTALine['data']['attributes']['direction_destinations'][1]}</p>}
        {invalidLine && <p>Error 404: Line named "{MBTAInput}" not found</p>}
      </div>
    </div>
  );
}

export default App;