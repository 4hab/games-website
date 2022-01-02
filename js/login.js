function signup() {
    document.querySelector(".login-form-container").style.cssText = "display: none;";
    document.querySelector(".signup-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(56, 189, 149),  rgb(28, 139, 106));";
    document.querySelector(".button-1").style.cssText = "display: none";
    document.querySelector(".button-2").style.cssText = "display: block";

}

function login() {
    document.querySelector(".signup-form-container").style.cssText = "display: none;";
    document.querySelector(".login-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(6, 108, 224),  rgb(14, 48, 122));";
    document.querySelector(".button-2").style.cssText = "display: none";
    document.querySelector(".button-1").style.cssText = "display: block";

}

function validate(str, pattern) {
    var result = { yn: true, message: '' }

    if (str.length < 8) {
        result.yn = false;
        result.message = ' short';
    } else if (str.length > 24) {
        result.yn = false;
        result.message = 'long';
    }

    if (!str.match(pattern)) {
        result.yn = false;
        result.message = 'invalid';
    }

    return result;
}

//--------Registeration-----
function signNewUser() {
    var uname = document.getElementById('signName');
    var upass = document.getElementById('signPass');
    var uemail = document.getElementById('signEmail');
    var letters = /^[A-Za-z]+$/;
    var mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var goodinfo = true;

    var testname = validate(uname.value, letters);
    var testemail = validate(uemail.value, mailformat);



    //username
    if (testname.yn) {
        uname.nextElementSibling.innerHTML = '&#9745';
    } else {
        goodinfo = false;
        uname.nextElementSibling.innerHTML = '&#9746';
        uname.focus();
        uname.select();
    }
    //email
    if (testemail.yn) {
        uemail.nextElementSibling.innerHTML = '&#9745';
    } else {
        goodinfo = false;
        uemail.nextElementSibling.innerHTML = '&#9746';
        uname.select();
    }
    //password
    if (upass.value.length > 8) {
        upass.nextElementSibling.innerHTML = '&#9745';
    } else {
        goodinfo = false;
        upass.nextElementSibling.innerHTML = '&#9746';
        upass.select();
    }

    if (goodinfo) {
        var myusers = localStorage.getItem('users');
        myusers += '!U!' + uname.value + '^@^' + uemail.value + '$P$' + upass.value;
        localStorage.setItem('users', myusers);
        login();
        //console.log(localStorage.getItem('users'));
        //window.location = "thankyou.html";

    }


}
//----------login----------

function userlogin() {
    var enteredname = document.getElementById('logName').value;
    var enteredpass = document.getElementById('logPass').value;
    var mylocalDB = localStorage.getItem('users');
    var myusers = mylocalDB.split('!U!');
    var registeredUser = false;
    var wrongpass = false;
    //console.log(myusers);

    myusers.forEach(userElement => {
        let emailstart = userElement.indexOf('^@^');
        let passstart = userElement.indexOf('$P$');

        if (enteredname === userElement.substring(0, emailstart)) {

            if (enteredpass === userElement.substring(passstart + 3)) {
                registeredUser = true;
                localStorage.setItem('currentuserName', userElement.substring(0, emailstart));
                localStorage.setItem('currentuserEmail', userElement.substring(emailstart + 3, passstart));
                window.location = 'index.html';
                return 0;

            } else {
                alert('Wrong password');
                wrongpass = true;
            }

        }

    });


    if (!registeredUser && !wrongpass) {
        alert('Wrong User name');
    }

}


//let userobject = {
    //     username: userElement.substring(3, emailstart),
    //     useremail: userElement.substring(emailstart + 3, passstart),
    //     userpass: userElement.substring(passstart + 3)
    // }