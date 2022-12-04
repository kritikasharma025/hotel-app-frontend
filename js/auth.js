var appUrl = "https://kritikasharma025.github.io/hotel-app-frontend"
// var appUrl = "http://localhost:5500";
// var serverUrl = "http://localhost:8080/api"
var serverUrl = "https://hotel-app-backend.onrender.com/api"

const showButtonLoader = () => {
    document.getElementsByClassName("btn-loader")[0].innerHTML = `<div class="spinner-border text-light" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;
}

const hideButtonLoader = (str) => {
    document.getElementsByClassName("btn-loader")[0].innerHTML = str;
}

window.onload = async function (){
    if(localStorage.getItem('jwToken')){
        if(window.location.href === `${appUrl}/login.html` || window.location.href === `${appUrl}/register.html`){
            return window.location.href = `${appUrl}/index.html`;
        }else{
            return;
        }
    }else{
        if(window.location.href===`${appUrl}/register.html`){
            return
        }
        else if(window.location.href === `${appUrl}/login.html`){
            return
        }else{
            return window.location.href = `${appUrl}/login.html`
        }
    }
}

const register = async () => {
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if(!email || !password || !name){
        window.alert("All fields are required!!")
    }else{
        showButtonLoader()
        let body = {
            name, email, password
        }

        let data = await fetch(`${serverUrl}/auth/register`, {
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            method:"POST",
            body: JSON.stringify(body)
        })

        data = await data.json();
        console.log(data)

        hideButtonLoader("Register")

        if(data.status !== false || data.email){
            window.alert("User has been registered successfully.")
            window.location.href = `${appUrl}/login.html`;
        }else{
            alert(data.message);
        }
    }
}

const login = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(!email || !password){
        window.alert("All the fields are required.")
    }else{
        showButtonLoader()
        let body = {
            email, password
        }

        let data = await fetch(`${serverUrl}/auth/login`, {
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            method:"POST",
            body: JSON.stringify(body)
        })

        data = await data.json()

        hideButtonLoader("Login")

        if (data.status === false) {
            window.alert(data.message)
        } else {
            localStorage.setItem("jwToken", data.jwToken);
            window.location.reload()
        }
    }
}