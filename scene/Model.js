"use strict";
/*

*/
/**

*/
class Model {
    /**

    */
    constructor(name = "", vertexList = [], lineSegmentList = [], colorList = [], visible = true, debug = false) {
        this.name = name;
        this.vertexList = vertexList;
        this.lineSegmentList = lineSegmentList;
        this.colorList = colorList;
        this.visible = visible;
        this.debug = debug;
    }
    /**

    */
    addVertex(addVertList) {
        for (const v of addVertList) {
            this.vertexList.push(v);
        }
    }
    /**

    */
    addLineSegment(addLSList) {
        for (const ls of addLSList) {
            this.lineSegmentList.push(ls);
        }
    }
    /**

    */
    addColor() {
        for (const c of arguments) {
            this.colorList.push(c);
        }
    }
}
//# sourceMappingURL=Model.js.map