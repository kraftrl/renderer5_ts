/*

*/

/**

*/
class Vertex {

	x: number;
	y: number;
	z: number;
	w: number;


	/**

	*/
	constructor(x: number, y: number, z: number, w: number = 1.0) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	toString() {
		const precision = 5;
		return this.toStringP(precision);
    }

	toStringP(precision: number) {
		const iWidth = 3;
		return this.toStringiWidth(precision, iWidth);
	}

	toStringiWidth(precision: number, iWidth: number) {
		const p = precision;
		const t = p + iWidth + 2;

		let x1: string = this.x.toPrecision(p);
		let y1: string = this.y.toPrecision(p);
		let z1: string = this.z.toPrecision(p);
		let w1: string = this.w.toPrecision(p);

		return "(x, y, z, w) = (" + x1.padStart(t) + "  " + y1.padStart(t) + "  " + z1.padStart(t) + "  " + w1.padStart(t) + ")";
	}
}
