let url = window.location.search.substring(1);

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

switch(url){
    case "change=true":
        alert('Your password has successfully been changed!', 'success')
        break;
    case "delete=true":
        alert('Your account has been deleted.', 'success')
        break;
    case "login=failed":
        alert('Your email or password is incorrect.', 'danger')
        break;
    case "signup=true":
        alert('Your account has been created! Please sign in.', 'success')
        break;
    case "change=false":
        alert('Your security question was answered incorrectly', 'danger')
        break;
    default:
        document.getElementById("liveAlertPlaceholder").style.visibility = "hidden";
        break;
}

function saveEmail (){
    let email = document.getElementById("email").value
    sessionStorage.setItem("user", email)
}

function signOut (){
    sessionStorage.removeItem("user")
}