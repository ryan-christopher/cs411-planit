import axios from 'axios'
import { GoogleLogin } from 'react-google-login'


function Login() {

    // gets user's info from google for db
    const sendUserInfo = () => {
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
    const responseGoogle = (response) => {
        console.log("logged into google")
        if ("accessToken" in response) {
            localStorage.setItem("accessToken", response['accessToken'])  // store in local storage, not ideal
            sendUserInfo()
        }
    }
    return (
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLECLIENTID}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />,
        </div>
    )
}

export default Login;
