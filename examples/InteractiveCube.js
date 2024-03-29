import { Scene } from './../scene/Scene.js';
import { ModelShading } from './../scene/ModelShading.js';
import { Vector } from './../scene/Vector.js';
import { Vertex } from './../scene/Vertex.js';
import { Matrix } from './../scene/Matrix.js';
import { Camera } from './../scene/Camera.js';
import { LineSegment } from './../scene/LineSegment.js';
import { Model } from './../scene/Model.js';
import { Position } from './../scene/Position.js';
import { OrthographicNormalizeMatrix } from './../scene/OrthographicNormalizeMatrix.js';
import { PerspectiveNormalizeMatrix } from './../scene/PerspectiveNormalizeMatrix.js';

import { Pipeline } from './../pipeline/Pipeline.js';

import { InteractiveAbstractClient } from './InteractiveAbstractClient.js';

class InteractiveCube extends InteractiveAbstractClient {

    constructor() {
        super();
        
        // Create the Scene object that we shall render.
        this.scene = new Scene();
        var model = new Model("cube");
        this.modelArray.push( model );

        this.scene.camera.projPerspectiveReset();
    
        // Create a Position for the Model.
        var position = new Position(this.modelArray[0]);

        // Add the Position (and its Model) to the Scene.
        this.scene.addPosition([ position ]);
        //console.log(this.scene.positionList);
        
        // Push the Position away from where the camera is.
        position.matrix = Matrix.translate(0, 0, this.pushback);
        //console.log(position.matrix);

        // Create the vertices for the Model.
        model.addVertex([new Vertex(0.0, 0.0, 0.0), // four vertices around the bottom face
                        new Vertex(1.0, 0.0, 0.0),
                        new Vertex(1.0, 0.0, 1.0),
                        new Vertex(0.0, 0.0, 1.0),
                        new Vertex(0.0, 1.0, 0.0), // four vertices around the top face
                        new Vertex(1.0, 1.0, 0.0),
                        new Vertex(1.0, 1.0, 1.0),
                        new Vertex(0.0, 1.0, 1.0)]);

        // Create three colors, one color for the top edges,
        // one color for the bottom edges, and
        // one color for the vertical edges.
        //model.addColor("#FF0000", "#00FF00", "#0000FF");

        ModelShading.setColor(model, "#0000FF");

        // Add the geometry with colors to the model
        model.addLineSegment([new LineSegment(0, 1),  // bottom face
                              new LineSegment(1, 2),  // bottom face
                              new LineSegment(2, 3),  // bottom face
                              new LineSegment(3, 0),  // bottom face
                              new LineSegment(4, 5),  // top face
                              new LineSegment(5, 6),  // top face
                              new LineSegment(6, 7),  // top face
                              new LineSegment(7, 4),  // top face
                              new LineSegment(0, 4),  // back face
                              new LineSegment(1, 5),  // back face
                              new LineSegment(3, 7),  // front face
                              new LineSegment(2, 6)]); // front face

        console.log(model);

        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.ctx.clearRect(0, 0, this.cn.width, this.cn.height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.cn.width, this.cn.height);
        Pipeline.render(this.scene, this.cn);
    }

}
var interactiveCube = new InteractiveCube();
console.log(interactiveCube);
//interactiveCube.setTransformations();
document.addEventListener("keypress", function(e) {
    interactiveCube.keyPressed(e)
});
