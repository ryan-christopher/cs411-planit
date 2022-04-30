import React, { useState, useEffect } from 'react';
import { CgArrowLongDownR } from 'react-icons/cg';
import '../style/App.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
var axios = require("axios");

const AppPage = () => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
    const [MBTAInput,] = useState("");
    const [setMBTAInput] = useState("");
    const [MBTALine, setMBTALine] = useState(null);
    const [invalidLine, setInvalidLine] = useState(null);
    const [directions, setDirections] = useState(null);
    const [authenticated, setAuthenticated] = useState(false)

    const checkAuth = () => {
        axios({
            method: "GET",
            url: "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + localStorage.getItem("accessToken")
        })
        .then(() => {
            setAuthenticated(true)
            console.log('valid')
        })
        .catch((error) => {
                window.alert("Please Sign into Google Below!")
                setAuthenticated(false)
        })
        return authenticated;
    }

    const getLocation = () => {
        if (checkAuth()) {
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
                    pic.innerHTML = '<img class="sad-response" src="pictures/sad-face.png"/>'
                });
            }
        }

    }

    // Takes in MBTAInput from state and POSTs to flask backend
    const getLineData = () => {
        if (checkAuth()) {
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
    }

    const getDirections = () => {
        if (checkAuth()) {
            axios({
                method: "post",
                url: "http://127.0.0.1:5000/get_directions_between_coords",
                data: { // CHANGE THESE LATER
                    "depart_lat": 42.35079819407158,
                    "depart_lon": -71.10901412751858,
                    "dest_lat": 42.36017428184034,
                    "dest_lon": -71.05590316768416
                },
                headers: {
                    'Content-Type': "application/json"
                }
            })
                .then(function (response) {
                    console.log(response.data)
                    setDirections(response.data)
                })
        }
    }

    return (
        <div>

            <div className="background">
                <Navbar />
                <div className="App-header">
                    <div className="App">
                        <div id="response"> <CgArrowLongDownR className="arrowDown" /> </div>
                        <button onClick={getLocation}>get location</button>
                        <p>{status}</p>
                        {lat && <p>Latitude: {lat}</p>}
                        {lng && <p>Longitude: {lng}</p>}
                        {/* <p>Enter an MBTA Bus or Train Line:</p>
                        <input type="text" onChange={(e) => setMBTAInput(e.target.value)} value={MBTAInput}></input>
                        <p />
                        <button onClick={getLineData}>get MBTA line endpoints</button> */}
                        {MBTALine && !invalidLine && <p>{MBTALine['data']['attributes']['direction_destinations'][0]} - {MBTALine['data']['attributes']['direction_destinations'][1]}</p>}
                        {invalidLine && <p>Error 404: Line named "{MBTAInput}" not found</p>}
                        {/* Tests getting route from coordinates, delete later */}
                        <button onClick={getDirections}>Get Directions</button>
                        {/* {directions && <p>Directions to Your Destination:</p> && 
                            <div>
                                <ol>
                                    {Object.keys(directions).map(({entry, idx}) => {
                                        return (<li key={idx}>{idx}</li>)
                                    })}
                                </ol>
                            </div>
                        } */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AppPage;