class OrthographicNormalizeMatrix {

    static build(l: number, r: number, b: number, t: number) {
        let m1: Matrix;
        let m2: Matrix;

        m1 = Matrix.build(new Vector(1.0,          0.0,          0.0, 0.0),
                          new Vector(0.0,          1.0,          0.0, 0.0),
                          new Vector(0.0,          0.0,          1.0, 0.0),
                          new Vector(-(r + l) / 2, -(t + b) / 2, 0.0, 1.0));

        m2 = Matrix.build(new Vector(2 / (r - l), 0.0,         0.0, 0.0),
                          new Vector(0.0,         2 / (t - b), 0.0, 0.0),
                          new Vector(0.0,         0.0,         1.0, 0.0),
                          new Vector(0.0,         0.0,         0.0, 1.0));

        return m2.timesMatrix(m1);
    }
}