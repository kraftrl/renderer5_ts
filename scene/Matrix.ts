class Matrix {

    v1: Vector;
    v2: Vector;
    v3: Vector;
    v4: Vector;

    constructor() {
        this.v1 = new Vector(0, 0, 0, 0);
        this.v2 = new Vector(0, 0, 0, 0);
        this.v3 = new Vector(0, 0, 0, 0);
        this.v4 = new Vector(0, 0, 0, 0);
    }

    static build(v1: Vector, v2: Vector, v3: Vector, v4: Vector) {
        const m: Matrix = new Matrix();
        m.v1 = v1;
        m.v2 = v2;
        m.v3 = v3;
        m.v4 = v4;
        return m;
    }

    // Return identity matrix
    static identity() {
        return Matrix.scaleConst(1.0);
    }

    // Return a new translated matrix
    static translate(x: number, y: number, z: number) {
        return Matrix.build(new Vector(1.0, 0.0, 0.0, 0.0),
            new Vector(0.0, 1.0, 0.0, 0.0),
            new Vector(0.0, 0.0, 1.0, 0.0),
            new Vector(  x,   y,   z, 1.0));
    }

    // Uniform scaling matrix
    static scaleConst(d: number) {
        return Matrix.scale(d, d, d);
    }

    // Construct a diagonal matrix that scales in the x, y, and z directions by the given factors
    static scale(x: number, y: number, z: number) {
        return Matrix.build(new Vector(x, 0.0, 0.0, 0.0),
            new Vector(0.0,   y, 0.0, 0.0),
            new Vector(0.0, 0.0,   z, 0.0),
            new Vector(0.0, 0.0, 0.0, 1.0));
    }

    // Construct a matrix rotated by theta degrees along the x axis
    static rotateX(theta: number) {
        return Matrix.rotate(theta, 1, 0, 0);
    }

    // Construct a matrix rotated by theta degrees along the y axis
    static rotateY(theta: number) {
        return Matrix.rotate(theta, 0, 1, 0);
    }

    // Construct a matrix rotated by theta degrees along the z axis
    static rotateZ(theta: number) {
        return Matrix.rotate(theta, 0, 0, 1);
    }

    // Construct a matrix rotated by theta along the axis vector (x, y, z)
    static rotate(theta: number, x: number, y: number, z: number) {
        const norm = Math.sqrt(x * x + y * y + z * z);
        const ux = x / norm;
        const uy = y / norm;
        const uz = z / norm;

        const c = Math.cos((Math.PI / 180.0) * theta);
        const s = Math.sin((Math.PI / 180.0) * theta);

        return Matrix.build(new Vector(ux * ux * (1 - c) + c,        uy * ux * (1 - c) + (uz * s), uz * ux * (1 - c) - (uy * s), 0.0),
                            new Vector(ux * uy * (1 - c) - (uz * s), uy * uy * (1 - c) + c,        uz * uy * (1 - c) + (ux * s), 0.0),
                            new Vector(ux * uz * (1 - c) + (uy * s), uy * uz * (1 - c) - (ux * s), uz * uz * (1 - c) + c,        0.0),
                            new Vector(0.0,                          0.0,                          0.0,                          1.0));
    }

    // Product of two matrices. Matrix m is on the right, while this is on the left
    // Mutates this matrix
    mult(m: Matrix): Matrix {
        const vec1: Vector = this.timesVector(m.v1);
        const vec2: Vector = this.timesVector(m.v2);
        const vec3: Vector = this.timesVector(m.v3);
        const vec4: Vector = this.timesVector(m.v4);

        this.v1 = vec1;
        this.v2 = vec2;
        this.v3 = vec3;
        this.v4 = vec4;
        return this;
    }

    // Product of two matrices. Matrix m is on the left, while this is on the right
    // Mutates this matrix
    multLeft(m: Matrix): Matrix {
        const vec1: Vector = m.timesVector(this.v1);
        const vec2: Vector = m.timesVector(this.v2);
        const vec3: Vector = m.timesVector(this.v3);
        const vec4: Vector = m.timesVector(this.v4);

        this.v1 = vec1;
        this.v2 = vec2;
        this.v3 = vec3;
        this.v4 = vec4;
        return this;
    }

    // Scalar times this matrix, returns new matrix
    timesConst(s: number) {
        return Matrix.build(this.v1.times(s), this.v2.times(s), this.v3.times(s), this.v4.times(s));
    }

    // Scalar times this matrix, modifying it
    timesEquals(s: number): Matrix {
        this.v1.timesEquals(s);
        this.v2.timesEquals(s);
        this.v3.timesEquals(s);
        this.v4.timesEquals(s);
        return this;
    }

    // Matrix times a vector, returns a new vector
    timesVector(v: Vector) {
        return this.v1.times(v.x).plus(this.v2.times(v.y).plus(this.v3.times(v.z).plus(this.v4.times(v.w))));
    }

    // Matrix times Matrix, returns a new matrix
    timesMatrix(m: Matrix) {
        return Matrix.build(this.timesVector(m.v1),
            this.timesVector(m.v2),
            this.timesVector(m.v3),
            this.timesVector(m.v4));
    }

    // Multiply a vertex by a matrix and return a new vertex
    timesVertex(v: Vertex) {
        const vec: Vector = this.v1.times(v.x).plus(this.v2.times(v.y).plus(this.v3.times(v.z).plus(this.v4.times(v.w))));
        console.log(vec);
        return new Vertex(vec.x, vec.y, vec.z, vec.w);
    }
}
