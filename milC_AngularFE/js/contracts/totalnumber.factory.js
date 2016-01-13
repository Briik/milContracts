"use strict";
(function(){
    angular
    .module("contracts")
    .factory("TotalNumberFactory", [
        "$resource",
        TotalNumberFactoryFunction
    ]);
    function TotalNumberFactoryFunction($resource){
        return $resource( "http://localhost:3000/totalNum" );
    };
}());
