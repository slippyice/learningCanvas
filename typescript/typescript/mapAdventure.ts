
type layerMap = {
  data: string,
  rowLength: number,
  scale: number,
  textures: {
    [key: string]: any
  }
}
////////////SHOULD I add x and y location/position coords to the map constructor as the layers will move differently?
////////Should i make some paralax handler that does it instead
///////paralax calculated from base(single) pos coords and then offsetted
var layerMap = function (
    scale: number, 
    rowLength: number,
    data: string,
    textures:{[key: string]: any}
  ) {
  this.scale = scale;
  this.rowLength = rowLength;
  this.data = data;
  this.textures = textures;
}

const level0_layer1 = new layerMap(
  16,
  16,
  "0001110100001100000101000001110030030000000000002222222222222222",
  {
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
  }
);

const myboi_sprite = new layerMap(
  5,
  5,
  "0202021212022202000220002",
  {
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
  }
);


var mapAdventure = function (map: layerMap, sprites: layerMap) {
  ///debug junk
  let blockcoord = document.getElementById("coordS");
  let adventurecoord = document.getElementById("coordA");

  //setup canvas
  let canvas = document.getElementById("canAdventure");
  let context = canvas.getContext("2d");

  let width = canvas.width;
  let height = canvas.height;

  var imagedata = context.createImageData(width, height);

  //debug junk
  console.log(width/map[0].scale);//amount of blocks horizontal on screen
  console.log(height/map[0].scale);//amount of blocks vertical on screen
  console.log( (width/map[0].scale)*(height/map[0].scale)/map[0].data.length );//ratio of blocks to blocks able to fit on screen
  console.log(sprites);

  let redraw = function (dx: number, dy: number, sx: number, sy: number) {
    //draw map
    for (var i = 0; i < width*height*4; i=i+4) {
      //console.log( Math.floor(i/4/blockscale)%8 ); //x block coord!!!
      //console.log( Math.floor(i/4/width/blockscale) ); //y block coord!!!
      let bx =Math.floor( (i/4/map[0].scale)%(width/map[0].scale)+dx );
      let by =Math.floor(     (i/4/width/map[0].scale)+dy );
      if (i===0) {
        //console.log(bx+", "+by);
        blockcoord.innerHTML = bx+", "+ by;
      };
      let thispixel = map[0].textures[map[0].data.substr( (by*(map[0].rowLength))+(bx) , 1)](1+bx*(i/4%map[0].scale), 1+by*(i/4*(map[0].rowLength)), map[0].scale);
      imagedata.data[i+0] = thispixel[0];
      imagedata.data[i+1] = thispixel[1];
      imagedata.data[i+2] = thispixel[2];
      imagedata.data[i+3] = thispixel[3];
    }
    //draw sprite onto map
    adventurecoord.innerHTML = sx+", "+ sy;
    for (var j=0; j<sprites[0].scale*sprites[0].rowLength; j++) {
      let posOnScanLine = ( ((sx)+(j%sprites[0].rowLength))*4 + (width*4*(sy+Math.floor(j/sprites[0].rowLength))) );      
      let thispixel = sprites[0].textures[sprites[0].data.substr(j, 1)];
      if (thispixel == false) { continue;}
      imagedata.data[posOnScanLine+0] = thispixel[0];
      imagedata.data[posOnScanLine+1] = thispixel[1];
      imagedata.data[posOnScanLine+2] = thispixel[2];
      imagedata.data[posOnScanLine+3] = thispixel[3];
    }

    context.putImageData(imagedata, 0, 0);
  }
  redraw(0, 0, 0, 0);

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

