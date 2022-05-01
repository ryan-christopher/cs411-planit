import { GoogleLogout } from 'react-google-login'
import { useNavigate } from "react-router-dom";
import Preloader from './Preloader';

function Logout() {
    let navigate = useNavigate();
    const logout = () => {
        localStorage.setItem('accessToken', null)
        console.log("logged out!")
        Preloader();
        navigate("/", { replace: true });
        window.location.reload();
    }
    return (
        <div>
            <GoogleLogout
                clientId={process.env.REACT_APP_GOOGLECLIENTID}
                buttonText="Logout"
                onLogoutSuccess={logout}
            />
        </div>
    )
}

export default Logout;
