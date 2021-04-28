/*

*/

/**

*/
class PipelineFB {

	static debug: boolean = false;
	/**

	*/
	static render(scene: Scene, fb: FrameBuffer) {
		PipelineFB.renderVP(scene, fb.vp);
    }

	static renderVP(scene: Scene, vp: Viewport) {

		// Render every Model in the Scene.
		for(const position of scene.positionList) {
			if (position.model.visible) {

				// check(position.model)

				// 1. Apply the Position's model-to-view coordinate transformation
				const model2 = Model2View.model2view(position.model, position.matrix);

				// 2. Apply the Camera's normalizing view-to-camera coordinate transformation
				const model3 = View2Camera.view2camera(model2, scene.camera.normalizeMatrix);

				// 3. Apply the projection transformation.
				const model4 = Projection.project(model3, scene.camera);

				// 4. Clip line segments to the camera's view rectangle
				const model5 = Clip.clipModel(model4);

				// 5. Rasterize each visible line segment into pixels.
				for(const ls of model5.lineSegmentList) {
					RasterizeAntialias.rasterize(model5, ls, vp);
				}
			}
		}
	}
}
