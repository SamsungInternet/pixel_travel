document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-back').addEventListener('click', function(){
        maximizeLayout();
    });
});

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

let layout_item_click = function(){
    changeSky(this.getAttribute('src'));
    minimizeLayout();
};

let changeSky = function(newsky){
    document.querySelector('a-sky').setAttribute('src', 'https://diekus.com/vrtravel/'+newsky);
};

let minimizeLayout = function(){
    let layout = document.querySelector('[a-layout]');
    let dbubble = document.querySelector('.darken-bubble');
    moveTo(layout, {x:0, y:-20, z:0}, 2000);
    scaleTo(layout, {x:0.0001, y:0.001, z:0.001}, 1500);
    dbubble.children[0].start();
};

let maximizeLayout = function(){
    let layout = document.querySelector('[a-layout]');
    let dbubble = document.querySelector('.darken-bubble');
    moveTo(layout, {x:0, y:0, z:0}, 2000);
    scaleTo(layout, {x:1, y:1, z:1}, 1500);
    dbubble.children[1].start();
};



//animation 
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