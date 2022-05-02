import { useState } from 'react'

var axios = require("axios");

function Signedin() {
    const [authenticated, setAuthenticated] = useState(false)
    // gets user's info from google for db

    const checkAuth = () => {
        axios({
            method: "GET",
            url: "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + localStorage.getItem("accessToken")
        })
            .then(() => {
                setAuthenticated(true)
            })
            .catch((error) => {
                setAuthenticated(false)
            })
        return authenticated;
    }

    checkAuth()

    return authenticated;
}

export default Signedin