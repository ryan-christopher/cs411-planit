import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from "../components/Navbar"
import { MdOutlineDeleteForever } from "react-icons/md"
import "../style/pages.css"
import '../style/App.css';

var axios = require("axios");

function Profile() {
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState()
    const [favorites, setFavorites] = useState()

    const checkAuth = () => {
        axios({
            method: "GET",
            url: "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + localStorage.getItem("accessToken")
        })
            .then(() => {
                console.log("auth")
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


    // get user's information from backend
    const getUserProfile = () => {
        if (authenticated) {
            axios({
                method: "POST",
                url: "http://127.0.0.1:5000/get_user",
                data: { 'accessToken': localStorage.getItem("accessToken") }
            })
                .then((response) => {
                    setUser(response.data)
                    setFavorites(response.data['favorites'])
                })
        }
    }

    // get user info when authenticated
    useEffect(() => {
        getUserProfile();
    }, [authenticated])


    // delete a venue from a user's favorites
    const deleteFavorite = (venueName) => {
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/remove_favorite_from_user",
            data: { 'accessToken': localStorage.getItem("accessToken"), "name": venueName }
        })
            .then(() => {
                console.log("successfully removed favorite")
                window.location.reload(false)
            })
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <Navbar />
            <div className="header-section" id="profile">
                <div id="profilemask">
                    {user && <h2 className="username">{user['name']}</h2>}
                    <table>
                        <tr>
                            <th>
                                {user && <h4>{user['email']}</h4>}
                            </th>
                            <th>
                                {user && <h4>Date Joined: {user['date_added']}</h4>}
                            </th>
                        </tr>
                    </table>

                    <br></br>

                    {user && (favorites === null || (favorites && Object.keys(favorites).length < 1)) && <p>No Favorites Added, Go Discover Some Places!</p>}
                    {user && favorites && Object.keys(favorites).length >= 1 && <div className="results">
                        <h2>Favorites</h2>
                        {Object.keys(favorites).map((key, index) => (<div>
                            <div key={index} className="resultcard">
                                <div className="flex-item-left">
                                    <h3>{favorites[key]["name"]}</h3>
                                    <img className="resultpic" src={favorites[key]["image"]} alt={favorites[key]["name"]} />
                                </div>
                                <div className="flex-item-right">
                                    <p className="flexaddress">{favorites[key]["address"]}</p>
                                    <br />
                                    <button className="choicebutton"
                                        onClick={() => deleteFavorite(favorites[key]['name'])}>
                                        Delete
                                        <hr className="choiceline" />
                                        <MdOutlineDeleteForever className='buttonicon' id="favicon" />
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
    )
}

export default Profile
