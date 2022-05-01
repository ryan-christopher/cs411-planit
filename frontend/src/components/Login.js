import { GoogleLogin } from 'react-google-login'



function Login() {
    const responseGoogle = (response) => {
        console.log("logged into google")
        if ("accessToken" in response) {
            localStorage.setItem("accessToken", response['accessToken'])  // store in local storage, not ideal
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
            />
        </div>
    )
}

export default Login;
