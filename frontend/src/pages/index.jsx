import React from 'react'
import Navbar from '../components/Navbar'
import Signup from '../components/Signup'
import Footer from '../components/Footer'
import "../style/pages.css"
import "../style/home.css"
import { CgSmileMouthOpen } from 'react-icons/cg'
import { MdOutlineAddLocationAlt } from 'react-icons/md'
import { IoListCircleOutline } from 'react-icons/io5'



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
                            <MdOutlineAddLocationAlt className='icon' />
                            <p className='flexparagraph'>
                                <h3>keep things new</h3>
                                <hr className="thinline2" />
                                find new places for your day to day
                            </p>
                        </div>

                    </div>
                    <div className="flexcol2">
                        <div className="colmask">
                            <h3 className="colheader">FUN</h3>
                            <CgSmileMouthOpen className='icon' />
                            <p className='flexparagraph'>
                                <h3>good times ahead</h3>
                                <hr className="thinline2" />
                                always have something to look forward to</p>
                        </div>

                    </div>
                    <div className="flexcol3">
                        <div className="colmask">
                            <h3 className="colheader">EASY</h3>
                            <IoListCircleOutline className='icon' />
                            <p className='flexparagraph'>
                                <h3>all in one</h3>
                                <hr className="thinline2" />
                                all your favorite places stored in one place</p>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}


export default Home