document.addEventListener("DOMContentLoaded", function(){
    //Do this when DOM is loaded

    //Set event listeners/handlers for buttons
    //document.getElementById("login").onclick = login_handler;

    document.getElementById("signup").onclick = signup_handler;





});

function signup_handler(){
    let un = document.getElementById("username").value;
    let pw = document.getElementById("password").value;
    Session.signup(un,pw,signInS,failed);

}

function signInS(){
    let un = document.getElementById("username").value;
    let pw = document.getElementById("password").value;
    Session.login(un,pw,loginS,failed);
    
}  

function loginS(){
    window.location.href = "landingpage.html";
}
    

function login_handler(){
    let un = document.getElementById("username").value;
    let pw = document.getElementById("password").value;
    Session.login(un,pw,success,failed);
};



function success(){
    console.log(Session.access_token);
    console.log("worked");
    alert("success")
    window.location.href = "landingpage.html";

}

function failed(){
    console.log("failed");
    alert("failed")
}