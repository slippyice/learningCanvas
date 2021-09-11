console.log("yo");

var push = function () {
  let canvas = document.getElementById("canVC");
  let context = canvas.getContext("2d");

  let width = canvas.width;
  let height = canvas.height;

  console.log(width);
  console.log(height);
  var imagedata = context.createImageData(width, height);
  for (var i = 0; i < 128*128*128; i=i+4) {
    imagedata.data[i+0] = (i/64)%255;
    imagedata.data[i+1] = 74;
    imagedata.data[i+2] = i%255;
    imagedata.data[i+3] = ((Math.pow(i, 2))/128)%255;
  }
  imagedata.data[0] = 255;
  imagedata.data[1] = 122;
  imagedata.data[2] = 11;
  imagedata.data[3] = 255;
  imagedata.data[10] = 255;
  imagedata.data[11] = 122;
  imagedata.data[12] = 11;
  imagedata.data[13] = 255;
  imagedata.data[20] = 255;
  imagedata.data[21] = 122;
  imagedata.data[22] = 11;
  imagedata.data[23] = 255;
  context.putImageData(imagedata, 0, 0)
}

var static = function () {
  let canvas = document.getElementById("canStatic");
  let context = canvas.getContext("2d");

  let width = canvas.width;
  let height = canvas.height;

  console.log(width);
  console.log(height);
  var imagedata = context.createImageData(width, height);
  for (var i = 0; i < 128*128*128; i=i+4) {
    imagedata.data[i+0] = i%255;
    imagedata.data[i+1] = i/2%255;
    imagedata.data[i+2] = ((Math.pow(i, 2))/1024)%255;
    imagedata.data[i+3] = ((Math.pow(i, 2))/1024)%255;
  }
  context.putImageData(imagedata, 0, 0)
}

var big = function () {
  let canvas = document.getElementById("canBig");
  let context = canvas.getContext("2d");

  let width = 256;
  let height = 256;

  console.log(width);
  console.log(height);
  var imagedata = context.createImageData(width, height);
  for (var i = 0; i < width*height*4; i=i+4) {
    imagedata.data[i+0] = i%255;
    imagedata.data[i+1] = i/2%255;
    imagedata.data[i+2] = ((Math.pow(i, 2))/1024)%255;
    imagedata.data[i+3] = ((Math.pow(i, 2))/1024)%255;
  }
  context.putImageData(imagedata, 120, 50)
}
var small = function () {
  let canvas = document.getElementById("canBig");
  let context = canvas.getContext("2d");

  let width = 16;
  let height = 16;

  var imagedata = context.createImageData(width, height);
  for (var i = 0; i < width*height*4; i=i+4) {
    imagedata.data[i+0] = i%width;
    imagedata.data[i+1] = i/2%height;
    imagedata.data[i+2] = ((Math.pow(i, 2)))%255;
    imagedata.data[i+3] = ((Math.pow(i, 2))/1024)%255;
  }
  let boi = function (x, y) {
    context.putImageData(imagedata, x, y);
    boi(x+(Math.floor(Math.random() * 3))-1,y+(Math.floor(Math.random() * 3))-1)
  }
  boi(300,300);
}
var ani = function () {
  let canvas = document.getElementById("canBig");
  let context = canvas.getContext("2d");

  let width = 16;
  let height = 16;

  var imagedata = context.createImageData(width, height);
  
  let oof = function (x,y) {
    for (var i = 0; i < width*height*4; i=i+4) {
      imagedata.data[i+0] = (x+i*32)%255;
      imagedata.data[i+1] = (y+i*32)%255;
      imagedata.data[i+2] = (x+y)%255;
      imagedata.data[i+3] = 128;
    }
    context.putImageData(imagedata, x, y);
  }
  let lx = 300;
  let ly = 300;
  oofs = setInterval(() => {
    oof(lx, ly);
    lx = lx+(Math.floor(Math.random() * 3))-1;
    ly = ly+(Math.floor(Math.random() * 3))-1;
  }, 1);
}
var kill = function () {
  clearInterval(oofs);
}