<?php
//Some Helper Functions and Classes to get things organized going further


class ErrorType {
    protected $action;
    protected $reason;
    
    public function __construct($act,$reason){
        if($act){
            $this->action = "success";
        }
        else{
            $this->action = "fail";
        }
        $this->reason = $reason;
    }
    
    public function getErrMsg(){
        $arr;
        if($this->action == "success"){
            $arr = array("action" => $this->action);
        }
        else{
            $arr = array("action" => $this->action, "reason" => $this->reason);
        }
        return json_encode($arr);
    }
}
           

function filterString($input){
    return preg_replace( '/[\W]/', '', $input);
}



function inputValid($input){
    $is_set = isset($_REQUEST[$input]);
    $is_same = false;
    $is_null = false;
    
    if($is_set)
    {
        $thingvalue = $_REQUEST[$input];
        $thingvalue2 = filterString($thingvalue);
        if($thingvalue == $thingvalue2){
            $is_same = true;
        }
        if($thingvalue != ""){
            $is_null = false;
        }
    }
    if($is_set and $is_same and ($is_null == false)){
        //echo "RETURNING TRUE";
        return true;
    }
    //echo "RETURNING FALSE";
    return false;
}

//Daniel Guzy
function merge_arrays($input){
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



