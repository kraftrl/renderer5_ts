class RasterizeAntialias {

    static debug: boolean = false;
    static doGamma: boolean = true;
    static doAntialiasing: boolean = false;

	/**
    
	*/
    static rasterize(model: Model, ls: LineSegment, vp: Viewport) {

        //RasterizeAntialias.doGamma = gam;
        //RasterizeAntialias.doAntialiasing = antialias;
        let debug: boolean = RasterizeAntialias.debug && (PipelineFB.debug || model.debug);

        // Get viewport's background color
        const bg = vp.bgColorVP;

        // Make local copies of several values
        const h: number = vp.getHeightVP();
        const w: number = vp.getWidthVP();

        const v0: Vertex = Object.assign({}, model.vertexList[ls.vIndex[0]]);
        const v1: Vertex = Object.assign({}, model.vertexList[ls.vIndex[1]]);

        const c0 = hexToRGB(model.colorList[ls.cIndex[0]]);
        const c1 = hexToRGB(model.colorList[ls.cIndex[1]]);

        let r0 = c0[0], g0 = c0[1], b0 = c0[2];
        //console.log(r0 + " " + g0 + " " + g0);
        let r1 = c1[0], g1 = c1[1], b1 = c1[2];
        //console.log(r1 + " " + g1 + " " + g1);
        
        // Transform each vertex to the "pixel plane" coordinate system.
        let x0 = 0.5 + w / 2.001 * (v0.x + 1); // x_pp = 0.5 + w/2 * (x_p+1)
        let y0 = 0.5 + h / 2.001 * (v0.y + 1); // y_pp = 0.5 + h/2 * (y_p+1)
        let x1 = 0.5 + w / 2.001 * (v1.x + 1);
        let y1 = 0.5 + h / 2.001 * (v1.y + 1);
        // NOTE: Notice the 2.001 fudge factor in the last two equations.
        // This is explained on page 142 of
        //    "Jim Blinn's Corner: A Trip Down The Graphics Pipeline"
        //     by Jim Blinn, 1996, Morgan Kaufmann Publishers.

        // Round the line segment's two endpoints to the nearest
        // logical pixel. This makes the algorithm a lot simpler,
        // but it can cause a slight, but noticable, shift of the
        // line segment.
        x0 = Math.round(x0);
        y0 = Math.round(y0);
        x1 = Math.round(x1);
        y1 = Math.round(y1);
        
        // Rasterize a degenerate line segment as a single pixel
        if ((x0 == x1) && (y0 == y1)) {
            if (debug) {
                RasterizeAntialias.logPixel(Math.floor(x0), y0, model.colorList[ls.cIndex[0]], w, h);
            }

            const x0_vp = Math.floor(x0) - 1;
            const y0_vp = h - Math.floor(y0);
            vp.setPixelVP(x0_vp, y0_vp, rgbToHex(r0, g0, b0));
            return;
        }

        // If abs(slope) > 1, then transpose this line so that the 
        // transposed line has slope < 1. Remember that the line has
        // been transposed
        let transposedLine = false;
        if (Math.abs(y1 - y0) > Math.abs(x1 - x0)) {
            const temp0 = x0;
            x0 = y0;
            y0 = temp0;
            const temp1 = x1;
            x1 = y1;
            y1 = temp1;
            transposedLine = true;
        }

        // To rasterize in the direction of increasing x, swap
        // points if necessary
        if (x1 < x0) {
            const tempX = x0;
            x0 = x1;
            x1 = tempX;
            const tempY = y0;
            y0 = y1;
            y1 = tempY;
            const tempR = r0;
            r0 = r1;
            r1 = tempR;
            const tempG = g0;
            g0 = g1;
            g1 = tempG;
            const tempB = b0;
            b0 = b1;
            b1 = tempB;
        }


        
        // Compute the slopes of the line segment
        const m = (y1 - y0) / (x1 - x0);
        const slopeR = (r1 - r0) / (x1 - x0);
        const slopeG = (g1 - g0) / (x1 - x0);
        const slopeB = (b1 - b0) / (x1 - x0);


        // Rasterize this line segment in the direction of increasing x.
        // As x moves across the logical horizontal (or vertical) pixels,
        // we will compute a value of y for each x
        let y = y0;
        for (var x = Math.floor(x0); x < Math.floor(x1); x += 1, y += m) {

            // Interpolate this pixel's color between the two endpoints' colors
            let r = Math.abs(r0 + slopeR * (x - x0));
            let g = Math.abs(g0 + slopeG * (x - x0));
            let b = Math.abs(b0 + slopeB * (x - x0));
            //console.log(r + " " + g + " " + b);

            if (RasterizeAntialias.doAntialiasing) {
                // y must be between two vertical (or horizontal) logical pixel coordinates
                // Let y_low and y_hi be the logical pixel coordinates that bracket around y
                let y_low = Math.floor(y);
                let y_hi = y_low + 1;
                
                // Test for the top edge
                if (!transposedLine && y == h) {
                    y_hi = h;
                }
                // Test for the right edge
                if (transposedLine && y == w) {
                    y_hi = w;
                }

                // Let weight be the fractional part of y
                // Weight will be used to determine how much emphasis to place on
                // each of the two pixels that bracket y
                const weight = y - y_low;
                

                // Interpolate colors for the low and high pixels
                // The smaller the weight, the closer the color is to the low pixel
                let r_low = (1 - weight) * r + weight * hexToRGB(bg)[0];
                let g_low = (1 - weight) * g + weight * hexToRGB(bg)[1];
                let b_low = (1 - weight) * b + weight * hexToRGB(bg)[2];
                let r_hi = weight * r + (1 - weight) * hexToRGB(bg)[0];
                let g_hi = weight * g + (1 - weight) * hexToRGB(bg)[1];
                let b_hi = weight * b + (1 - weight) * hexToRGB(bg)[2];

                if (RasterizeAntialias.doGamma) {
                    const gamma = 1 / 2.2;
                    r_low = Math.pow(r_low/255, gamma) * 255;
                    r_hi = Math.pow(r_hi/255, gamma) * 255;
                    g_low = Math.pow(g_low/255, gamma) * 255;
                    g_hi = Math.pow(g_hi/255, gamma) * 255;
                    b_low = Math.pow(b_low/255, gamma) * 255;
                    b_hi = Math.pow(b_hi/255, gamma) * 255;
                }

                let col1 = rgbToHex(Math.floor(r_low), Math.floor(g_low), Math.floor(b_low));
                let col2 = rgbToHex(Math.floor(r_hi), Math.floor(g_hi), Math.floor(b_hi));

                // Set this antialiased pixel in the Framebuffer
                if (!transposedLine) {
                    if (debug) {
                        RasterizeAntialias.logAAPixelsH(x, y, y_low, y_hi, col1, col2, w, h);
                    }

                    // Viewport coordinates
                    const x_vp = x - 1;
                    const y_vp_low = h - y_low;
                    const y_vp_hi = h - y_hi;

                    vp.setPixelVP(x_vp, y_vp_low, rgbToHex(r_low, g_low, b_low));
                    vp.setPixelVP(x_vp, y_vp_hi, rgbToHex(r_hi, g_hi, b_hi));
                   
                }
                else {
                    if (debug) {
                        RasterizeAntialias.logAAPixelsV(y, x, y_low, y_hi, col1, col2, w, h);
                    }

                    // Viewport coordinates
                    const x_vp_low = y_low - 1;
                    const x_vp_hi = y_hi - 1;
                    const y_vp = h - x;

                    vp.setPixelVP(x_vp_low, y_vp, rgbToHex(r_low, g_low, b_low));
                    vp.setPixelVP(x_vp_hi, y_vp, rgbToHex(r_hi, g_hi, b_hi));
                }
            }
            else {
                // No antialiasing
                if (RasterizeAntialias.doGamma) {
                    const gamma = 1 / 2.2;
                    r = Math.pow(r/255, gamma) * 255;
                    g = Math.pow(g/255, gamma) * 255;
                    b = Math.pow(b/255, gamma) * 255;
                }

                // The value of y will almost always be between two vertical
                // (or horizontal) pixel coordinates.
                // By rounding off the value of y, we are choosing the nearest
                // logical vertical (or horizontal) pixel coordinate
                if (!transposedLine) {
                    if (debug) {
                        RasterizeAntialias.logPixel(x, y, rgbToHex(Math.floor(r), Math.floor(g), Math.floor(b)), w, h);
                    }

                    // Viewport coordinates
                    const x_vp = x - 1;
                    const y_vp = h - Math.round(y);
                    vp.setPixelVP(x_vp, y_vp, rgbToHex(r, g, b));
                }
                else {
                    if (debug) {
                        RasterizeAntialias.logPixel(y, x, rgbToHex(Math.floor(r), Math.floor(g), Math.floor(b)), w, h);
                    }

                    // Viewport coordinates
                    const x_vp = Math.round(y) - 1;
                    const y_vp = h - x;
                    vp.setPixelVP(x_vp, y_vp, rgbToHex(r, g, b));
                }
            }
        }
        
        // For the x1, y1 endpoint
        if (!transposedLine) {
            if (debug) {
                RasterizeAntialias.logPixel(Math.floor(x1), y1, rgbToHex(Math.floor(r1), Math.floor(g1), Math.floor(b1)), w, h);
            }

            // Viewport coordinates
            const x_vp = Math.floor(x1) - 1;
            const y_vp = h - Math.floor(y1);
            vp.setPixelVP(x_vp, y_vp, rgbToHex(r1, g1, b1));
        }
        else {
            if (debug) {
                RasterizeAntialias.logPixel(Math.floor(y1), x1, rgbToHex(Math.floor(r1), Math.floor(g1), Math.floor(b1)), w, h);
            }

            // Viewport coordinates
            const x_vp = Math.floor(y1) - 1;
            const y_vp = h - Math.floor(x1);
            vp.setPixelVP(x_vp, y_vp, rgbToHex(r1, g1, b1));
        }

    }


    static logPixel(x: number, y: number, c: string, w: number, h: number) {
        console.log("[w = " + w + ", h = " + h + "]   x = " + x + ", y = " + y + ", c = " + c + "\n");
    }

    static logAAPixelsH(x: number, y: number, y1: number, y2: number, c1: string, c2: string, w: number, h: number) {
        console.log("[w = " + w.toString().padStart(4) + ", h = " + h.toString().padStart(4) + "]   x = " + x + ", y = " + y + ", y_low = " + y1 + " c = " + c1 + "\n");
        console.log("                       x = " + x + ", y = " + y + ", y_hi = " + y2 + " c = " + c2 + "\n");
    }

    static logAAPixelsV(x: number, y: number, x1: number, x2: number, c1: string, c2: string, w: number, h: number) {
        console.log("[w = " + w.toString().padStart(4) + ", h = " + h.toString().padStart(4) + "]   x = " + x + ", y = " + y + ", x_low = " + x1 + " c = " + c1 + "\n");
        console.log("                       x = " + x + ", y = " + y + ", x_hi = " + x2 + " c = " + c2 + "\n");
    }
}

/*
function hexToRGB(c: string): Array<number> {

    let r: number, g: number, b: number;
    let rh: string, gh: string, bh: string;

    rh = c.charAt(1) + c.charAt(2);
    gh = c.charAt(3) + c.charAt(4);
    bh = c.charAt(5) + c.charAt(6);

    r = parseInt(rh, 16);
    g = parseInt(rh, 16);
    b = parseInt(rh, 16);

    return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);

    let rgbHex: string = '#';
    rgbHex = rgbHex + r.toString(16) + g.toString(16) + b.toString(16);
    return rgbHex;
}
*/