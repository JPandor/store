let url = window.location.search.substring(1);
console.log(url);

switch(url){
    case "change=true":
        document.getElementById("alert").innerText = "Your password has successfully been changed!";
        document.getElementById("alert").style.background = "rgb(62, 136, 91)"
        break;
    case "delete=true":
        document.getElementById("alert").innerText = "Your account has been deleted.";
        document.getElementById("alert").style.background = "rgb(62, 136, 91)"
        break;
    case "login=failed":
        document.getElementById("alert").innerText = "Your email or password is incorrect";
        document.getElementById("alert").style.background = "rgb(209, 70, 47)"
        break;
    case "signup=true":
        document.getElementById("alert").innerText = "Your account has been created! Please sign in";
        document.getElementById("alert").style.background = "rgb(62, 136, 91)"
        break;
    case "change=false":
        document.getElementById("alert").innerText = "Your security question was answered incorrectly";
        document.getElementById("alert").style.background = "rgb(209, 70, 47)"
        break;
    default:
        document.getElementById("alert").style.visibility = "hidden";
        break;
}