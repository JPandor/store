
function saveEmail (){
    let email = document.getElementById("email").value
    sessionStorage.setItem("user", email)
}

function signOut (){
    sessionStorage.removeItem("user")
}