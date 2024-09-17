let userName = document.getElementById("userName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let btn = document.getElementById("btn");
let result = document.getElementById("result");
let homeUserId;

if (localStorage.getItem('homeUserId') !== null) {
    localStorage.removeItem('homeUserId');
}

btn.addEventListener("click", () => {
    let nameValue = userName.value;
    let passwordValue = password.value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    nameValue = nameValue.replace(/\s+/g, '');
    result.textContent = '';
    result.style.color = 'red';

    if (btn.textContent == 'Sign Up') {
        let emailValue = email.value;

        if (nameValue == '' || emailValue == '' || passwordValue == '') {
            result.textContent = '*Please fill the fields!';
            return;
        } else {
            if (nameValue.length <= 5) {
                result.textContent = '*User Name Should be more than 5 characters!';
                return;
            }

            if (!emailRegex.test(emailValue)) {
                result.textContent = '*Valid your Email!'
                return;
            }

            if (passwordValue.length <= 8) {
                result.textContent = '*Password Should be more than 8 characters!';
                return;
            }
        }

        fetch('https://66e7e6c1b17821a9d9da70a4.mockapi.io/login', {
            method: 'POST',
            body: JSON.stringify({
                name: nameValue,
                email: emailValue,
                password: passwordValue,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('homeUserId', data.id);
                // localStorage.setItem('homeUserName', data.name);
                window.location.href = 'home.html';
            });
    } else if (btn.textContent == 'Log in') {
        if (nameValue == '' || passwordValue == '') {
            result.textContent = '*Please fill the fields!';
            return;
        } else {
            if (nameValue.length <= 5) {
                result.textContent = '*Invalid User Name!';
                return;
            }

            if (passwordValue.length <= 8) {
                result.textContent = '*Invalid Password!';
                return;
            }
        }

        fetch('https://66e7e6c1b17821a9d9da70a4.mockapi.io/login')
            .then((response) => response.json())
            .then((data) => {
                data.map(user => {
                    if (user.name == nameValue && user.password == passwordValue) {
                        localStorage.setItem('homeUserId', user.id);
                        // localStorage.setItem('homeUserName', user.name);
                        window.location.href = 'home.html';
                    } else {
                        result.textContent = '*Invalid Login!'
                        return;
                    }
                })
            });
    }
})