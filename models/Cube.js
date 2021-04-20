"use strict";
/*

*/
/**

*/
class Cube extends Model {
    constructor() {
        super("Cube");
        // Create 8 vertices.
        this.addVertex([
            new Vertex(-1, -1, -1),
            new Vertex(1, -1, -1),
            new Vertex(1, -1, 1),
            new Vertex(-1, -1, 1),
            new Vertex(-1, 1, -1),
            new Vertex(1, 1, -1),
            new Vertex(1, 1, 1),
            new Vertex(-1, 1, 1)
        ]);
        // Create 12 line segments.
        this.addLineSegment([
            new LineSegment(0, 1),
            new LineSegment(1, 2),
            new LineSegment(2, 3),
            new LineSegment(3, 0),
            new LineSegment(4, 5),
            new LineSegment(5, 6),
            new LineSegment(6, 7),
            new LineSegment(7, 4),
            new LineSegment(0, 4),
            new LineSegment(1, 5),
            new LineSegment(2, 6),
            new LineSegment(3, 7)
        ]);
    }
}
//# sourceMappingURL=Cube.js.map