import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../style/pages.css"
import "../style/about.css"


function About() {
    return (
        <div>
            <Navbar />
            <div className="header-section">
                <div id="landingmask">
                    <h1 className="abouth1">About Us</h1>
                    <h3 className='abouth3'>(hint: hover)</h3>
                    <br /><br /><br />
                    <div class='flipwrapper'>
                        <div class='container'>
                            <div class='box_front'>
                                <div className="flipmask">
                                    <h3 className="fliph3">Planit</h3>
                                    <img src="pictures/planit-logo.png" alt="" className="flippic" />
                                    <p>Years in the making. Our team has been busy developing Planit into the best it can be.
                                        As the platform comes to fruition, we want to stay true to our mission of being a glorified planner.
                                        Through countless hours and tireless work ethic, we are proud to announce that you should really just
                                        hover on this section, we're running out of key terms.
                                    </p>
                                </div>
                            </div>
                            <div class='box_bottom'>
                                <div className="flipmask">
                                    <h3 className="fliph3">CS411 Project</h3>
                                    <img src="pictures/rhett.jpg" alt="" className="flippic" style={{ "border-radius": "50%" }} />
                                    <p>We're actually Section A5 Group #2. This is our semester project for CS411. Our tech stack
                                        includes React for frontend, Flask for backend, and SQLite for the database.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>

    )
}

export default About