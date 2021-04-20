"use strict";
/*

*/
/**

*/
class Camera {
    /**

    */
    constructor() {
        this.left = -1.0;
        this.right = 1.0;
        this.bottom = -1.0;
        this.top = 1.0;
        this.n = -1.0;
        this.perspective = true;
    }
    projPerspective(left, right, top, bottom, near) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.n = -near;
        this.perspective = true;
    }
    //This method is similar to the projPerspective() method in Java. It's renamed so that it doesn't share the name with the above method
    projPerspectiveReset() {
        this.projPerspective(-1.0, 1.0, -1.0, 1.0, 1.0);
    }
    projOrtho(left, right, top, bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.n = 0;
        this.perspective = false;
    }
    projOrthoReset() {
        this.projOrtho(-1.0, 1.0, -1.0, 1.0);
    }
}
//# sourceMappingURL=Camera.js.map