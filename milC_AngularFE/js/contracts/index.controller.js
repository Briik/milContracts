"use strict";
(function(){
    angular
    .module("contracts")
    .controller("ContractIndexController", [
        "ContractFactory",
        ContractIndexControllerFunction
    ]);
    function ContractIndexControllerFunction(ContractFactory){
        this.contracts = ContractFactory.query(function(response){
            var totalNum = 0.00;
            var totalmissing = 0;
            response.forEach(function(contract){
                if (!contract.dollar_amt) {
                    totalmissing =+ 1;
                } else {
                    totalNum =+ parseFloat(contract.dollar_amt).toFixed(2);
                }
            });
        });
    }
}());
