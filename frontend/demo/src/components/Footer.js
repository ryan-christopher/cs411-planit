import React from 'react'
import { IoLogoGithub } from 'react-icons/io';
import "../style/footer.css"

function Footer() {
    return (
        <div>
            <div class="flex-container">
                <div class="flex-item-left">
                    <div class="flex-container-social">
                        <a href="https://github.com/ryan-christopher/cs411-project" rel="noreferrer" target="_blank">
                            <IoLogoGithub class="social-link" id="github" />
                        </a>
                    </div>
                </div>
                <div class="flex-item-right">
                    <h3 class="footertext">PlanIt</h3>
                    <img src="pictures/planit-logo.png" alt="The planit logo." id="footerpicture" />
                    <br />
                    <br />
                    <h4 class="footertextsmall">&copy; 2022</h4>
                    <br />
                </div>
            </div>
        </div>
    )
}

export default Footer