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

				PipelineFB.logMessage(position.model, "==== Render Model: " + position.model.name + " ====");

				// check(position.model)

				PipelineFB.logVertexList("0. Model    ", position.model);

				// 1. Apply the Position's model-to-view coordinate transformation
				const model1 = Model2View.model2view(position.model, position.matrix);

				PipelineFB.logVertexList("1. View     ", model1);

				// 2. Apply the Camera's normalizing view-to-camera coordinate transformation
				const model2 = View2Camera.view2camera(model1, scene.camera.normalizeMatrix);

				PipelineFB.logVertexList("2. Camera   ", model2);

				// 3. Apply the projection transformation.
				const model3 = Projection.project(model2, scene.camera);

				PipelineFB.logVertexList("3. Projected", model3);

				// 4. Clip line segments to the camera's view rectangle
				const model4 = Clip.clipModel(model3);

				PipelineFB.logVertexList("4. Clipped  ", model4);
				PipelineFB.logColorList("4. Clipped  ", model4);
				PipelineFB.logLineSegmentList("4. Clipped  ", model4);

				// 5. Rasterize each visible line segment into pixels.
				for (const ls of model4.lineSegmentList) {
					PipelineFB.logLineSegment("5. Rasterize", model4, ls);

					RasterizeAntialias.rasterize(model4, ls, vp);
				}

				PipelineFB.logMessage(position.model, "==== End Model: " + position.model.name + " ====");
			}
			else {
				PipelineFB.logMessage(position.model, "==== Hidden Model: " + position.model.name + " ====");
            }
		}
	}

	static check() {

	}

	static logMessage(model: Model, message: string) {
		if (PipelineFB.debug || model.debug)
			console.log(message);
	}

	static logVertexList(stage: String, model: Model) {
		if (PipelineFB.debug || model.debug) {
			let i = 0;
			for (const v of model.vertexList) {
				let message = stage + ": vIndex = " + i.toString().padStart(3) + ", " + v.toString();
				console.log(message);
				++i;
            }
        }
	}

	static logColorList(stage: String, model: Model) {
		if (PipelineFB.debug || model.debug) {
			let i = 0;
			for (const c of model.colorList) {
				let message = stage + ": cIndex = " + i.toString().padStart(3) + ", " + c;
				console.log(message);
				++i;
			}
		}
	}

	static logLineSegmentList(stage: String, model: Model) {
		if (PipelineFB.debug || model.debug) {
			for (const ls of model.lineSegmentList) {
				let message = stage + ": " + ls.toString();
				console.log(message);
			}
		}
	}

	static logLineSegment(stage: String, model: Model, ls: LineSegment) {
		if (PipelineFB.debug || model.debug) {
			console.log(stage + ": " + ls.toString());

			const index0 = ls.vIndex[0];
			const index1 = ls.vIndex[1];
			const v0 = new Vertex(model.vertexList[index0].x, model.vertexList[index0].y, model.vertexList[index0].z, model.vertexList[index0].w);
			const v1 = new Vertex(model.vertexList[index1].x, model.vertexList[index1].y, model.vertexList[index1].z, model.vertexList[index1].w);

			console.log("   vIndex = " + index0.toString().padStart(3) + ", " + v0.toString());
			console.log("   vIndex = " + index1.toString().padStart(3) + ", " + v1.toString());

			const cIndex0 = ls.cIndex[0];
			const cIndex1 = ls.cIndex[1];
			const c0 = model.colorList[cIndex0];
			const c1 = model.colorList[cIndex1];

			console.log("   cIndex = " + cIndex0.toString().padStart(3) + ", " + c0 + "\n");
			console.log("   cIndex = " + cIndex1.toString().padStart(3) + ", " + c1 + "\n");
		}
	}

}
