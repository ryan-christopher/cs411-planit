import React from 'react'
import Preloader from '../components/Preloader'
import Navbar from '../components/Navbar'
import "../style/pages.css"

function Home() {
    return (
        <div>
            <Preloader />
            <Navbar />
            <div className="header-section" id="landing">
                <div id="landingmask">
                    <h1>Planit</h1>
                    <div id="carousel">
                        {/*
                        <img src="pictures/icon-bar-drinks.png" alt="YOYOYOYO" />
    */}

                    </div>
                </div>
            </div>

        </div>

    )
}

export default Home