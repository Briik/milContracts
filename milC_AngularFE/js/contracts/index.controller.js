"use strict";
(function() {
    angular
        .module("contracts")
        .controller("ContractIndexController", [
            "ContractFactory",
            "$timeout",
            ContractIndexControllerFunction
        ]);

    function ContractIndexControllerFunction(ContractFactory, $timeout) {
        var self = this;
        self.totalNum = "LOADING";
        self.number = 0.00;
        self.totalmissing = 0;
        self.percentTotalMissing = 0;
        self.dataArray = [];
        self.labelArray = [];
        this.contracts = ContractFactory.query(function(response) {
            response.forEach(function(contract) {
                self.labelArray.push(contract.title);
                if (!contract.dollar_amt) {
                    self.dataArray.push(0);
                    self.totalmissing++;
                } else {
                    self.dataArray.push(parseInt(contract.dollar_amt));
                    self.number -= parseFloat(-contract.dollar_amt).toFixed(2);
                    self.totalNum = (self.number).toLocaleString("currency", "USD");
                }
            })
            self.percentTotalMissing = ((self.totalmissing / self.contracts.length) * 100).toFixed(1);
        });
        $timeout(function () {
            angular.element(document).ready(function() {
                // Grab the chart
                var ctx = $("#myChart").get(0).getContext("2d");
                // This will get the first returned node in the jQuery collection.
                Chart.defaults.global.responsive = true;
                Chart.defaults.global.pointHitDetectionRadius = 2;
                // new Chart(ctx).PolarArea(data, options);
                self.info = {
                    //    set this labels = self.labelArray;
                    labels: self.labelArray,
                    datasets: [{
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        // set this data = self.dataArray;
                        data: self.dataArray
                    }]
                };
                var contractsOverTime = new Chart(ctx).Line(self.info);
            })
        }, 1500);
    }
}());
