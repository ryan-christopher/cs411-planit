<<<<<<< Updated upstream:prototype/frontend/src/components/Login.js
import { GoogleLogin } from 'react-google-login'
import { resolvePath } from 'react-router-dom'
=======
import {GoogleLogin} from 'react-google-login'
>>>>>>> Stashed changes:frontend/demo/src/components/Login.js

function Login() {
    const responseGoogle = (response) => {
        console.log(response);
        if ("accessToken" in response) {
            localStorage.setItem("accessToken", response['accessToken'])  // store in local storage, not ideal
        }
    }
    return (
<<<<<<< Updated upstream:prototype/frontend/src/components/Login.js
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLECLIENTID}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />,
        </div>
=======
    <div>
    <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLECLIENTID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
    />
  </div>
>>>>>>> Stashed changes:frontend/demo/src/components/Login.js
    )
}

export default Login;
