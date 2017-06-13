/*global angular, console, $, alert*/
/*jslint vars: true*/
/*jslint plusplus: true*/

var app = angular.module("myApp", []);

app.directive("ngSql", function ($parse, $http) {
    "use strict";
     
    var direc = {};
    var linkFunction = function (scope, element, attributes) {
        scope.query = attributes.ngSql;
        
        $http.post("sql_query.php", {'sql': scope.query})
            .then(function (response) {
                scope.data = response.data;
                if (scope.data.includes("Data is inserted successfully.")) {
                    scope.msg = "Data is inserted successfully.";
                } else if (scope.data.includes("Data is updated successfully.")) {
                    scope.msg = "Data is updated successfully.";
                } else if (scope.data.includes("Data is deleted successfully.")) {
                    scope.msg = "Data is deleted successfully.";
                } else if (scope.data.includes("Wrong Syntax.")) {
                    scope.msg = "Wrong Syntax.";
                }
            });
        
        var reverse = false;
        
        scope.search = {};
        
        scope.orderBy = function (key) {
            if (reverse === false) {
                scope.myOrderBy = key;
                reverse = true;
            } else {
                scope.myOrderBy = "-" + key;
                reverse = false;
            }
        };
        
    };
    
    direc.restrict = "A";
    direc.link = linkFunction;
    
    var templateSearch = '<div class="col-xs-3"><label for="search">Search: </label><input type="text" id="search" data-ng-model="search[col]" /></div>';
    var templateSort = '<div class="col-xs-3"><label for="sort">Filter By: </label><select id="sort" data-ng-model="col"><option data-ng-repeat="(key, result) in data[0]" value="{{key}}">{{key}}</option></select></div>{{msg}}';
    var templateContent = '<table class="table table-striped"><tr><th data-ng-repeat="(key, result) in data[0]" data-ng-click="orderBy(key)"><a href="">{{key}}</a></th></tr><tr data-ng-repeat="user in data | orderBy:myOrderBy | filter:search"><td data-ng-repeat="field in user">{{field}}</td></tr></table>';
    
    direc.template = '<div class="row">' + templateSearch + templateSort + '</div><br />' + templateContent;
    
    return direc;
});

app.controller("myCtrl", function ($scope) {
    "use strict";
});