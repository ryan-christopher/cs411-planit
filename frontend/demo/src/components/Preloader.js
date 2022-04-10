import React from 'react'
import '../index.css';

function Preloader() {
    console.log("yo")
    if (document.readyState === "complete") {
        const preload = document.querySelector('.preload');
        const loadpic = document.getElementById('loading-pic');
        loadpic.classList.toggle("load-anim");
        setTimeout(() => { loadpic.classList.toggle("load-anim"); }, 100);
        preload.classList.toggle('preload-finish');
        setTimeout(() => { preload.classList.toggle('preload-finish') }, 300);
    }

    return (
        <div>
        </div>
    )
}

export default Preloader