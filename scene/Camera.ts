/*

*/

/**

*/
class Camera {
	perspective: boolean;

	normalizeMatrix: Matrix;

	left: number;
	right: number;
	bottom: number;
	top: number;
	n: number;

	/**

	*/
	constructor() {
		this.left = -1.0;
		this.right = 1.0;
		this.bottom = -1.0;
		this.top = 1.0;
		this.n = -1.0;

		this.normalizeMatrix = PerspectiveNormalizeMatrix.build(this.left, this.right, this.bottom, this.top, this.n);

		this.perspective = true;
	}


	projPerspective(left: number, right: number, top: number, bottom: number, near: number) {
		this.left = left;
		this.right = right;
		this.top = top;
		this.bottom = bottom;
		this.n = -near;

		this.normalizeMatrix = PerspectiveNormalizeMatrix.build(this.left, this.right, this.bottom, this.top, this.n);

		this.perspective = true;
	}

	//This method is similar to the projPerspective() method in Java. It's renamed so that it doesn't share the name with the above method
	projPerspectiveReset() {
		this.projPerspective(-1.0, 1.0, -1.0, 1.0, 1.0);
    }


	projOrtho(left: number, right: number, top: number, bottom: number) {
		this.left = left;
		this.right = right;
		this.top = top;
		this.bottom = bottom;
		this.n = 0;

		this.normalizeMatrix = OrthographicNormalizeMatrix.build(this.left, this.right, this.bottom, this.top);

		this.perspective = false;
	}

	projOrthoReset() {
		this.projOrtho(-1.0, 1.0, -1.0, 1.0);
    }
}
