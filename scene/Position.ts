class Position {
    model: Model;
    matrix: Matrix;

    constructor(model: Model) {
        this.model = model;
        this.matrix = Matrix.identity();
    }

    // Set model for this position
    setModel(model: Model) {
        this.model = model;
    }

    // Set matrix for this position to the identity
    matrix2Identity(): Matrix {
        this.matrix = Matrix.identity();
        return this.matrix;
    }
}