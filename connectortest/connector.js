//API CONNECTOR

class Session {
    
    constuctor(){
        Session.access_token = null;
        Session.action = null;
        Session.actionr = null;
        Session.logged_in = 0;
        

    }
    
    //Returns true if active session, else false
    static isLoggedIn(){
        if(Session.logged_in == 1){
            return true;
        }
        return false;
    }
    
    //Returns the current sessions access token in string format
    static getAT(){
        return Session.access_token;
    }
    
    //Returns the result of the last action attempted either "success" or "fail"
    static getResult(){
        return Session.action;
    }
    
    //Returns the reason the last action failed(maybe?)
    static getResultReason(){
        return Session.actionr;
    }
    
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
                    Session.access_token = result.access_token;
                    Session.logged_in = 1;
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
}