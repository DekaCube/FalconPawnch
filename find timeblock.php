<?php
$input_array = array('110111111101010111000011101111110110110101111111','101001101010100111010100010001100010111010000100');

function availability_scan($input){ //shows how many members are available at each time slot
    $group_size = count($input);
    $slot_count = strlen($input[0]);
    //echo $group_size;
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
?>

<?php
function find_max_availability($input, $minimum_members)
{
    if ($minimum_members > 0)
    {
        $largest_timeslot = 0;
        $l_slot_start_time = -1;
        $possible_timeslot = 0;
        $p_slot_start_time = -1;
        $available_members = availability_scan($input);
        $slot_count = strlen($input[0]);
        for ($i = 0; $i < $slot_count; $i++)
        {
            if ($available_members[$i] >= $minimum_members)
            {
                $possible_timeslot++;
            }
            else
            {
                if ($possible_timeslot > $largest_timeslot)
                {
                    $largest_timeslot = $possible_timeslot;
                    $l_slot_start_time = $p_slot_start_time;
                }

                $possible_timeslot = 0;
                $p_slot_start_time = $i + 1;
            }
        }
        if ($possible_timeslot > $largest_timeslot)
        {
            $largest_timeslot = $possible_timeslot;
            $l_slot_start_time = $p_slot_start_time;
        }
        if ($largest_timeslot > 0)
        {
            $l_slot_end_time = $l_slot_start_time + $largest_timeslot - 1;
            echo "The largest timeslot is from ", $l_slot_start_time, " to ";
            echo $l_slot_end_time, "." . "\n";
            $l_slot_indexes = array([$l_slot_start_time, $l_slot_end_time]);
            return $l_slot_indexes;
        }
    }
}
?>

<?php
find_max_availability($input_array, 2)
?>