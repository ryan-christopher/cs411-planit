import { GoogleLogout } from 'react-google-login'

function Logout() {
    const logout = () => {
        localStorage.removeItem("accessToken")
        console.log("logged out!")
    }
    return (
        <div>
            <GoogleLogout
                clientId={process.env.REACT_APP_GOOGLECLIENTID}
                buttonText="Logout"
                onLogoutSuccess={logout}
            >
            </GoogleLogout>
        </div>
    )
}

export default Logout;
