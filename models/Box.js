import { Model } from './../scene/Model.js';
import { LineSegment } from './../scene/LineSegment.js';
import { Vertex } from './../scene/Vertex.js';

export class Box extends Model {
    constructor(xs, ys, zs) {
        super("Box");
        
        // Create 8 vertices.
        this.addVertex([ new Vertex(0,    0,    0), // 4 vertices around the bottom face
                         new Vertex(0+xs, 0,    0),
                         new Vertex(0+xs, 0,    0+zs),
                         new Vertex(0,    0,    0+zs),
                         new Vertex(0,    0+ys, 0), // 4 vertices around the top face
                         new Vertex(0+xs, 0+ys, 0),
                         new Vertex(0+xs, 0+ys, 0+zs),
                         new Vertex(0,    0+ys, 0+zs)]);

        // Create 12 line segments.
        this.addLineSegment([ new LineSegment(0, 1),  // bottom face
                              new LineSegment(1, 2),
                              new LineSegment(2, 3),
                              new LineSegment(3, 0),
                              new LineSegment(4, 5),  // top face
                              new LineSegment(5, 6),
                              new LineSegment(6, 7),
                              new LineSegment(7, 4),
                              new LineSegment(0, 4),  // back face
                              new LineSegment(1, 5),
                              new LineSegment(2, 6),  // front face
                              new LineSegment(3, 7) ]);
    }
}
