import '../style/index.css';

function Preloader() {
    if (document.readyState === "complete") {
        const preload = document.querySelector('.preload');
        const loadpic = document.getElementById('loading-pic');
        loadpic.classList.toggle("load-anim");
        setTimeout(() => { loadpic.classList.toggle("load-anim"); }, 100);
        preload.classList.toggle('preload-finish');
        setTimeout(() => { preload.classList.toggle('preload-finish') }, 100);
    }
}

export default Preloader