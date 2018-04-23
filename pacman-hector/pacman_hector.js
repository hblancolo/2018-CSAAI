var canvasWidth = 560;
var canvasHeight = 620;
var sizeWall = [20,20];
var sizePacman = [18,18];
var sizeGhost = [18,18];
var wallColor = '#007ACC';
var foodColor = '#d9d9d9';
var points = 0;
var maze;
var alreadyTimingFruits = false;
var eatenFruits = 0;
var eatenFood = 0; // to check if the user has eaten everything
var gameState = ""; // to know if the game is paused or playing
var timer;
var seg_counter = 0;
var min_counter = 0;




function startGame() {
  var game = document.getElementById('game');
  var gameinit = document.getElementById('gameinit');
  gameinit.style.display = 'none';
  game.style.display = 'block';
  maze = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,5,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,5,1],
          [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
          [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
          [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
          [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
          [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
          [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
          [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
          [1,1,1,1,1,1,0,1,1,0,1,1,1,2,2,1,1,1,0,1,1,0,1,1,1,1,1,1],
          [1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1],
          [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
          [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
          [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
          [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
          [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
          [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
          [1,5,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,5,1],
          [1,0,0,0,1,1,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,1,1,0,0,0,1],
          [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
          [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
          [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
          [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
          [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
    myGameArea.start();
    myPacman = new pacman(sizePacman, "pacman.png", 270, 461);
    ghost1 = new ghost(sizeGhost, "blinky.png", 260, 260);
    ghost2 = new ghost(sizeGhost, "blunky.png", 280, 260);

    mainSong = new sound("Mirage.mp3");
    mainSong.sound.volume = 0.4;
    eatFruitSound = new sound("pacman_eatfruit.wav");
    mainSong.play();

    aplausosVideo = new video("aplausos.mp4");
    gameoverVideo = new video("game_over.mp4");


    // SETTING UP RECORDS STUFF
    if(typeof(Storage) !== "undefined") {
        if (localStorage.bestrecord == undefined) { // BEST RECORD
            localStorage.setItem("bestrecord", points);
        }
        if (sessionStorage.sessionrecord == undefined) { // TODAY'S BEST RECORD
            sessionStorage.setItem("sessionrecord", points);
        }
    } else {
        console.log("Sorry, your browser does not support web storage...");
    }
    document.getElementById('bestrecord').innerHTML = "Best Record: " + localStorage.bestrecord;
    document.getElementById('sessionrecord').innerHTML = "Session's Record: " + sessionStorage.sessionrecord;

}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.id = 'canvasito';
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        var div = document.getElementById("canvas-container");
        div.appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })

        startTimeWorker();
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// DRAG & DROP FUNCTIONALITIES
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("image");
    var image = document.getElementById(data);
    myPacman.image = image;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("image", ev.target.id);
}

// PLAY AND PAUSE THE GAME
function playGame() {
    if (gameState == "paused") {
        startTimeWorker();
        myGameArea.interval = setInterval(updateGameArea, 20);
        gameState = "";
    }
}

function pauseGame() {
    w.terminate();
    clearInterval(myGameArea.interval);
    gameState = "paused";
}



function paintMaze(maze,cubeSize,cubeColor,circleColor) {
    for (i=0; i<maze.length; i++) {
      for (j=0; j<maze[i].length; j++) {
        this.x = j*cubeSize[0];
        this.y = i*cubeSize[1];
        this.width = cubeSize[0];
        this.height = cubeSize[1];
        this.gamearea = myGameArea
        ctx = myGameArea.context;

        if (maze[i][j]==1) { // cubes
          ctx.fillStyle = cubeColor;
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if (maze[i][j]==0) { // small food
          ctx.beginPath();
          ctx.arc(this.x + 10, this.y + 10, 2, 0, 2 * Math.PI);
          ctx.fillStyle = foodColor;
          ctx.fill();
        }
        if (maze[i][j]==5) { // big food
          ctx.beginPath();
          ctx.arc(this.x + 10, this.y + 10, 5, 0, 2 * Math.PI);
          ctx.fillStyle = foodColor;
          ctx.fill();
        }
        if (maze[i][j]==3) { // fruits
            switch(eatenFruits){
              case 0:
                this.image = new Image();
                this.image.src = "cherry.png";
                break;
              case 1:
                this.image = new Image();
                this.image.src = "berry.png";
                break;
              case 2:
                this.image = new Image();
                this.image.src = "peach.png";
                break;
              default:
                /////
            }
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
      }
    }
}

function paintFruit(){
    if (maze[11][13] != 3 && !alreadyTimingFruits) {
        var randomNum = 0;
        randomNum = Math.floor((Math.random() * 10) + 1);

        setTimeout(function(){
            maze[11][13] = 3;
        }, randomNum*1000);

        alreadyTimingFruits = true;
    }

    if (maze[11][13] == 3){
        alreadyTimingFruits = false;
    }
}

function pacman(sizePacman, imagefile, x, y) {
    this.image = new Image();
    this.image.src = imagefile;
    this.gamearea = myGameArea;
    this.width = sizePacman[0];
    this.height = sizePacman[1];
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.lastDir = '';
    this.nextDir = '';

    this.update = function() {
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    this.move = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x<0) { // Control of Canvas limits (lateral corridors)
          this.x = this.gamearea.canvas.width ;
        }
        if(this.x > this.gamearea.canvas.width) {
          this.x = 0 ;
        }
    }

    this.stopMove = function() {
        this.speedX = 0;
        this.speedY = 0;
    }

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }

    this.eat = function(maze) {
        var crash = true;
        var center = [this.x + sizePacman[0]/2, this.y + sizePacman[1]/2];
        var centerIndexes = [Math.floor(center[0]/sizeWall[0]),
                              Math.floor(center[1]/sizeWall[0])];

        if (maze[centerIndexes[1]][centerIndexes[0]] == 0) { // eating a point
            maze[centerIndexes[1]][centerIndexes[0]] = 2; //2: value of empty
            points += 1;
            eatenFood += 1;
        }
        if (maze[centerIndexes[1]][centerIndexes[0]] == 5) { // eating a big point
            maze[centerIndexes[1]][centerIndexes[0]] = 2;
            points += 3;
            eatenFood += 1;
        }
        if (maze[centerIndexes[1]][centerIndexes[0]] == 3) { // eating a fruit
            maze[centerIndexes[1]][centerIndexes[0]] = 2;
            eatenFruits += 1;
            points += 20;
            eatFruitSound.play();
        }
    }
}

function ghost(sizeGhost, imagefile, x, y) {
    this.image = new Image();
    this.image.src = imagefile;
    this.gamearea = myGameArea;
    this.width = sizeGhost[0];
    this.height = sizeGhost[1];
    this.speedX = 0;
    this.speedY = -2;  // to force the ghost going up when starting the game
    this.x = x;
    this.y = y;
    this.lastDir = '';

    this.update = function() {
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    this.move = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x<0) { // Control of Canvas limits (lateral corridors)
          this.x = this.gamearea.canvas.width ;
        }
        if(this.x > this.gamearea.canvas.width) {
          this.x = 0 ;
        }
    }

    this.stopMove = function() {
        this.speedX = 0;
        this.speedY = 0;
    }

    this.recalcMove = function() {
      // Choosing a random direction
      var randomNum = 0;
      randomNum = Math.floor((Math.random() * 4) + 1); // random number between 1 and 4
      switch(randomNum){
        case 1: //Left
          this.lastDir = 'left';
          this.speedX += -2;
          break;
        case 2: //Right
          this.lastDir = 'right';
          this.speedX += 2;
          break;
        case 3: //Up
          this.lastDir = 'up';
          this.speedY += -2;
          break;
        case 4: //Down
          this.lastDir = 'down';
          this.speedY += 2;
          break;
        default:
          console.log("Impossible ghost direction");
      }
    }
}

// THIS FUNCTION DETECTS CRASHES OF OBJECTS vs WALLS
function crashWithWall(obj, maze) {
  var crash = true;
  var myleft = obj.x;
  var myright = obj.x + (obj.width);
  var mytop = obj.y;
  var mybottom = obj.y + (obj.height);
  var leftIndex = Math.floor(myleft/sizeWall[0]);
  var rightIndex = Math.floor(myright/sizeWall[0]);
  var topIndex = Math.floor(mytop/sizeWall[0]);
  var bottomIndex = Math.floor(mybottom/sizeWall[0]);
  if (maze[topIndex][leftIndex] !== 1 && maze[bottomIndex][leftIndex] !== 1 &&
      maze[topIndex][rightIndex] !== 1 && maze[bottomIndex][rightIndex] !== 1) {
      crash = false;
  }
  if (crash) {
    obj.speedX = 0;
    obj.speedY = 0;
    if (obj.lastDir == "left") {obj.x += 2;}
    if (obj.lastDir == "right") {obj.x += -2;}
    if (obj.lastDir == "up") {obj.y += 2;}
    if (obj.lastDir == "down") {obj.y += -2;}
    if (obj === ghost1 || obj === ghost2) {
      obj.recalcMove();
    }
  } else {
    keyHandler(myGameArea.key);
  }
}

//THIS FUNCTION CONTROLLS PACMAN MOVES WITH THE KEYBOARD
function keyHandler(keycode) {
  obj = myPacman;
  switch(keycode) {
    case 37:
//  obj.nextDir = 'left' // mirar lo de dirección actual y direccion siguiente
      obj.stopMove();
      obj.speedX = -2;
      obj.lastDir = 'left';
      break;
    case 39:
      obj.stopMove();
      obj.speedX = 2;
      obj.lastDir = 'right';
      break;
    case 38:
      obj.stopMove();
      obj.speedY = -2;
      obj.lastDir = 'up';
      break;
    case 40:
      obj.stopMove();
      obj.speedY = 2;
      obj.lastDir = 'down';
      break;
    /*case " ":
        //startGame();
        obj.stopMove();
        break;*/
    default:
      //console.log("Key not handled");
  }
}

function startTimeWorker() { // Web Worker for the timer
    if (typeof(Worker) !== "undefined") {
        w = new Worker("time_worker.js");

        w.postMessage([min_counter, seg_counter]);

        w.onmessage = function(event){
            min_counter = parseInt(event.data.split(":")[0]);
            seg_counter = parseInt(event.data.split(":")[1]);
            document.getElementById("timer").innerHTML = event.data;
        };
    } else {
        window.alert('Your browser do not support Web Workers.');
    }
}

function isTheGameFinished() {

    if (myPacman.crashWith(ghost1) || myPacman.crashWith(ghost2)) {
      gameFinished('ghost');
    }

    if (min_counter >= 10) {
      gameFinished('timeout');
    }

    if (eatenFood >= 297) {
        gameFinished('winner');
    }
}

function gameFinished(cause) {
  //myGameArea.stop();
  pointsRecord();
  w.terminate();
  clearInterval(myGameArea.interval);
  myPacman.stopMove();
  ghost1.stopMove();
  ghost2.stopMove();
  if (cause == 'ghost') {
      document.getElementById('notice').innerHTML = 'BUDDY, YOU DIED :(';
      aplausosVideo.video.style.display = "block";
      gameoverVideo.play();
  } else if (cause == 'timeout') {
      document.getElementById('notice').innerHTML = 'TIME RUN OUT :(';
      gameoverVideo.play();
  } else if (cause == 'winner') {
      var notice = document.getElementById('notice');
      notice.style.color = "green";
      notice.innerHTML = 'YOU WIN!!!!!';
      aplausosVideo.play();
  }

}

function pointsRecord() {
    if (points > localStorage.bestrecord) { // TO SET BEST RECORD, IF SO
        localStorage.bestrecord = points;
    }
    if (points > sessionStorage.sessionrecord) { // TO SET SESSION RECORD, IF SO
        sessionStorage.sessionrecord = points;
    }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

function video(src) {
    this.video = document.createElement("video");
    this.video.src = src;
    this.video.width = 320;
    this.video.height = 240;
    this.video.style.display = "none";
    document.body.appendChild(this.video);
    this.play = function() {
        this.video.play();
    }
    this.stop = function() {
        this.video.pause();
    }
}

function updateGameArea() {
  myGameArea.clear();
  paintMaze(maze,sizeWall,wallColor,foodColor);
  if (eatenFruits < 3) {
    paintFruit();
  }
  myPacman.eat(maze);
  document.getElementById('score').innerHTML = points;
  crashWithWall(myPacman,maze); //handles crashes between Pacman and Walls
  crashWithWall(ghost1,maze); //handles crashes between Ghosts and Walls
  crashWithWall(ghost2,maze);
  if ((ghost1.y+sizeGhost[1]) < 240) { // closing the DOOR by painting walls
    maze[12][13] = 1;
    maze[12][14] = 1;
  }
  myPacman.move();
  ghost1.move();
  ghost2.move();
  myPacman.update();
  ghost1.update();
  ghost2.update();

  isTheGameFinished();
}
