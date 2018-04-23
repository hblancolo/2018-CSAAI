var seg_counter = 0;
var min_counter = 0;

self.onmessage = function(msg) {
    min_counter = msg.data[0];
    seg_counter = msg.data[1];
}

var timer = setInterval(
    function(){
        if (seg_counter == 60){
            seg_counter = 0;
            min_counter++;

            if (min_counter == 60){
                min_counter = 0;
            }
        }
        seg_counter++;
        postMessage(min_counter + ':' + seg_counter);
    }
    ,1000);
