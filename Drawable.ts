import {
	Color,
	EdgesGeometry,
	LineBasicMaterial,
	LineSegments,
	Mesh,
	MeshBasicMaterial,
	Shape,
	ShapeGeometry,
	Vector2
} from "three";

const meshBasicMaterial = new MeshBasicMaterial({
	color: 0xffffff,
	side: 2
});

const lineBasicMaterial = new LineBasicMaterial({
	color: 0x4D7DAC,
	linewidth: 10
});

export function createExampleObject(): Mesh {
	const slabShape = buildShape();

	const slabFieldGeometry = new ShapeGeometry(slabShape);
	const mesh = new Mesh(slabFieldGeometry, meshBasicMaterial);
	mesh.position.z = 0;

	const edgeSlabFieldGeometry = new EdgesGeometry(slabFieldGeometry);
	const outline = new LineSegments(edgeSlabFieldGeometry, lineBasicMaterial);
	mesh.add(outline);

	slabFieldGeometry.computeBoundingBox();
	
	return mesh;
}

function buildShape(): Shape {
	const shape = new Shape([
		new Vector2(-25333, 33190),
		new Vector2(-25333, -10808),
		new Vector2(25333, -10808),
		new Vector2(25333, 33190)
	]);

	shape.holes.push(new Shape([
		new Vector2(4663, 1191),
		new Vector2(4663, -2808),
		new Vector2(6663, -2808),
		new Vector2(6663, 1191),
	]));

	shape.holes.push(new Shape([
		new Vector2(14663, 1441),
		new Vector2(14663, 1191),
		new Vector2(18663, 1191),
		new Vector2(18663, 1441),
	]));

	return shape;
}
