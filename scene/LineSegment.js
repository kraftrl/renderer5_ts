"use strict";
/*

*/
/**

*/
class LineSegment {
    /**

    */
    constructor(i0, i1, c0 = i0, c1 = i1) {
        this.vIndex = [i0, i1];
        this.cIndex = [c0, c1];
    }
    /**

    */
    setColors(c0, c1) {
        this.cIndex[0] = c0;
        this.cIndex[1] = c1;
    }
}
//# sourceMappingURL=LineSegment.js.map