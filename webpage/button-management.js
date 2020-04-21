function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}
function setzero(str,index){
    if(index > str.length-1) return str;
    return str.substr(0,index) + '0' + str.substr(index+1);
}
var time ="000000000000000000000000000000000000000000000000"
var day  = "monday"
var group = ""
var group1 = ""
var group2 = ""


function highlight_buttons(timevalue){
    
    let length = timevalue.length;
    let buttonbase = "time";
    let workspace = document.getElementById(buttonbase);
    if(timevalue.charAt(0) == '1'){
        workspace.classList.add("active");
    }
    else{
        workspace.classList.remove("active");
    }
    for(let i = 1;i < length;i++){
        workspace = document.getElementById(buttonbase + i);
        if(timevalue.charAt(i) == 1){
            workspace.classList.add("active");
        }
        else{
            workspace.classList.remove("active");
        }
    }
}

$("#time").click(function() {
    if (time[0] == "1"){
        time = setzero(time,0);

    }
    else{
    time = setCharAt(time,0,'1');
    }
});
$("#time1").click(function() {
    if (time[1] == "1"){
        time = setzero(time,1);

    }
    else{
    time = setCharAt(time,1,'1');
    }
});
$("#time2").click(function() {
    if (time[2] == "1"){
        time = setzero(time,2);

    }
    else{
    time = setCharAt(time,2,'1');
    }
});
$("#time3").click(function() {
    if (time[3] == "1"){
        time = setzero(time,3);

    }
    else{
    time = setCharAt(time,3,'1');
    }
});
$("#time4").click(function() {
    if (time[4] == "1"){
        time = setzero(time,4);

    }
    else{
    time = setCharAt(time,4,'1');
    }
});
$("#time5").click(function() {
    if (time[5] == "1"){
        time = setzero(time,5);

    }
    else{
    time = setCharAt(time,5,'1');
    }
});
$("#time6").click(function() {
    if (time[6] == "1"){
        time = setzero(time,6);

    }
    else{
    time = setCharAt(time,6,'1');
    }
});
$("#time7").click(function() {
    if (time[7] == "1"){
        time = setzero(time,7);

    }
    else{
    time = setCharAt(time,7,'1');
    }
});
$("#time8").click(function() {
    if (time[8] == "1"){
        time = setzero(time,8);

    }
    else{
    time = setCharAt(time,8,'1');
    }
});

