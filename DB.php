<?php 

class User {
    protected $GNAMES = array("g0membership","g1membership","g2membership","g3membership","g4membership");
    protected $empty_timeslot = '000000000000000000000000000000000000000000000000';
    protected $isValid = false;
    protected $username;
    protected $groups = array();
    protected $groupsc = false; //Unused for now
    protected $mon;
    protected $monc = false; //Unused for now
    protected $tue;
    protected $wed;
    protected $thr;
    protected $fri;
    protected $sat;
    protected $sun;
    
    public function __construct($u,$db){
            //echo "CONSTRUCTOR CALLED";
            $this->username = $u;        
            $q = "SELECT * from USERS where username='".$this->username."';";
              
            if($result = $db->query($q))
            {
                while($row = $result->fetch_assoc()){ //Populate the user Data
                    //echo "SEARCHING";
                    if(strlen($row['monday']) == 48){
                        $this->mon = $row['monday'];
                    }
                    else{
                        $this->mon = $this->empty_timeslot;
                    }
                    if(strlen($row['tuesday'])== 48){
                        $this->tue = $row['tuesday'];
                    }
                    else{
                        $this->tue = $this->empty_timeslot;
                    }
                    if(strlen($row['wednesday']) == 48){
                        $this->wed = $row['wednesday'];
                    }
                    else{
                        $this->wed = $this->empty_timeslot;
                    }
                    if(strlen($row['thursday']) == 48){
                        $this->thr = $row['thursday'];
                    }
                    else{
                        $this->thr = $this->empty_timeslot;
                    }
                    if(strlen($row['friday']) == 48){
                        $this->fri = $row['friday'];
                    }
                    else{
                        $this->fri = $this->empty_timeslot;
                    }
                    if(strlen($row['saturday']) == 48){
                        $this->sat = $row['saturday'];
                    }
                    else{
                        $this->sat = $this->empty_timeslot;
                    }
                    if(strlen($row['sunday']) == 48){
                        $this->sun = $row['sunday'];
                    }
                    else{
                        $this->sun = $this->empty_timeslot;
                    }
                    if($row['g0membership'] != ''){
                        array_push($this->groups,$row['g0membership']);
                    }
                    if($row['g1membership'] != ''){
                        array_push($this->groups,$row['g1membership']);
                    }
                    if($row['g2membership'] != ''){
                        array_push($this->groups,$row['g2membership']);
                    }
                    if($row['g3membership'] != ''){
                        array_push($this->groups,$row['g3membership']);
                    }
                    if($row['g4membership'] != ''){
                        array_push($this->groups,$row['g4membership']);
                    }

                    
                }
                $this->isValid = true;
            }
            else{
                $this->isValid = false;
            }
           // echo "CONSTRUCTOR EXITED";
        
    }

    public function getUsername(){
        return $this->username;
    }

    public function getMonday(){
        return $this->mon;
    }

    public function getTuesday(){
        return $this->tue;
    }

    public function getWednesday(){
        return $this->wed;
    }

    public function getThursday(){
        return $this->thr;
    }

    public function getFriday(){
        return $this->fri;
    }

    public function getSaturday(){
        return $this->sat;
    }

    public function getSunday(){
        return $this->sun;
    } 

    public function isValid(){
        return $this->isValid;
    }

    public function getGroupCount(){
        return count($this->groups);
    }

    public function getGroups(){
        return $this->groups;
    }

    public function addGroup($gn){
        $groupsc = true;
        array_push($this->groups,$gn);
    }
    public function removeGroup($gn){
        $groupsc = true;
        $index = -1;
        $found = false;
        for($i = 0;$i < count($this->groups);$i++){
            if($this->groups[$i] == $gn){
                $found = true;
                $index = $i;
            }
        }
            
        
        if($found){
            unset($this->groups[$index]);
            array_values($this->groups);
        }
    }

    public function listGroups(){
        foreach($this->groups as $g){
            echo $g;
            echo "<BR>";
        }
    }

