//API CONNECTOR

class Session {
    
    constuctor(){
        Session.access_token = null;
        Session.action = null;
        Session.actionr = null;
        Session.logged_in = 0;
        

    }
    
    static getAT(){
        return Session.access_token;
    }
    
    static getResult(){
        return Session.action;
    }
    
    static getResultReason(){
        return Session.actionr;
    }
    

    
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