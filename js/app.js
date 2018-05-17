document.addEventListener('DOMContentLoaded', function() {
    deviceDetection();
});

var wsc_onspeechend = function(){};

var wsc_onresult = function(word){
    alert(word);
};