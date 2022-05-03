import React, { useState, useEffect } from 'react';
import { CgArrowLongDownR } from 'react-icons/cg';
import { IoCafe, IoFastFoodOutline, IoCloseCircleOutline, IoLocationOutline, IoMapOutline } from 'react-icons/io5'
import { IoMdHeartEmpty } from "react-icons/io"
import { TiTree } from 'react-icons/ti'
import { GiWeightLiftingUp, GiGuitarBassHead } from 'react-icons/gi'
import '../style/App.css';
import "../style/directions.css"
import "../style/pages.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Preloader from '../components/Preloader';
import $ from 'jquery'

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
    const [name, setName] = useState(false)
    const [user, setUser] = useState()
    const [favorites, setFavorites] = useState()

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

    // gets user's info from google for db
    const sendUserInfo = () => {
        if (authenticated) {
            axios({
                method: "GET",
                url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + localStorage.getItem("accessToken")
            })
                .then((response) => {
                    axios({
                        method: "POST",
                        url: "http://127.0.0.1:5000/register_google_data",
                        data: response['data']
                    })
                })
        }
    }

    useEffect(() => {
        sendUserInfo();
    }, [authenticated])

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



    const getDirections = (dest_lat, dest_lon, name) => {
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
                        setName(name)
                        //console.log(directions)
                        $(".directions").toggleClass('active')
                    })
            }
        }
    }


    const getYelp = (category) => {
        if (authenticated) {
            if (lat === null || lng === null) {
                window.alert("Please Get Your Location First!")
            }
            else {
                Preloader()
                var data = JSON.stringify({
                    "lat": lat,
                    "lon": lng,
                    "category": category
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

    const addToFavorites = (place) => {
        console.log(place)
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/add_favorite_to_user",
            data: { "place": place, "accessToken": localStorage.getItem("accessToken") }
        })
            .then(console.log(`added ${place['name']} to favorites!`))
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>

            <div className="background">
                <Navbar />

                <div className="directions">
                    <div className="directionCard" id="directioncard">
                        <IoCloseCircleOutline className="directionclose" />
                        {directions &&
                            <div>
                                <h3 className="directionheader">Directions to: </h3>
                                <h3 className="directionheadername">{name}</h3>
                                <hr className="thinline" />
                                <ol>
                                    {Object.keys(directions).map((index) => (
                                        (<li key={index}>{directions[index]}</li>)
                                    ))}
                                </ol>
                            </div>}
                    </div>
                </div>


                <div className="App-header">
                    <div className="App">

                        {!lat &&
                            <div>
                                <div id="response"> <CgArrowLongDownR className="arrowDown" /> </div>
                                <button onClick={getLocation}>get location</button>
                            </div>
                        }

                        {lat &&
                            <div>
                                <div id="response"> <IoLocationOutline className="gotlocation" /> </div>
                                <h3>What do you feel like doing?</h3>
                            </div>
                        }

                        {/* 
                        {lat && <p>Latitude: {lat}</p>}
                        {lng && <p>Longitude: {lng}</p>}
                        */}
                        {/* <p>Enter an MBTA Bus or Train Line:</p>
                        <input type="text" onChange={(e) => setMBTAInput(e.target.value)} value={MBTAInput}></input>
                        <p />
                        <button onClick={getLineData}>get MBTA line endpoints</button> */}
                        {MBTALine && !invalidLine && <p>{MBTALine['data']['attributes']['direction_destinations'][0]} - {MBTALine['data']['attributes']['direction_destinations'][1]}</p>}
                        {invalidLine && <p>Error 404: Line named "{MBTAInput}" not found</p>}
                        {/* Tests getting route from coordinates, delete later */}
                        {/* <button onClick={getDirections}>Get Directions</button> 
                        {directions && <p>Directions to Your Destination:</p> &&
                            <div>
                                <ol>
                                    {Object.keys(directions).map(({ key, idx }) => {
                                        return (<li key={idx}>{idx}</li>)
                                    })}
                                </ol>
                            </div>
                        }*/}
                        <button className="choicebutton" onClick={() => getYelp("restaurants")}>
                            find some food
                            <hr className="choiceline" />
                            <IoFastFoodOutline className="buttonicon" id="food" />
                        </button>
                        <button className="choicebutton" onClick={() => getYelp("coffee")}>
                            get a coffee
                            <hr className="choiceline" />
                            <IoCafe className="buttonicon" id="coffee" />
                        </button>
                        <button className="choicebutton" onClick={() => getYelp("concerts")}>
                            see a show
                            <hr className="choiceline" />
                            <GiGuitarBassHead className="buttonicon" id="show" />
                        </button>
                        <button className="choicebutton" onClick={() => getYelp("parks")}>
                            get outside
                            <hr className="choiceline" />
                            <TiTree className="buttonicon" id="tree" />
                        </button>
                        <button className="choicebutton" onClick={() => getYelp("gyms")}>
                            work out
                            <hr className="choiceline" />
                            <GiWeightLiftingUp className="buttonicon" id="gym" />
                        </button>

                        {places && <div className="results">
                            {Object.keys(places).map((key, index) => (<div>
                                <div key={index} className="resultcard">
                                    <div className="flex-item-left">
                                        <h3 className="displayname">{places[key]["name"]}</h3>
                                        <hr className="thinline3" />
                                        <img className="resultpic" src={places[key]["image"]} alt={places[key]["name"]} />
                                    </div>
                                    <div className="flex-item-right">
                                        <p className="flexaddress">{places[key]["address"]}</p>
                                        <button className="choicebutton"
                                            onClick={() => getDirections(places[key]["coords"]["latitude"], places[key]["coords"]["longitude"], places[key]["name"])}>
                                            Get Directions
                                            <hr className="choiceline" />
                                            <IoMapOutline className="buttonicon" id="directions" />
                                        </button>
                                        <button className="choicebutton"
                                            onClick={() => addToFavorites(places[key])}>
                                            Favorite
                                            <hr className="choiceline" />
                                            <IoMdHeartEmpty className='buttonicon' id="favicon" />
                                        </button>
                                    </div>
                                </div>
                                <hr className="thinline" />
                            </div>
                            ))
                            }
                        </div>
                        }

                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}

(function () {
    $(document).on("click", ".directions", function () {
        $(".directions").toggleClass('active');
    });
}).call(this);

export default AppPage;