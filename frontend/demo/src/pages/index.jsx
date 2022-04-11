import React from 'react'
import Preloader from '../components/Preloader'
import Navbar from '../components/Navbar'
import "../style/pages.css"
import "../style/home.css"

function Home() {

    return (
        <div>
            <Preloader />
            <Navbar />
            <div className="header-section" id="landing">
                <div id="landingmask">
                    <h1>PLANIT</h1>


                    <img src="pictures/planit-logo.png" alt="The planit logo." id="landingpic" />

                    <h3>life moves fast, we help you plan it</h3>


                    <div id="carousel">
                        {/* FIRST HALF BANNER */}
                        <img src="pictures/icon-bar-drinks.png" alt="bars" />
                        <div className="spacer"></div>
                        <img src="pictures/icon-coffee.png" alt="coffee" />
                        <div className="spacer"></div>
                        <img src="pictures/icon-concert.png" alt="concerts" />
                        <div className="spacer"></div>
                        <img src="pictures/icon-food-2.png" alt="food" />
                        <div className="spacer"></div>
                        <img src="pictures/icon-food.png" alt="food" />
                        <div className="spacer"></div>
                        <img src="pictures/icon-bar-drinks.png" alt="bars" />
                        <div className="spacer"></div>
                        <img src="pictures/icon-coffee.png" alt="coffee" />
                        <div className="spacer"></div>
                        <img src="pictures/icon-concert.png" alt="concerts" />
                        <div className="spacer"></div>
                        <img src="pictures/icon-food-2.png" alt="food" />
                        <div className="spacer"></div>
                        <img src="pictures/icon-food.png" alt="food" />
                        <div className="spacer"></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home