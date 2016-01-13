"use strict";
(function(){
    angular
    .module("contracts")
    .controller("ContractIndexController", [
        "ContractFactory",
        ContractIndexControllerFunction
    ]);
    function ContractIndexControllerFunction(ContractFactory){
       var self = this;
       self.totalNum = "LOADING";
       self.number = 0.00;
       self.totalmissing = 0;
       self.percentTotalMissing = 0;
       this.contracts = ContractFactory.query(function(response){
           response.forEach(function(contract){
               if (!contract.dollar_amt) {
                   self.totalmissing++;
               } else {
                   self.number -= parseFloat(-contract.dollar_amt).toFixed(2);
                   self.totalNum = (self.number).toLocaleString("currency", "USD");
               }
           })
           self.percentTotalMissing = ((self.totalmissing / self.contracts.length) * 100).toFixed(1);
       });
       angular.element(document).ready(function(){
           // Grab the chart
           var ctx = $("#myChart").get(0).getContext("2d");
           // This will get the first returned node in the jQuery collection.
           Chart.defaults.global.responsive = true;
           // new Chart(ctx).PolarArea(data, options);
           var data = {
               labels: ["January", "February", "March", "April", "May", "June", "July"],
               datasets: [{
                   label: "My First dataset",
                   fillColor: "rgba(220,220,220,0.2)",
                   strokeColor: "rgba(220,220,220,1)",
                   pointColor: "rgba(220,220,220,1)",
                   pointStrokeColor: "#fff",
                   pointHighlightFill: "#fff",
                   pointHighlightStroke: "rgba(220,220,220,1)",
                   data: [65, 59, 80, 81, 56, 55, 40]
               }, {
                   label: "My Second dataset",
                   fillColor: "rgba(151,187,205,0.2)",
                   strokeColor: "rgba(151,187,205,1)",
                   pointColor: "rgba(151,187,205,1)",
                   pointStrokeColor: "#fff",
                   pointHighlightFill: "#fff",
                   pointHighlightStroke: "rgba(151,187,205,1)",
                   data: [28, 48, 40, 19, 86, 27, 90]
               }]
           };
           var contractsOverTime = new Chart(ctx).Line(data);
       })
    }
}());
