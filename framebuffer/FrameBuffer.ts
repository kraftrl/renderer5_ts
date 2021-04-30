class FrameBuffer {

    width: number;
    height: number;
    pixel_buffer: Array<string>;
    bgColorFB: string;
    vp: Viewport;

    constructor(w: number, h: number, c: string) {
        this.width = w;
        this.height = h;
        this.pixel_buffer = [];
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

    setViewPort(vp_ul_x: number, vp_ul_y: number, width: number, height: number, c: string) {
        this.vp = new Viewport(vp_ul_x, vp_ul_y, width, height, c, this);
    }

    getBackgroundColorFB() {
        return this.bgColorFB;
    }

    setBackgroundColorFB(c: string) {
        this.bgColorFB = c;
    }


    // Clears framebuffer, resetting all pixels to the default background color
    clearFB(c: string) {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                this.setPixelFB(x, y, c);
            }
        }
    }

    // Get the pixel color based on the coordinates
    getPixelFB(x: number, y: number) {
        const index = y * this.width + x;
        try {
            return this.pixel_buffer[index];
        }
        catch (err) {
            console.log('FrameBuffer: Bad pixel coordinate (' + x + ', ' + y + ')');
            return "#FFFFFF";
        }
    }

    // Set pixel color for a pixel at the given coordinates
    setPixelFB(x: number, y: number, c: string) {
        const index = y * this.width + x;
        try {
            this.pixel_buffer[index] = c;
        }
        catch (err) {
            console.log('FrameBuffer: Bad pixel coordinate (' + x + ', ' + y + ')');
            return "#FFFFFF";
        }
    }


    convertRed2FB() {
        const red_fb: FrameBuffer = new FrameBuffer(this.width, this.height, this.bgColorFB);
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                const c: string = rgbToHex(hexToRGB(this.getPixelFB(x, y))[0], 0, 0);
                red_fb.setPixelFB(x, y, c);
            }
        }
        return red_fb;
    }
    convertGreen2FB() {
        const green_fb: FrameBuffer = new FrameBuffer(this.width, this.height, this.bgColorFB);
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                const c: string = rgbToHex(0, hexToRGB(this.getPixelFB(x, y))[1], 0);
                green_fb.setPixelFB(x, y, c);
            }
        }
        return green_fb;
    }
    convertBlue2FB() {
        const blue_fb: FrameBuffer = new FrameBuffer(this.width, this.height, this.bgColorFB);
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                const c: string = rgbToHex(0, 0, hexToRGB(this.getPixelFB(x, y))[2]);
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
            /*
            for (var i = 0; i < temp.length; i += 3) {
                const c = this.pixel_buffer[((ul_y + n) * this.width + ul_x) + i / 3];
                temp[i + 0] = Math.floor(hexToRGB(c)[0]);
                temp[i + 1] = Math.floor(hexToRGB(c)[1]);
                temp[i + 2] = Math.floor(hexToRGB(c)[2]);
            }
            

            for (var i = 0; i < p_width * 3; i += 3) {
                const c = this.pixel_buffer[((ul_y + n) * this.width + ul_x) + i / 3];
                tempRow = tempRow + Math.floor(hexToRGB(c)[0]) + " ";
                tempRow = tempRow + Math.floor(hexToRGB(c)[1]) + " ";
                tempRow = tempRow + Math.floor(hexToRGB(c)[2]) + " ";
            }
            tempRow = tempRow + "\n";
            writeStream.write(tempRow);
        }
        writeStream.end();
    }
    */
}