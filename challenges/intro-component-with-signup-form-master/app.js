document.querySelector("#singupForm").addEventListener("submit", function(e){

    let inputs = document.querySelectorAll(".input-group input");

    let i = 0, empty = 0, input, email;
    while (i < inputs.length) {

        input = inputs[i];

        if (input.name == "email") {
            email = input;
        }
        
        if (input.value == "") {
            if(empty == 0) e.preventDefault();

            input.parentElement.className = "input-group error";

            empty = 1;
        }
        else if (input.parentElement.className == "input-group error") {
            input.parentElement.className = "input-group";
        }

        i++;

    }

    if (email.value != "") {

        let value = email.value;
        if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {

            if (!empty) {
                e.preventDefault();
            }

            email.parentElement.lastElementChild.innerText = "Looks like this is not an email";
            email.parentElement.className = "input-group error";
            
        }

    }

});