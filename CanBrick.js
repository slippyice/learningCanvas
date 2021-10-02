var babymap = "000101000001110030030000000000002222222222222222";
var blockrow = 16;
var blockscale = 16;

var blocks = {
  "0": function (x, y) {
    return [
    ((x+y)%8)*10,
    ((x+y)%8)*10,
    ((x+y)%8)*10,
    255
    ];
  },
  "1": function () {
    return [
    255,
    255,
    255,
    255
    ];
  },
  "2": function (x, y, s) {
    return [
    (x+y/4)%255,//(200*x*y)%255,
    (y/4)%255,
    (50+x)%255,
    255
    ];
  },
  "3": function () {
    return [
    128,
    255,
    128,
    255
    ];
  }
};

var mapdraw = function (map) {
  let canvas = document.getElementById("canMap");
  let context = canvas.getContext("2d");

  let width = canvas.width;
  let height = canvas.height;

  console.log(width/blockscale);
  console.log(height/blockscale);
  console.log( (width/blockscale)*(height/blockscale)/babymap.length );

  var imagedata = context.createImageData(width, height);
  for (var i = 0; i < width*height*4; i=i+4) {
    //console.log(Math.floor( i/(blockscale*4) )%(width*4/blockscale) );
    //console.log( (i%(width*4))%(blockscale*4) );

    //console.log( Math.floor(i/4/blockscale)%8 ); //x block coord!!!
    //console.log( Math.floor(i/4/width/blockscale) ); //y block coord!!!
    let bx = Math.floor(i/4/blockscale)%(width/blockscale);
    let by = Math.floor(i/4/width/blockscale);
    //console.log(bx+", "+ by);
    let thispixel = blocks[babymap.substr( ( (by*(width/blockscale))+(bx) ) , 1)](1+bx*(i/4%blockscale), 1+by*(i/4*(width/blockscale)), blockscale);
    imagedata.data[i+0] = thispixel[0];
    imagedata.data[i+1] = thispixel[1];
    imagedata.data[i+2] = thispixel[2];
    imagedata.data[i+3] = thispixel[3];
    
  }
  context.putImageData(imagedata, 0, 0);

};

var navdraw = function (map) {
  let blockcoord = document.getElementById("blockcoord");

  let canvas = document.getElementById("canNavMap");
  let context = canvas.getContext("2d");

  let width = canvas.width;
  let height = canvas.height;

  console.log(width/blockscale);//amount of blocks horizontal on screen
  console.log(height/blockscale);//amount of blocks vertical on screen
  console.log( (width/blockscale)*(height/blockscale)/babymap.length );//ratio of blocks to blocks able to fit on screen

  var imagedata = context.createImageData(width, height);
  let redraw = function (dx, dy) {
  for (var i = 0; i < width*height*4; i=i+4) {
    //console.log( Math.floor(i/4/blockscale)%8 ); //x block coord!!!
    //console.log( Math.floor(i/4/width/blockscale) ); //y block coord!!!
    let bx = Math.floor(i/4/blockscale)%(width/blockscale)+dx;
    let by = Math.floor(i/4/width/blockscale)+dy;
    if (i===0) {
      blockcoord.innerHTML = bx+", "+ by;
    };
    let thispixel = blocks[babymap.substr( (by*(blockrow))+(bx) , 1)](1+bx*(i/4%blockscale), 1+by*(i/4*(blockrow)), blockscale);
    imagedata.data[i+0] = thispixel[0];
    imagedata.data[i+1] = thispixel[1];
    imagedata.data[i+2] = thispixel[2];
    imagedata.data[i+3] = thispixel[3];
    
  }
  context.putImageData(imagedata, 0, 0);
  }
  redraw(0, 0);

  let dx = 0;
  let dy = 0;

  window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) { return; }

    //console.log(event.key);
    switch (event.key) {
      case "ArrowLeft":
        dx=dx-0.1;
        break;
      case "ArrowRight":
        dx=dx+0.1;
        break;
      default:
        return;
    }
    redraw (dx, dy);
  });
};

