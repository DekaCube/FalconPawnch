<?php
/* Logout Function 
* Author : Daniel Bennett
* Date : 4/5/2020
*/

require_once './creds.php';
require_once './validate_inner.php';

//CORS HEADER FOR X-ORIGIN
header("Access-Control-Allow-Origin: *");

$validation_results = validate_token($db,$debug_level);

if($validation_results[0] == 1){
        //If valid login then delete the token;
        $query = "DELETE FROM TOKENS WHERE user='".$validation_results[1]."';";
        
        //Send query
        $db->query($query);
        
        //Send Result
        echo '{"action" : "success"}';
}
else{
       echo '{"action" : "failed"}';
}