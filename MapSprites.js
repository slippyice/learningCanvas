var babymap = "0001110100001100000101000001110030030000000000002222222222222222";
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

var myboi = "0111120222110112220211110";
var yesboi = "0202021212022202000220002";
var boipx = 5;
var bois = {
  "0": false,
  "1": [
    0,
    0,
    0,
    255
    ]
  ,
  "2": [
    255,
    255,
    255,
    255
    ]
};

var mapSprite = function (map) {
  let blockcoord = document.getElementById("blockcoordS");

  let canvas = document.getElementById("canSprite");
  let context = canvas.getContext("2d");

  let width = canvas.width;
  let height = canvas.height;

  console.log(width/blockscale);//amount of blocks horizontal on screen
  console.log(height/blockscale);//amount of blocks vertical on screen
  console.log( (width/blockscale)*(height/blockscale)/babymap.length );//ratio of blocks to blocks able to fit on screen

  var imagedata = context.createImageData(width, height);
  let redraw = function (dx, dy) {
    //draw map
    for (var i = 0; i < width*height*4; i=i+4) {
      //console.log( Math.floor(i/4/blockscale)%8 ); //x block coord!!!
      //console.log( Math.floor(i/4/width/blockscale) ); //y block coord!!!
      let bx =Math.floor( (i/4/blockscale)%(width/blockscale)+dx );
      let by =Math.floor(     (i/4/width/blockscale)+dy );
      if (i===0) {
        //console.log(bx+", "+by);
        blockcoord.innerHTML = bx+", "+ by;
      };
      let thispixel = blocks[babymap.substr( (by*(blockrow))+(bx) , 1)](1+bx*(i/4%blockscale), 1+by*(i/4*(blockrow)), blockscale);
      imagedata.data[i+0] = thispixel[0];
      imagedata.data[i+1] = thispixel[1];
      imagedata.data[i+2] = thispixel[2];
      imagedata.data[i+3] = thispixel[3];
    }
    //draw sprite onto map
    let spritex = 22;
    let spritey = 17;
    for (var j=0; j<boipx*boipx; j++) {
      //console.log(Math.floor(j/boipx)+" "+myboi.substr(j, 1)+" "+myboi.substr(j, 1));
      let posOnScanLine = ( ((spritex)+(j%boipx))*4 + (width*4*(spritey+Math.floor(j/boipx))) );
      //console.log(posOnScanLine);      
      let thispixel = bois[myboi.substr(j, 1)];
      //console.log(thispixel);
      if (thispixel == false) {/*console.log("continue "+j);*/ continue;}
      //console.log(thispixel[1]);
      imagedata.data[posOnScanLine+0] = thispixel[0];
      imagedata.data[posOnScanLine+1] = thispixel[1];
      imagedata.data[posOnScanLine+2] = thispixel[2];
      imagedata.data[posOnScanLine+3] = thispixel[3];
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
      case "ArrowUp":
        dy=dy-0.1;
        break;
      case "ArrowDown":
        dy=dy+0.1;
        break;
      default:
        return;
    }
    redraw (dx, dy);
  });
};

var mapAdventure = function (map) {
  let blockcoord = document.getElementById("coordS");
  let adventurecoord = document.getElementById("coordA");

  let canvas = document.getElementById("canAdventure");
  let context = canvas.getContext("2d");

  let width = canvas.width;
  let height = canvas.height;

  console.log(width/blockscale);//amount of blocks horizontal on screen
  console.log(height/blockscale);//amount of blocks vertical on screen
  console.log( (width/blockscale)*(height/blockscale)/babymap.length );//ratio of blocks to blocks able to fit on screen

  var imagedata = context.createImageData(width, height);
  let redraw = function (dx, dy, sx, sy) {
    //draw map
    for (var i = 0; i < width*height*4; i=i+4) {
      //console.log( Math.floor(i/4/blockscale)%8 ); //x block coord!!!
      //console.log( Math.floor(i/4/width/blockscale) ); //y block coord!!!
      let bx =Math.floor( (i/4/blockscale)%(width/blockscale)+dx );
      let by =Math.floor(     (i/4/width/blockscale)+dy );
      if (i===0) {
        //console.log(bx+", "+by);
        blockcoord.innerHTML = bx+", "+ by;
      };
      let thispixel = blocks[babymap.substr( (by*(blockrow))+(bx) , 1)](1+bx*(i/4%blockscale), 1+by*(i/4*(blockrow)), blockscale);
      imagedata.data[i+0] = thispixel[0];
      imagedata.data[i+1] = thispixel[1];
      imagedata.data[i+2] = thispixel[2];
      imagedata.data[i+3] = thispixel[3];
    }
    //draw sprite onto map
    adventurecoord.innerHTML = sx+", "+ sy;
    for (var j=0; j<boipx*boipx; j++) {
      let posOnScanLine = ( ((sx)+(j%boipx))*4 + (width*4*(sy+Math.floor(j/boipx))) );      
      let thispixel = bois[yesboi.substr(j, 1)];
      if (thispixel == false) { continue;}
      imagedata.data[posOnScanLine+0] = thispixel[0];
      imagedata.data[posOnScanLine+1] = thispixel[1];
      imagedata.data[posOnScanLine+2] = thispixel[2];
      imagedata.data[posOnScanLine+3] = thispixel[3];
    }

    context.putImageData(imagedata, 0, 0);
  }
  redraw(0, 0);

  let dx = 0;
  let dy = 0;
  let sx = 0;
  let sy = 0;

  let sScale = 1;
  let dScale = 0.1;

  window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) { return; }

    //console.log(event.key);
    switch (event.key) {
      case "ArrowLeft":
        dx=dx-dScale;
        break;
      case "ArrowRight":
        dx=dx+dScale;
        break;
      case "ArrowUp":
        dy=dy-dScale;
        break;
      case "ArrowDown":
        dy=dy+dScale;
        break;
      case "a":
        sx=sx-sScale;
        break;
      case "d":
        sx=sx+sScale;
        break;
      case "w":
        sy=sy-sScale;
        break;
      case "s":
        sy=sy+sScale;
        break;
      default:
        return;
    }
    redraw (dx, dy, sx, sy);
  });
};

