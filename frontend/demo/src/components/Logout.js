import {GoogleLogout} from 'react-google-login'

function Logout() {
    const logout = () => {
        localStorage.removeItem("accessToken")
        console.log("logged out!")
    }
    return (
    <div>
        <GoogleLogout
            clientId="577383480881-mmkvccg7g1h86d0pel75874d8d73amkv.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
            >
        </GoogleLogout>
    </div>
    )
}

export default Logout;
