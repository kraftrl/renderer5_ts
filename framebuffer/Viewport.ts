class Viewport {
    vp_ul_x: number;
    vp_ul_y: number;
    vp_lr_x: number;
    vp_lr_y: number;
    bgColorVP: string;
    fbParent: FrameBuffer;


    constructor(ul_x: number, ul_y: number, width: number, height: number, c: string, fb: FrameBuffer) {
        this.vp_ul_x = ul_x;
        this.vp_ul_y = ul_y;
        this.vp_lr_x = this.vp_ul_x + width - 1;
        this.vp_lr_y = this.vp_ul_y + height - 1;
        this.bgColorVP = c;
        this.fbParent = fb;
    }

    // Mutate this framebuffer into the given upper left corner with the given height and width
    setViewport(vp_ul_x: number, vp_ul_y: number, width: number, height: number) {
        this.vp_ul_x = vp_ul_x;
        this.vp_ul_y = vp_ul_y;
        this.vp_lr_x = vp_ul_x + width - 1;
        this.vp_lr_y = vp_ul_y + height - 1;
    }

    getWidthVP() {
        return this.vp_lr_x - this.vp_ul_x + 1;
    }

    getHeightVP() {
        return this.vp_lr_y - this.vp_ul_y + 1;
    }

    getBackgroundColorVP() {
        return this.bgColorVP;
    }

    setBackgroundColorVP(c: string) {
        this.bgColorVP = c;
    }

    clearVP(c: string) {
        const wVP = this.getWidthVP();
        const hVP = this.getHeightVP();
        for (var y = 0; y < hVP; y++) {
            for (var x = 0; x < wVP; x++) {
                this.setPixelVP(x, y, c);
            }
        }

    }

    getPixelVP(x: number, y: number) {
        return this.fbParent.getPixelFB(this.vp_ul_x + x, this.vp_ul_y + y);
    }

    setPixelVP(x: number, y: number, c: string) {
        this.fbParent.setPixelFB(this.vp_ul_x + x, this.vp_ul_y + y, c);
    }

    convertVP2FB() {
        const wVP = this.getWidthVP();
        const hVP = this.getHeightVP();

        const vp_fb = new FrameBuffer(wVP, hVP, this.bgColorVP);
        for (var y = 0; y < hVP; y++) {
            for (var x = 0; x < wVP; x++) {
                vp_fb.setPixelFB(x, y, this.getPixelVP(x, y));
            }
        }

        return vp_fb;
    }
}