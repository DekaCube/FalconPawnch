document.addEventListener("DOMContentLoaded", function(){
    //Do this when DOM is loaded

    //Set event listeners/handlers for buttons
 
    Session.logout(s,f);
    
    
    

});


function s(){
    alert("logout successful");
    window.location.href = "login-page.html"
}

function f(){
    let ws = document.getElementById('msg');
    ws.innerHTML = "Something went wrong when logging you out. Maybe your session already expired?"
}