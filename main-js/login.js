
function saveEmail (){
    let email = document.getElementById("email").value
    console.log(email)
    sessionStorage.setItem("user", email)
}