    public function isMember($g){
        if(strlen($g) < 2){
            return false;
        }
        $ismember = false;
        foreach($this->groups as $g2)
        {
            if($g == $g2){
                $ismember = true;
            }
        }
        return $ismember;
    }

    public function writeDB($db){
        $index = 0;
        $arr = $this->getGroups();
        while($g = array_shift($arr)){
            $q = "UPDATE USERS SET ".$this->GNAMES[$index]."='".$g."' WHERE username='".$this->username."';";
            

            $db->query($q);
            $index++;
        }
        for($i = $index;$i < 5;$i++){
            $q = "UPDATE USERS SET ".$this->GNAMES[$i]."= NULL WHERE username='".$this->username."';";
            $db->query($q);
        }


        $q = "UPDATE USERS SET monday='".$this->mon."' WHERE username='".$this->username."';";
        $db->query($q);
        $q = "UPDATE USERS SET tuesday='".$this->tue."' WHERE username='".$this->username."';";
        $db->query($q);
        $q = "UPDATE USERS SET wednesday='".$this->wed."' WHERE username='".$this->username."';";
        $db->query($q);
        $q = "UPDATE USERS SET thursday='".$this->thr."' WHERE username='".$this->username."';";
        $db->query($q);
        $q = "UPDATE USERS SET friday='".$this->fri."' WHERE username='".$this->username."';";
        $db->query($q);
        $q = "UPDATE USERS SET saturday='".$this->sat."' WHERE username='".$this->username."';";
        $db->query($q);
        $q = "UPDATE USERS SET sunday='".$this->sun."' WHERE username='".$this->username."';";
        $db->query($q);

    }
    public function printInfo(){
        //echo "PRINTING INFO";
        echo "<br>";
        echo $this->username;
        echo "<br>";
        echo $this->mon;
    }
    public function getArray(){
        if($this->isValid){
            $d = "true";
        }else{
            $d = "false";
        }

        $rv = array('username' => $this->username,'monday' => $this->mon,'tuesday' => $this->tue,
        'wednesday' => $this->wed,'thursday' => $this->thr,'friday' => $this->fri,"saturday" => $this->sat,
        'sunday' => $this->sun,"groups" => $this->groups,'valid' => $d);
        return $rv;
    }



}

