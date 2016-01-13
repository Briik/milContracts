"use strict";
(funciton(){
    angular
    .module("contracts")
    .factory("ContractFactory", [
        "$resource",
        ContractFactoryFunction
    ]);
    function ContractFactoryFunction($resource){
        return $resource( "http://localhost3000/contracts/:id" );
    };
}());
