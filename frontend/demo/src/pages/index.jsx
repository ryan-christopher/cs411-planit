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


                    <div id="carousel">
                        {/* FIRST HALF BANNER */}
                        <img id="carousel-pic-1" src="pictures/icon-bar-drinks.png" alt="bars" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-2" src="pictures/icon-coffee.png" alt="coffee" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-3" src="pictures/icon-concert.png" alt="concerts" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-4" src="pictures/icon-food-2.png" alt="food" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-5" src="pictures/icon-food.png" alt="food" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-1" src="pictures/icon-bar-drinks.png" alt="bars" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-2" src="pictures/icon-coffee.png" alt="coffee" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-3" src="pictures/icon-concert.png" alt="concerts" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-4" src="pictures/icon-food-2.png" alt="food" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-5" src="pictures/icon-food.png" alt="food" />
                        <div className="spacer"></div>
                        {/* SECOND HALF BANNER */}
                        <img id="carousel-pic-1" src="pictures/icon-bar-drinks.png" alt="bars" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-2" src="pictures/icon-coffee.png" alt="coffee" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-3" src="pictures/icon-concert.png" alt="concerts" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-4" src="pictures/icon-food-2.png" alt="food" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-5" src="pictures/icon-food.png" alt="food" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-1" src="pictures/icon-bar-drinks.png" alt="bars" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-2" src="pictures/icon-coffee.png" alt="coffee" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-3" src="pictures/icon-concert.png" alt="concerts" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-4" src="pictures/icon-food-2.png" alt="food" />
                        <div className="spacer"></div>
                        <img id="carousel-pic-5" src="pictures/icon-food.png" alt="food" />
                        <div className="spacer"></div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Home