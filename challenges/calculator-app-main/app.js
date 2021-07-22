localStorage.setItem("result", -1);

$(".key").on("click", function(){

    let key = this;
    let key_type = $(key).attr("data-key");
    let screen = document.querySelector('.screen');
    let value = screen.firstElementChild;
    let operation = screen.lastElementChild;
    let result = localStorage.getItem("result");
    let sign = screen.getAttribute("data-sign");

    if(parseInt(screen.getAttribute("data-clear-operation"))){
        operation.innerText = "";
        screen.setAttribute("data-clear-operation", 0);
    }

    if (key_type == "number" || key_type == "dot") {

        if (parseInt(screen.getAttribute("data-clear-value"))) {
            value.innerText = "";
        }

        value.innerText += key.innerText;

        localStorage.setItem("result", parseFloat(value.innerText));

        if (sign != "") {
            
            // if (sign == "+") {
            //     result = parseFloat(result) + parseFloat(value.innerText);
            // }
            // else if (sign == "-") {
            //     result = parseFloat(result) - parseFloat(value.innerText);
            // }
            // else if (sign == "x") {
            //     result = parseFloat(result) * parseFloat(value.innerText);
            // }
            // else if (sign == "/") {
            //     result = parseFloat(result) / parseFloat(value.innerText);
            // }

            result = calculate(result, value.innerText, sign);

            localStorage.setItem("result", result);
            screen.setAttribute("data-sign", "");

        }

    }
    else if(key_type != "reset" && key_type != "del" && key_type != "equal" && result != -1){

        if (key.innerText == "/" && operation.innerText != "") {
            operation.innerText = "(" + operation.innerText + value.innerText + ")" + key.innerText;
        }
        else{
            operation.innerText += value.innerText + key.innerText;
        }

        screen.setAttribute("data-clear-value", 1);
        screen.setAttribute("data-sign", key.innerText);

    }

    if(key_type == "equal"){

        if (sign != "") {
            
            console.log(operation.innerText);

            result = operation.innerText.split(sign)[0];

            result = calculate(result, result, sign);

            localStorage.setItem("result", result);

        }

        operation.innerText += value.innerText + "=";

        console.log(result);

        value.innerText = result;

        screen.setAttribute("data-clear-operation", 1);

    }

    if (key_type == "reset") {
        
        value.innerText = "";
        operation.innerText = "";

        screen.setAttribute("data-sign", "");
        screen.setAttribute("data-clear-value", 0);
        screen.setAttribute("data-clear-operation", 0);

        localStorage.setItem("result", -1);

    }

})

function calculate(a, b, sign){

    let result;

    if (sign == "+") {
        result = parseFloat(a) + parseFloat(b);
    }
    else if (sign == "-") {
        result = parseFloat(a) - parseFloat(b);
    }
    else if (sign == "x") {
        result = parseFloat(a) * parseFloat(b);
    }
    else if (sign == "/") {
        result = parseFloat(a) / parseFloat(b);
    }

    result = Math.round(result * 1000000) / 1000000; // Round decimals if necessary

    return result;

}