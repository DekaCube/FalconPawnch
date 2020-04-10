<?php 
//CORS HEADER FOR X-ORIGIN
header("Access-Control-Allow-Origin: *");

require_once './helpers.php';
require_once './DB.php';
require_once './creds.php';
require_once './validate_inner.php';


$isvalid = inputValid("group");

$v = validate_token($db,$debug_level);

if(!$v[0]){
    $err = new ErrorType(false,"invalid access token");
    exit($err->getErrMsg());
}

if(!$isvalid){
    $err = new ErrorType(false,"invalid group name");
    exit($err->getErrMsg());
}

$g = new Group($_REQUEST['group'],$db);
$u = new User($v[1],$db);

if(!$u->isMember($g->getGroupname())){
    $e = new ErrorType(false,"not a member of group");
    exit($e->getErrMsg());
}

if($g->isValid()){
    $g->populateUsers($db);
    exit(json_encode($g->packageTimes()));
}
else{
    $e = new ErrorType(false,"invalid group name");
    exit($e->getErrMsg());
}
    