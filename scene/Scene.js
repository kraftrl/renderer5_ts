"use strict";
/*

*/
/**

*/
class Scene {
    /**

    */
    constructor(camera = new Camera()) {
        this.camera = camera;
        this.positionList = [];
    }
    /**

    */
    setCamera(camera) {
        this.camera = camera;
    }
    /**

    */
    addPosition(positionsAdded) {
        for (const p of positionsAdded) {
            this.positionList.push(p);
        }
    }
    /**

    */
    getPosition(index) {
        return this.positionList[index];
    }
    /*
    setPosition(index: number, position:Position) {
        this.positionList.set(index,position);
    }
    */
    /**

    */
    getPositionList() {
        return this.positionList;
    }
}
//# sourceMappingURL=Scene.js.map