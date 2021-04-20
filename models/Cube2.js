"use strict";
/*

*/
/**

*/
class Cube2 extends Model {
    constructor(xGrid = 10, yGrid = 10, zGrid = 10) {
        super("Cube2");
        // Create the cube's geometry.
        if (xGrid < 0)
            xGrid = 0;
        if (yGrid < 0)
            yGrid = 0;
        if (zGrid < 0)
            zGrid = 0;
        const xStep = 2.0 / (1 + xGrid);
        const yStep = 2.0 / (1 + yGrid);
        const zStep = 2.0 / (1 + zGrid);
        let index = 0;
        let x = -1.0;
        for (let i = 0; i < xGrid; ++i) {
            x += xStep;
            // Start at the top, front edge,
            // go down the front face, and around the cube.
            this.addVertex([
                new Vertex(x, 1, 1),
                new Vertex(x, -1, 1),
                new Vertex(x, -1, -1),
                new Vertex(x, 1, -1)
            ]);
            this.addLineSegment([
                new LineSegment(index + 0, index + 1),
                new LineSegment(index + 1, index + 2),
                new LineSegment(index + 2, index + 3),
                new LineSegment(index + 3, index + 0)
            ]);
            index += 4;
        }
        // Grid lines perpendicular to the y-axis.
        let y = -1.0;
        for (let i = 0; i < yGrid; ++i) {
            y += yStep;
            // Start at the front, right edge,
            // go left across the front face, and around the cube.
            this.addVertex([
                new Vertex(1, y, 1),
                new Vertex(-1, y, 1),
                new Vertex(-1, y, -1),
                new Vertex(1, y, -1)
            ]);
            this.addLineSegment([
                new LineSegment(index + 0, index + 1),
                new LineSegment(index + 1, index + 2),
                new LineSegment(index + 2, index + 3),
                new LineSegment(index + 3, index + 0)
            ]);
            index += 4;
        }
        // Grid lines perpendicular to the z-axis.
        let z = -1.0;
        for (let i = 0; i < zGrid; ++i) {
            z += zStep;
            // Start at the top, right edge,
            // go left across the top face, and around the cube.
            this.addVertex([
                new Vertex(1, 1, z),
                new Vertex(-1, 1, z),
                new Vertex(-1, -1, z),
                new Vertex(1, -1, z)
            ]);
            this.addLineSegment([
                new LineSegment(index + 0, index + 1),
                new LineSegment(index + 1, index + 2),
                new LineSegment(index + 2, index + 3),
                new LineSegment(index + 3, index + 0)
            ]);
            index += 4;
        }
    }
}
//# sourceMappingURL=Cube2.js.map