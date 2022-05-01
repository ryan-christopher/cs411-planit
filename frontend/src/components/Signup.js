import React from 'react'
import GoogleLogin from 'react-google-login';
import $ from "jquery";
import TweenMax, { Power2, Power3, Elastic } from 'gsap';
import Preloader from './Preloader';
import "../style/signup.css";
import { Link } from 'react-router-dom';
import Signedin from './Signedin';



var axios = require("axios");

var viewportOffset = {
    x: 0,
    y: $(window).scrollTop()
};


var Magnet = function (elements) {
    elements.each(function () {
        var element = $(this);
        var isMagnetic = false;
        var isTransformed;
        var max = element.attr("offset-hover-max") || .7;
        var min = element.attr("offset-hover-min") || .5;

        function grap(dx, dy) {
            TweenMax.to(element, 0.3, { x: 0.6 * dx, y: 0.6 * dy, rotation: 0.07 * dx, ease: Power2.easeOut });
        };

        function reset() {
            TweenMax.to(element, .7, { x: 0, y: 0, scale: 1, rotation: 0, ease: Elastic.easeOut });
        };

        $(window).on("mousemove", function (e) {
            var mouse = {
                x: e.clientX,
                y: e.clientY - viewportOffset.y
            };


            var maxDistance = isMagnetic ? max : min;

            var width = element.outerWidth();
            var height = element.outerHeight();
            var offset = element.offset();
            var center = {
                x: offset.left + width / 2,
                y: offset.top + height / 2
            };

            var dx = mouse.x - center.x;
            var dy = mouse.y - center.y;

            isTransformed = false;

            if ((Math.sqrt(dx * dx + dy * dy) < width * maxDistance) && (window.pageYOffset === 0)) {
                isTransformed = true;
                if (!isMagnetic) isMagnetic = true;
                grap(dx, dy);

            }

            if (!isTransformed && isMagnetic) {
                reset();
                isMagnetic = false;
            }
        });
    });
};
var i = 0;
$(document).on("mouseenter mouseleave", '.magnet-btn', function (e) {
    if (i === 0) {
        var btn = $('.magnet-btn');
        Magnet(btn);
        i++;
    }
    var $element = $(this);
    var width = $element.outerWidth();
    var height = $element.outerHeight();
    var x = (e.pageX - $element.offset().left - width / 2) * (width > height ? height / width : 1);
    var y = (e.pageY - $element.offset().top - height / 2) * (height > width ? width / height : 1);
    var $background = $element.find(".magnet-btn__bg");
    var direction = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
    if ("mouseenter" === e.type) {
        switch (direction) {
            case 0:
                TweenMax.fromTo($background, 0.3, { left: "0%", top: "-100%" }, { top: "0%", left: "0%", ease: Power3.easeOut });
                break;
            case 1:
                TweenMax.fromTo($background, 0.3, { left: "100%", top: "0%" }, { top: "0%", left: "0%", ease: Power3.easeOut });
                break;
            case 2:
                TweenMax.fromTo($background, 0.3, { left: "0%", top: "100%" }, { top: "0%", left: "0%", ease: Power3.easeOut });
                break;
            case 3:
                TweenMax.fromTo($background, 0.3, { left: "-100%", top: "0%" }, { top: "0%", left: "0%", ease: Power3.easeOut });
                break;
            default:
                TweenMax.fromTo($background, 0.3, { left: "-100%", top: "0%" }, { top: "0%", left: "0%", ease: Power3.easeOut });
                break;
        }

    } else {
        switch (direction) {
            case 0:
                TweenMax.to($background, 0.3, { left: "0%", top: "-100%", ease: Power3.easeOut });
                break;
            case 1:
                TweenMax.to($background, 0.3, { left: "100%", top: "0%", ease: Power3.easeOut });
                break;
            case 2:
                TweenMax.to($background, 0.3, { left: "0%", top: "100%", ease: Power3.easeOut });
                break;
            case 3:
                TweenMax.to($background, 0.3, { left: "-100%", top: "0%", ease: Power3.easeOut });
                break;
            default:
                TweenMax.to($background, 0.3, { left: "-100%", top: "0%", ease: Power3.easeOut });
                break;
        }


    }
});

function Signup() {

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
            window.location.reload();
            sendUserInfo();
        }
    }

    if (!Signedin()) {
        var sticker = <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLECLIENTID}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                className="googlebutton"
            />
            <span>sign in!</span>
            <div className="magnet-btn__bg">
                (or sign up!)
            </div>
        </div>
    }
    else {
        sticker = <div>
            <span><Link to="/app" className="planlink" onClick={Preloader}>hey!</Link></span>
            <div className="magnet-btn__bg">
                let's plan
            </div>
        </div>
    }

    return (
        <div>
            <div className="bg bg--white"></div>
            <div className="bg bg--black"></div>
            <div className="wrapper">
                <div className="magnet-btn" offset-hover-max="0.5" offset-hover-min="0.5">
                    {sticker}
                </div>
            </div>
        </div>
    )
}


export default Signup