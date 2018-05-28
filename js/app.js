document.addEventListener('DOMContentLoaded', function() {
    if ('SamsungChangeSky' in window) {
        window.SamsungChangeSky({ sphere: 'https://samsunginter.net/pixel_travel/imgs/bg.jpg' });
    }

    document.getElementById('btn-back').addEventListener('click', function(){
        maximizeLayout();
    });
    let ctrl_pnl = document.getElementById('ctrl-pnl');
    moveTo(ctrl_pnl, {x:0, y:-20, z:0}, 2000);
});

let layout_item_click = function(){
    changeSky(this.getAttribute('src'));
    minimizeLayout();
};

let changeSky = function(newsky){
    document.querySelector('a-sky').setAttribute('src', 'https://samsunginter.net/pixel_travel//'+newsky);
};

let minimizeLayout = function(){
    let layout = document.querySelector('[a-layout]');
    let dbubble = document.querySelector('.darken-bubble');
    let ctrl_pnl = document.getElementById('ctrl-pnl');
    moveTo(layout, {x:0, y:-20, z:0}, 2000);
    scaleTo(layout, {x:0.0001, y:0.001, z:0.001}, 1500);
    dbubble.children[0].start();
    moveTo(ctrl_pnl, {x:0, y:-2, z:-2}, 2000);
    scaleTo(ctrl_pnl, {x:1, y:1, z:1}, 1500);
};

let maximizeLayout = function(){
    let layout = document.querySelector('[a-layout]');
    let dbubble = document.querySelector('.darken-bubble');
    let ctrl_pnl = document.getElementById('ctrl-pnl');
    moveTo(layout, {x:0, y:0, z:0}, 2000);
    scaleTo(layout, {x:1, y:1, z:1}, 1500);
    dbubble.children[1].start();
    moveTo(ctrl_pnl, {x:0, y:-20, z:0}, 2000);
    scaleTo(ctrl_pnl, {x:0.0001, y:0.001, z:0.001}, 1500);
};

/****
***** device detection functions
****/
let do_devDet_6DoF = function(gid, hand){
    let ctrl_6 = document.createElement('a-box');
    ctrl_6.setAttribute('src', '#hand');
    ctrl_6.setAttribute('id', `c${gid}`);
    ctrl_6.setAttribute('width', `.1`);
    ctrl_6.setAttribute('height', `.1`);
    ctrl_6.setAttribute('depth', `.1`);
    switch(hand){
        case 'right':
        document.getElementById('rhand').appendChild(ctrl_6);
        break;
        case 'left':
            document.getElementById('lhand').appendChild(ctrl_6);
        break;
    }
    
    console.log(gid);
};

let do_devDet_3DoF = function(gid, hand){
    let ctrl_3 = document.createElement('a-box');
    ctrl_3.setAttribute('src', '#hand');
    ctrl_3.setAttribute('id', `c${gid}`);
    ctrl_3.setAttribute('width', `.1`);
    ctrl_3.setAttribute('height', `.1`);
    ctrl_3.setAttribute('depth', `.1`);
    document.getElementById('rhand').appendChild(ctrl_3);
};

let do_devDet_0DoF = function(gid, removeFuse){
    if(gid == -1){
        document.querySelector('[progressive-controls]').setAttribute('cursor', 'fuse:true; fuseTimeout:1500'); 
    }
    else{
        //std_gamepad_listener(gid);
        console.log(`detected gamepad index ${gid}`);
    }
};

let do_devDet_disconnect = function(gid){
    let ctrl_del = document.getElementById(`c${gid}`);
    ctrl_del.remove(gid);
};

function std_gamepad_listener(gid){
    gamepad = navigator.getGamepads()[`${gid}`];
    if(gamepad){
      if(gamepad.buttons[3].pressed){
        //go back to start 
        maximizeLayout();
      }
      if(gamepad.buttons[2].pressed){
          minimizeLayout();
      }
    }
    window.requestAnimationFrame(std_gamepad_listener)
}

/****
***** speech recognition functions
****/

let wsc_onspeechend = function(){};

let wsc_onresult = function(word){
    switch(word){
        case 'show places':
            maximizeLayout();
        break;
        case 'hide places':
            minimizeLayout();
        break;
    }
};

/****
***** tween animation presets
****/

function moveTo(obj, pos, time){
    let tween_pos = new AFRAME.TWEEN.Tween(obj.object3D.position).to({x:pos.x, y:pos.y, z:pos.z}, time);
    tween_pos.easing(TWEEN.Easing.Exponential.Out);
    tween_pos.start();
}

function scaleTo(obj, scl, time){
    let tween_scl = new AFRAME.TWEEN.Tween(obj.object3D.scale).to({x:scl.x, y:scl.y, z:scl.z}, time);
    tween_scl.easing(TWEEN.Easing.Exponential.Out);
    tween_scl.start();
}

function opacityTo(obj, op, time){
    let tween_op = new AFRAME.TWEEN.Tween(obj.object3D.opacity).to(0, time);
    console.log(obj.object3D.opacity);
    tween_op.easing(TWEEN.Easing.Exponential.Out);
    console.log(tween_op);
    tween_op.start();
}

