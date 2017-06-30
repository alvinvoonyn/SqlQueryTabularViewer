/*global angular, console, $, alert*/
/*jslint vars: true*/
/*jslint plusplus: true*/

var app = angular.module("myApp", []);

app.filter("offset", function () {
    "use strict";
    return function (input, start) {
        return input.slice(start);
    };
});

app.directive("sql2table", function ($parse, $http) {
    "use strict";
    var direc = {};
    direc.restrict = "E";
    
    direc.scope = {
        query : "@",
        rowNum: "@"
    };
    
    direc.compile = function () {
        var linkFunction = function (scope, element, attributes) {
            
            if (scope.query.includes("SELECT")) {
                $http.post("sql_query.php", {'sql': scope.query})
                    .then(function (response) {
                        scope.data = response.data;
                        scope.error = false;
                    
                        //get the total number of property in the selected object
                        scope.colNum = Object.keys(scope.data[0]).length;
                    
                        //order by first column when page is loaded.
                        scope.orderBy(Object.keys(scope.data[0])[0]);
                    
                        //if returned data is string form which is error message, execute this
                        if ((typeof scope.data) === "string") {
                            scope.msg = scope.data;
                            scope.error = true;
                        }
                    });
            } else {
                scope.msg = "SQL2Table.js only accept SELECT query only";
                scope.error = true;
            }
            
            var reverse = false;

            scope.search = {};
            scope.col = "$";
            
            //Clear search input field when the filter is chosen
            scope.clearSearch = function () {
                scope.search = {};
            };
            
            scope.orderBy = function (key) {
                if (reverse === false) {
                    scope.myOrderBy = key;
                    reverse = true;
                } else {
                    scope.myOrderBy = "-" + key;
                    reverse = false;
                }
            };

            //Default Row Per Page
            scope.rowPerPage = 10;
            
            scope.rowPerPage = scope.rowNum;
            scope.currentPage = 0;

            //Count how many pages needed to display all students
            //return 5 in this case: students.length = 24 & unitsPerPage = 5
            scope.pageCount = function () {
                return Math.ceil(scope.data.length / scope.rowPerPage) - 1;
            };

            //Setting number for pagination button to be display
            scope.range = function () {
                var rangeSize = scope.pageCount() + 1;
                var numForPagiBtns = [];
                var start = scope.currentPage;
                var i;


                // if 0 > -1
                // -1 + 1 will store to "start"
                if (start > scope.pageCount() - rangeSize) {
                    start = scope.pageCount() - rangeSize + 1;
                }

                //loop for 5 times
                for (i = start; i < start + rangeSize; i++) {
                    numForPagiBtns.push(i);
                }

                return numForPagiBtns;
            };

            //When the page number is clicked, set the number as the current page
            scope.setPage = function (n) {
                scope.currentPage = n;
            };

            //Decrease the current page number by 1 when previous button is clicked
            scope.prevPage = function () {
                if (scope.currentPage > 0) {
                    scope.currentPage--;
                }
            };

            //Disable the previous button if the current page is 0 (html view is 1)
            scope.prevPageDisabled = function () {
                return scope.currentPage === 0 ? "disabled" : "";
            };

            //Increase the current page number by 1 when next button is pressed.
            scope.nextPage = function () {
                if (scope.currentPage < scope.pageCount()) {
                    scope.currentPage++;
                }
            };

            //Disable the next button if the current page is 4 (html view is 5)
            scope.nextPageDisabled = function () {
                return scope.currentPage === scope.pageCount() ? "disabled" : "";
            };
               
            
        };
        
        return linkFunction;
    };
    
    /*
    var templateSearch = '<div class="col-xs-3"><label for="search">Search: </label><input type="text" id="search" data-ng-model="search[col]" /></div>';
    var templateSort = '<div class="col-xs-3"><label for="sort">Filter By: </label><select id="sort" data-ng-model="col"><option value="$">All</option><option data-ng-repeat="(key, result) in data[0]" value="{{key}}">{{key}}</option></select></div>{{msg}}';
    var templateContent = '<table class="table table-striped"><tr><th data-ng-repeat="(key, result) in data[0]" data-ng-click="orderBy(key)"><a href="">{{key}}</a></th></tr><tr data-ng-repeat="user in data | orderBy:myOrderBy | filter:search"><td data-ng-repeat="field in user">{{field}}</td></tr></table>';
    
    direc.template = '<div class="row">' + templateSearch + templateSort + '</div><br />' + templateContent;
    */
    
    direc.templateUrl = 'outputTemplate.html';
    
    return direc;
});

app.controller("myCtrl", function ($scope) {
    "use strict";
    
    /*
    
    $scope.rowPerPage = 2;
    $scope.currentPage = 0;
    
    //Count how many pages needed to display all students
    //return 5 in this case: students.length = 24 & unitsPerPage = 5
    $scope.pageCount = function () {
        return Math.ceil($scope.data.length / $scope.rowPerPage) - 1;
    };
    
    //Setting number for pagination button to be display
    $scope.range = function () {
        var rangeSize = $scope.pageCount() + 1;
        var numForPagiBtns = [];
        var start = $scope.currentPage;
        var i;
        
        
        // if 0 > -1
        // -1 + 1 will store to "start"
        if (start > $scope.pageCount() - rangeSize) {
            start = $scope.pageCount() - rangeSize + 1;
        }
        
        //loop for 5 times
        for (i = start; i < start + rangeSize; i++) {
            numForPagiBtns.push(i);
        }
        
        return numForPagiBtns;
    };
    
    //When the page number is clicked, set the number as the current page
    $scope.setPage = function (n) {
        $scope.currentPage = n;
    };
    
    //Decrease the current page number by 1 when previous button is clicked
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    //Disable the previous button if the current page is 0 (html view is 1)
    $scope.prevPageDisabled = function () {
        return $scope.currentPage === 0 ? "disabled" : "";
    };
    
    //Increase the current page number by 1 when next button is pressed.
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };
    
    //Disable the next button if the current page is 4 (html view is 5)
    $scope.nextPageDisabled = function () {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };
    
    */
});