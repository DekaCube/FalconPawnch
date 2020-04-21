var group = "";
document.addEventListener("DOMContentLoaded", function(){
    //Do this when DOM is loaded

    //Set event listeners/handlers for buttons
    document.getElementById('submit').onclick = listen_handler;
    
    document.getElementById('create').onclick = group_handler;

    document.getElementById('join').onclick = join_handler;
    document.getElementById('openform1').onclick = openForm;
    document.getElementById('openform2').onclick = openForm2;
    
    display_name();
    
    
    Session.getInfo(groupInfoS,groupInfoF);

    Session.getGroupInfo("123321321",groupinfoSuccess,failed);
    redrawGroupPanel();

    
    
    

});

function null_callback(){
}

function leaveGroupClick(){
    Session.leaveGroup(this.id,null_callback,null_callback());
    Session.getInfo(groupInfoS,groupInfoF);
    
    
}

function join_handler(){
    let join = document.getElementById("groupname2").value;
    Session.joinGroup(join,success,failed);
}

function hideInfoClick(){
    this.innerHTML = "Info of selected day ";
    document.getElementById('buts').style.display = "block";
    let thingtoremove = document.getElementById('groupInfo');
    document.getElementById('display').removeChild(thingtoremove);
    this.onclick = showInfoClick;
    
}

function buildIframe(){
    let iframe = document.createElement('iframe');
    if (day == 'monday'){
        var dayGroup = GroupInfo.arrToString(GroupInfo.getMonday());
    }
    else if (day == 'tuesday'){
        var dayGroup = GroupInfo.arrToString(GroupInfo.getTuesday());
    }
    else if (day == 'wednesday'){
        var dayGroup = GroupInfo.arrToString(GroupInfo.getWednesday());
    }
    else if (day == 'thursday'){
        var dayGroup = GroupInfo.arrToString(GroupInfo.getThursday());
    }
    else if (day == 'friday'){
        var dayGroup = GroupInfo.arrToString(GroupInfo.getFriday());
    }
    else if (day == 'saturday'){
        var dayGroup = GroupInfo.arrToString(GroupInfo.getSaturday());
    }
    else if (day == 'sunday'){
        var dayGroup = GroupInfo.arrToString(GroupInfo.getSunday());
    }
    iframe.setAttribute("src",'https://lamp.cse.fau.edu/~dbenne11/whendiagram/drawgraph.php?data=' + dayGroup
                        + '&day=' + day.charAt(0).toUpperCase() + day.slice(1))

    iframe.setAttribute("id","groupInfo");
    iframe.style.width = "50%";
    iframe.style.height = "80%";
    iframe.allow = "fullscreen";   
    let display = document.getElementById("display");
    display.appendChild(iframe);
}
    

function showInfoClick(){
    let group = this.id.substring(1);
    this.innerHTML = "HIDE INFO"
    let buttons = document.getElementById('buts');
    buttons.style.display = "none";
    this.onclick = hideInfoClick;
    Session.getGroupInfo(group,buildIframe,null_callback);
    
    
}

function populateGroups(){
    console.log("ENTERING POPULATE GROUPS");
    
    let workspace = document.getElementById('grouppanel');
    workspace.innerHTML = ""; //KILL THAT CONTENT
    
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
        b1.setAttribute("id",UserInfo.groups[i]);
        b1.onclick = leaveGroupClick;
        b2.innerHTML = "Info of selcted day" //NEEDS AN ONCLICK;
        let junkspace = document.createElement('br');
        b2.setAttribute("id","b" + UserInfo.groups[i]);
        b2.onclick = showInfoClick;
        workspace.appendChild(node);
        workspace.appendChild(b1);
        workspace.appendChild(b2);
        
    }
    console.log("EXITING POPULATE GROUPS");
}

function groupInfoS(){
    populateGroups()
   
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    redrawGroupPanel() ;   
  }

function openForm2() {
    document.getElementById("myForm2").style.display = "block";
  }
  
function closeForm2() {
    document.getElementById("myForm2").style.display = "none";
    redrawGroupPanel();
  }

function groupInfoF(){
    alert("SOMETHING WENT WRONG!");
}

function redrawGroupPanel(){
    Session.getInfo(populateGroups,null_callback);
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