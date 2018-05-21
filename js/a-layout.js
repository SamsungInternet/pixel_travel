/* image layouts */

AFRAME.registerComponent('a-layout', {
    schema: {
        shape:{type: 'string', default: 'circle'},
        dur_lap:{type: 'int', default:10000}
    },

    init: function(){
        let imgs = this.el.children;
        let num_imgs = this.el.children.length;
        let layout = document.createElement('a-entity');
        layout.setAttribute('id', 'layout');
        layout.rotate = new AFRAME.TWEEN.Tween(layout.object3D.rotation).to({y:toRadians(359)}, this.data.dur_lap);
        layout.setCircle = function(r){
            circ_rad = r;
            let ang = 360/num_imgs;
            for(i = 0; i < num_imgs; i++){
                //rotation: imgs[i].object3D.rotateY(toRadians(180-(90-ang * -i)));
                //let tween_rot = new AFRAME.TWEEN.Tween(imgs[i].object3D.rotation).to({y:toRadians(-(90-ang * -i))}, trans_lapse*2);
                //tween_rot.easing(TWEEN.Easing.Cubic.Out);
                //tween_rot.start();
                imgs[i].object3D.position.set(circ_rad * Math.cos(toRadians(ang * i)), 0, circ_rad * Math.sin(toRadians(ang * i)));
                imgs[i].addEventListener('click', layout_item_click);
                //let tween_pos = new AFRAME.TWEEN.Tween(imgs[i].object3D.position).to({x:(circ_rad * Math.cos(toRadians(ang * i))), y: 1, z:(circ_rad * Math.sin(toRadians(ang * i)))}, trans_lapse);
                //tween_pos.easing(TWEEN.Easing.Cubic.Out);
                //tween_pos.start();
            }
        };
        layout.setGrid = function(pc){
            let f =0, c = 0;
            for(i = 0; i < num_imgs; i++){
                //position: imgs[i].object3D.position.set(c * img_w + spacer, f * img_h, -6);
                let tween_pos = new AFRAME.TWEEN.Tween(imgs[i].object3D.position).to({x:(c * img_w + spacer), y: (f * img_h), z:-6}, trans_lapse);
                tween_pos.easing(TWEEN.Easing.Cubic.Out);
                tween_pos.start();
                imgs[i].object3D.rotation.set(0, 0, 0);
                c++;
                if (c == pc){
                    c=0;
                    f++;
                }
            }
        };
        switch(this.data.shape){
            case 'circle':
                layout.setCircle(6);
                layout.rotate.start();
                break;
            case 'grid':
            layout.setGrid(3);
            layout.rotate.stop();
        }
        document.querySelector('a-scene').appendChild(layout);
        console.log('a-layout init-ed');
    }

});

/* utils */

function toRadians(degree) {
    return degree * (Math.PI / 180);
};

function toDegrees(radians) {
    return radians * (180 / Math.PI);
}