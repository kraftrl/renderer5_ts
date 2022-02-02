/**
 * 
 */
export class Color{

    static Black = new Uint8ClampedArray([0,0,0,255]);
    static White = new Uint8ClampedArray([255,255,255,255]);
    static Red = new Uint8ClampedArray([255,0,0,255]);
    static Green = new Uint8ClampedArray([0,255,0,255]);
    static Blue = new Uint8ClampedArray([0,0,255,255]);
    static GAMMA = 1/2.2;

    // Apply gamma-encoding (gamma-compression) to the colors.
    // https://www.scratchapixel.com/lessons/digital-imaging/digital-images
    // http://blog.johnnovak.net/2016/09/21/what-every-coder-should-know-about-gamma/
    static applyGamma(color: Uint8ClampedArray) {
        return new Uint8ClampedArray([
            color[0] = Math.round(Math.pow(color[0],  Color.GAMMA)),
            color[1] = Math.round(Math.pow(color[1],  Color.GAMMA)),
            color[2] = Math.round(Math.pow(color[2],  Color.GAMMA)),
            255
        ]);
        // this.c = Color.RgbToHex([this[0], this[1], this[2]]); Hex value
    }

    static interpolate(c:Uint8ClampedArray, slope:Uint8ClampedArray, dx:number){
        return new Uint8ClampedArray([
            Math.abs(c[0] + slope[0]*dx),
            Math.abs(c[1] + slope[1]*dx),
            Math.abs(c[2] + slope[2]*dx),
            255
        ]);
        // We need the Math.abs() because otherwise, we sometimes get -0.0.
    }

    // The smaller the weight is, the closer y is to the lower
    // pixel, so we give the lower pixel more emphasis when
    // weight is small.
    static interpolateAA(c1:Uint8ClampedArray, c2:Uint8ClampedArray, weight:number){
        const rgbLow = new Uint8ClampedArray([
            (1 - weight) * c1[0] + weight * (c2[0] / 255.0),
            (1 - weight) * c1[1] + weight * (c2[1] / 255.0),
            (1 - weight) * c1[2] + weight * (c2[2] / 255.0),
            255
        ]);
        const rgbHigh = new Uint8ClampedArray([
            weight * c1[0] + (1 - weight) * (c2[0]/255.0),
            weight * c1[1] + (1 - weight) * (c2[1]/255.0),
            weight * c1[2] + (1 - weight) * (c2[2]/255.0),
            255
        ]);
        return [rgbLow, rgbHigh];
    }

    static slope(c1:Uint8ClampedArray, c0:Uint8ClampedArray, dx:number){
        return new Uint8ClampedArray([
            (c1[0] - c0[0]) / dx,
            (c1[1] - c0[1]) / dx,
            (c1[2] - c0[2]) / dx,
            255
        ]);
    }

    static hexToRgb(hex:string){
        if(hex.match(/^#[A-Fa-f0-9]{6}/)){
            return [parseInt(hex.substring(1, 3), 16), parseInt(hex.substring(3,5), 16), parseInt(hex.substring(5,7), 16)];
        }
        return [0,0,0];
    }

    static RgbToHex(color: Uint8ClampedArray) {
        return "#" + Color.intToHex(color[0]) + Color.intToHex(color[1]) + Color.intToHex(color[2]);
    }

    static intToHex(x:number) {
        if (x < 10) {
            return "0" + x.toString(16);
        }
        return x.toString(16);
    }

}

