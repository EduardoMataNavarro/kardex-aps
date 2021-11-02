const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    console.log(e) 
    var username = document.querySelector('input[name="username"]').value;
    var password = document.querySelector('input[name="password"]').value;
    const loginPayload = {
        username,
        password
    }
    console.log(loginPayload);
    window.location.assign('kardex.html');
});