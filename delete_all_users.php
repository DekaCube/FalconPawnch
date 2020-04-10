<?php
error_reporting(0);
/* DELETE ALL USERS */

require_once './creds.php';

$getaccess = $_REQUEST["pw"];

define("PASSWORD_TO_DELETE","c21fafb3cae0523191c40641820cc2bcec0bf3f03dd82a9b61a5cca254312684");
define("SALT_FOR_PW","WhenDiagramKings");



$hashedpw = hash("sha256",$getaccess.SALT_FOR_PW);
//echo $hashedpw;
$bomb = "DELETE FROM USERS; DELETE FROM TOKENS; DELETE FROM GROUPS;";


if($hashedpw == PASSWORD_TO_DELETE){
    $db->query($bomb);
   
    echo "DONE";
}
else{
    echo "PASSWORD FAILURE";
}
    
    




