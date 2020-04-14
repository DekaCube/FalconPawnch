var group = "";
document.addEventListener("DOMContentLoaded", function(){
    //Do this when DOM is loaded

    //Set event listeners/handlers for buttons
    document.getElementById('submit').onclick = listen_handler;
    
    document.getElementById('create').onclick = group_handler;
    
    display_name();
    
    
    Session.getInfo(groupInfoS,groupInfoF);

    Session.getGroupInfo("123321321",groupinfoSuccess,failed);

    
    
    

});

function populateGroups(){
    console.log("ENTERING POPULATE GROUPS");
    let workspace = document.getElementById('grouppanel');
    
    let node = document.createElement('h3');
    node.innerHTML = "GROUPS";
    
    workspace.appendChild(node);
    
    let size = UserInfo.groups.length;
    console.log(UserInfo.groups);
    if(size == 0){
        node = document.createElement('h3');
        node.innerHTML = "NOT A MEMBER IN ANY GROUPS!";
        workspace.appendChild(node);
    }
    let i = 0;
    let b1 = null;
    let b2 = null;
    for(i = 0; i < size;i++){
        node = document.createElement('p');
        node.innerHTML = UserInfo.groups[i];
        console.log(UserInfo.groups[i]);
        node.setAttribute('id',UserInfo.groups[i]);
        b1 = document.createElement('button');
        b1.innerHTML = "leave"; //NEEDS AN ONCLICK
        b2 = document.createElement('button');
        b2.innerHTML = "show info" //NEEDS AN ONCLICK;
        let junkspace = document.createElement('br');
        workspace.appendChild(node);
        workspace.appendChild(b1);
        workspace.appendChild(b2);
        
    }
    console.log("EXITING POPULATE GROUPS");
}

function groupInfoS(){
    populateGroups()
   
}

function groupInfoF(){
    alert("SOMETHING WENT WRONG!");
}



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

