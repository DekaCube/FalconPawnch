<?php

//TESTING HELPERS

require_once './DB.php';
require_once './creds.php';
require_once './validate_inner.php';

$b = "<BR>";


echo $b;


$g = new Group('babab4',$db);
echo $g->isValid();
echo "<br>";
echo "GROUP CREATED";
$g->populateUsers($db);
$g->printUsers();
echo json_encode($g->packageTimes());


