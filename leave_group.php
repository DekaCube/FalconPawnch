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

//echo $_REQUEST['group'];
//echo "<br>";
//echo "USER IS VALID = " + $u->isValid();
//echo "<br>";
//echo "GROUP IS VALID = " + $g->isValid();
//echo "<br>";
//echo "USER IS MEMBER = " + $u->isMember($_REQUEST['group']);
//echo "<br>";
//$g->printUsers();


if($u->isValid() and $g->isValid() and $u->isMember($_REQUEST['group'])){
    $u->removeGroup($_REQUEST['group']);
    $u->writeDB($db);
    $g->removeUser($u->getUsername());
    $g->writeGroup($db);
    $e = new ErrorType(1,"N/A");
    exit($e->getErrMsg());
}else{
    $e = new ErrorType(0,"something went wrong");
    exit($e->getErrMsg());
}

