$(".circle").on("click", function(){

    let body = document.querySelector("body");
    let newTheme = $(this).attr("data-theme");
    
    body.className = `theme-${newTheme}`;

})