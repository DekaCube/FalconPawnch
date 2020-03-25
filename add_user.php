<?php 
//Turn off error reporting to hide notices from end user.
error_reporting(0);
/*
API FOR NEW ACCOUNT CREATION
Author : Daniel Bennett
Project : When Diagram
*/

require_once './creds.php';

$error_happend = 0; //Flag to determine if an error happened
$variables_set = 0; //Flag to know if username and password exist



//Needed for CORS Bullshit
header("Access-Control-Allow-Origin: *");


//CONSTANTS
$SALT = 'WhenDiagramKings';
$ERROR_MESSAGE_PREFIX = '{"account_creation" : "failed", "reason" : "';
$ERROR_MESSAGE_SUFFIX = '"}';
define("ERRORTYPE1","user already exists");
define("ERRORTYPE2","username or password value error");

//Grab the variables from the URL

if(isset($_REQUEST["pw"]) and isset($_REQUEST["username"])){
    $variables_set = 1;
    $name = $_REQUEST["username"];
    $password  = $_REQUEST["pw"];
    $hashedpw = hash("sha256",$password.$SALT);
}
else{
    $error_happend = 1;
    $error_type = 1;
}

if($varibles_set){
    echo "VARIABLES SET";
}

if($variables_set){
    if(strlen($name) < 5){
        $error_happend = 1;
        
    }
    if(strlen($password) < 8){
        $error_happened = 1;
        
    }
}

if($variables_set){
    //Filter the username
    $name = preg_replace( '/[\W]/', '', $name);
}


//Look to see if the user already exists
$query = "SELECT * FROM USERS WHERE username="."\"".$name."\"";


$found = 0; //Flag to see if username already exists

if($error_happend == 1){
    exit($ERROR_MESSAGE_PREFIX.ERRORTYPE2.$ERROR_MESSAGE_SUFFIX);
}
if($result = $db->query($query))
{
	while($row = $result->fetch_assoc()){ //Search through all the returned tuples.
		if($row['username'] == $name) //If the username already exists, return an error
        {
			
            echo $ERROR_MESSAGE_PREFIX.ERRORTYPE1.$ERROR_MESSAGE_SUFFIX;
			$found=1;
			
		}
	}
    if($found == 0){ //If the name doesn't exist, insert it
		$sendme = 'INSERT INTO USERS (username,password) VALUES ("'.$name.'","'.$hashedpw.'");';
    echo '{account_creation:"success"}';
		$db->query($sendme);
		
	}
}

