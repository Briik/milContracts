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
            this.totalNum = 0;
            this.totalmissing = 0;
            response.forEach(function(contract){
                if (!contract.dollar_amt) {
                    this.totalmissing += 1;
                } else {
                    this.totalNum += contract.dollar_amt;
                }
            });
            console.log(this.totalNum);
        });
    }
}());
