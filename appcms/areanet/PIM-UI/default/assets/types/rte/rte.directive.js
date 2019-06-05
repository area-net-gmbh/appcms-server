

(function() {
    'use strict';

    angular
        .module('app')
        .directive('pimRte', pimRte);


    function pimRte(localStorageService, $sce){
        return {
            restrict: 'E',
            scope: {
                key: '=', config: '=', value: '=', isValid: '=', isSubmit: '=', onChangeCallback: '&'
            },
            templateUrl: function(){
                return '/ui/default/types/rte/rte.html?v=' + APP_VERSION
            },
            link: function(scope, element, attrs){
                scope.disabled = !parseInt(attrs.writable) || scope.config.readonly;

                //scope.trustedValue = $sce.trustAsHtml(scope.value);

                if(!scope.disabled){
                  scope.tinymceOptions = {
                    setup:function(ed) {
                      ed.on('change', function(e) {
                        scope.onChangeCallback({key: scope.key, value: ed.getContent()});
                      });
                    },
                    skin: 'lightgray',
                    theme : 'modern',
                    statusbar: true,
                    menubar: false,
                    language: 'de',
                    paste_as_text: true,
                    autoresize_bottom_margin: 20,
                    plugins: "lists, link,anchor, code,autoresize,stickytoolbar2, paste",
                    block_formats: 'Absatz=p;Überschrift 1=h1;Überschrift 2=h2;Überschrift 3=h3;Überschrift 4=h4;Überschrift 5=h5;Überschrift 6=h6;Zitat=blockquote;Code=pre',
                    toolbar1: scope.config.rteToolbar,
                    file_picker_callback: function(callback, value, meta) {
                      // Provide file and text for the link dialog
                      if (meta.filetype == 'file') {
                        callback('mypage.html', {text: 'My text'});
                      }

                      // Provide image and alt text for the image dialog
                      if (meta.filetype == 'image') {
                        callback('/file/get/e3cab1ea-86d7-11e9-87d9-021f2a6099e3/factory-1880261_1280.jpg', {alt: 'My alt text'});
                      }

                      // Provide alternative source and posted for the media dialog
                      if (meta.filetype == 'media') {
                        callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
                      }
                    }
                  };

                  if(scope.config.extend && Array.isArray(scope.config.extend)){
                    for(var i in scope.config.extend){
                      scope.config.extend[i] = scope.config.extend[i].replace(new RegExp('\'', 'g'), '"');
                      try {
                        var extend = JSON.parse(scope.config.extend[i]);
                        angular.extend(scope.tinymceOptions, extend);
                      }catch(e){
                        console.log("[JSON-ERROR rte::extend] " + scope.config.extend[i]);
                      }

                    }
                  }

                  if(scope.config.typeExtend){
                    scope.config.typeExtend = scope.config.typeExtend.replace(new RegExp('\'', 'g'), '"');
                    try {
                      var extend = JSON.parse(scope.config.typeExtend);
                      angular.extend(scope.tinymceOptions, extend);
                    }catch(e){
                      console.log("[JSON-ERROR rte::typeExtend] " + scope.config.typeExtend);
                    }

                  }
                }



                if(scope.value === undefined && scope.config.default != null){
                    scope.value = (scope.config.default);
                }

            }
        }
    }


  tinymce.PluginManager.add('stickytoolbar2', function(editor, url) {
    editor.on('init', function() {
      setSticky();
    });


    function setSticky() {
      var container = editor.editorContainer;
      var toolbars = $(container).find('.mce-toolbar-grp');

      toolbars.css({
        top: 0,
        bottom: 'auto',
        position: 'sticky'
      });


    }

  });



})();
