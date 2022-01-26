import { Viewport } from "./Viewport";

/*

*/
export class FrameBuffer
{
   width : number;      // framebuffer's width
   height: number;      // framebuffer's height
   pixel_buffer;   // contains each pixel's color data for a rendered frame
   bgColorFB : string;  // default background color
   vp : Viewport;       // default viewport

   /**
   
   */
   constructor(source:FrameBuffer|Viewport|undefined, w:number, h:number, c:string|undefined) {
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
      this.bgColorFB = c ?? '#000000';
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
   setBackgroundColorFB(c:string) {
      this.bgColorFB = c;
   }

   /**
   
   */
   clearFB(c:string|undefined) {
      if (c === undefined) c = this.bgColorFB;
      for (var y = 0; y < this.height; ++y) {
         for (var x = 0; x < this.width; ++x) {
            this.setPixelFB(x, y, c);
         }
      }
   }

   /**
   
   */
   getPixelFB(x:number, y:number) {
      const index = (y*this.width + x);
      try {
         return this.pixel_buffer[index];
      }
      catch(e) {
         console.log(`FrameBuffer: Bad pixel coordinate (${x},${y})`);
         return '#000000';
      }
   }

   /**
   
   */
   setPixelFB(x:number, y:number, c:string) {
      const index = (y*this.width + x);
      try {
         this.pixel_buffer[index] = c;
      }
      catch(e) {
         console.log(`FrameBuffer: Bad pixel coordinate (${x},${y})`);
      }
   }

   /**
   
   */
   convertRed2FB() {
      const red_fb = new FrameBuffer(undefined, this.width, this.height, undefined);
      red_fb.bgColorFB = this.bgColorFB;

      // Copy the framebuffer's red values into the new framebuffer's pixel buffer.
      for (var y = 0; y < this.height; ++y) {
         for (var x = 0; x < this.width; ++x) {
            const c = `#${this.bgColorFB.substring(0,2)}0000`;
            red_fb.setPixelFB(x, y, c);
         }
      }
      return red_fb;
   }

   /**
   
   */
   convertGreen2FB() {
      const green_fb = new FrameBuffer(undefined, this.width, this.height, undefined);
      green_fb.bgColorFB = this.bgColorFB;

      // Copy the framebuffer's green values into the new framebuffer's pixel buffer.
      for (var y = 0; y < this.height; ++y) {
         for (var x = 0; x < this.width; ++x) {
            const c = `#00${this.bgColorFB.substring(2,4)}00`;
            green_fb.setPixelFB(x, y, c);
         }
      }
      return green_fb;
   }

   /**
   
   */
   convertBlue2FB() {
      const blue_fb = new FrameBuffer(undefined, this.width, this.height, undefined);
      blue_fb.bgColorFB = this.bgColorFB;

      // Copy the framebuffer's blue values into the new framebuffer's pixel buffer.
      for (var y = 0; y < this.height; ++y) {
         for (var x = 0; x < this.width; ++x) {
            const c = `#0000${this.bgColorFB.substring(0,2)}`;
            blue_fb.setPixelFB(x, y, c);
         }
      }
      return blue_fb;
   }

   /**
   
   */
   toString() {
      var result = `FrameBuffer [w="${this.width}, h=${this.height}]\n`;
      for (var j = 0; j < this.width; ++j) {
         result += " r   g   b |";
      }
      result += "\n";
      for (var i = 0; i < this.height; ++i) {
         for (var j = 0; j < this.width; ++j) {
            const c = this.pixel_buffer[(i*this.width) + j];
            result += `#${c.substring(0,2)} ${c.substring(2,4)} ${c.substring(4,6)}`;
         }
         result += "\n";
      }
      return result;
   }
}//FrameBuffer