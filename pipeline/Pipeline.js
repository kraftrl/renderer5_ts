"use strict";
/*

*/
/**

*/
class Pipeline {
    /**

    */
    static render(scene, cn) {
        // Render every Model in the Scene.
        for (const position of scene.positionList) {
            if (position.model.visible) {
                // 1. Apply the Position's model-to-view coordinate transformation
                const model2 = Model2View.model2view(position.model, position.matrix);
                // 1. Apply the Camera's normalizing view-to-camera coordinate transformation
                const model3 = View2Camera.view2camera(model2, scene.camera);
                // 2. Apply the projection transformation.
                const model4 = Projection.project(model3, scene.camera);
                // 3. Rasterize each visible line segment into pixels.
                for (const ls of model4.lineSegmentList) {
                    Rasterize.rasterize(model4, ls, cn);
                }
            }
        }
    }
}
//# sourceMappingURL=Pipeline.js.map