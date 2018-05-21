document.addEventListener('DOMContentLoaded', function() {
    
});

let wsc_onspeechend = function(){};

let wsc_onresult = function(word){
    alert(word);
};

let layout_item_click = function(){
    console.log(this.getAttribute('src'));
};
