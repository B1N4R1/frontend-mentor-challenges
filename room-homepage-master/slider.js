var images = ["images/desktop-image-hero-1.jpg", "images/desktop-image-hero-2.jpg", "images/desktop-image-hero-3.jpg"];
var text = {
    0:{
        "title":"Discover innovative ways to decorate",
        "paragraph":"We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love."
    },
    1:{
        "title":"We are available all across the globe",
        "paragraph":"  With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
    },
    2:{
        "title":"Manufactured with the best materials",
        "paragraph":"  Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.",
    }
}

$(".slider-btns > div").on("click", function(){

    var index;
    var lastPage = images.length - 1;
    var page = parseInt($(this).parent().attr("data-page"));
    var move = parseInt($(this).attr("data-slider"));

    if (page == 0 && move == -1) {
        index = lastPage;
    }
    else if (page == lastPage && move == 1) {
        index = 0;
    }
    else{
        index = page + move;
    }

    $("#hero-content > h1").text(text[index]["title"]);
    $("#hero-content > p").text(text[index]["paragraph"]);
    $("#hero-image").attr("src", images[index]);
    $(this).parent().attr("data-page", index);

});