//name input of user
function myFunction() {
    var n = document.getElementById("userid").value; 
    document.getElementById("userinput").innerHTML = "[1] > print(user)" + "\n" 
    + "> ........................................................................" 
    + "\n" + ">      Hello " + n + ", Welcome to my Website!!!" + "\n" 
    + "> ........................................................................";

    
}
    
//animate typer
function animateText(textArea) {
      let text = textArea.value;
      let to = text.length,
        from = 0;

      animate({
        duration: 2000,
        timing: bounce,
        draw: function(progress) {
          let result = (to - from) * progress + from;
          textArea.value = text.substr(0, Math.ceil(result))
        }
      });
    }


    function bounce(timeFraction) {
      for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
      }
    }


//Start the function

function start(){
myFunction();
animateText(userinput);
}


