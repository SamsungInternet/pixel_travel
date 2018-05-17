var devDet_scene = null;

var deviceDetection = function(){

  devDet_scene = document.querySelector('a-scene');
    if(navigator.getVRDisplays) { // is webvr supported?
        console.log('WebXR supported');
        // Then get the displays attached to the computer
        navigator.getVRDisplays().then(function(displays) {
          if(displays.length > 0) { //if there are VR devices attached to the machine
            console.log(displays[0].displayName + " attached");

            if(AFRAME.utils.device.isGearVR()){
              addLaserControls();
              console.log('added Gear VR input');
            }
            else if(displays[0].displayName.indexOf('Windows Mixed Reality') != -1){ 
              addLaserControls();
              console.log('added WMR input');
            }
            else if(displays[0].displayName.indexOf('Oculus') != -1)
            {
              addLaserControls();
              console.log('added Rift input');
            }
            console.log('added tracked controls');
          }
          else{ // no headset connected
            console.log('no headset available');
            createCursor();
          } 
        });
      }
      else{ // spec not implemented
        createCursor();
      }
}

//Creates the cursor. Overrides the default camera.
var createCursor = function(){
  
  //creates camera
  var t_cam = document.querySelector('[camera]');
  //creates and attadches cursor 
  var t_cursor = document.createElement('a-entity');
  t_cursor.setAttribute('cursor', 'fuse:true; fuseTimeout:500');
  t_cursor.setAttribute('position', '0 0 -1');
  t_cursor.setAttribute('geometry', 'primitive: ring; radiusInner: 0.006; radiusOuter: 0.007');
  t_cursor.setAttribute('material', 'color: black; shader: flat; transparent:true; opacity:0.9');
  //t_cursor.setAttribute('raycaster', 'objects:.telesphere');

  t_cam.appendChild(t_cursor);
  console.log('added cursor');
}

var addLaserControls = function(){
  // var t_laserCtrls_L = document.createElement('a-entity');
  // t_laserCtrls_L.setAttribute('laser-controls', 'hand:left');
  // //t_laserCtrls_L.setAttribute('raycaster', 'objects:.click');
  // t_laserCtrls_L.setAttribute('collider-check', '');
  // document.querySelector('a-scene').appendChild(t_laserCtrls_L);
  // var t_laserCtrls_R = document.createElement('a-entity');
  // t_laserCtrls_R.setAttribute('laser-controls', 'hand:right');
  // //t_laserCtrls_R.setAttribute('raycaster', 'objects:.click');
  // t_laserCtrls_R.setAttribute('collider-check', '');
  // document.querySelector('a-scene').appendChild(t_laserCtrls_R);
  console.log('added laser controls');
}

//performs device detection once the scene has loaded
document.addEventListener('DOMContentLoaded', function(){
  deviceDetection();
});