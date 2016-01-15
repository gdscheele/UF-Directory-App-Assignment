angular.module('listings', ['toaster']).controller('ListingsController', ['$scope', 'listings', 'toaster',
  function($scope, listings, toaster) {
    $scope.listings = listings;
    $scope.detailedInfo = undefined;
    $scope.newListing = '';
    $scope.searchText = '';
    var map = undefined;
    var marker = undefined;

    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */
    $scope.addListing = function() {
      $scope.listings.push($scope.newListing);
      $scope.newListing = '';
      toaster.pop('success', "Hooray!", "Listing has been saved.");
    };

    $scope.deleteListing = function(index) {
      $scope.listings.splice(index, 1);
    };

    $scope.showDetails = function(code) {
      $scope.detailedInfo = '';

      $scope.listings.forEach(function(element, index, array) {
        if(element.code == code){
          $scope.detailedInfo = element;
        }
      });

      //only show map if the selected item has coordinates
      if($scope.detailedInfo.coordinates){
        document.getElementById('mapContainer').innerHTML = '<div id="map"></div>';
        $scope.initMap();
      }
      else{
        map = undefined;
        document.getElementById('mapContainer').innerHTML = '';
      }

    };

    $scope.initMap = function() {
      $scope.removeMarker();
      var myLatLng = {lat: $scope.detailedInfo.coordinates.latitude, lng: $scope.detailedInfo.coordinates.longitude};

      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng
      });

      marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: $scope.detailedInfo.name,
      });
    }

    $scope.removeMarker = function() {
      if(marker != undefined)
        marker.setMap(null);
    }

  }
]);