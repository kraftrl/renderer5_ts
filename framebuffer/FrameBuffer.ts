import { Color } from "../color/Color.js";
import { Viewport } from "../framebuffer/Viewport.js";

/*

*/
export class FrameBuffer
{
   width : number;      // framebuffer's width
   height: number;      // framebuffer's height
   pixel_buffer;   // contains each pixel's color data for a rendered frame
   bgColorFB : Uint8ClampedArray;  // default background color
   vp : Viewport;       // default viewport

   /**
   
   */
   constructor(source:FrameBuffer|Viewport|undefined, w:number, h:number, c:Uint8ClampedArray) {
      if (source instanceof FrameBuffer) {
         this.width  = source.getWidthFB();
         this.height = source.getHeightFB();

         // Create the pixel buffer.
         this.pixel_buffer = new Array(this.width * this.height);

         // Read pixel data, one pixel at a time, from the source FrameBuffer.
         for (var y = 0; y < this.height; ++y) {
            for (var x = 0; x < this.width; ++x) {
               this.setPixelFB(x, y, source.getPixelFB(x,y));
            }
         }
      } else if (source instanceof Viewport) {
         this.width  = source.getWidthVP();
         this.height = source.getHeightVP();

         // Create the pixel buffer.
         this.pixel_buffer = new Array(this.width * this.height);

         // Read pixel data, one pixel at a time, from the source Viewport.
         for (var y = 0; y < this.height; ++y) {
            for (var x = 0; x < this.width; ++x) {
               this.setPixelFB(x, y, source.getPixelVP(x,y));
            }
         }
      } else {
         this.width  = w;
         this.height = h;

         // Create the pixel buffer
         this.pixel_buffer = new Array(this.width * this.height);
      }

      // Initialize the pixel buffer.
      this.bgColorFB = c ?? Color.Black;
      this.clearFB(c);

      // Create the default viewport.
      this.vp = new Viewport(this, undefined, undefined, 0, 0, undefined, undefined);
   }

   /**
   
   */
   getWidthFB() {
      return this.width;
   }

   /**
   
   */
   getHeightFB() {
      return this.height;
   }

   /**
   
   */
   getViewport() {
      return this.vp;
   }

   /**
   
   */
   setViewport(vp_ul_x:number, vp_ul_y:number, width:number, height:number) {
      this.vp.setViewport(vp_ul_x ?? 0, vp_ul_y ?? 0, width ?? this.width, height ?? this.height);
   }

   /**
   
   */
   getBackgroundColorFB() {
      return this.bgColorFB;
   }

   /**
    
   */
   setBackgroundColorFB(c:Uint8ClampedArray) {
      this.bgColorFB = c;
   }

   /**
   
   */
   clearFB(c:Color|undefined) {
      if (c == undefined) c = this.bgColorFB;
      for (var y = 0; y < this.height; ++y) {
         for (var x = 0; x < this.width; ++x) {
            this.setPixelFB(x, y, c);
         }
      }
   }

   /**
   
   */
   getPixelFB(x: number, y: number) {
      const index = y * (this.width * 4) + (4 * x);
      if (index < this.pixel_buffer.length) {
            return new Uint8ClampedArray([this.pixel_buffer[index], this.pixel_buffer[index + 1], this.pixel_buffer[index + 2], this.pixel_buffer[index + 3]]);
      }
      else {
         console.log('FrameBuffer: Bad pixel coordinate (' + x + ', ' + y + ')');
         return new Uint8ClampedArray([255, 255, 255, 255]);
      }
  }

   /**
   
   */
    setPixelFB(x: number, y: number, c: Uint8ClampedArray) {
      //const index = y * this.width + x;
      const index = y * (4 * this.width) + (4 * x);
      if (index < this.pixel_buffer.length) {
          this.pixel_buffer[index] = c[0];
          this.pixel_buffer[index + 1] = c[1];
          this.pixel_buffer[index + 2] = c[2];
          this.pixel_buffer[index + 3] = c[3];
          //return new Uint8ClampedArray([this.pixel_buffer[index], this.pixel_buffer[index + 1], this.pixel_buffer[index + 2], this.pixel_buffer[index + 3]]);
      }
      else {
          console.log('FrameBuffer: Bad pixel coordinate (' + x + ', ' + y + ')');
          //return new Uint8ClampedArray([255, 255, 255, 255]);
      }
  }

   /**
   
   */
    convertRed2FB() {
      const red_fb: FrameBuffer = new FrameBuffer(undefined, this.width, this.height, this.bgColorFB);
      for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
              const c: Uint8ClampedArray = new Uint8ClampedArray([this.getPixelFB(x, y)[0], 0, 0, 0]);
              red_fb.setPixelFB(x, y, c);
          }
      }
      return red_fb;
  }

   /**
   
   */
    convertGreen2FB() {
      const green_fb: FrameBuffer = new FrameBuffer(undefined, this.width, this.height, this.bgColorFB);
      for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
              const c: Uint8ClampedArray = new Uint8ClampedArray([0, this.getPixelFB(x, y)[0], 0, 0]);
              green_fb.setPixelFB(x, y, c);
          }
      }
      return green_fb;
  }

   /**
   
   */
    convertBlue2FB() {
      const blue_fb: FrameBuffer = new FrameBuffer(undefined, this.width, this.height, this.bgColorFB);
      for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
              const c: Uint8ClampedArray = new Uint8ClampedArray([0, 0, this.getPixelFB(x, y)[0], 0]);
              blue_fb.setPixelFB(x, y, c);
          }
      }
      return blue_fb;
  }

   /**
   
   */
    toString() {
      let result = "FrameBuffer [w = " + this.width + ", h = " + this.height + "]\n";
      for (var j = 0; j < this.height; ++j) {
          for (var i = 0; i < this.width; ++i) {
              result += this.getPixelFB(i, j)[0] + " " + this.getPixelFB(i, j)[1] + " " + this.getPixelFB(i, j)[2] + " " + this.getPixelFB(i, j)[3] + " | ";
          }
          result += "\n";
      }
      return result;
  }
}//FrameBuffer