document.addEventListener('DOMContentLoaded', function() {
    
});

let wsc_onspeechend = function(){};

let wsc_onresult = function(word){
    console.log(word);
};

let layout_item_click = function(){
    changeSky(this.getAttribute('src'));
};

let changeSky = function(newsky){
    document.querySelector('a-sky').setAttribute('src', '../'+newsky);
};