const width = 700;
const height = 300;
const suelo = 200;
let imgRex, imgCloud, imgCactus, canvas, ctx;
let trex = {
  y: suelo,
  vy: 0, // Velocidad vertical
  gravedad: 2,
  salto: 28, // Pixeles que sube en total
  vymax: 9,
  saltando: false
};
let nivel = { velocidad: 9, marcador: 0, muerto: false}; 
let cactus = { x: width + 100, y: suelo - 25 };
let suelog = { x: 0, y: suelo + 30 };

document.addEventListener("keydown", function(ev) {
  if (ev.keyCode === 32) {
    // 32: Espacio
    if(!nivel.muerto){
      jump();
    } else {
      nivel.velocidad = 9;
      nivel.muerto = false;
      cactus.x = width + 100;
      nivel.marcador = 0;
    }
  }
});

function loadImages() {
  imgRex = new Image();
  imgCloud = new Image();
  imgCactus = new Image();

  imgRex.src = "./trex.jpg";
  imgCloud.src = "./cloud.png";
  imgCactus.src = "./cactus.png";
}

function start() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  loadImages();
}

function removeCanvas() {
  canvas.width = width;
  canvas.height = height;
}

function cactusLogic() {
  if (cactus.x < - 100) {
    cactus.x = width + 100;
    nivel.marcador++;
  } else {
    cactus.x -= nivel.velocidad;
  }
}

function floorLogic() {
  if(suelog.x > width ) {
    suelog.x = 0;
  } else {
    suelog.x += nivel.velocidad;
  }
}

function jump() {
  trex.saltando = true;
  trex.vy = trex.salto;
}

function gravity() {
  if(trex.saltando === true) {
    if(trex.y - (trex.vy - trex.gravedad) > suelo) {
      trex.saltando = false;
      trex.vy = 0;
      trex.y = suelo;
    } else {
      trex.vy -= trex.gravedad;
      trex.y -= trex.vy;
    }
  }
}

function drawRex() {
  /**
   * function drawImage
   * params {source image, x origin, y origin, image width, image height, x position, y position, width, height}
   **/
  ctx.drawImage(imgRex, 30, 0, 64, 69, 100, trex.y, 50, 50);
}

function drawCactus() {
  ctx.drawImage(imgCactus, 0, 0, 38, 75, cactus.x, cactus.y, 38, 75)
}

function drawFloor() {
  // ctx.drawImage(imgSuelo, suelog.x, 0, 700, 30, 0, suelog.y, 700 , 30);
}

function collision() {
  if(cactus.x >= 100 && cactus.x <= 150) {
    if(trex.y >= suelo - 25) {
      nivel.muerto = true;
      nivel.velocidad = 0;
    }
  }
}

function punctuation() {
  ctx.font = '30px impact';
  ctx.fillStyle = '#555';
  ctx.fillText (`${nivel.marcador}`, 600, 50);

  if(nivel.muerto){
    ctx.font = '60px impact';
    ctx.fillText('GAME OVER', 240, 150);
  }
}

const FPS = 50;
setInterval(function() {
  main();
}, 1000 / FPS);

function main() {
  removeCanvas();
  gravity();
  collision();
  cactusLogic();
  drawCactus();
  drawFloor();
  drawRex();
  punctuation();
}
