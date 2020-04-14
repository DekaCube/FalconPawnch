//API CONNECTOR


/* Connector for Using When Diagram API 
*  Author : Daniel Bennett
*  Date   :  4/8/2020
*  Description : contains functions for making simple calls to the WhenDiagram backend
*  using a callback mechanic to handle successes and failures for each call. 
*/ 



/* List of Completed Functionality 
* Login
* Logout
* Signup
* Update time
* Get User Info
* Create group
* Join Group
* Leave Group 
* Get Group Info
*/ 


/* TODO 
* Better Failure Detection
*/ 



class Session {
    
    constuctor(){
        Session.access_token = null;
        Session.action = null;
        Session.actionr = null;
        
        

    }
    
    //Returns true if active session, else false
    static isLoggedIn(){
        let logged_in = sessionStorage.getItem("WhenDiagramLoginStatus");
        if(logged_in){
            return logged_in;
        }
        return null;
    }
    
    static setLogin(login){
        sessionStorage.setItem("WhenDiagramLoginStatus", login);
    }
        
        
    
    static setAT(at){
        sessionStorage.setItem('WhenDiagramAccessToken', at);
    }
    
    //Returns the current sessions access token in string format
    static getAT(){
        let at = sessionStorage.getItem('WhenDiagramAccessToken');
        if(at){
            return at;
        }
        else{
            return null;
        }
    }
    
    //Returns the result of the last action attempted either "success" or "fail"
    static getResult(){
        return Session.action;
    }
    
    //Returns the reason the last action failed(maybe?)
    static getResultReason(){
        return Session.actionr;
    }
    
    //Update the users data on the server for a specific time.
    static updateTime(day,timevalue,onSuccessCallback,onFailCallback){
        console.log("SENDING TIME UPDATE REQUEST FOR " + day);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            //console.log(this.responseText);
            if (this.readyState == 4 && this.status == 200) {
                let result = JSON.parse(this.responseText);
                if(result['action'] == 'success'){
                    Session.action = 'success';
                    Session.actionr = null;
                    onSuccessCallback();
                    
                    
                }
                else{
                    Session.action = 'fail';
                    Session.actionr = result.reason;
                    onFailCallback();
                }
        
        
            }
        };
        
