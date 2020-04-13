var groupname


document.addEventListener("DOMContentLoaded", function(){
    //Do this when DOM is loaded

    //Set event listeners/handlers for buttons
    document.getElementById('submit').onclick = listen_handler;
    
    document.getElementById('create').onclick = group_handler;

    document.getElementById('leave').onclick = group_handler;

    
    Session.getInfo(userinfoSuccess,failed);
    

    Session.getGroupInfo(group,groupinfoSuccess,failed);

    var groupmonday = GroupInfo.arrToString(GroupInfo.getMonday());

});



function listen_handler(){

    Session.updateTime(day,time,success,failed);
}

function group_handler(){
    let group = document.getElementById("groupname").value;
    Session.createGroup(group,success,failed);
}

function leave_handler(){
    Session.leaveGroup("123321321",leaveSucess,failed)
}


function success(){
    console.log(Session.access_token);
    console.log("worked");
    alert("login sucess");

}

function failed(){
    console.log("failed");
}

function userinfoSuccess(){
    console.log(Session.access_token);
    console.log("worked");
    console.log(UserInfo.getUsername());
    groupname = UserInfo.groups[0];
    
    alert(groupname);
 
}  

function groupinfoSuccess(){
    console.log(Session.access_token);
    console.log("group retrived");
    console.log(GroupInfo.arrToString(GroupInfo.getMonday()));
}

function leaveSucess(){
    console.log(Session.access_token);
    console.log("left group");
}