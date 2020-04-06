document.addEventListener("DOMContentLoaded", function(){
    //Do this when DOM is loaded
    console.log("DOC READY");
    do_chart();
    
});


var do_chart = function(){
    console.log("STARTING CHART");
  var chart = new Chartist.Bar('.ct-chart', {
  labels: ['12AM', '|', '1AM', '|','2AM','|','3AM','|','4AM','|','5AM','|','6AM','|','7AM'],
  series: [
    [1,0,1,1,1,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,0,0,1,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,0,0],
    [1,1,0,1,0,0,0,0,1,1,1,0,0,0,1,1,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,1,1,0,1,1,0,1,1,0,0,1,0,1,0,1,1,1],
    [1,1,0,1,0,0,0,0,1,1,1,0,0,0,1,1,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,1,1,0,1,1,0,1,1,0,0,1,0,1,0,1,1,1],
    [1,0,1,1,1,0,1,1,1,0,1,1,0,0,1,1,1,0,1,0,1,1,1,0,0,0,0,1,1,0,0,1,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,0,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,0,0,1,1,1,1,0,0,0,1,1,0]
  ]
}, {
  
  stackBars: true,
  
  
    
  axisY: {
    onlyInteger: true,
    labelInterpolationFnc: function(value) {
      return value;
    }
  }
}).on('draw', function(data) {
  if(data.type === 'bar') {
    data.element.attr({
      style: 'stroke-width: 30px'
    });
  }
});
};