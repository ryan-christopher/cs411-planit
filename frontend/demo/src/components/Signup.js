import React from 'react'
import $ from "jquery";
import TweenMax from "gsap";
import { Link } from 'react-router-dom';
import { Power2, Power3, Elastic } from 'gsap';
import "../style/signup.css";




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
    return (
        <div>
            <div className="bg bg--white"></div>
            <div className="bg bg--black"></div>
            <div className="wrapper">
                <Link to="/" className="magnet-btn" offset-hover-max="0.5" offset-hover-min="0.5">
                    <span>sign in!</span>
                    <div className="magnet-btn__bg">(or sign up!)</div>
                </Link>
            </div>
        </div>
    )
}


export default Signup