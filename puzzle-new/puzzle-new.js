const PUZZLE_DIFFICULTY = 3;

var canvas;
var context;

var img;
var pieces;
var puzzleWidth;
var puzzleHeight;
var pieceWidth;
var pieceHeight;
var currentPiece;
var currentDropPiece;
var blankPiece
var numMovs;
var timer;
var seg_counter;
var min_counter;
var userName = "";



function insertName(){
    var form = document.getElementById('name-form');
    userName = form.elements[0].value;

    init('images/bike.jpg');

}

function init(image_path) {
    document.getElementById('carousel').style.display = 'block'
    document.getElementById('insert-name').style.display = 'none'
    document.getElementById('notice').innerHTML = ""

    img = new Image();
    img.addEventListener('load',onImage,false);
    img.src = image_path;

    // set up the initial time for the timer
    seg_counter = 0;
    min_counter = 0;

    numMovs = 0;

    if (getCookie(userName) == ""){
        setCookie(userName, '1000,1000', 1);
    }
}

function onImage(e){
    pieceWidth = Math.floor(img.width / PUZZLE_DIFFICULTY)
    pieceHeight = Math.floor(img.height / PUZZLE_DIFFICULTY)
    puzzleWidth = pieceWidth * PUZZLE_DIFFICULTY;
    puzzleHeight = pieceHeight * PUZZLE_DIFFICULTY;
    setCanvas();
    initPuzzle();
}

function setCanvas(){
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    canvas.width = puzzleWidth;
    canvas.height = puzzleHeight;
    canvas.style.border = "1px solid black";
}

function initPuzzle(){
    pieces = [];
    mouse = {x:0,y:0};
    currentPiece = null;
    currentDropPiece = null;
    context.drawImage(img, 0, 0, puzzleWidth, puzzleHeight, 0, 0, puzzleWidth, puzzleHeight);
    createTitle("Click to Start Puzzle");
    buildPieces();
}

function createTitle(msg){
    context.fillStyle = "#000000";
    context.globalAlpha = .4;
    context.fillRect(100,puzzleHeight - 40,puzzleWidth - 200,40);
    context.fillStyle = "#FFFFFF";
    context.globalAlpha = 1;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(msg,puzzleWidth / 2,puzzleHeight - 20);
}

function buildPieces(){
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    var randomPosBlank = Math.floor(Math.random() * Math.pow(PUZZLE_DIFFICULTY,2));
    for(i = 0;i < Math.pow(PUZZLE_DIFFICULTY,2);i++){
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        piece.blank = false;
        if (i == randomPosBlank){
            piece.blank = true;
        }
        pieces.push(piece);
        xPos += pieceWidth;
        if(xPos >= puzzleWidth){
            xPos = 0;
            yPos += pieceHeight;
        }
    }
    document.onmousedown = shufflePuzzle;
}

function shufflePuzzle(){
    pieces = shuffleArray(pieces);

    paintPuzzle();

    timeToSolve(); // INIT THE TIMER

    document.onmousedown = null;
    canvas.addEventListener('mousedown',onPuzzleClick,false);
}

function shuffleArray(array){
    for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
}

function paintPuzzle(){
    context.clearRect(0,0,puzzleWidth,puzzleHeight); // clear the canvas
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0;i < pieces.length;i++){ // this loop paints the pieces of the shuffled array
        piece = pieces[i];
        piece.xPos = xPos;
        piece.yPos = yPos;

        if (piece.blank){
            blankPiece = piece; // here I save wich one is the blank to use it when swapping
            context.rect(xPos, yPos, pieceWidth,pieceHeight)
        } else {
            context.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight,
                                xPos, yPos, pieceWidth, pieceHeight);
            context.strokeRect(xPos, yPos, pieceWidth,pieceHeight); // draw rectangle around piece
        }
        xPos += pieceWidth;
        if(xPos >= puzzleWidth){
            xPos = 0;
            yPos += pieceHeight;
        }
    }
}

