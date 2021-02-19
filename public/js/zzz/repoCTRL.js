
repo.controller('repoCTRL', function($scope, $http, $route){

   $http.get('/orders').success(function(data){

      console.log(data);
      $scope.orders = data;

   }).error(function(err, status){

      console.log('Error code: ' + err + 'Status code: ' + status);

   });

   //Deleting documents from out of DB
   $scope.deleteOrders = function(docs){

     $http.post('/deleteOrders', docs).success(function(data){

        console.log('Delete successful: ' + data);
        $route.reload();

     }).error(function(err, status){

        console.log('Error code: ' + err + 'Status code: ' + status);

     });

   };

   //Calculate order times
   $scope.timeElapsed = function(iso){

     var start = new Date(iso); 
     
     var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    //var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  
    var day = start.getDate();
    var monthIndex = start.getMonth();
    var year = start.getFullYear();
    var hour = start.getHour();
    var minute = start.getMinute();

    var timing = monthNames[monthIndex] + ' ' + day + ', ' + year + ' at ' + hour + ':' + minute;
  
    console.log(timing);

    return timing;

   };

});
