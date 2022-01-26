import { Viewport } from './Viewport.js';

/**
    A {@code FrameBuffer} represents a two-dimensional array of pixel data.
    The pixel data is stored as a one dimensional array in row-major order.
    The first row of data should be displayed as the top row of pixels
    in the image.
<p>
    A {@link Viewport} is a two-dimensional sub array of a {@code FrameBuffer}.
<p>
    A {@code FrameBuffer} has a default {@link Viewport}. The current {@link Viewport}
    is represented by its upper-left-hand corner and its lower-right-hand
    corner.
<p>
    {@code FrameBuffer} and {@link Viewport} coordinates act like 
    Java coordinates; the positive x direction is
    to the right and the positive y direction is downward.
*/
export class FrameBuffer
{
    static width;  // framebuffer's width
    static height; // framebuffer's height
    static pixel_buffer = []; // contains each pixel's color data for a rendered frame
    static bgColorFB = '#000000';        // default background color
    static vp =  new Viewport(this);             // default viewport

    /**
        Construct a {@link FrameBuffer} with the given dimensions.
    <p>
        Initialize the {@link FrameBuffer} to the given color.
    <p>
        The default {@link Viewport} is the whole {@link FrameBuffer}.

        @param source source {@link FrameBuffer} or {@link Viewport}.
        @param w  width of the {@code FrameBuffer}.
        @param h  height of the {@code FrameBuffer}.
        @param c  background color for the {@code FrameBuffer}
    */
    constructor(source, w, h, c) {
      if (source instanceof FrameBuffer) {
         this.width  = source.getWidthFB();
         this.height = source.getHeightFB();

         // Create the pixel buffer.
         this.pixel_buffer = new Array(width * height);

         // Read pixel data, one pixel at a time, from the source FrameBuffer.
         for (var y = 0; y < height; ++y) {
            for (var x = 0; x < width; ++x) {
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
      } else if (source === undefined){
         this.width  = w;
         this.height = h;

         // Create the pixel buffer
         this.pixel_buffer = new Array(this.width * this.height);

         // Initialize the pixel buffer.
         this.bgColorFB = c ?? '#000000';
         this.clearFB(c);
      }

        // Create the default viewport.
        this.vp = new Viewport(this);
    }

   /**
      Get the width of this {@code FrameBuffer}.

      @return width of this {@code FrameBuffer}
   */
   static getWidthFB() {
      return this.width;
   }

   /**
      Get the height of this {@code FrameBuffer}.

      @return height of this {@code FrameBuffer}
   */
   static getHeightFB() {
      return this.height;
   }

   /**
      Get this {@code FrameBuffer}'s default {@code Viewport}.

      @return this {@code FrameBuffer}'s default {@code Viewport}
   */
   static getViewport() {
      return this.vp;
   }

   /**
      Set the default {@code Viewport} with the given upper-left-hand corner,
      width and height within this {@code FrameBuffer}.

      @param vp_ul_x  upper left hand x-coordinate of default {@code Viewport}
      @param vp_ul_y  upper left hand y-coordinate of default {@code Viewport}
      @param width    default {@code Viewport}'s width
      @param height   default {@code Viewport}'s height
   */
    static setViewport(vp_ul_x, vp_ul_y, width, height) {
      this.vp.setViewport(vp_ul_x ?? 0, vp_ul_y ?? 0, width ?? this.width, height ?? this.height);
   }

   /**
      Get the {@code FrameBuffer}'s background color.

      @return the {@code FrameBuffer}'s background {@link Color}
   */
   static getBackgroundColorFB() {
      return this.bgColorFB;
   }

   /**
      Set the {@code FrameBuffer}'s background color.
      <p>
      NOTE: This method does not clear the pixels of the
      {@code FrameBuffer} to the given color. To
      actually change all the {@code FrameBuffer}'s pixels
      to the given color, use the {@link clearFB}
      method.

      @param c  {@code FrameBuffer}'s new background color
   */
   static setBackgroundColorFB(c) {
      this.bgColorFB = c;
   }

   /**
      Clear the {@code FrameBuffer} using its background color.
   */
   static clearFB() {
      this.clearFB(this.bgColorFB);
   }

   /**
      Clear the {@code FrameBuffer} using the given {@link Color}.

      @param c  {@link Color} to clear {@code FrameBuffer} with
   */
   static clearFB(c) {
      for (var y = 0; y < this.height; ++y) {
         for (var x = 0; x < this.width; ++x) {
            this.setPixelFB(x, y, c);
         }
      }
   }

   /**
      Get the color of the pixel with coordinates
      {@code (x,y)} in the {@link FrameBuffer}.

      @param x  horizontal coordinate within the {@link FrameBuffer}
      @param y  vertical coordinate within the {@link FrameBuffer}
      @return the color of the pixel at the given pixel coordinates
   */
   static getPixelFB(x, y) {
      const index = (y*width + x);
      try {
         return this.pixel_buffer[index];
      }
      catch(e) {
         console.log(`FrameBuffer: Bad pixel coordinate (${x},${y})`);
         return '#000000';
      }
   }

   /**
      Set the color of the pixel with coordinates
      {@code (x,y)} in the {@link FrameBuffer}.

      @param x  horizontal coordinate within the {@link FrameBuffer}
      @param y  vertical coordinate within the {@link FrameBuffer}
      @param c  color for the pixel at the given pixel coordinates
   */
   static setPixelFB(x, y, c) {
      const index = (y*width + x);
      try {
         this.pixel_buffer[index] = c;
      }
      catch(e) {
        console.log(`FrameBuffer: Bad pixel coordinate (${x},${y})`);
      }
   }

   /**
      Create a new {@link FrameBuffer} containing the pixel data
      from just the red plane of this {@link FrameBuffer}.

      @return {@link FrameBuffer} object holding just red pixel data from this {@link FrameBuffer}
   */
   static convertRed2FB() {
      const red_fb = new FrameBuffer(this.width, this.height);
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
      Create a new {@code FrameBuffer} containing the pixel data
      from just the green plane of this {@code FrameBuffer}.

      @return {@code FrameBuffer} object holding just green pixel data from this {@code FrameBuffer}
   */
   static convertGreen2FB() {
      const green_fb = new FrameBuffer(this.width, this.height);
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
      Create a new {@code FrameBuffer} containing the pixel data
      from just the blue plane of this {@code FrameBuffer}.

      @return {@code FrameBuffer} object holding just blue pixel data from this {@code FrameBuffer}
   */
   static convertBlue2FB() {
      const blue_fb = new FrameBuffer(this.width, this.height);
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
      For debugging very small {@code FrameBuffer} objects.

      @return a string representation of this {@code FrameBuffer}
   */
   static toString() {
      var result = `FrameBuffer [w="${width}, h=${height}]\n`;
      for (var j = 0; j < width; ++j) {
         result += " r   g   b |";
      }
      result += "\n";
      for (var i = 0; i < height; ++i) {
         for (var j = 0; j < width; ++j) {
            const c = pixel_buffer[(i*width) + j];
            result += `#${c.substring(0,2)} ${c.substring(2,4)} ${c.substring(4,6)}`;
         }
         result += "\n";
      }
      return result;
   }
}//FrameBuffer