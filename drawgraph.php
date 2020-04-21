<?php

//CORS HEADER FOR X-ORIGIN
header("Access-Control-Allow-Origin: *");

function add_quotes($str) {
    return sprintf('"%s"', $str);
}



echo '<script type="text/javascript">
     var datatime = ['.$strdata.'];
     </script>'
?>

<html>
  <head>
    <!--Load the AJAX API-->
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">

       window.addEventListener('resize', resizeHandler);
       window.addEventListener("orientationchange",resizeHandler);
       
       
       function resizeHandler(){
        options = {
        title: "Group Memebers Available",
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },


        
        
      };
      drawChart();
      }
       
       function getMax(a,b){
        return (a > b) ? a : b;
       }

      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        var data = google.visualization.arrayToDataTable([
        ["Time", "Members", { role: "style" } ],
        ["6-7:00AM", getMax(datatime[12],datatime[13]) , "red"],
        ["7-8:00AM", getMax(datatime[14],datatime[15]), "#ab1403"],
        ["8-9:00AM", getMax(datatime[16],datatime[17]), "red"],
        ["9-10:00AM", getMax(datatime[18],datatime[19]), "#ab1403"],
        ["10-11:00AM", getMax(datatime[20],datatime[21]), "red"],
        ["11-12:00PM", getMax(datatime[22],datatime[23]), "#ab1403"],
        ["12-1:00PM", getMax(datatime[24],datatime[25]), "red"],
        ["1-2:00PM", getMax(datatime[26],datatime[27]), "#ab1403"],
        ["2-3:00PM", getMax(datatime[28],datatime[29]), "red"],
        ["3-4:00PM", getMax(datatime[30],datatime[31]), "#ab1403"],
        ["4-5:00PM", getMax(datatime[32],datatime[33]), "red"],
        ["5-6:00PM", getMax(datatime[34],datatime[35]), "#ab1403"],
        ["6-7:00PM", getMax(datatime[36],datatime[37]), "red"],
        ["7-8;00PM", getMax(datatime[38],datatime[39]), "#ab1403"],
        ["8-9:00PM", getMax(datatime[40],datatime[41]), "red"],
        ["9-10:00PM", getMax(datatime[42],datatime[43]), "#ab1403"],
        ["10-11:00PM",getMax(datatime[44],datatime[45]),"red"],
        ["11-12:00AM",getMax(datatime[46],datatime[47]),"#ab1403"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Group Memebers Available",
        width: document.documentElement.clientWidth * .9,
        height: document.documentElement.clientHeight * .9,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
        hAxis: {
        viewWindow: {
        min: 0,
        max: 5
        },
        ticks: [0, 1, 2, 3, 4, 5]} // display labels every 5
        
      };

        

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById("chart_div"));
        chart.draw(data, options);
      }
    </script>
  </head>

  <body>
    <!--Div that will hold the pie chart-->
    <div id="chart_div"></div>
  </body>
</html>







