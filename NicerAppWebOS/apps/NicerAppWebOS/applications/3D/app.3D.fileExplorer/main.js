import {
  AmbientLight,
  AnimationMixer,
  AxesHelper,
  Box3,
  Cache,
  CubeTextureLoader,
  DirectionalLight,
  GridHelper,
  HemisphereLight,
  LinearEncoding,
  LoaderUtils,
  LoadingManager,
  PMREMGenerator,
  PerspectiveCamera,
  RGBAFormat,
  Scene,
  SkeletonHelper,
  UnsignedByteType,
  Vector3,
  WebGLRenderer,
  sRGBEncoding

} from '/NicerAppWebOS/3rd-party/3D/libs/three.js/build/three.module.js';
import { Stats } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/libs/stats.module.js';
import { GLTFLoader } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/loaders/KTX2Loader.js';
import { DRACOLoader } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/loaders/RGBELoader.js';
import { DragControls } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/controls/DragControls.js';
    
    import { na3D_fileBrowser }
		from '/NicerAppWebOS/logic.userInterface/na3D.source.js';
		
    //$(document).ready(function() {
        na.m.waitForCondition ('app.3D.fileExplorer : Filesystem index loaded?',
            function () { 
				var r =
					typeof na.site.settings.menus['#siteMenu'] !== 'undefined'
					&& typeof na.site.settings.backgroundsRecursive !== 'undefined'
                    //&& typeof na.site.settings.na3D['#app_3D_fileExplorer'] !== 'undefined'
                    //&& typeof na.site.settings.na3D['#app_3D_fileExplorer'].settings.parameters !== 'undefined'
					&& typeof THREE !== 'undefined';
					// ^-- wait for this to become non-null, non-undefined, aka filled with data fetched in 
					// /NicerAppWebOS/site.source.js:::na.site.onload() to /NicerAppWebOS/domainConfigs/SOME_NAME/ajax_backgrounds.php
                return r;
            },
            function () {
                na.desktop.setConfig ('contentAndToolbarRight');

                // and when the data has loaded, do the following.. :
                na.site.closeAll_3D_apps();
                $('.na3D').each(function(idx,el){
                    var parameters = {
                        views : [
                            na.site.settings.backgroundsRecursive
                        ]
                    };

                    na.site.settings.na3D['#app_3D_fileExplorer'] =
                        new na3D_fileBrowser(el, $(el).parent()[0], parameters);


                });
                
                var 
                html = 
                    '<h2 id="titleHowTo">How To</h2>'
                    + '<p>Drag and drop folders to re-arrange them.<br/>'
                   // + 'Your folder-arrangement will be saved for your next visit to this page.</p>'
                    + '<p>Hold the left mouse button and drag to manually rotate the data.</p>'
                    + '<p>Hold the right mouse button and drag to manually pan the camera.</p>'
                    + '<p>Double click a mouse button to toggle automatic rotation of the data.</p>'
                    + '<p>Triple click a mouse button to reverse direction for automatic rotation of the data.</p>'
                    + '<p>Use the mouse wheel to zoom in or out.</p>'
                    + '<div id="threedfm_buttons">'
                    + '<div id="newColors" class="vividButton" theme="dark" style="position:relative;" onclick="for (var id in na.site.settings.na3D) { var td = na.site.settings.na3D[id]; td.useNewColors(); }">New Colors</div>'
                    + '<div id="newArrangement" class="vividButton" theme="dark" style="position:relative;" onclick="for (var id in na.site.settings.na3D) { var td = na.site.settings.na3D[id]; td.useNewArrangement(); }">New Arrangement</div>'
                    + '<div id="autoRotate" class="vividButtonSelected" theme="dark" style="position:relative;" onclick="for (var id in na.site.settings.na3D) { var td = na.site.settings.na3D[id]; td.toggleAutoRotate(); }">Auto-rotate</div>'
                    +'<div id="showLines" class="vividButtonSelected" theme="dark" style="position:relative;" onclick="for (var id in na.site.settings.na3D) { var td = na.site.settings.na3D[id]; td.toggleShowLines(); }">Show Lines</div>'
                    +'</div>';
                
                $('#siteToolbarRight .vividDialogContent').html (html);
                na.site.settings.buttons['#newColors'] = new naVividButton ($('#newColors')[0]);
                
                var vividTextCmd = {
                        el : jQuery('#titleHowTo')[0],
                        theme : na.cg.themes.naColorgradientSchemeOrangeYellow, 
                        animationType : na.vividText.globals.animationTypes[0],
                        animationSpeed : 4 * 1000
                };
                na.vividText.initElement (vividTextCmd);
                
            }, 100
        );
    //});
 
