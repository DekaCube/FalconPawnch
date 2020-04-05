<?php
/*class Overlap_slot
{
    public $start_time = 0;
    public $length = 0;
}*/
?>

<?php
//constants
const SLOT_COUNT = 48;  //number of time slots available to a single user
const TIME_SLOT_BOUNDS = array('12:00 am', '12:30 am', '1:00 am',
    /* A list of the start */   '1:30 am', '2:00 am', '2:30 am',
    /* and end times for each*/ '3:00 am', '3:30 am', '4:00 am',
    /* existing time slot */    '4:30 am', '5:00 am', '5:30 am',
                                '6:00 am', '6:30 am', '7:00 am',
                                '7:30 am', '8:00 am', '8:30 am',
                                '9:00 am', '9:30 am', '10:00 am',
                                '10:30 am', '11:00 am', '11:30 am',
                                '12:00 pm', '12:30 pm', '1:00 pm',
                                '1:30 pm', '2:00 pm', '2:30 pm',
                                '3:00 pm', '3:30 pm', '4:00 pm',
                                '4:30 pm', '5:00 pm', '5:30 pm',
                                '6:00 pm', '6:30 pm', '7:00 pm',
                                '7:30 pm', '8:00 pm', '8:30 pm',
                                '9:00 pm', '9:30 pm', '10:00 pm',
                                '10:30 pm', '11:00 pm', '11:30 pm',
                                '12:00 am of the next day');
$input_array = array('110111111101010111000011101111110110110101111111','101001101010100111010100010001100010111010000100');

function availability_scan($input){ //shows how many members are available at each time slot
    $group_size = count($input);
    //echo $group_size;
    $available_members = array();
    for ($i = 0; $i < SLOT_COUNT; $i++)
    {
        $available_members[] = 0;
        foreach ($input as $member)
        {
            $available_members[$i] += $member[$i];
        }
    }
    return $available_members;
}
?>

<?php
function max_by_member_count($input, $minimum_members)
{
    if ($minimum_members > 0)
    {
        $largest_time_slot = 0;
        if ($minimum_members <= count($input))
        {
            $l_slot_start_time = -1;
            $possible_time_slot = 0;
            $p_slot_start_time = -1;
            $available_members = availability_scan($input);
            for ($i = 0; $i < SLOT_COUNT; $i++)
            {
                if ($available_members[$i] >= $minimum_members)
                {
                    $possible_time_slot++;
                }
                else
                {
                    if ($possible_time_slot > $largest_time_slot)
                    {
                        $largest_time_slot = $possible_time_slot;
                        $l_slot_start_time = $p_slot_start_time;
                    }

                    $possible_time_slot = 0;
                    $p_slot_start_time = $i + 1;
                }
            }
            if ($possible_time_slot > $largest_time_slot)
            {
                $largest_time_slot = $possible_time_slot;
                $l_slot_start_time = $p_slot_start_time;
            }
        }
        else echo "Not enough members in group." .  "\n";

        if ($largest_time_slot > 0)
        {
            $l_slot_end_time = $l_slot_start_time + $largest_time_slot;
            echo "The largest time slot is from ", TIME_SLOT_BOUNDS[$l_slot_start_time], " to ";
            echo TIME_SLOT_BOUNDS[$l_slot_end_time], "." . "\n";
            $l_slot_indexes = array([$l_slot_start_time, $l_slot_end_time]);
            return $l_slot_indexes;
        }
        else echo "No time slot available." . "\n";
    }
}
?>

<?php
max_by_member_count($input_array, 2)
?>