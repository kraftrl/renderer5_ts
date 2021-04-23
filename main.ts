
const scene = new Scene();
//scene.camera.projPerspective();
scene.camera.projPerspectiveReset();

scene.addPosition( [new Position(new   Cube())] );
scene.addPosition( [new Position(new  Cube2())] );
scene.addPosition( [new Position(new Circle())] );
scene.addPosition( [new Position(new CylinderSector())] );

for (const p of scene.positionList) {
	ModelShading.setColor(p.model, "#0000FF");
	p.model.visible = false;
	for(const vertex of p.model.vertexList) {
		vertex.z -= 3.0;
	}
}

const axes = new Axes2D(-10,10,-10,10,-8,11,11);
ModelShading.setColor(axes, "#FF0000");
scene.addPosition( [new Position(axes)] );
for(const vertex of axes.vertexList) {
	vertex.z -= 1.0;
}

// currentModel will cycle through all but
// the last mode, the axes
let currentPosition = 0;
scene.positionList[currentPosition].model.visible = true;

console.log(scene);
print_help_message();

const cn = <HTMLCanvasElement>document.getElementById("pixels");
const ctx = cn.getContext("2d");
if (ctx != null) {
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	//ctx.clearRect(0, 0, cn.width, cn.height);
	//ctx.fillStyle = "black";
	//ctx.fillRect(0, 0, cn.width, cn.height);
	Pipeline.render(scene, cn);
}
else {
	console.log("cn.getContext(2d) is null");
}

document.addEventListener('keypress', keyPressed);

function keyPressed(event: { key: string }) {
	//console.log(event.code);
	//console.log(event.key);
	//console.log(event.keyCode);
	//console.log(event.charCode);
	const c = event.key;
	if ('h' == c) {
		print_help_message();
	}
	else if ('d' == c) {
		// nothing yet
	}
	else if ('p' == c) {
		scene.camera.perspective = ! scene.camera.perspective;
		let p = scene.camera.perspective ? "perspective" : "orthographic";
		console.log("Using " + p + " projection");
	}
	else if ('s' == c) {
		scene.positionList[currentPosition].matrix.mult(Matrix.scaleConst(1 / 1.1));
	}
	else if ('S' == c) {
		scene.positionList[currentPosition].matrix.mult(Matrix.scaleConst(1.1));
	}
	else if ('x' == c) {
		scene.positionList[currentPosition].matrix.mult(Matrix.translate(-0.1, 0, 0));
	}
	else if ('y' == c) {
		scene.positionList[currentPosition].matrix.mult(Matrix.translate(0, -0.1, 0));
	}
	else if ('z' == c) {
		scene.positionList[currentPosition].matrix.mult(Matrix.translate(0, 0, -0.1))
	}
	else if ('X' == c) {
		scene.positionList[currentPosition].matrix.mult(Matrix.translate(0.1, 0, 0));
	}
	else if ('Y' == c) {
		scene.positionList[currentPosition].matrix.mult(Matrix.translate(0, 0.1, 0));
	}
	else if ('Z' == c) {
		scene.positionList[currentPosition].matrix.mult(Matrix.translate(0, 0, 0.1));
	}
	else if ('c' == c) {
		ModelShading.setRandomColor( scene.positionList[currentPosition].model );
	}
	else if ('C' == c) {
		ModelShading.setRandomVertexColors(scene.positionList[currentPosition].model );
	}
	else if ('e' == c) {
		ModelShading.setRandomLineSegmentColors(scene.positionList[currentPosition].model );
	}
	else if ('E' == c) {
		ModelShading.setRainbowLineSegmentColors(scene.positionList[currentPosition].model );
	}
	else if ('/' == c) {
		scene.positionList[currentPosition].model.visible = false;
		currentPosition = (currentPosition + 1) % (scene.positionList.length - 1);
		scene.positionList[currentPosition].model.visible = true;
	}
	else if ('1' == c) {
		// Shift camera right
		scene.camera.left += 0.1;
		scene.camera.right += 0.1;
		updateNormalizeMatrix(scene.camera);
	}
	else if ('2' == c) {
		// Shift camera left
		scene.camera.left -= 0.1;
		scene.camera.right -= 0.1;
		updateNormalizeMatrix(scene.camera);
	}
	else if ('3' == c) {
		// Shift camera up
		scene.camera.top += 0.1;
		scene.camera.bottom += 0.1;
		updateNormalizeMatrix(scene.camera);
	}
	else if ('4' == c) {
		// Shift camera down
		scene.camera.top -= 0.1;
		scene.camera.bottom -= 0.1;
		updateNormalizeMatrix(scene.camera);
	}
	else if ('5' == c) {
		// Shift camera forward
		scene.camera.n += 0.1;
		updateNormalizeMatrix(scene.camera);
	}
	else if ('6' == c) {
		// Shift camera backward
		scene.camera.n -= 0.1;
		updateNormalizeMatrix(scene.camera);
	}
	else if ('7' == c) {
		// Expand camera view horizontally
		scene.camera.left -= 0.1;
		scene.camera.right += 0.1;
		updateNormalizeMatrix(scene.camera);
	}
	else if ('8' == c) {
		// Contract camera view horizontally
		scene.camera.left += 0.1;
		scene.camera.right -= 0.1;
		updateNormalizeMatrix(scene.camera);
	}
	else if ('9' == c) {
		// Reset camera
		scene.camera.projPerspectiveReset();
		//updateNormalizeMatrix(scene.camera);
	}
	else if ('b' == c) {
		// rotate around x axis
		scene.positionList[currentPosition].matrix.mult(Matrix.rotateX(15.0));
	}
	else if ('B' == c) {
		// rotate around x axis
		scene.positionList[currentPosition].matrix.mult(Matrix.rotateX(-15.0));
	}
	else if ('n' == c) {
		// rotate around y axis
		scene.positionList[currentPosition].matrix.mult(Matrix.rotateY(15.0));
	}
	else if ('N' == c) {
		// rotate around y axis
		scene.positionList[currentPosition].matrix.mult(Matrix.rotateY(-15.0));
	}
	else if ('m' == c) {
		// rotate around z axis
		scene.positionList[currentPosition].matrix.mult(Matrix.rotateZ(15.0));
	}
	else if ('M' == c) {
		// rotate around z axis
		scene.positionList[currentPosition].matrix.mult(Matrix.rotateZ(-15.0));
	}
	else if ('?' == c) {
		scene.positionList[currentPosition].model.visible = false;
		--currentPosition;
		if (currentPosition < 0) currentPosition = scene.positionList.length - 2;
		scene.positionList[currentPosition].model.visible = true;
	}

	const cn = <HTMLCanvasElement>document.getElementById("pixels");
	const ctx = cn.getContext("2d");
	if (ctx != null) {
		ctx.canvas.width = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
		//ctx.clearRect(0, 0, cn.width, cn.height);
		//ctx.fillStyle = "black";
		//ctx.fillRect(0, 0, cn.width, cn.height);
		Pipeline.render(scene, cn);
	}
	else {
		console.log("cn.getContext(2d) is null");
	}
}


