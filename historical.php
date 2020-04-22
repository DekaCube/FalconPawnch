<?php     


    function add_quotes($str) {
        return sprintf('"%s"', $str);
    }
     // Create a new cURL resource
        $curl = curl_init();

        if (!$curl) {
            die("Couldn't initialize a cURL handle");
        }

        // Set the file URL to fetch through cURL
        curl_setopt($curl, CURLOPT_URL, "https://corona.lmao.ninja/v2/historical/usa");

        // Set a different user agent string (Googlebot)
        curl_setopt($curl, CURLOPT_USERAGENT, 'Googlebot/2.1 (+http://www.google.com/bot.html)');

        // Follow redirects, if any
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);

        // Fail the cURL request if response code = 400 (like 404 errors)
        curl_setopt($curl, CURLOPT_FAILONERROR, true);

        // Return the actual result of the curl result instead of success code
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        // Wait for 10 seconds to connect, set 0 to wait indefinitely
        curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);

        // Execute the cURL request for a maximum of 50 seconds
        curl_setopt($curl, CURLOPT_TIMEOUT, 50);

        // Do not check the SSL certificates
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

        // Fetch the URL and save the content in $html variable
        $html = curl_exec($curl);

        // Check if any error has occurred
        if (curl_errno($curl))
        {
            echo 'cURL error: ' . curl_error($curl);
        }
        else
        {
            
            $json = json_decode($html);
            $arr1 = array();
            $arr2 = array();
            foreach($json->timeline->cases as $k => $v){
                array_push($arr1,$k);
                array_push($arr2,$v);
            }
            
            $arr1 = array_map('add_quotes',$arr1);
            //echo implode(",",$arr1);
            //echo "<br>";
            //echo implode(",",$arr2);
            
            $strdata = implode(",",$arr1);
            $strdata2 = implode(",",$arr2);

}
            
        

        // close cURL resource to free up system resources
        curl_close($curl);
        

?>


<html>
  <head>
    <!--Load the AJAX API-->
<?php

        echo '<script type="text/javascript">
        var datadate = ['.$strdata.'];
        var datanum = ['.$strdata2.'];
        </script>';
?>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">

       window.addEventListener('resize', resizeHandler);
       window.addEventListener("orientationchange",resizeHandler);
       
       var arrdata = [];
       console.log(datadate.length);
       console.log(datanum.length);
       
       arrdata.push(["Date", "Cases", { role: "style" }]);
       
       for(let i = 0;i < datadate.length;i++){
           arrdata.push([datadate[i],datanum[i],"red"]);
       }
       
       
       function resizeHandler(){
        options = {
        title: "Confirmed Cases of Covid-19 in the USA",
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

        var data = google.visualization.arrayToDataTable(arrdata);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Confirmed Cases of Covid-19 in the USA",
        width: document.documentElement.clientWidth * .95,
        height: document.documentElement.clientHeight * .95,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },

        
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
