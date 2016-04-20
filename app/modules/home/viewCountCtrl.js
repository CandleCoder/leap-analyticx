angular.module("home", []).controller("ViewCountCtrl", function ($scope,$http,$window) {

  // store response data in a variable
  var responsejson;
  var graphMainArr=[];
  var graphInnerArr=[];
  $scope.name="To be prepared";
  $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  $http.defaults.headers.common['Content-Type'] = 'application/json';
  $http.defaults.headers.common['x-auth-token'] = $window.sessionStorage.Token;

  $http.get("http://10.11.9.8/api/v1/analytics/viewcount?action=attempted&type=course")
  .then(function(response) {

    // store response data in a variable
    responsejson = response.data;
  
    for( i = 0; i < responsejson.ResultData.length ; i++){
      delete responsejson.ResultData[i].CourseId;
      graphInnerArr.push({v: responsejson.ResultData[i].CourseName});
      graphInnerArr.push({v: responsejson.ResultData[i].Total_times_attempted});

      graphMainArr.push({c: graphInnerArr});
      graphInnerArr=[];
    }

    
   
    $scope.chartObject = {};
    $scope.chartObject.type = "ColumnChart";

    $scope.chartObject.data = {"cols": [
        {id: "t", label: "Course Name", type: "string"},
        {id: "s", label: "View Count", type: "number"}
    ], "rows": graphMainArr
    };

    $scope.chartObject.options = {
      'title': 'Graph '
    };
   


  });

});
