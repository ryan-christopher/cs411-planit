import React from 'react'
import '../style/Menu.css';
import { Link } from 'react-router-dom';
import $ from 'jquery'
import Preloader from '../components/Preloader';
import { useLocation } from 'react-router-dom';
import Signedin from './Signedin';
import GoogleLogin from 'react-google-login';
import Logout from './Logout';

function Navbar() {
    let location = useLocation();
    let links;

    if (Signedin()) {
        if (location.pathname === "/") {
            links =
                <div>
                    <Link className="mobilemenu-link" to="/" onClick={menutoggle}>Home</Link>
                    <Link className="mobilemenu-link" to="/profile" onClick={Preloader}>Profile</Link>
                    <Link className="mobilemenu-link" to="/app" onClick={Preloader}>Planit</Link>
                    <Link className="mobilemenu-link" to="/team" onClick={Preloader}>The Team</Link>
                    <Link className="mobilemenu-link" to="/about" onClick={Preloader}>About</Link>
                    <Logout className="mobilemenu-link" />
                </div>
        }
        if (location.pathname === "/app") {
            links =
                <div>
                    <Link className="mobilemenu-link" to="/" onClick={Preloader}>Home</Link>
                    <Link className="mobilemenu-link" to="/profile" onClick={Preloader}>Profile</Link>
                    <Link className="mobilemenu-link" to="/app" onClick={menutoggle}>Planit</Link>
                    <Link className="mobilemenu-link" to="/team" onClick={Preloader}>The Team</Link>
                    <Link className="mobilemenu-link" to="/about" onClick={Preloader}>About</Link>
                    <Logout className="mobilemenu-link" />
                </div>
        }
        if (location.pathname === "/team") {
            links =
                <div>
                    <Link className="mobilemenu-link" to="/" onClick={Preloader}>Home</Link>
                    <Link className="mobilemenu-link" to="/profile" onClick={Preloader}>Profile</Link>
                    <Link className="mobilemenu-link" to="/app" onClick={Preloader}>Planit</Link>
                    <Link className="mobilemenu-link" to="/team" onClick={menutoggle}>The Team</Link>
                    <Link className="mobilemenu-link" to="/about" onClick={Preloader}>About</Link>
                    <Logout className="mobilemenu-link" />
                </div>
        }
        if (location.pathname === "/about") {
            links =
                <div>
                    <Link className="mobilemenu-link" to="/" onClick={Preloader}>Home</Link>
                    <Link className="mobilemenu-link" to="/profile" onClick={Preloader}>Profile</Link>
                    <Link className="mobilemenu-link" to="/app" onClick={Preloader}>Planit</Link>
                    <Link className="mobilemenu-link" to="/team" onClick={Preloader}>The Team</Link>
                    <Link className="mobilemenu-link" to="/about" onClick={menutoggle}>About</Link>
                    <Logout className="mobilemenu-link" />
                </div>
        }
        if (location.pathname === "/profile") {
            links =
                <div>
                    <Link className="mobilemenu-link" to="/" onClick={Preloader}>Home</Link>
                    <Link className="mobilemenu-link" to="/profile" onClick={menutoggle}>Profile</Link>
                    <Link className="mobilemenu-link" to="/app" onClick={Preloader}>Planit</Link>
                    <Link className="mobilemenu-link" to="/team" onClick={Preloader}>The Team</Link>
                    <Link className="mobilemenu-link" to="/about" onClick={Preloader}>About</Link>
                    <Logout className="mobilemenu-link" />
                </div>
        }
    }
    else {
        const responseGoogle = (response) => {
            console.log("logged into google")
            if ("accessToken" in response) {
                localStorage.setItem("accessToken", response['accessToken'])  // store in local storage, not ideal
                window.location.reload();
            }
        }
        links =
            <div>
                <Link className="mobilemenu-link" to="/" onClick={menutoggle}>Home</Link>
                <div className="mobilemenu-link">
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLECLIENTID}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="googlemenubutton"
                    />
                </div>
            </div>
    }

    return (
        <div>
            <Link to="/" className="cornerlogo" onClick={Preloader}>
                <img src="pictures/planit-logo.png" alt="Planit" />
            </Link>

            <div className="mobilenavbar">
            </div>

            <div className="mobilemenu">
                <div className="mobilebutton">
                    <div className="burgertop"></div>
                    <div className="burgermiddle"></div>
                    <div className="burgerbottom"></div>
                </div>
                <div className="mobilemenu-body">
                    <div className="mobilemenu-overlay"></div>
                    <div className="mobilemenu-container">
                        {links}
                    </div>
                </div>
            </div>
            <div className="mask"></div>
        </div >
    )
}

function menutoggle() {
    $('.mobilemenu').toggleClass('active');
    $('.mask').toggleClass('active')
    $('.mobilebutton').toggleClass('active');
}


(function () {
    //$(".mobilemenu-group").click(function () {
    $(document).on("click", ".mobilemenu-group", function () {
        $(this).find(".mobilemenu-section").toggleClass('active');
        $(".mobilemenu-overlay").toggleClass('active');
    });
    //$("mobilemenu-link-back").click(function () {
    $(document).on("click", ".mobilemenu-link-back", function () {
        $(".mobilemenu-section").toggleClass('active');
    });
    //$('.mobilebutton').click(function () {
    $(document).on("click", ".mobilebutton", function () {
        $(this).toggleClass('active');
        $('.mobilemenu').toggleClass('active');
        $('.text').toggleClass('active');
        return $('.mask').toggleClass('active');
    });
    //$(".mobilemenu-overlay").click(function () {
    $(document).on("click", ".mobilemenu-overlay", function () {
        //$(".mobilemenu-overlay").on("click", function () {
        $(this).toggleClass('active');
        return $(".mobilemenu-section").removeClass('active');
    });
    //$('.mask').click(function () {
    $(document).on("click", ".mask", function () {
        //$('.mask').on("click", function () {
        $(this).toggleClass('active');
        $('.mobilemenu').toggleClass('active');
        $('.text').toggleClass('active');
        $('.mobilebutton').toggleClass('active');
        $(".mobilemenu-overlay").removeClass('active');
        return $(".mobilemenu-section").removeClass('active');
    });
}).call(this);

export default Navbar
