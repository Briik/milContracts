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
        self.selectedElements = [];

        self.showDiv = function($event){
            console.log($event);
        };

        function assignData(contract, year) {
            self.labelArray.push(contract.title);
            if (!contract.dollar_amt) {
                self.dataArray.push(0);
                self.totalmissing++;
            } else {
                self.dataArray.push(parseInt(contract.dollar_amt));
                self.number -= parseFloat(-contract.dollar_amt).toFixed(2);
                self.totalNum = (self.number).toLocaleString("currency", "USD");
            }
        };

        function getAYear(contract) {
            var theYear = String(contract.pubdate).substring(0, 4);
            if (theYear == "2014") {
                return 0;
            } else if (theYear == "2015") {
                return 1;
            } else if (theYear == "2016") {
                return 2;
            }
        };

        this.contracts = ContractFactory.query(function(response) {
            response.forEach(function(contract) {
                assignData(contract, getAYear(contract));
            });

            self.percentTotalMissing = ((self.totalmissing / self.contracts.length) * 100).toFixed(1);
        });

        self.getId = function(label){
                self.contracts.filter(function(obj) {
                    return (obj.title == label);
                });
        };

        $timeout(function() {
            angular.element(document).ready(function() {
                var ctx = $("#myChart").get(0).getContext("2d");
                Chart.defaults.global.responsive = true;

                self.info = {
                    labels: self.labelArray,
                    datasets: [{
                        label: "Large Defense Contracts By Day",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: self.dataArray,
                    }]
                };

                var contractsOverTime = new Chart(ctx).Line(self.info, {
                    pointHitDetectionRadius: 2,
                    scaleShowVerticalLines: false
                });

                self.showDiv = function($event) {
                    var activePoints = contractsOverTime.getPointsAtEvent($event);
                    self.selectedElements.splice(0,self.selectedElements.length);
                    activePoints.forEach(function(contract) {
                        self.selectedElements.push(contract)
                    });
                    console.log("selectedElements: " + self.selectedElements);
                };
            })
        }, 1000);
    }
}());
