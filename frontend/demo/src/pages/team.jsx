import React from 'react'
import Preloader from '../components/Preloader'
import Navbar from '../components/Navbar'
import "../style/pages.css"

function Team() {
    return (
        <div>
            <Preloader />
            <Navbar />
            <div className="header-section" id="team">
                <div id="landingmask">
                    <h1>Our team</h1>
                    <h3>meet the makers</h3>
                    <div id="content">
                        {/* 
                    Abdul Ka, Jayden Font, Kevin Martin, 
                    Lauren Pearson, Rachel Ferrigno, 
                    Ryan Christopher
                    */}
                        <div className="flex-container-left-right">
                            <div className="flex-item-left">
                                <h2>Abdul</h2>
                                <img src="pictures/cat.png" alt="Abdul." className="pfp" />
                            </div>
                            <div className="flex-item-right">
                                <p>hey</p>
                            </div>
                        </div>

                        <hr className="line" />

                        <div className="flex-container-right-left">
                            <div className="flex-item-left">
                                <h2>Jayden</h2>
                                <img src="pictures/cat.png" alt="Abdul." className="pfp" />
                            </div>
                            <div className="flex-item-right">
                                <p>yo</p>
                            </div>
                        </div>

                        <hr className="line" />

                        <div className="flex-container-left-right">
                            <div className="flex-item-left">
                                <h2>Kevin</h2>
                                <img src="pictures/cat.png" alt="Abdul." className="pfp" />
                            </div>
                            <div className="flex-item-right">
                                <p>hey</p>
                            </div>
                        </div>

                        <hr className="line" />

                        <div className="flex-container-right-left">
                            <div className="flex-item-left">
                                <h2>Lauren</h2>
                                <img src="pictures/cat.png" alt="Abdul." className="pfp" />
                            </div>
                            <div className="flex-item-right">
                                <p>yo</p>
                            </div>
                        </div>

                        <hr className="line" />

                        <div className="flex-container-left-right">
                            <div className="flex-item-left">
                                <h2>Rachel</h2>
                                <img src="pictures/cat.png" alt="Abdul." className="pfp" />
                            </div>
                            <div className="flex-item-right">
                                <p>hey</p>
                            </div>
                        </div>

                        <hr className="line" />

                        <div className="flex-container-right-left">
                            <div className="flex-item-left">
                                <h2>Ryan</h2>
                                <img src="pictures/cat.png" alt="Abdul." className="pfp" />
                            </div>
                            <div className="flex-item-right">
                                <p>yo</p>
                            </div>
                        </div>

                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <img src="pictures/planit-logo.png" alt="The planit logo." id="landingpic" />
                </div>
            </div>
        </div>

    )
}

export default Team