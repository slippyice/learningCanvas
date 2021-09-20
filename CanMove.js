//'use strict';
console.log("bruh");

var move = function () {
  let canvas = document.getElementById("canMove");
  let context = canvas.getContext("2d");

  let width = 16;
  let height = 16;

  var imagedata = context.createImageData(width, height);
  
  let meece = function (x,y) {
    for (var i = 0; i < width*height*4; i=i+4) {
      imagedata.data[i+0] = (x+i*32)%255;
      imagedata.data[i+1] = (y+i*32)%255;
      imagedata.data[i+2] = (x+y)%255;
      imagedata.data[i+3] = 128;
    }
    context.putImageData(imagedata, x, y);
  };

  let lx = 300;
  let ly = 300;
  let dx = 0;
  let dy = 0;
  let speed = 1;
  window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) { return; }

    //console.log(event.key);
    switch (event.key) {
      case "ArrowDown":
        dy = speed;
        break;
      case "ArrowUp":
        dy = -speed;
        break;
      case "ArrowLeft":
        dx = -speed;
        break;
      case "ArrowRight":
        dx = speed;
        break;
      default:
        return;
    } 
  });

  moose = setInterval(() => {
    lx = lx+dx;
    ly = ly+dy;
    meece(lx,ly);
    
  }, 10);
};


var moveFresh = function () {
  console.log("sups");
  let canvas = document.getElementById("canRefresh");
  let context = canvas.getContext("2d");

  let width = 16;
  let height = 16;

  let maxWidth = canvas.width;
  let maxHeight = canvas.height;

  var imagedata = context.createImageData(width, height);
  var backimgdata = context.createImageData(maxWidth, maxHeight);
  
  let meeces = function (x,y) {
    for (var i = 0; i < width*height*4; i=i+4) {
      imagedata.data[i+0] = (x+i*32)%255;
      imagedata.data[i+1] = (y+i*32)%255;
      imagedata.data[i+2] = (x+y)%255;
      imagedata.data[i+3] = 128;
    }
    for (var j = 0; j < maxWidth*maxHeight*4; j=j+4) {
      backimgdata.data[j+0] = 255;
      backimgdata.data[j+1] = 255;
      backimgdata.data[j+2] = 255;
      backimgdata.data[j+3] = 255;
    }
    context.putImageData(backimgdata, 0, 0);
    context.putImageData(imagedata, x, y);
  };

  let lx = Math.floor(maxWidth/2);
  let ly = Math.floor(maxHeight/2);
  let dx = 0;
  let dy = 0;
  let speed = 1;
  window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) { return; }

    //console.log(event.key);
    switch (event.key) {
      case "ArrowDown":
        dy = speed;
        break;
      case "ArrowUp":
        dy = -speed;
        break;
      case "ArrowLeft":
        dx = -speed;
        break;
      case "ArrowRight":
        dx = speed;
        break;
      default:
        return;
    } 
  });
  window.addEventListener("keyup", function (event) {
    if (event.defaultPrevented) { return; }

    //console.log(event.key);
    switch (event.key) {
      case "ArrowDown":
        dy = 0;
        break;
      case "ArrowUp":
        dy = 0;
        break;
      case "ArrowLeft":
        dx = 0;
        break;
      case "ArrowRight":
        dx = 0;
        break;
      default:
        return;
    } 
  });

  mooses = setInterval(() => {
    if ( (lx+dx>0)&&(lx+dx<maxWidth) ) {lx = lx+dx;};
    if ( (ly+dy>0)&&(ly+dy<maxHeight) ) {ly = ly+dy;};
    meeces(lx,ly);
    
  }, 10);
};


