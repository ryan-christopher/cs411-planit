import React from 'react'
import { IoLogoGithub } from 'react-icons/io';
import "../style/footer.css"

function Footer() {
    return (
        <div>
            <div className="flex-container">
                <div className="flex-item-left">
                    <div className="flex-container-social">
                        <a href="https://github.com/ryan-christopher/cs411-project" rel="noreferrer" target="_blank">
                            <IoLogoGithub className="social-link" id="github" />
                        </a>
                    </div>
                </div>
                <div className="flex-item-right">
                    <h3 className="footertext">PlanIt</h3>
                    <img src="pictures/planit-logo.png" alt="The planit logo." id="footerpicture" />
                    <br />
                    <br />
                    <h4 className="footertextsmall">&copy; 2022</h4>
                    <br />
                </div>
            </div>
        </div>
    )
}

export default Footer