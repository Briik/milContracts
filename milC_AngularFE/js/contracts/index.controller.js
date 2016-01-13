"use strict";
(function(){
    angular
    .module("contracts")
    .controller("ContractIndexController", [
        "ContractFactory",
        ContractIndexControllerFunction
    ]);
    function ContractIndexControllerFunction(ContractFactory){
        this.contracts = ContractFactory.query();
        // this.totalNum = TotalNumberFactory.query();
    }
}());
