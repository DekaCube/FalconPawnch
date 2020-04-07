
document.addEventListener("DOMContentLoaded", function(){
    //Do this when DOM is loaded

    //Set event listeners/handlers for buttons
    document.getElementById('go').onclick = signup_handler;
    document.getElementById('login').onclick = login_handler;
    
    
    
    
    
    
    
});
function login_handler(){
    let username = document.getElementById('uname').value;
    let pw = document.getElementById('pw').value;
    Session.login(username,pw,success,fail);
    
}

function signup_handler(){
    let username = document.getElementById('uname').value;
    let pw = document.getElementById('pw').value;
    Session.signup(username,pw,success,fail);
}
    



function success(){
    //This is where you would do your work for a specific callback
    console.log("We did it!");
    console.log(Session.getResult());
}
function fail(){
    //This is where you would recover from a failure.
    
    console.log("We failed");
    if(Session.getResultReason != null);
    console.log(Session.getResultReason());
    
}
