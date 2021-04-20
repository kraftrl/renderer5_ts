"use strict";
class PerspectiveNormalizeMatrix {
    static build(l, r, b, t, near) {
        let m1;
        let m2;
        m1 = Matrix.build(new Vector(1.0, 0.0, 0.0, 0.0), new Vector(0.0, 1.0, 0.0, 0.0), new Vector((r + l) / (2 * near), (t + b) / (2 * near), 1.0, 0.0), new Vector(0.0, 0.0, 0.0, 1.0));
        m2 = Matrix.build(new Vector((2 * near) / (r - l), 0.0, 0.0, 0.0), new Vector(0.0, (2 * near) / (t - b), 0.0, 0.0), new Vector(0.0, 0.0, 1.0, 0.0), new Vector(0.0, 0.0, 0.0, 1.0));
        return m2.timesMatrix(m1);
    }
}
//# sourceMappingURL=PerspectiveNormalizeMatrix.js.map