<?php
//VALIDATE ACCESS TOKEN AND UPDATE IT

//Turn off error reporting to hide notices from end user.
//error_reporting(0);

//Needed for CORS Bullshit
header("Access-Control-Allow-Origin: *");

require_once './creds.php';
$token = "";
$debug_level = 0;

function validate_token($db,$debug_level){
    //Make sure access token variable is set
    if(isset($_REQUEST["at"]))
    {
        $token = $_REQUEST["at"];
    }
    else{
        return array(0,"null");
    }
    //Make sure the token is not null
    if($token == ""){
        return array(0,"null");
    }
    $request_time = time();
    $token_valid = 0;
    $user = "null";
    
    
    $query = "SELECT * FROM TOKENS WHERE token='".$token."';";
    if($debug_level == 1){
        echo "BEFORE QUERY<br>";
    }
    
    //echo $token;
    if($result = $db->query($query)){
        if($debug_level == 1){
            echo "STARTING QUERY<br>";
        }
        while($row = $result->fetch_assoc())
        { //Search through all the returned tuples.
            if($debug_level == 1){
            echo "INSIDE WHILE<br>";
            }
            if($row['token'] == $token) //Make sure the token matches
            {
               if($debug_level == 1){
               echo "INSIDE FIRST IF<br>";
               }
                if(($row['t_last_used'] + 1800) >= $request_time) //Make sure token isn't too old
                {
                    if($debug_level == 1){
                        echo "INSIDE SECOND IF<br>";
                    }
                    $token_valid = 1;
                    $user = $row['user'];               
                }
            }
        } //END WHILE
    }
    if($debug_level == 1){
        echo "AFTER QUERY<br>";
    }
    if($token_valid == 0){
        return array(0,"null");
    }
    else{
        $query = "UPDATE TOKENS SET t_last_used='".$request_time."' WHERE token='".$token."';";
        
        $db->query($query);
    }
    
    return array(1,$user);
}




    




