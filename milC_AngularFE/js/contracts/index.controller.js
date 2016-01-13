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
    }
}());
