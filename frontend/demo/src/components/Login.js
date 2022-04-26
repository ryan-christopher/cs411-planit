import {GoogleLogin} from 'react-google-login'
import { resolvePath } from 'react-router-dom'

function Login() {
    const responseGoogle = (response) => {
        console.log("done")
        console.log(response);
        if ("accessToken" in response) {
            localStorage.setItem("accessToken", response['accessToken'])  // store in local storage, not ideal
        }
    }
    return (
    <div>
    <GoogleLogin
        clientId="577383480881-mmkvccg7g1h86d0pel75874d8d73amkv.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
    />,
  </div>
    )
}

export default Login;
