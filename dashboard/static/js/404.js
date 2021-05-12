'use strict';

var cnvs = document.querySelector('canvas');
var ctx = cnvs.getContext('2d');

function resize() {
  cnvs.width = innerWidth;
  cnvs.height = innerHeight;
}

var memes = [];
var cap = 250;
var hyper = false;

function hyperEnable() {
  hyper = true;
  cap = 1000;
  document.querySelector('#memeplane').style.animationName = 'fly-plane-extreme';
}

function hyperDisable() {
  hyper = false;
  cap = 250;
  document.querySelector('#memeplane').style.animationName = 'fly-plane';
}

function draw() {
  ctx.clearRect(0, 0, cnvs.width, cnvs.height);

  if (hyper) {
    let h = (Date.now() / 10) % 360;
    ctx.fillStyle = `hsla(${h}, 100%, 50%, 1)`;
  } else {
    ctx.fillStyle = '#7289DA'; // blurple
  }
  ctx.fillRect(0, 0, cnvs.width, cnvs.height);

  for (var i = 0; i < memes.length; i++) {
    let meme = memes[i];
    ctx.save();
    ctx.translate(meme.x, meme.y);
    ctx.drawImage(meme.image, meme.x, meme.y, meme.width, meme.height);
    ctx.restore();

    meme.y += meme.speed;
    meme.x -= meme.speed;
  }

  // remove sprites that fall off of the screen
  for (var i = memes.length - 1; i > 0; i--) {
    if (memes[i].y > innerHeight + memes[i].image.height) {
      memes.splice(i, 1);
    }
  }

  // draw again
  requestAnimationFrame(draw);
}

setInterval(function() {
  if (hyper) {
    for (var i = 0; i < 3; i++) {
      spawnMeme();
    }
  } else {
    spawnMeme();
  }
}, 8);

// resize the canvas
resize();
window.addEventListener('resize', function() {
  memes = [];
  resize();
});

var images = document.querySelectorAll('.images img');

function spawnMeme() {
  // cap at 200 sprites
  if (memes.length > cap) {
    return;
  }

  var far = Math.random();
  if (far > 0.35) far = 0.35;
  var img = images[Math.floor(Math.random() * images.length)];
  var x = Math.floor(Math.random() * innerWidth);
  var y = 0 - img.height * 2;

  memes.push({
    image: img,
    x: x, y: y,
    width: img.width * far,
    height: img.height * far,
    speed: img.width * far / 15,
    rot: Math.random() * 2
  });
}

// draw
draw();
requestAnimationFrame(draw);