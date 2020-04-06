<?php
//List all users

//Needed for CORS Bullshit
header("Access-Control-Allow-Origin: *");

require_once './creds.php';
$br = "<br>";
$p = "<p>";
$p2 = "</p>";
$tab = "   ";


$query = "SELECT username,password,monday from USERS;";


if($result = $db->query($query))
{
	while($row = $result->fetch_assoc()){ //Search through all the returned tuples.
		echo $p.$row['username'].$tab.$row['password'].$tab.$row['monday'].$p2.$br;
        
	}
}