$("#time9").click(function() {
    if (time[9] == "1"){
        time = setzero(time,9);

    }
    else{
    time = setCharAt(time,9,'1');
    }
});
$("#time10").click(function() {
    if (time[10] == "1"){
        time = setzero(time,10);

    }
    else{
    time = setCharAt(time,10,'1');
    }
});
$("#time11").click(function() {
    if (time[11] == "1"){
        time = setzero(time,11);

    }
    else{
    time = setCharAt(time,11,'1');
    }
});
$("#time12").click(function() {
    if (time[12] == "1"){
        time = setzero(time,12);

    }
    else{
    time = setCharAt(time,12,'1');
    }
});
$("#time13").click(function() {
    if (time[13] == "1"){
        time = setzero(time,13);

    }
    else{
    time = setCharAt(time,13,'1');
    }
});
$("#time14").click(function() {
    if (time[14] == "1"){
        time = setzero(time,14);

    }
    else{
    time = setCharAt(time,14,'1');
    }
});
$("#time15").click(function() {
    if (time[15] == "1"){
        time = setzero(time,15);

    }
    else{
    time = setCharAt(time,15,'1');
    }
});
$("#time16").click(function() {
    if (time[16] == "1"){
        time = setzero(time,16);

    }
    else{
    time = setCharAt(time,16,'1');
    }
});
$("#time17").click(function() {
    if (time[17] == "1"){
        time = setzero(time,17);

    }
    else{
    time = setCharAt(time,17,'1');
    }
});
$("#time18").click(function() {
    if (time[18] == "1"){
        time = setzero(time,18);

    }
    else{
    time = setCharAt(time,18,'1');
    }
});
$("#time19").click(function() {
    if (time[19] == "1"){
        time = setzero(time,19);

    }
    else{
    time = setCharAt(time,19,'1');
    }
});
$("#time20").click(function() {
    if (time[20] == "1"){
        time = setzero(time,20);

    }
    else{
    time = setCharAt(time,20,'1');
    }
});
$("#time21").click(function() {
    if (time[21] == "1"){
        time = setzero(time,21);

    }
    else{
    time = setCharAt(time,21,'1');
    }
});
$("#time22").click(function() {
    if (time[22] == "1"){
        time = setzero(time,22);

    }
    else{
    time = setCharAt(time,22,'1');
    }
});
$("#time23").click(function() {
    if (time[23] == "1"){
        time = setzero(time,23);

    }
    else{
    time = setCharAt(time,23,'1');
    }
});
$("#time24").click(function() {
    if (time[24] == "1"){
        time = setzero(time,24);

    }
    else{
    time = setCharAt(time,24,'1');
    }
});
$("#time25").click(function() {
    if (time[25] == "1"){
        time = setzero(time,25);

    }
    else{
    time = setCharAt(time,25,'1');
    }
});
$("#time26").click(function() {
    if (time[26] == "1"){
        time = setzero(time,26);

    }
    else{
    time = setCharAt(time,26,'1');
    }
});
$("#time27").click(function() {
    if (time[27] == "1"){
        time = setzero(time,27);

    }
    else{
    time = setCharAt(time,27,'1');
    }
});
$("#time28").click(function() {
    if (time[28] == "1"){
        time = setzero(time,28);

    }
    else{
    time = setCharAt(time,28,'1');
    }
});
$("#time29").click(function() {
    if (time[29] == "1"){
        time = setzero(time,29);

    }
    else{
    time = setCharAt(time,29,'1');
    }
});
$("#time30").click(function() {
    if (time[30] == "1"){
        time = setzero(time,30);

    }
    else{
    time = setCharAt(time,30,'1');
    }
});
$("#time31").click(function() {
    if (time[31] == "1"){
        time = setzero(time,31);

    }
    else{
    time = setCharAt(time,31,'1');
    }
});
$("#time32").click(function() {
    if (time[32] == "1"){
        time = setzero(time,32);

    }
    else{
    time = setCharAt(time,32,'1');
    }
});
$("#time33").click(function() {
    if (time[33] == "1"){
        time = setzero(time,33);

    }
    else{
    time = setCharAt(time,33,'1');
    }
});
$("#time34").click(function() {
    if (time[34] == "1"){
        time = setzero(time,34);

    }
    else{
    time = setCharAt(time,34,'1');
    }
});
$("#time35").click(function() {
    if (time[35] == "1"){
        time = setzero(time,35);

    }
    else{
    time = setCharAt(time,35,'1');
    }
});
$("#time36").click(function() {
    if (time[36] == "1"){
        time = setzero(time,36);

    }
    else{
    time = setCharAt(time,36,'1');
    }
});
$("#time37").click(function() {
    if (time[37] == "1"){
        time = setzero(time,37);

    }
    else{
    time = setCharAt(time,37,'1');
    }
});
$("#time38").click(function() {
    if (time[38] == "1"){
        time = setzero(time,38);

    }
    else{
    time = setCharAt(time,38,'1');
    }
});
$("#time39").click(function() {
    if (time[39] == "1"){
        time = setzero(time,39);

    }
    else{
    time = setCharAt(time,39,'1');
    }
});
$("#time40").click(function() {
    if (time[40] == "1"){
        time = setzero(time,40);

    }
    else{
    time = setCharAt(time,40,'1');
    }
});
$("#time41").click(function() {
    if (time[41] == "1"){
        time = setzero(time,41);

    }
    else{
    time = setCharAt(time,41,'1');
    }
});
$("#time42").click(function() {
    if (time[42] == "1"){
        time = setzero(time,42);

    }
    else{
    time = setCharAt(time,42,'1');
    }
});
$("#time43").click(function() {
    if (time[43] == "1"){
        time = setzero(time,43);

    }
    else{
    time = setCharAt(time,43,'1');
    }
});
$("#time44").click(function() {
    if (time[44] == "1"){
        time = setzero(time,44);

    }
    else{
    time = setCharAt(time,44,'1');
    }
});
$("#time45").click(function() {
    if (time[45] == "1"){
        time = setzero(time,45);

    }
    else{
    time = setCharAt(time,45,'1');
    }
});
$("#time46").click(function() {
    if (time[46] == "1"){
        time = setzero(time,46);

    }
    else{
    time = setCharAt(time,46,'1');
    }
});
$("#time47").click(function() {
    if (time[47] == "1"){
        time = setzero(time,47);

    }
    else{
    time = setCharAt(time,47,'1');
    }
});


$("#reset").click(function(){
    $('button.active').removeClass('active');
    });


function resetAll() {
    document.getElementById("buts").reset();
}

