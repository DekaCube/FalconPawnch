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




$("#reset").click(function(){
    $('button.active').removeClass('active');
    var time = read_time();
    });


function resetAll() {
    document.getElementById("buts").reset();
}