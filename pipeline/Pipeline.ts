import { Viewport } from "../framebuffer/Viewport";
import { Clip } from "./Clip-";
import { Projection } from "./Projection";
import { Rasterize } from "./Rasterize";

export class Pipeline {

	static debug: boolean = false;
	
	static render(scene:Scene, cn:HTMLCanvasElement, vp: Viewport) {

		// Render every Model in the Scene.
		for(const position of scene.positionList) {
			if (position.model.visible) {

				// 1. Apply the Position's model-to-view coordinate transformation
				const model2 = Model2View.model2view(position.model, position.matrix);

				// 1. Apply the Camera's normalizing view-to-camera coordinate transformation
				const model3 = View2Camera.view2camera(model2, scene.camera.normalizeMatrix);

				// 2. Apply the projection transformation.
				const model4 = Projection.project(model3, scene.camera);

				const model5 = Clip.clip(model4);

				// 3. Rasterize each visible line segment into pixels.
				for(const ls of model5.lineSegmentList) {
					Rasterize.rasterize(model5, ls, cn, vp);
				}
			}
		}
	}
}
