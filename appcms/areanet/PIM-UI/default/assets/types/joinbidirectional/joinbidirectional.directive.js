(function() {
  'use strict';

  angular
    .module('app')
    .directive('pimJoinbidirectional', pimJoinBidirectional);


  function pimJoinBidirectional($uibModal, $timeout, $location, EntityService, localStorageService, $rootScope){
    return {
      restrict: 'E',
      scope: {
        key: '=', config: '=', value: '=', isValid: '=',  isSubmit: '=', onChangeCallback: '&', object: '='
      },
      templateUrl: function(){
        return '/ui/default/types/joinbidirectional/joinbidirectional.html?v=' + APP_VERSION
      },
      link: function(scope, element, attrs){
        var itemsPerPage = 10;
        var entity       = null;

        //Properties
        scope.currentPage   = 1;
        scope.deletable     = false;
        scope.hide          = false;
        scope.propertyCount = 0;
        scope.readonly      = false;
        scope.schema        = null;
        scope.sortProperty  = 'id';
        scope.sortableOptions = {
          stop: function(e,ui){
            var resortObjectData = [];

            for(var i = 0; i < scope.value.length; i++){
              scope.value[i].sorting = i;
              resortObjectData.push({
                entity: entity,
                id: scope.value[i].id,
                data:{
                  sorting: i
                }
              });
            }

            var data = {
              objects: resortObjectData
            };

            EntityService.multiupdate(data).then(
              function successCallback(response) {
              },
              function errorCallback(response) {
              }
            );
          },
          disabled: !scope.config.sortable
        };
        scope.totalPages    = 1;
        scope.value = scope.value ? scope.value : [];
        scope.writable = false;
        scope.writable_object= false;

        //Functions
        scope.addNewObject  = addNewObject;
        scope.editObject    = editObject;
        scope.removeObject  = removeObject;

        //Startup
        init();

        /////////////////////////////////////

        function addNewObject(){

          var object = {};
          object[scope.config.mappedBy] = scope.object.id;

          var templateUrl = '/ui/default/views/form.html?v=' + APP_VERSION;
          var controller  = 'FormCtrl as vm';

          if(extendedRoutes['form']){
            templateUrl =  extendedRoutes['form'][0]['template'] ? extendedRoutes['form'][0]['template'] : templateUrl;
            controller  = extendedRoutes['form'][0]['controller'] ? extendedRoutes['form'][0]['controller'] + ' as vm' : controller;
          }

          var modalInstance = $uibModal.open({
            templateUrl: templateUrl,
            controller: controller,
            resolve: {
              entity: function(){ return entity;},
              title: function(){ return 'Neues Objekt anlegen'; },
              object: function(){ return object; },
              readonly: false,
              lang: function(){ return scope.object.lang;},
              doCopy: false,
              translateFrom:  function(){ null;},
              '$extend': function(){ return null;}
            },
            backdrop: 'static',
            size: 'xl'
          });

          modalInstance.result.then(
            function (newObject) {
              if(newObject){
                scope.value.push(newObject);
              }
            },
            function () {}
          );
        }


        function editObject(index, readonly){

          var id     = scope.value[index].id;
          var object = scope.value[index];

          var templateUrl = '/ui/default/views/form.html?v=' + APP_VERSION;
          var controller  = 'FormCtrl as vm';

          if(extendedRoutes['form']){
            templateUrl =  extendedRoutes['form'][0]['template'] ? extendedRoutes['form'][0]['template'] : templateUrl;
            controller  =  extendedRoutes['form'][0]['controller'] ? extendedRoutes['form'][0]['controller'] + ' as vm' : controller;
          }

          var modalInstance = $uibModal.open({
            templateUrl: templateUrl,
            controller: controller,
            resolve: {
              entity: function(){ return entity;},
              object: function(){ return object; },
              readonly: readonly != 1 ? false : true,
              lang: function(){ return scope.object.lang;},
              doCopy: false,
              translateFrom:  function(){ null;},
              '$extend': function(){ return null;}
            },
            backdrop: 'static',
            size: 'xl'
          });

          modalInstance.result.then(
            function (newObject) {
              scope.value[index] = newObject;

            },
            function () {}
          );
        }

        function init(){
          entity = $rootScope.getShortEntityName(scope.config.targetEntity);

          var permissions = localStorageService.get('permissions');
          if(!permissions){
            return;
          }


          scope.hide              = !permissions[entity].readable;
          scope.writable_object   = permissions[entity].writable;
          scope.deletable         = parseInt(attrs.writable) > 0;
          scope.writable          = parseInt(attrs.writable) > 0;


          scope.schema = localStorageService.get('schema')[entity];

          scope.propertyCount = Object.keys(scope.schema.list).length;

          scope.sortProperty  = scope.config.sortable ? 'sorting' : 'id';
        }



        function removeObject(index){
          var objectToRemove = scope.value[index];

          var modaltitle = 'Wollen Sie den <b title="' + objectToRemove.id + '">Eintrag ' + (objectToRemove.id.length > 5 ? objectToRemove.id.substr(0, 5) + '...' : objectToRemove.id)  + '</b> wirklich löschen?';
          if(scope.schema.settings.labelProperty){
            modaltitle = 'Wollen Sie <b>' + scope.schema.settings.label + ' ' + objectToRemove[scope.schema.settings.labelProperty] + '</b> wirklich löschen?';
          }

          var modalInstance = $uibModal.open({
            templateUrl: '/ui/default/views/partials/modal.html?v=' + APP_VERSION,
            controller: 'ModalCtrl as vm',
            resolve: {
              title: function(){ return 'Eintrag löschen'; },
              body: function(){ return modaltitle; },
              object: function(){ return objectToRemove; },
              hideCancelButton: false
            }
          });

          modalInstance.result.then(
            function (doDelete) {
              if (doDelete) {
                scope.value.splice(index, 1);

                var data = {
                  entity: entity,
                  id: objectToRemove.id
                };

                EntityService.delete(data).then(
                  function successCallback(response) {

                  },
                  function errorCallback(response) {
                    if(response.status == 401){
                      var modalInstance = $uibModal.open({
                        templateUrl: '/ui/default/views/partials/relogin.html?v=' + APP_VERSION,
                        controller: 'ReloginCtrl as vm',
                        backdrop: 'static'
                      });

                      modalInstance.result.then(
                        function () {
                          removeObject(index);
                        },
                        function () {
                          $uibModalInstance.close();
                          $location.path('/logout');
                        }
                      );

                    }else{
                      var modalInstance = $uibModal.open({
                        templateUrl: '/ui/default/views/partials/modal.html?v=' + APP_VERSION,
                        controller: 'ModalCtrl as vm',
                        resolve: {
                          title: function(){ return 'Fehler beim Löschen'; },
                          body: function(){ return response.data.message; },
                          hideCancelButton: true
                        }
                      });
                    }
                  }
                );
              }
            },
            function () {

            }
          );



        }

      }
    }
  }

})();
