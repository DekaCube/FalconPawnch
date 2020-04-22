<?php

/* Create a group 
* Author : Daniel Bennett
* Date : 4/6/2020
*/

require_once './creds.php';
require_once './validate_inner.php';

//CORS HEADER FOR X-ORIGIN
header("Access-Control-Allow-Origin: *");
$valid_entry = 0;
$nl = "<BR>";
$gnames = array("g0membership","g1membership","g2membership","g3membership","g4membership");

$validation = validate_token($db,$debug_level);

if(isset($_REQUEST["group"])){
    $fgroup = $_REQUEST["group"];
    
    $fgroup2 = $name = preg_replace( '/[\W]/', '', $fgroup);
    //echo $fgroup;
    //echo "<br>";
    //echo $fgroup2;
    if((strlen($fgroup2) > 4) and $fgroup == $fgroup2){
        $valid_entry = 1;
    }
    if(strlen($fgroup2) > 30){
        $valid_entry = 0;
    }
}
if($valid_entry == 0){
    exit('{"action" : "failed", "reason" : "invalid group name"}');
}
if($validation[0] == 0){
    exit('{"action" : "failed", "reason" : "invalid token"}');
}
//The below code is the keep the users groups organized

$stack_groups = array(); //Stack of group names;
if($valid_entry == 1 and $validation[0] == 1){
    $query = "SELECT g0membership,g1membership,g2membership,g3membership,g4membership from USERS where username='".$validation[1]."';";
    if($result = $db->query($query))
    {
        while($row = $result->fetch_assoc()){ //Search through all the returned tuples.
            foreach($gnames as $gname){
                if($row[$gname] != ""){
                    array_push($stack_groups,$row[$gname]);
                }
            }
        
        }
    }
}

//echo count($stack_groups);

//Now make sure the group name doesnt already exist.
$g_already_exists = 0;
$query = "SELECT group_name from GROUPS where group_name='".$fgroup2."';";
//echo $query;
if($result = $db->query($query))
{
    while($row = $result->fetch_assoc()){ //Search through all the returned tuples.
         if($row['group_name'] == $fgroup2){
            $g_already_exists = 1;
        
        }
    }
}

if($g_already_exists == 1){
    exit('{"action" : "failed","reason" : "group already exists"}');
}

//So at this point we know the group doesnt exist, and the user is valid. Need to check that they dont have over 4 groups.
if(count($stack_groups) > 4){
    exit('{"action" : "failed","reason" : "user already has max groups"}');
}

//Now to create the group.
array_push($stack_groups,$fgroup2);
array_push($stack_groups,'');
array_push($stack_groups,'');
array_push($stack_groups,'');
array_push($stack_groups,'');


//Re-align the users groups
$index = 0;
foreach($stack_groups as $gn){
    if($index < 5){
        $query = "UPDATE USERS SET ".$gnames[$index]."='".$stack_groups[$index]."' WHERE username='".$validation[1]."';";
        //echo $query;
        $db->query($query);
    }
    $index++;
}
//Create the group
$query = "INSERT INTO GROUPS(group_name,owner,m1) VALUES ('".$fgroup2."','".$validation[1]."','".$validation[1]."');";
//echo $query;
$db->query($query);
echo '{"action" : "success"}';

        
        
   


