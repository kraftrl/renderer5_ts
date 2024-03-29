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

export class InteractiveTriangle extends InteractiveAbstractClient {
    constructor() {
        super();

        this.scene = new Scene();
        
        var model = new Model("triangle");
        this.modelArray.push(model);

        this.scene.camera.projOrthoReset();
        
        var position = new Position(this.modelArray[0]);

        this.scene.addPosition([position]);

        this.pushback = -1.0;
        position.matrix = Matrix.translate(0, 0, this.pushback);
        
        model.addVertex([new Vertex(1.0, 0.0, 0.0),
                         new Vertex(0.0, 1.0, 0.0)]);
        var v2 =         new Vertex(0, 0, 0);
        model.addVertex([v2]);

        // Create a different color for each vertex.
        model.addColor("#FF0000", "#00FF00", "#0000FF");
        
        // Add the geometry with colors to the Model.
        model.addLineSegment([new LineSegment(0, 1, 0, 1),
                                   new LineSegment(1, 2, 1, 2),
                                   new LineSegment(2, 0, 2, 0)]);

        console.log(model);

        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.ctx.clearRect(0, 0, this.cn.width, this.cn.height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.cn.width, this.cn.height);
        Pipeline.render(this.scene, this.cn);
    }

}
var interactiveTriangle = new InteractiveTriangle();
console.log(interactiveTriangle);
//interactiveCube.setTransformations();
document.addEventListener("keypress", function(e) {
    interactiveTriangle.keyPressed(e)
});
