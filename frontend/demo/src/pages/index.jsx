import React from 'react'
import Navbar from '../components/Navbar'
import Signup from '../components/Signup'
import "../style/pages.css"
import "../style/home.css"


function Home() {
    return (
        <div>
            <Navbar />
            <div className="header-section" id="landing">
                <div id="landingmask">
                    <h1>PLANIT</h1>

                    <img src="pictures/planit-logo.png" alt="The planit logo." id="landingpic" />

                    <br />

                    <hr className="thinline" />
                    <h3 id="slogan">life moves fast, we help you plan it</h3>
                    <hr className="thinline" />

                    <Signup />

                    <div id="carousel" className="animated">
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
                <div className="threecolflex">
                    <div className="flexcol1">
                        <div className="colmask">
                            <h3 className="colheader">NEW</h3>
                        </div>

                    </div>
                    <div className="flexcol2">
                        <div className="colmask">
                            <h3 className="colheader">FUN</h3>
                        </div>

                    </div>
                    <div className="flexcol3">
                        <div className="colmask">
                            <h3 className="colheader">EASY</h3>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}


export default Home