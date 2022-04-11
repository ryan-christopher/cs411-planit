import React from 'react'
import '../style/Menu.css';
import { Link } from 'react-router-dom';
import $ from 'jquery'

function Navbar() {
    return (
        <div>
            <Link to="/" className="cornerlogo">
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
                        <Link className="mobilemenu-link" to="/">Home</Link>
                        <Link className="mobilemenu-link" to="/app">Planit</Link>
                        <Link className="mobilemenu-link" to="/team">The Team</Link>
                        <Link className="mobilemenu-link" to="/about">About</Link>
                    </div>
                </div>
            </div>
            <div className="mask"></div>
        </div>
    )
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
