document.querySelector("#singupForm").addEventListener("submit", function(e){

    let inputs = document.querySelectorAll(".input-group input");

    let empty = 0;
    inputs.forEach(input => {
        
        if (input.value == "") {
            if(!empty) e.preventDefault(); empty = 1;

            input.parentElement.lastElementChild.innerText = `${input.placeholder} cannot be empty`;
            input.parentElement.className = "input-group error";

        }
        else if (input.name == "email") {

            let value = input.value;
            if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                if (!empty) e.preventDefault();

                input.parentElement.lastElementChild.innerText = "Looks like this is not an email";
                input.parentElement.className = "input-group error";
                
            }

        }
        else if (input.parentElement.className == "input-group error") {
            input.parentElement.className = "input-group";
        }

    });

});