Class Group {
    protected $MNAMES = array("m1","m2","m3","m4","m5");
    protected $owner;
    protected $gname;
    protected $members = array();
    protected $isValid = false;
    protected $mobjects = array();
    protected $d;

    public function __construct($g,$db){
        $this->d = $db;
        $this->gname = $g;
        $q = "SELECT * FROM GROUPS WHERE group_name='".$this->gname."';";
        if($result = $db->query($q))
            {
                //echo "FETCHING";
                while($row = $result->fetch_assoc()){
                    if(strlen($row['m1']) > 2){
                        array_push($this->members,$row['m1']);
                    }
                    if(strlen($row['m2']) > 2){
                        array_push($this->members,$row['m2']);
                    }
                    if(strlen($row['m3']) > 2){
                        array_push($this->members,$row['m3']);
                    }
                    if(strlen($row['m4']) > 2){
                        array_push($this->members,$row['m4']);
                    }
                    if(strlen($row['m5']) > 2){
                        array_push($this->members,$row['m5']);
                    }
                    if(strlen($row['owner']) > 2){
                        $this->owner = $row['owner'];
                    }
                }
                $this->isValid = true;
            }else{
                $this->isValid = false;
            }

        
    }
    public function getGroupname(){
        return $this->gname;
    }

    public function getOwner(){
        return $this->owner;
    }

    public function setOwner($newowner){
        $this->owner = $newowner;
    }

    public function isValid(){
        if($this->owner == null){
            return false;
        }
        return true;
    }

    public function isOwner($name){
        if($this->owner == $name){
            return true;
        }
        else{
            return false;
        }
    }

    public function getMondays(){
        $arr = array();
        foreach($this->mobjects as $u){
            array_push($arr,$u->getMonday());

        }
        return $arr;
    }

    public function getTuesdays(){
        $arr = array();
        foreach($this->mobjects as $u){
            array_push($arr,$u->getTuesday());

        }
        return $arr;

    }

    public function getWednesdays(){
        $arr = array();
        foreach($this->mobjects as $u){
            array_push($arr,$u->getWednesday());

        }
        return $arr;
    }

    public function getThursdays(){
        $arr = array();
        foreach($this->mobjects as $u){
            array_push($arr,$u->getThursday());

        }
        return $arr;
    }

    public function getFridays(){
        $arr = array();
        foreach($this->mobjects as $u){
            array_push($arr,$u->getFriday());

        }
        return $arr;
    }

    public function getSaturdays(){
        $arr = array();
        foreach($this->mobjects as $u){
            array_push($arr,$u->getSaturday());

        }
        return $arr;
    }

    public function getSundays(){
        $arr = array();
        foreach($this->mobjects as $u){
            array_push($arr,$u->getSunday());

        }
        return $arr;
    }

    public function getMemberCount(){
        return count($this->members);
    }


    
    public function merge_arrays($input){
        $group_size = count($input);
        $slot_count = strlen($input[0]);
        
        $available_members = array();
        for ($i = 0; $i < $slot_count; $i++)
        {
            $available_members[] = 0;
            foreach ($input as $member)
            {
                $available_members[$i] += $member[$i];
            }
        }
        return $available_members;
    }

    public function packageTimes(){
        $arr = $this->getMondays();
        $mon = $this->merge_arrays($arr);

        $arr = $this->getTuesdays();
        $tue = $this->merge_arrays($arr);

        $arr = $this->getWednesdays();
        $wed = $this->merge_arrays($arr);

        $arr = $this->getThursdays();
        $thr = $this->merge_arrays($arr);

        $arr = $this->getFridays();
        $fri = $this->merge_arrays($arr);

        $arr = $this->getSaturdays();
        $sat = $this->merge_arrays($arr);

        $arr = $this->getSundays();
        $sun = $this->merge_arrays($arr);

        $rv = array("action" => "success","owner" => $this->owner,"monday" => $mon,"tuesday" => $tue,"wednesday" => $wed,
        "thursday" => $thr,"friday" => $fri,"saturday" => $sat, "sunday" => $sun,"members" => $this->getMembers());

        return $rv;

    }
    

    

    public function populateUsers($db){
        foreach($this->members as $un){
            $user = new User($un,$db);
            if($user->isValid()){
                array_push($this->mobjects,$user);
            }
        }
    }

    public function getMembers(){
        return $this->members;
    }

    public function printUsers(){
        
        foreach($this->mobjects as $u){
            $u->printInfo();
        }
    }

    public function addUser($un){
        array_push($this->members,$un);
        $this->populateUsers($this->d);
    }


    public function removeUser($un){
        
        $index = -1;
        $found = false;
        for($i = 0;$i < count($this->members);$i++){
            if($this->members[$i] == $un){
                $found = true;
                $index = $i;
            }
        }
            
        
        if($found){
            unset($this->members[$index]);
            array_values($this->members);
        }

        $this->mobjects = array();
        $this->populateUsers($this->d);



    }

    public function writeGroup($db){
        $q = "UPDATE GROUPS SET owner='".$this->owner."' WHERE group_name='".$this->gname."';";
        $db->query($q);
        $index = 0;
        $arr = $this->getMembers();
        while($m = array_shift($arr)){
            $q = "UPDATE GROUPS SET ".$this->MNAMES[$index]."='".$m."' WHERE group_name='".$this->gname."';";
            

            $db->query($q);
            $index++;
        }
        for($i = $index;$i < 5;$i++){
            $q = "UPDATE GROUPS SET ".$this->MNAMES[$i]."= NULL WHERE group_name='".$this->gname."';";
            $db->query($q);
        }


    }




}