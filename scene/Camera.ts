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


	projPerspective(left: number, right: number, bottom: number, top: number, near: number) {
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


	projOrtho(left: number, right: number, bottom: number, top: number) {
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


	// For debugging
	toString() {
		const fovy = 2.0 * (180. / Math.PI) * Math.atan(this.top / -this.n);
		const ratio = (this.right - this.left) / (this.top - this.bottom);
		let result = "";
		result += "Camera: \n";
		result += "perspective = " + this.perspective + "\n";
		result += "left = " + this.left + ", "
			+ "right = " + this.right + "\n"
			+ "bottom = " + this.bottom + ", "
			+ "top = " + this.top + "\n"
			+ "near = " + -this.n + "\n"
			+ "(fovy = " + fovy + ", aspect = " + ratio + ")\n"
			+ "Normalization Matrix\n"
			+ this.normalizeMatrix.toString();

		return result;
    }
}
