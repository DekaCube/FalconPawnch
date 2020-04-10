<?php

//CORS HEADER FOR X-ORIGIN
header("Access-Control-Allow-Origin: *");

require_once './DB.php';
require_once './creds.php';
require_once './validate_inner.php';

$v = validate_token($db,$debug_level);

if($v[0] == 0){
    exit('{"action" : "failed" , "valid" : "false"}');
}else{
    $u = new User($v[1],$db);
    echo json_encode($u->getArray());
}
  

