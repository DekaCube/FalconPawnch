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
            foreach($json->timeline->deaths as $k => $v){
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





<!doctype html>
<html>
<head>
    <title>Bar Chart</title>
    <script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js'></script>
<?php

        echo '<script type="text/javascript">
        var datadate = ['.$strdata.'];
        var datanum = ['.$strdata2.'];
        </script>';
?>

</head>
<body>
    <canvas id="myChart"></canvas>
    <script>
        function avg(arr){
            let total = 0;
            for(let j = 0;j < arr.length;j++){
                total = arr[j] + total;
            }
            return total/arr.length
        }
        
        function find_max(arr){
            let max = -1;
            for(let j = 0;j < arr.length;j++){
                max  = (max <= arr[j]) ? arr[j]: max;
            }
            return max;
        }
        
        function find_min(arr){
            let min = 10000000;
            for(let j = 0;j < arr.length;j++){
                min = (min < arr[j]) ? min : arr[j];
            }
            return min;
        }
            
        
        function normalize(minn,maxx,value){
            return (value - minn)/(maxx - minn);
        }
        
        
    
        var ctx = document.getElementById('myChart');
        bcolors = [];
        bborders = [];
        let averagenum = avg(datanum);
        let maxnum = find_max(datanum);
        let minnum = find_min(datanum);
        console.log("Minimum is " + minnum);
        console.log("Maximum is " + maxnum);
        console.log("Average is " + averagenum);
        for(let i = 0;i < datanum.length;i++){
            bborders.push("rgba(0, 0, 0, 1)");
            bcolors.push("rgba(255,0,0," + normalize(minnum,maxnum,datanum[i]))
 
        }
        
                
            
        
        //ctx.style.width = document.documentElement.clientWidth * .90;
        //ctx.style.height = document.documentElement.clientHeight *.90;
        var myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: datadate,
                datasets: [{
                    label: "Covid-19 Deaths in USA",
                    data: datanum,
                    backgroundColor: bcolors,
                    borderColor: bborders,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        
    </script>

</body>
</html>
