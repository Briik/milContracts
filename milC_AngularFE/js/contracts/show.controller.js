"use strict";
(function(){
    angular
    .module("contracts")
    .controller("ContractShowController", [
        "ContractFactory",
        "$stateParams",
        ContractShowControllerFunction
    ]);
    function ContractShowControllerFunction(ContractFactory, $stateParams){
        this.contract = ContractFactory.get({id: $stateParams.id});
    }
}());
