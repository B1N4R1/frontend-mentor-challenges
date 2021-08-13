let resizeTimer;

window.addEventListener("load", () => {

    if (screen.width <= 768) {
        document.getElementById("team-builder").classList.add("fade-right");
        document.getElementById("karma").classList.add("fade-left");
    }
    else{
        document.getElementById("team-builder").classList.add("fade-down");
        document.getElementById("karma").classList.add("fade-up");
    }

    document.getElementById("supervisor").classList.add("fade-left");
    document.getElementById("calculator").classList.add("fade-right");

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {

        if (screen.width <= 768) {
            document.getElementById("team-builder").classList.remove("fade-right");
            document.getElementById("karma").classList.remove("fade-left");
        }
        else{
            document.getElementById("team-builder").classList.remove("fade-down");
            document.getElementById("karma").classList.remove("fade-up");
        }

        document.getElementById("supervisor").classList.remove("fade-left");
        document.getElementById("calculator").classList.remove("fade-right");
    }, 3000);

});