(function() {
    'use strict';

    angular
        .module('app')
        .directive('pimSelect', pimSelect);


    function pimSelect(localStorageService, $http){
        return {
            restrict: 'E',
            scope: {
                key: '=', config: '=', value: '=', isValid: '=', isSubmit: '=', onChangeCallback: '&'
            },
            templateUrl: function(){
                return '/ui/default/types/select/select.html?v=' + APP_VERSION
            },
            link: function(scope, element, attrs){
                scope.writable = parseInt(attrs.writable) > 0;


                if((scope.value === undefined || scope.value == null) && scope.config.default != null){
                    scope.value = (scope.config.default);
                }
                
                if(parseInt(scope.value)){
                    scope.value = scope.value.toString();
                }
                

                scope.$watch('value',function(data){

                    if(parseInt(scope.value)){
                        scope.value = scope.value.toString();
                    }

                    if(!scope.config.nullable){
                        var valExists = false;
                        for(var i = 0; i < scope.config.options.length; i++){
                            if(scope.config.options[i].id == scope.value){
                                valExists = true;
                                break;
                            }
                        }

                        if(!valExists){
                            scope.value = scope.config.options[0].id;
                        }
                    }
                    scope.newValue = scope.value;
                },true)

                scope.$watch('newValue',function(data){
                    if(!scope.writable){
                        return;
                    }

                    scope.onChangeCallback({key: scope.key, value: scope.newValue});
                },true)
            }
        }
    }

})();
