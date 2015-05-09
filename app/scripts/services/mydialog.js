'use strict';

angular.module('hotpotApp')
  .controller('CreateReferenceDialogCtrl', function($scope, $modalInstance, myReference) {
    $scope.form = {};
    $scope.submit = function () {
      myReference.createReference($scope.form.name);
      $modalInstance.close();
    };
  })
  .controller('SettingsDialogCtrl', function($scope, $modalInstance, $window, myAuth) {
    var defaultHeaders = ['Y_psnr', 'U_psnr', 'QPISlice', 'kbps', 'test1', 'test2'];
    var settings = myAuth.getSettings();
    $scope.headers = settings.headers.slice();
    $scope.otherHeaders = [];
    angular.forEach(defaultHeaders, function(h) {
      if ($scope.headers.indexOf(h) === -1) {
        $scope.otherHeaders.push(h);
      }
    });
    $scope.sortableOptions = {
      connectWith: ".header-list"
    };
    $scope.limitOptions = [
      {id: 5, label: '5'},
      {id: 10, label: '10'},
      {id: 30, label: '30'}
    ];
    $scope.limit = settings.limit;
    $scope.submit = function() {
      myAuth.saveSettings({limit: $scope.limit, headers: $scope.headers}).then(function(){
        $window.location.reload();
        $modalInstance.close();
      });
    };
  })
  .controller('ProfileDialogCtrl', function($scope, $upload, $modalInstance, clientConfig, myDialog) {
    $scope.myImage = '';
    $scope.myCroppedImage='';
    $scope.$watch('files', function () {
      onFileAdd($scope.files);
    });
    var uploadParams = {
      url: clientConfig.api.baseUrl + '/users/avatars',
      method: 'POST',
      fileFormDataName: 'avatar',
      withCredentials: true
    };
    var dataURItoBlob = function(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var array = [];
      for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: mimeString});
    };

    var onFileAdd = function (files) {
      if (!files) {
        return;
      }
      var file=files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage = evt.target.result;
        });
      };
      reader.readAsDataURL(file);

      uploadParams.file = files;
    };

    $scope.submit = function () {
      uploadParams.file.push(dataURItoBlob($scope.myCroppedImage));
      $upload.upload(uploadParams).then(function(res) {
        $scope.$emit('profile:change', res.data.profile);
        $modalInstance.close();
      });
    };
    $scope.takePicture = function() {
      var modal = myDialog.takePic();
      modal.result.then(function (res) {
        if (res) {
          $scope.myImage = res;
          uploadParams.file = [dataURItoBlob($scope.myImage)];
        }
      });
    };
  })
  .controller('TakePicDialogCtrl', function($scope, $modalInstance) {
    $scope.myChannel = {
      video: null // Will reference the video element on success
    };
    $scope.onError = function (err) {
      $scope.err = 'Please turn on your webcam.';
    };
    $scope.onStream = function (stream) {};
    $scope.onSuccess = function () {

    };

    $scope.makeShot = function() {
      if ($scope.myChannel.video) {
        var data = getVideoData();
        $modalInstance.close(data);
      }
    };
    var getVideoData = function getVideoData() {
      var hiddenCanvas = document.createElement('canvas');
      hiddenCanvas.width = $scope.myChannel.video.width;
      hiddenCanvas.height = $scope.myChannel.video.height;
      var ctx = hiddenCanvas.getContext('2d');
      ctx.drawImage($scope.myChannel.video, 0, 0, $scope.myChannel.video.width, $scope.myChannel.video.height);
      return hiddenCanvas.toDataURL();
      //return ctx.getImageData(x, y, w, h);
    };
  })
  .factory('myDialog', function ($modal) {
    return {
      createReference: function() {
        return $modal.open({
          templateUrl: 'views/modals/create_reference_dialog.html',
          controller: 'CreateReferenceDialogCtrl'
        });
      },
      settings: function() {
        return $modal.open({
          templateUrl: 'views/modals/settings_dialog.html',
          controller: 'SettingsDialogCtrl'
        });
      },
      changeProfile: function() {
        return $modal.open({
          templateUrl: 'views/modals/profile_dialog.html',
          controller: 'ProfileDialogCtrl'
        });
      },
      takePic: function() {
        return $modal.open({
          templateUrl: 'views/modals/take_pic_dialog.html',
          controller: 'TakePicDialogCtrl',
          windowClass: 'take-pic-dialog'
        });
      }
    };
  });
