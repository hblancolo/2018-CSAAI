var playOrPause = "pause";
var currentTime;
var seg_counter = 0;
var min_counter = 0;
var loopTimes = 0;



function playVideos() {
    for (var i=1; i<=4; i++) {
        var video = document.getElementById("video-"+i);
        video.muted = true;
        video.autoplay = true;
        playOrPause = "play";
    }

    var program = document.getElementById("program");
    program.muted = true;
    program.autoplay = true

    timer = setInterval(
        function(){
            currentTime = program.currentTime;
            document.getElementById("time-display").innerHTML = currentTime;
        }
        ,20);
}

function srcToProgram(srcNumber) {
    for (var i=1; i<=4; i++) {  // clears borders of all videos
        var container = document.getElementById("container-"+ i);
        container.style.border = "none";
    }

    var video = document.getElementById("video-"+srcNumber);
    var videoContainer = document.getElementById("container-"+srcNumber);
    var videoSource = document.getElementById("source-"+srcNumber);
    var sourcePath = videoSource.getAttribute("src");

    videoContainer.style.border = "thick solid #0000FF";
    currentVideo = video;

    var program = document.getElementById("program");
    program.src = sourcePath;
    program.muted = true;

    currentTime = video.currentTime;
    program.currentTime = currentTime;

    program.play();
}

function playPause() {
    if (playOrPause === "pause") {
        for (var i=1; i<=4; i++) {
            var video = document.getElementById("video-"+i);
            video.play();
            playOrPause = "play";
        }
    } else {
        for (var i=1; i<=4; i++) {
            var video = document.getElementById("video-"+i);
            video.pause();
            playOrPause = "pause";
        }
    }
}

function setLoop() {
    var inputValue = document.getElementById("input-text").value;
    var beginTime = Number(inputValue.split("-")[0]);
    var endTime = Number(inputValue.split("-")[1]);
    loopTimes = Number(inputValue.split("-")[2]);

    if (beginTime >= endTime) {
        document.getElementById("notice").innerHTML = "Starting point must be lower than ending point!";
    } else {
        document.getElementById("notice").innerHTML = "Loop between: " + beginTime + ' and ' + endTime;
    }

    var program = document.getElementById("program");
    program.currentTime = beginTime;

    loopTimeOut = setTimeout(function() {
        setLoop();
    }, (endTime-beginTime)*1000);
}

function deleteLoop() {
    clearTimeout(loopTimeOut);
    document.getElementById("notice").innerHTML = "";
}


function activateSound(srcNumber) {
    if (srcNumber === 5) {
        var video = document.getElementById("program");
    } else {
        var video = document.getElementById("video-"+srcNumber);
    }

    video.muted = false;
}

function muteSound(srcNumber) {
    if (srcNumber === 5) {
        var video = document.getElementById("program");
    } else {
        var video = document.getElementById("video-"+srcNumber);
    }

    video.muted = true;
}
