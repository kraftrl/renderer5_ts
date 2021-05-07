class FrameBuffer {

    width: number;
    height: number;
    pixel_buffer: Uint8ClampedArray;
    bgColorFB: Uint8ClampedArray;
    vp: Viewport;

    constructor(w: number, h: number, c: Uint8ClampedArray) {
        this.width = w;
        this.height = h;
        this.pixel_buffer = new Uint8ClampedArray(this.width * this.height * 4);
        this.bgColorFB = c;
        this.clearFB(this.bgColorFB);

        this.vp = new Viewport(0, 0, this.width, this.height, this.bgColorFB, this)

    }


    getWidthFB() {
        return this.width;
    }

    getHeightFB() {
        return this.height;
    }

    getViewPort() {
        return this.vp;
    }

    setViewPort(vp_ul_x: number, vp_ul_y: number, width: number, height: number, c: Uint8ClampedArray) {
        this.vp = new Viewport(vp_ul_x, vp_ul_y, width, height, c, this);
    }

    getBackgroundColorFB() {
        return this.bgColorFB;
    }

    setBackgroundColorFB(c: Uint8ClampedArray) {
        this.bgColorFB = c;
    }


    // Clears framebuffer, resetting all pixels to the default background color
    clearFB(c: Uint8ClampedArray) {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                this.setPixelFB(x, y, c);
            }
        }
    }

    // Get the pixel color based on the coordinates
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

    // Set pixel color for a pixel at the given coordinates
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


    convertRed2FB() {
        const red_fb: FrameBuffer = new FrameBuffer(this.width, this.height, this.bgColorFB);
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                const c: Uint8ClampedArray = new Uint8ClampedArray([this.getPixelFB(x, y)[0], 0, 0, 0]);
                red_fb.setPixelFB(x, y, c);
            }
        }
        return red_fb;
    }
    convertGreen2FB() {
        const green_fb: FrameBuffer = new FrameBuffer(this.width, this.height, this.bgColorFB);
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                const c: Uint8ClampedArray = new Uint8ClampedArray([0, this.getPixelFB(x, y)[0], 0, 0]);
                green_fb.setPixelFB(x, y, c);
            }
        }
        return green_fb;
    }
    convertBlue2FB() {
        const blue_fb: FrameBuffer = new FrameBuffer(this.width, this.height, this.bgColorFB);
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                const c: Uint8ClampedArray = new Uint8ClampedArray([0, 0, this.getPixelFB(x, y)[0], 0]);
                blue_fb.setPixelFB(x, y, c);
            }
        }
        return blue_fb;
    }

    /*
    dump2File(filename: string) {
        this.dumpPixels2File(0, 0, this.width - 1, this.height - 1, filename);
    }

    dumpPixels2File(ul_x: number, ul_y: number, lr_x: number, lr_y: number, filename: string) {
        const p_width = lr_x - ul_x + 1;
        const p_height = lr_y - ul_y + 1;

        const fs = require('fs');
        let writeStream = fs.createWriteStream(filename + '.ppm');

        writeStream.write(("P3\n" + p_width + " " + p_height + "\n" + 255 + "\n"));
        const temp: Array<number> = new Array(p_width * 3);
        let tempRow: string = "";

        for (var n = 0; n < p_height; n++) {
            
            for (var i = 0; i < temp.length; i += 3) {
                const c = this.pixel_buffer[((ul_y + n) * this.width + ul_x) + i / 3];
                temp[i + 0] = c[0];
                temp[i + 1] = c[1];
                temp[i + 2] = c[2];
            }
            

            for (var i = 0; i < p_width * 3; i += 3) {
                const c = this.pixel_buffer[((ul_y + n) * this.width + ul_x) + i / 3];
                tempRow = tempRow + c[0] + " ";
                tempRow = tempRow + c[1] + " ";
                tempRow = tempRow + c[2] + " ";
            }
            tempRow = tempRow + "\n";
            writeStream.write(tempRow);
        }
        writeStream.end();
    }
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
}