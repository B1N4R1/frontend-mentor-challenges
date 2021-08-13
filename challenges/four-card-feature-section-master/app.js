let resizeTimer;

window.addEventListener("load", () => {
    document.getElementById("supervisor").classList.add("fade-left");
    document.getElementById("team-builder").classList.add("fade-down");
    document.getElementById("karma").classList.add("fade-up");
    document.getElementById("calculator").classList.add("fade-right");

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
        document.getElementById("supervisor").classList.remove("fade-left");
        document.getElementById("team-builder").classList.remove("fade-down");
        document.getElementById("karma").classList.remove("fade-up");
        document.getElementById("calculator").classList.remove("fade-right");
    }, 3000);

});