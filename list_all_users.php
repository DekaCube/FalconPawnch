<?php
//List all users

//Needed for CORS Bullshit
header("Access-Control-Allow-Origin: *");

require_once './creds.php';
$br = "<br>";
$p = "<p>";
$p2 = "</p>";
$tab = "   ";


$query = "SELECT * from USERS;";


if($result = $db->query($query))
{
	while($row = $result->fetch_assoc()){ //Search through all the returned tuples.
		echo "--------------------------------------------------------------------------------------";
        echo $br;
        echo "USERNAME :    ".$row['username'];
        echo $br;
        echo "MONDAY :      ".$row['monday'];
        echo $br;
        echo "TUESDAY :     ".$row['tuesday'];
        echo $br;
        echo "WEDNESDAY :   ".$row['wednesday'];
        echo $br;
        echo "THURSDAY  :   ".$row['thursday'];
        echo $br;
        echo "FRIDAY  :     ".$row['friday'];
        echo $br;
        echo "SATURDAY :    ".$row['saturday'];
        echo $br;
        echo "SUNDAY :      ".$row['sunday'];
        echo $br;
        echo "G0     :".$row['g0membership'];
        echo $br;
        echo "G1     :".$row['g1membership'];
        echo $br;
        echo "G2     :".$row['g2membership'];
        echo $br;
        echo "G3     :".$row['g3membership'];
        echo $br;
        echo "G4     :".$row['g4membership'];
        echo $br;
        
        
        
        
	}
}