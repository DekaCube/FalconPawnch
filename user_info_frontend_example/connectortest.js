
document.addEventListener("DOMContentLoaded", function(){
    //Do this when DOM is loaded

    //Set event listeners/handlers for buttons
    document.getElementById('go').onclick = signup_handler;
    document.getElementById('login').onclick = login_handler;
    document.getElementById('timetest').onclick = testtime;
    
    
    
    
    
    
});
function testtime(){
    let timeslot = '010101010101010101010101010101010101010101010101';
    let daychange = 'monday';
    Session.updateTime(daychange,timeslot,success,fail);
}


function login_handler(){
    let username = document.getElementById('uname').value;
    let pw = document.getElementById('pw').value;
    Session.login(username,pw,login_success,fail);
    
    
    
}

function login_success(){
    Session.getInfo(userInfoSuccess,fail);
}
    

function signup_handler(){
    let username = document.getElementById('uname').value;
    let pw = document.getElementById('pw').value;
    Session.signup(username,pw,success,fail);
    
}

function userInfoSuccess(){
    let a = document.createElement('p');
    if(UserInfo.isValid()){
        a.innerHTML = "Logged in as " + UserInfo.username + "<br>" + "MONDAY:" +UserInfo.monday + "<br>";
        document.getElementById('userinfo').appendChild(a);
        a = document.createElement('p');
        a.innerHTML = "TUESDAY:" + UserInfo.tuesday + "<br>";
        document.getElementById('userinfo').appendChild(a);
        a = document.createElement('p');
        a.innerHTML = "WEDNESDAY:" + UserInfo.wednesday + "<br>";
        document.getElementById('userinfo').appendChild(a);
        a = document.createElement('p');
        a.innerHTML = "THURSDAY:"+UserInfo.thursday + "<br>";
        document.getElementById('userinfo').appendChild(a);
        a = document.createElement('p');
        a.innerHTML = "FRIDAY:"+UserInfo.friday + "<br>";
        document.getElementById('userinfo').appendChild(a);
        a = document.createElement('p');
        a.innerHTML = "SATURDAY:" +UserInfo.saturday + "<br>";
        document.getElementById('userinfo').appendChild(a);
        a = document.createElement('p');
        a.innerHTML = "SUNDAY:"+UserInfo.sunday + "<br>";
        document.getElementById('userinfo').appendChild(a);
        for(var k in UserInfo.groups){
            a = document.createElement('p');
            a.innerHTML = "GROUP " + k + " : "  + UserInfo.groups[k];
            document.getElementById('userinfo').appendChild(a);
        }
        
        
    }
        
    
}


    



function success(){
    //This is where you would do your work for a specific callback
    console.log("We did it!");
    console.log(Session.getResult());
    if(Session.isLoggedIn()){
        console.log(Session.getAT());
    }
}
function fail(){
    //This is where you would recover from a failure.
    
    console.log("We failed");
    if(Session.getResultReason != null);
    console.log(Session.getResultReason());
    
}