        let p1 = 'https://lamp.cse.fau.edu/~dbenne11/whendiagram/enter_time.php?time='
        let p2 = timevalue;
        let p3 = '&day=';
        let p4 = day;
        let p5 = '&at=';
        let url = p1 + p2 + p3 + p4 + p5 + Session.getAT();
        
            
        xmlhttp.open("POST", url, true);
        xmlhttp.send();
        Session.get
    }
    
    //Joins a group
    static joinGroup(groupname,onSuccessCallback,onFailCallback){
        console.log("JOINING GROUP" + groupname);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let result = JSON.parse(this.responseText);
                if(result['action'] == 'success'){
                    Session.action = 'success';
                    onSuccessCallback();
                }
                else{
                    Session.action = "fail";
                    Session.actionr = result.reason;
                    onFailCallback();
                }
        
        
            }
        };
        let p1 = 'https://lamp.cse.fau.edu/~dbenne11/whendiagram/join_group.php?at='
        let p2 = Session.getAT();
        let p3 = '&group=';
        let p4 = groupname;
        let url = p1 + p2 + p3 + p4;
        
        
            
        xmlhttp.open("POST", url, true);
        xmlhttp.send();
    }
    
    //Leaves a group
    static leaveGroup(groupname,onSuccessCallback,onFailCallback){
        
        console.log("LEAVING GROUP" + groupname);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let result = JSON.parse(this.responseText);
                if(result['action'] == 'success'){
                    Session.action = 'success';
                    onSuccessCallback();
                }
                else{
                    Session.action = "fail";
                    Session.actionr = result.reason;
                    onFailCallback();
                }
        
        
            }
        };
        let p1 = 'https://lamp.cse.fau.edu/~dbenne11/whendiagram/leave_group.php?at='
        let p2 = Session.getAT();
        let p3 = '&group=';
        let p4 = groupname;
        let url = p1 + p2 + p3 + p4;
        
        
            
        xmlhttp.open("POST", url, true);
        xmlhttp.send();
    }
    
    //Populate the GroupInfo Singleton
    static getGroupInfo(groupname,onSuccessCallback,onFailCallback){
        console.log("GETTING GROUP INFO FOR GROUP =" + groupname);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let result = JSON.parse(this.responseText);
                console.log(this.responseText);
                if(result['action'] == 'success'){
                    Session.action = 'success';
                    GroupInfo.buildData(this.responseText);
                    onSuccessCallback();
                }
                else{
                    Session.action = "fail";
                    Session.actionr = result.reason;
                    onFailCallback();
                }
        
        
            }
        };
        let p1 = 'https://lamp.cse.fau.edu/~dbenne11/whendiagram/get_group_info.php?at='
        let p2 = Session.getAT();
        let p3 = '&group='
        let p4 = groupname;
        let url = p1 + p2 + p3 + p4;
            
        xmlhttp.open("POST",url, true);
        xmlhttp.send();
    }

        
        
        
    
    
    //Logs the user out
    static logout(onSuccessCallback,onFailCallback){ 
    
        console.log("Logging OUT");
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let result = JSON.parse(this.responseText);
                if(result['action'] == 'success'){
                    Session.action = 'success';
                    onSuccessCallback();
                }
                else{
                    Session.action = "fail";
                    Session.actionr = result.reason;
                    onFailCallback();
                }
        
        
            }
        };
        let thing1 = 'https://lamp.cse.fau.edu/~dbenne11/whendiagram/logout.php?at='
        let url = thing1 + Session.getAT();
        
            
        xmlhttp.open("POST", url, true);
        xmlhttp.send();
    }
    

    //Logs the user in
    static login(username,pw,onSuccessCallback,onFailCallback){
        console.log("SENDING LOGIN REQUEST");
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                let result = JSON.parse(this.responseText);
                console.log(result);
                if(result['login'] == 'success'){
                    Session.setAT(result.access_token);
                    Session.setLogin(1);
                    Session.action = "success";
                    onSuccessCallback();
                    
                    
                    
                }
                else{
                    Session.action = "fail";
                    onFailCallback();
                    
                }
        
        
            }
        };
        let p1 = 'https://lamp.cse.fau.edu/~dbenne11/whendiagram/login.php?username='
        let p2 = username;
        let p3 = '&pw=';
        let p4 = pw;
        let url = p1 + p2 + p3 + p4;
        
            
        xmlhttp.open("POST", url, true);
        xmlhttp.send();
    }
    
    //Signs up for a new account
    static signup(username,pw,onSuccessCallback,onFailCallback){
        console.log("SENDING REQUEST FOR NEW ACCOUNT");
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                let result = JSON.parse(this.responseText);
                console.log(result);
                if(result['account_creation'] == 'success'){
                    Session.action = 'success';
                    onSuccessCallback();
                }
                else{
                    Session.actionr = result.reason;
                    onFailCallback();
                }
                    
        
        
            }
        };
        let p1 = 'https://lamp.cse.fau.edu/~dbenne11/whendiagram/add_user.php?username='
        let p2 = username;
        let p3 = '&pw=';
        let p4 = pw;
        let url = p1 + p2 + p3 + p4;
        
            
        xmlhttp.open("POST", url, true);
        xmlhttp.send();
    }

    static leaveGroup(groupname,onSuccessCallback,onFailCallback){
        console.log("LEAVING GROUP " + groupname);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                let result = JSON.parse(this.responseText);
                console.log(result);
                if(result['action'] == 'success'){
                    Session.action = 'success';
                    onSuccessCallback();
                }
                else{
                    Session.actionr = result.reason;
                    onFailCallback();
                }
                    
        
        
            }
        };
        let p1 = 'https://lamp.cse.fau.edu/~dbenne11/whendiagram/leave_group.php?at='
        let p2 = Session.getAT();
        let p3 = '&group=';
        let p4 = groupname;
        let url = p1 + p2 + p3 + p4;
        
            
        xmlhttp.open("POST", url, true);
        xmlhttp.send();
    }
    

    //Get Info About the currently logged in USER : will fail if not logged in.
    static getInfo(onSuccessCallback,onFailCallback){
        console.log("SENDING REQUEST FOR USER INFO");
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                let result = JSON.parse(this.responseText);
                console.log(result);
                if(result['valid'] == 'true'){
                    Session.action = 'success';
                    UserInfo.username = result.username;
                    UserInfo.monday = result.monday;
                    UserInfo.tuesday = result.tuesday;
                    UserInfo.wednesday = result.wednesday;
                    UserInfo.thursday = result.thursday;
                    UserInfo.friday = result.friday;
                    UserInfo.saturday = result.saturday;
                    UserInfo.sunday = result.sunday;
                    UserInfo.groups = result.groups
                    UserInfo.valid = true;
                    
                    onSuccessCallback();
                    
                }
                else{
                    Session.actionr = result.reason;
                    UserInfo.valid = false;
                    onFailCallback();
                }
                    
        
        
            }
        };
        let p1 = 'https://lamp.cse.fau.edu/~dbenne11/whendiagram/get_user_info.php?at=';
        let p2 = Session.getAT();
        let url = p1 + p2;
        
        xmlhttp.open("POST", url, true);
        xmlhttp.send();
    }
    
    
    //Create a group
    static createGroup(groupname,onSuccessCallback,onFailCallback){
        console.log("SENDING REQUEST TO CREATE GROUP " + groupname);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                let result = JSON.parse(this.responseText);
                console.log(result);
                if(result['action'] == 'success'){
                           
                    onSuccessCallback();
                    
                }
                else{
                    Session.action = result.reason;
                    
                    onFailCallback();
                }
                    
        
        
            }
        };
        let p1 = 'https://lamp.cse.fau.edu/~dbenne11/whendiagram/create_group.php?at=';
        let p2 = Session.getAT();
        let p3 = "&group="
        let p4 = groupname;
        let url = p1 + p2 + p3 + p4;
        
        xmlhttp.open("POST", url, true);
        xmlhttp.send();
    }
        
}

