"use strict";
(function(){
    angular
    .module("contracts")
    .controller("ContractIndexController", [
        "ContractFactory",
        ContractIndexControllerFunction
    ]);
    function ContractIndexControllerFunction(ContractFactory){
        this.totalNum = 0.00;
        this.totalmissing = 0;
        this.contracts = ContractFactory.query(function(response){
            response.forEach(function(contract){
                if (!contract.dollar_amt) {
                    ContractIndexControllerFunction.totalmissing =+ 1;
                } else {
                    ContractIndexControllerFunction.totalNum =+ parseFloat(contract.dollar_amt).toFixed(2);
                }
            });
        });
    }
}());
