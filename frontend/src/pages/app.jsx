import React, { useState, useEffect } from 'react';
import { CgArrowLongDownR } from 'react-icons/cg';
import '../style/App.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Preloader from '../components/Preloader';
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
    const [places, setPlaces] = useState(false)

    const checkAuth = () => {
        axios({
            method: "GET",
            url: "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + localStorage.getItem("accessToken")
        })
            .then(() => {
                setAuthenticated(true)
            })
            .catch((error) => {
                window.alert("Please Sign into Google!")
                setAuthenticated(false)
            })
        console.log(`authenticated: ${authenticated}`)
    }

    // check authentication on page access
    useEffect(() => {
        checkAuth();
    }, [])

    const getLocation = () => {
        checkAuth();
        if (authenticated) {
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
        } else { console.log("did not pass") }

    }

    // Takes in MBTAInput from state and POSTs to flask backend
    const getLineData = () => {
        checkAuth();
        if (authenticated) {
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



    const getDirections = (dest_lat, dest_lon) => {
        if (authenticated) {
            if (lat === null || lng === null) {
                window.alert("Please Get Your Location First!")
            }
            else {
                var data = JSON.stringify({
                    "depart_lat": lat,
                    "depart_lon": lng,
                    "dest_lat": dest_lat,
                    "dest_lon": dest_lon
                });
                axios({
                    method: "post",
                    url: "http://127.0.0.1:5000/get_directions_between_coords",
                    data: data,
                    headers: {
                        'Content-Type': "application/json"
                    }
                })
                    .then(function (response) {
                        console.log(response.data)
                        setDirections(response.data)
                        console.log(directions)
                    })
            }
        }
    }

    const getYelp = () => {
        if (authenticated) {
            if (lat === null || lng === null) {
                window.alert("Please Get Your Location First!")
            }
            else {
                Preloader()
                var data = JSON.stringify({
                    "lat": lat,
                    "lon": lng,
                });
                axios({
                    method: "post",
                    url: "http://127.0.0.1:5000/yelp_call",
                    data: data,
                    headers: {
                        'Content-Type': "application/json"
                    }
                })
                    .then(function (response) {
                        //console.log(response.data)
                        setPlaces(response.data)
                        //console.log("object.keys:")
                        //console.log(Object.keys(places))
                        //console.log("keys[x]")
                        //console.log(places["0"])
                        //console.log(response.data['response']["0"]["address"])
                    })
            }
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
                        <button onClick={getYelp}>yelp</button>
                        {places && <div className="results">{
                            Object.keys(places).map((key, index) => (
                                <div key={index} className="resultcard">
                                    <h3>{places[key]["name"]}</h3>
                                    <img className="resultpic" src={places[key]["image"]} alt={places[key]["name"]} />
                                    <p>{places[key]["address"]}</p>
                                    <button onClick={() => getDirections(places[key]["coords"]["latitude"], places[key]["coords"]["longitude"])}>Get Directions</button>
                                </div>
                            ))
                        }
                        </div>
                        }

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AppPage;