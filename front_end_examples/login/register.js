
document.addEventListener("DOMContentLoaded", function(){
    //Do this when DOM is loaded

    //Set event listeners/handlers for buttons
    document.getElementById('go').onclick = register_user;
    document.getElementById('login').onclick = login_user;
    
});



var register_user = function(){
    
    console.log("SENDING REQUEST FOR NEW ACCOUNT");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let result = JSON.parse(this.responseText);
            if(result['account_creation'] == 'success'){
                document.getElementById('status').innerHTML = "NEW ACCOUNT CREATION SUCCESS";
            }
            else{
                document.getElementById('status').innerHTML = result.reason;
            }
    
    
        }
    };
    var p1 = 'https://lamp.cse.fau.edu/~dbenne11/whendiagram/add_user.php?username='
    var p2 = document.getElementById('uname').value;
    var p3 = '&pw=';
    var p4 = document.getElementById('pw').value;
    url = p1 + p2 + p3 + p4;
    
        
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}


//Adding code for login here

var login_user = function(){
    
    console.log("SENDING REQUEST FOR NEW LOGIN");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let result = JSON.parse(this.responseText);
            if(result['login'] == 'success'){
                document.getElementById('status').innerHTML = "LOGIN GOOD, ACCESS TOKEN = " + result.access_token;
            }
            else{
                document.getElementById('status').innerHTML = "LOGIN FAILED";
            }
    
    
        }
    };
    var p1 = 'https://lamp.cse.fau.edu/~dbenne11/whendiagram/login.php?username='
    var p2 = document.getElementById('uname').value;
    var p3 = '&pw=';
    var p4 = document.getElementById('pw').value;
    url = p1 + p2 + p3 + p4;
    
        
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}