// TODO : ADD PERSISTANCE ACROSS DOMAIN
// FOR NOW IF YOU REDIRECT OR CHANGE PAGES REQUEST THE USER INFO AGAIN...
// SHOULD BE USED LIKE A SINGLETON.

class UserInfo {
    static valid = false;
    static monday;
    static tuesday;
    static wednesday;
    static thursday;
    static friday;
    static saturday;
    static sunday;
    static groups;
    
    static isValid(){
        return UserInfo.valid;
    }
        
    static getUsername(){
        return UserInfo.username;
    }
    
    
    
        
}

class GroupInfo {
    static valid = false;
    static monday;
    static tuesday;
    static wednesday;
    static thursday;
    static friday;
    static saturday;
    static sunday;
    static members;
    
    
    static setValid(v){
        sessionStorage.setItem("WhenDiagramGStatus", v);
    }
    
    static isValid(){
        return sessionStorage.getItem("WhenDiagramGStatus");
    }
    
    static buildData(response){
        sessionStorage.setItem("WhenDiagramG", response);
        GroupInfo.setValid(true); 
    }
    
    static getMonday(){
        if(GroupInfo.isValid()){
            let vars = JSON.parse(sessionStorage.getItem("WhenDiagramG"));
            return vars.monday;
        }
        return false;
    }
    
    static getTuesday(){
        if(GroupInfo.isValid()){
            let vars = JSON.parse(sessionStorage.getItem("WhenDiagramG"));
            return vars.tuesday;
        }
        return false;
    }
    
    static getWednesday(){
        if(GroupInfo.isValid()){
            let vars = JSON.parse(sessionStorage.getItem("WhenDiagramG"));
            return vars.wednesday;
        }
        return false;
    }
    
    static getThursday(){
        if(GroupInfo.isValid()){
            let vars = JSON.parse(sessionStorage.getItem("WhenDiagramG"));
            return vars.thursday;
        }
        return false;
    }
    
    static getFriday(){
        if(GroupInfo.isValid()){
            let vars = JSON.parse(sessionStorage.getItem("WhenDiagramG"));
            return vars.friday;
        }
        return false;
    }
    
    static getSaturday(){
        if(GroupInfo.isValid()){
            let vars = JSON.parse(sessionStorage.getItem("WhenDiagramG"));
            return vars.saturday;
        }
        return false;
    }
    
    static getSunday(){
        if(GroupInfo.isValid()){
            let vars = JSON.parse(sessionStorage.getItem("WhenDiagramG"));
            return vars.sunday;
        }
        return false;
    }
    
    static getMembers(){
        if(GroupInfo.isValid()){
            let vars = JSON.parse(sessionStorage.getItem("WhenDiagramG"));
            return vars.members;
        }
        return false;
    }
    
    static getOwner(){
        if(GroupInfo.isValid()){
            let vars = JSON.parse(sessionStorage.getItem("WhenDiagramG"));
            return vars.owner;
        }
        return false;
    }
    
    static arrToString(arr){
        return arr.join("");
    }
    
}
    