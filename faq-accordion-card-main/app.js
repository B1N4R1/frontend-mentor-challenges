$(".questions li").on("click", function(){

    let questions = document.querySelectorAll(".questions li");

    Array.from(questions).map(question => {
        
        let answer = $(question).children(".answer");

        if(question.getAttribute('data-active') == '1'){

            answer.slideUp();
            question.setAttribute("data-active", 0);

        }
        else if(question.id == $(this).attr('id')){

            answer.slideDown();
            question.setAttribute("data-active", 1);
            
        }

    })

})