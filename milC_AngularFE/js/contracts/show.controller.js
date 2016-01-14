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
        self = this;
        self.cost = "LOADING";
        self.contract = ContractFactory.get({id: $stateParams.id}, function(response){
            if (!response.dollar_amt) {
                self.cost = "{Could not parse a dollar ammount from this record.}"
            } else {
                self.cost = (response.dollar_amt).toLocaleString("currency", "USD");
            }
        });
    }
}());