function onPuzzleClick(event) {
    var closeToBlank = false;
    var z = 1;
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;
    mouse.x = canvasX;
    mouse.y = canvasY;
    currentPiece = checkPieceClicked();
    closeToBlank = checkCloseToBlank(currentPiece);
    if (currentPiece != null & !currentPiece.blank & closeToBlank){
        swapPieces(currentPiece);
        isPuzzleDone(); //after the swap we check if all the positions are the original ones
    }
}

function checkPieceClicked(){
    var i;
    var piece;
    for(i = 0;i < pieces.length;i++){
        piece = pieces[i];
        if(mouse.x < piece.xPos || mouse.x > (piece.xPos + pieceWidth) ||
            mouse.y < piece.yPos || mouse.y > (piece.yPos + pieceHeight)){
            //PIECE NOT HIT
        } else {
            return piece;
        }
    }
    return null;
}

function checkCloseToBlank(piece){
    var adjacentPiece = {};
    var adjPieces = [];
    adjacentPiece.xPos = piece.xPos + pieceWidth;
    adjacentPiece.yPos = piece.yPos;
    adjPieces.push(adjacentPiece);
    adjacentPiece = {};
    adjacentPiece.xPos = piece.xPos;
    adjacentPiece.yPos = piece.yPos + pieceHeight;
    adjPieces.push(adjacentPiece);
    adjacentPiece = {};
    adjacentPiece.xPos = piece.xPos - pieceWidth;
    adjacentPiece.yPos = piece.yPos;
    adjPieces.push(adjacentPiece);
    adjacentPiece = {};
    adjacentPiece.xPos = piece.xPos;
    adjacentPiece.yPos = piece.yPos - pieceHeight;
    adjPieces.push(adjacentPiece);

    for (var i = 0;i < adjPieces.length;i++){
        var adjPiece = adjPieces[i];
        var piece_to_check = pieces.find(o => o.xPos === adjPiece.xPos && o.yPos === adjPiece.yPos);
        if (piece_to_check != undefined && piece_to_check.blank){
            return true;
        }
    }
    return false;
}

function swapPieces(currentPiece){
    var indexOfBlank = pieces.indexOf(blankPiece);
    var indexOfPiece = pieces.indexOf(currentPiece);
    var pieceBlank = pieces[indexOfBlank];
    var pieceNormal = pieces[indexOfPiece];

    pieces[indexOfBlank] = pieceNormal;
    pieces[indexOfPiece] = pieceBlank;

    paintPuzzle();
}

function isPuzzleDone(){
    var isRecord = false;
    var numPiecesOK = 0;
    numMovs += 1;
    for (var i = 0;i < pieces.length;i++){
        var piece = pieces[i];
        if (piece.sx == piece.xPos && piece.sy == piece.yPos){
            numPiecesOK += 1;
        }
    }

    var lastRecord = getCookie(userName);
    var lastMin = Number(lastRecord.split(",")[0]);
    var lastSeg = Number(lastRecord.split(",")[1]);



    if (numPiecesOK == Math.pow(PUZZLE_DIFFICULTY,2)){ // if all the piece are in their place
        if (min_counter <= lastMin && seg_counter <= lastSeg){
            isRecord = true;
            setCookie(userName, String(min_counter)+','+String(seg_counter), 1);
        }

        showModal(isRecord)
        clearInterval(timer);
        canvas.removeEventListener('mousedown',onPuzzleClick,false);
    }
}

function timeToSolve(){
    timer = setInterval(
        function(){
            if (seg_counter == 60){
                seg_counter = 0;
                min_counter++;

                if (min_counter == 60){
                    min_counter = 0;
                }
            }
            seg_counter++;
        }
        ,1000);
}

function showModal(isRecord){ //displays a modal when the user wins!
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    var text = document.getElementById('notice');

    modal.style.display = "block";

    if (isRecord){
        text.innerHTML = ("NEW RECOOOOORD! " + userName +" you have used: " +
            numMovs + " moves." + "You spent: " + min_counter + " min and " +
            seg_counter + " seconds.");
    } else {
        text.innerHTML = ("WELL DONE! you have used: " +
            numMovs + " moves." + "You spent: " + min_counter + " min and " +
            seg_counter + " seconds.");
    }


// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
