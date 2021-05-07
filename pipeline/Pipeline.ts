/*

*/

/**

*/
class Pipeline {

	static debug: boolean = false;
	/**

	*/
	static render(scene:Scene, cn:HTMLCanvasElement) {

		// Render every Model in the Scene.
		for(const position of scene.positionList) {
			if (position.model.visible) {

				// 1. Apply the Position's model-to-view coordinate transformation
				const model2 = Model2View.model2view(position.model, position.matrix);

				// 1. Apply the Camera's normalizing view-to-camera coordinate transformation
				const model3 = View2Camera.view2camera(model2, scene.camera.normalizeMatrix);

				// 2. Apply the projection transformation.
				const model4 = Projection.project(model3, scene.camera);

				// 3. Rasterize each visible line segment into pixels.
				for(const ls of model4.lineSegmentList) {
					Rasterize.rasterize(model4, ls, cn);
				}
			}
		}
	}


	static logMessage(model: Model, message: string) {
		if (Pipeline.debug || model.debug)
			console.log(message);
	}

	static logVertexList(stage: String, model: Model) {
		if (Pipeline.debug || model.debug) {
			let i = 0;
			for (const v of model.vertexList) {
				let message = stage + ": vIndex = " + i.toString().padStart(3) + ", " + v.toString();
				console.log(message);
				++i;
			}
		}
	}

	static logColorList(stage: String, model: Model) {
		if (Pipeline.debug || model.debug) {
			let i = 0;
			for (const c of model.colorList) {
				let message = stage + ": cIndex = " + i.toString().padStart(3) + ", " + c;
				console.log(message);
				++i;
			}
		}
	}

	static logLineSegmentList(stage: String, model: Model) {
		if (Pipeline.debug || model.debug) {
			for (const ls of model.lineSegmentList) {
				let message = stage + ": " + ls.toString();
				console.log(message);
			}
		}
	}

	static logLineSegment(stage: String, model: Model, ls: LineSegment) {
		if (Pipeline.debug || model.debug) {
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

			console.log("   cIndex = " + cIndex0.toString().padStart(3) + ", " + c0[0] + " " + c0[1] + " " + c0[2] + " " + c0[3] + "\n");
			console.log("   cIndex = " + cIndex1.toString().padStart(3) + ", " + c1[0] + " " + c1[1] + " " + c1[2] + " " + c1[3] + "\n");
		}
	}
}
