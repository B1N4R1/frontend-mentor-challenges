
var tooltip = 0;
var device = {
    "mobile": 0,
    "mobileClass": "mobile",
    "desktop": 1,
    "desktopClass": "active"
}

$(document).ready(function(){

    var windowWidth = $(this).width();

    changeDevice(windowWidth);

})


$(window).on("resize", function(){

    var windowWidth = $(this).width();

    if (tooltip) {
        
        deativateTooltip();

        tooltip = 0;
        
    }

    changeDevice(windowWidth);

});


$(".share").on("click", function(){

    var elem = $(this);

    if (device.desktop) {
        
        changeClass(elem, device.desktopClass);

    }
    else{

        var parent = elem.parent();
        changeClass(parent, device.mobileClass);

    }

    tooltip = (tooltip == 0) ? 1 : 0;

});

function changeClass(elem, className) {
    
    if (elem.hasClass(className)) {
            
        elem.removeClass(className);

    }
    else{

        elem.addClass(className);

    }

}

function changeDevice(windowWidth){

    if (windowWidth >= 768) {
    
        device.desktop = 1;
        device.mobile = 0;

    }
    else{

        device.desktop = 0;
        device.mobile = 1;

    }    

}

function deativateTooltip(){

    var mobile = $(".profile");
    var desktop = $(".share");

    if (device.desktop) {
        
        changeClass(desktop, device.desktopClass);

    }
    else{

        changeClass(mobile, device.mobileClass);

    }

}