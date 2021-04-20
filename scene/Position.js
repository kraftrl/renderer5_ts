"use strict";
class Position {
    constructor(model) {
        this.model = model;
        this.matrix = Matrix.identity();
    }
    // Set model for this position
    setModel(model) {
        this.model = model;
    }
    // Set matrix for this position to the identity
    matrix2Identity() {
        this.matrix = Matrix.identity();
        return this.matrix;
    }
}
//# sourceMappingURL=Position.js.map