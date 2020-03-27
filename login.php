<?php
/*Login.php
/ Author : Daniel Bennett
/ Generates an access token on a succesful login
*/

//Needed for CORS Bullshit
header("Access-Control-Allow-Origin: *");

//DB Connector
require_once './creds.php';

//Constants
define('SALTPW','WhenDiagramKings');
define('ERROR_MESSAGE','{"login" : "failed"}');


//Make sure the username and password are set
if(isset($_REQUEST["pw"]) and isset($_REQUEST["username"])){
    $variables_set = 1;
    $name = $_REQUEST["username"];
    $password  = $_REQUEST["pw"];
    $hashedpw = hash("sha256",$password.SALTPW);
    //echo $hashedpw;
}
else{
    exit(ERROR_MESSAGE);
}

//Filter the username to prevent injection
$name = preg_replace( '/[\W]/', '', $name);

//Check that username and password are legit
$query = "SELECT * from USERS where username='".$name."';";
//echo $query;
//Flag for checking if login is valid
$valid_login = 0;

if($result = $db->query($query))
{
	while($row = $result->fetch_assoc()){ //Search through all the returned tuples.
        
		if($row['password'] == $hashedpw) //If the username already exists, return an error
        {
			
            $valid_login = 1;
			
		}
	}
}
else{ //If for some reason the query failed
    //echo "FAILING HERE";
    exit(ERROR_MESSAGE);
}

if($valid_login == 0){
    exit(ERROR_MESSAGE);
}

//FROM HERE ON LOGIN IS ASSMUED TO BE VALID
//DELETE THE EXISTING TOKENS FOR THE USER
$query = "DELETE from TOKENS where user='".$name."';";
$db->query($query);


//Generate an access token
$new_token = get_random_string();

//TODO : Make sure the token doesnt already exists

//Register the token to the user
$current_time = time();
$query = "INSERT INTO TOKENS(token,t_created,t_last_used,user) VALUES ('".$new_token."','".$current_time."','".$current_time."','".$name."');";
$db->query($query);

echo '{"login" : "success", "access_token" : "'.$new_token.'"}';


function get_random_string() {
    $listofcharacters = "0123456789abcdef";
    $sizestring = 100;
    $returnvalue = '';
    
    for ($i = 0; $i < $sizestring; $i++) { 
        $index = rand(0, strlen($listofcharacters) - 1); 
        $returnvalue .= $listofcharacters[$index]; 
    } 
  
    return $returnvalue; 
 }
    
    



