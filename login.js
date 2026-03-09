document.getElementById("signin-btn").addEventListener("click", function(){
    const usernameInput =document.getElementById("input-username");
    const username = usernameInput.value;
    console.log(username);

    const inputPassword = document.getElementById("input-password");
    const password = inputPassword.value;
    console.log(password);

    if(username === "admin" && password === "admin123"){
        alert("login Success")
        window.location.assign("home.html");
    } else {
        alert("login Failed");
        return;
    }


})