function print_help_message()
{
	console.log("Use the 'd/D' keys to toggle debugging information on and off for the current model.");
	console.log("Use the '/' key to cycle through the models.");

	// Camera controls
	console.log("Use the 'p' key to toggle between parallel and orthographic projection.");
	//console.log("Use the '+/-' keys to zoom in and out with the camera.");
	//console.log("Use the '1' key to pan the camera left, and the '2' key to pan the camera right.");
	//console.log("Use the '3' key to pan the camera down, and the '4' key to pan the camera up.");
	//console.log("Use the '5/6' keys to rotate the camera around the y-axis");
	//console.log("Use the '7/8' keys to rotate the camera around the z-axis");
	//console.log("Use the 'r' key to reset the camera.");

	console.log("Use the x/X, y/Y, z/Z, keys to translate the model along the x, y, z axes.");
	console.log("Use the b/B, n/N, m/M keys to rotate the model around the x, y, z axes.");
	console.log("Use the s/S keys to scale the size of the model.");
	console.log("Use the 'c' key to change the random solid model color.");
	console.log("Use the 'C' key to randomly change model's colors.");
	console.log("Use the 'e' key to change the random solid edge colors.");
	console.log("Use the 'E' key to change the random edge colors.");
	console.log("Use the 'h' key to redisplay this help message.");
}

function updateNormalizeMatrix(camera: Camera) {
	if (camera.perspective) {
		let newNormalizeMatrix = PerspectiveNormalizeMatrix.build(camera.left,
			camera.right,
			camera.bottom,
			camera.top,
			camera.n);
		camera.normalizeMatrix = newNormalizeMatrix;
	}
	else {
		let newNormalizeMatrix = OrthographicNormalizeMatrix.build(camera.left,
			camera.right,
			camera.bottom,
			camera.top);
		camera.normalizeMatrix = newNormalizeMatrix;
	}
}
