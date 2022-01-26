/**

*/

import { FrameBuffer } from "./FrameBuffer";

export class Viewport
{
    // Coordinates of the viewport within the framebuffer.
    vp_ul_x!: number;     // upper-left-hand corner
    vp_ul_y!: number;
    vp_lr_x!: number;     // lower-right-hand corner
    vp_lr_y!: number;
    bgColorVP: string; // the viewport's background color
    parent : FrameBuffer;

    /**
    
    */
    constructor(parent:FrameBuffer, source:FrameBuffer|Viewport|undefined, c:any, vp_ul_x:number, vp_ul_y:number, width:number|undefined, height:number|undefined) {
        if (source instanceof FrameBuffer) {
            this.setViewport(vp_ul_x, vp_ul_y, source.getWidthFB(), source.getHeightFB());
            this.bgColorVP = source.bgColorFB;

            // Read pixel data, one pixel at a time, from the source FrameBuffer.
            for (var y = 0; y < source.height; ++y) {
                for (var x = 0; x < source.width; ++x) {
                    this.setPixelVP(x, y, source.getPixelFB(x,y));
                }
            }
        } else if (source instanceof Viewport) {
            this.setViewport(vp_ul_x, vp_ul_y, source.getWidthVP(), source.getHeightVP());
            this.bgColorVP = source.bgColorVP;
    
            // Read pixel data, one pixel at a time, from the source Viewport.
            for (var y = 0; y < source.getHeightVP(); ++y) {
                for (var x = 0; x < source.getWidthVP(); ++x) {
                    this.setPixelVP(x, y, source.getPixelVP(x,y));
                }
            }
        } else {
            this.setViewport(vp_ul_x ?? 0, vp_ul_y ?? 0, width ?? parent.width, height ?? parent.height);
            this.bgColorVP = c ?? parent.bgColorFB;
        }

        this.parent = parent;
    }

    /**
    
    */
    setViewport(vp_ul_x:number, vp_ul_y:number, width:number, height:number) {
        this.vp_ul_x = vp_ul_x;
        this.vp_ul_y = vp_ul_y;
        this.vp_lr_x = vp_ul_x + width - 1;
        this.vp_lr_y = vp_ul_y + height - 1;
    }

    /**
    
    */
    getWidthVP() {
        return this.vp_lr_x - this.vp_ul_x + 1;
    }

    /**
    
    */
    getHeightVP() {
        return this.vp_lr_y - this.vp_ul_y + 1;
    }

    /**
    
    */
    getBackgroundColorVP() {
        return this.bgColorVP;
    }

    /**
    
    */
    setBackgroundColorVP(c:string) {
        this.bgColorVP = c;
    }

    /**
    
    */
    clearVP(c:string|undefined) {
        if (c === undefined) c = this.bgColorVP;
        const wVP = this.getWidthVP();
        const hVP = this.getHeightVP();
        for (var y = 0; y < hVP; ++y) {
            for (var x = 0; x < wVP; ++x) {
                this.setPixelVP(x, y, c);
            }
        }
    }

    /**
    
    */
    getPixelVP(x:number, y:number) {
        return this.parent.getPixelFB(this.vp_ul_x + x, this.vp_ul_y + y);
    }


    /**
    
    */
    setPixelVP(x:number, y:number, c:string) {
        this.parent.setPixelFB(this.vp_ul_x + x, this.vp_ul_y + y, c);
    }

    /**
    
    */
    convertVP2FB() {
        const wVP = this.getWidthVP();
        const hVP = this.getHeightVP();

        const vp_fb = new FrameBuffer(undefined, wVP, hVP, undefined);
        vp_fb.bgColorFB = this.bgColorVP;

        // Copy the current viewport into the new framebuffer's pixel buffer.
        for (var y = 0; y < hVP; y++) {
            for (var x = 0; x < wVP; x++) {
                vp_fb.setPixelFB( x, y, this.getPixelVP(x, y) );
            }
        }

        return vp_fb;
    }
}// Viewport