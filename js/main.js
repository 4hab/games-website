

let currentuserName = localStorage.getItem('currentuserName');
if(currentuserName){
    let userNameElement = document.getElementById('user-name');
    let logoutBtn = document.getElementById('logout-btn');
    let loginBtn = document.getElementById('login-btn');
    userNameElement.innerHTML = currentuserName;
    userNameElement.classList.remove('hide');
    logoutBtn.classList.remove('hide');
    loginBtn.classList.add('hide');
}

