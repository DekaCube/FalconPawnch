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

$groupIsValid = $g->isValid();
$groupNotFull = ($g->getMemberCount() > 4) ? false : true;
$alreadyMember = $u->isMember($_REQUEST['group']);

if($alreadyMember){
    $e= new ErrorType(false,"already a member");
    exit($e->getErrMsg());
}
    

if(!$groupNotFull){
    $e = new ErrorType(false,"group is full");
    exit($e->getErrMsg());
}



if($groupIsValid){
    $u->addGroup($_REQUEST['group']);
    $u->writeDB($db);
    $g->addUser($u->getUsername());
    $g->writeGroup($db);
    $e = new ErrorType(true,"POOPY");
    exit($e->getErrMsg());
}
else{
    $e = new ErrorType(false,"invalid group");
    exit($e->getErrMsg());
}
    
    
    