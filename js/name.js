function myFunction() {
    var name = prompt("Please enter your name", "Anonymous");
    if (name != null) {
        document.getElementById("user").innerHTML =
        "Hello " + name + "! Welcome to my Github Website";
    }
}


