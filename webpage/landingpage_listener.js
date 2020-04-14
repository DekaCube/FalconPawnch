var group = "";
document.addEventListener("DOMContentLoaded", function(){
    //Do this when DOM is loaded

    //Set event listeners/handlers for buttons
    document.getElementById('submit').onclick = listen_handler;
    
    document.getElementById('create').onclick = group_handler;
    
    display_name();

    Session.getGroupInfo("123321321",groupinfoSuccess,failed);

    var groupmonday = GroupInfo.arrToString(GroupInfo.getMonday());

});



function listen_handler(){

    Session.updateTime(day,time,success,failed);
}

function group_handler(){
    let group = document.getElementById("groupname").value;
    Session.createGroup(group,success,failed);
}

function display_name(){
    Session.getInfo(userinfoSuccess,failed);
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
    group = UserInfo.groups[0];
}

function groupinfoSuccess(){
    console.log(Session.access_token);
    console.log("group retrived");
    console.log(GroupInfo.arrToString(GroupInfo.getMonday()));
}

