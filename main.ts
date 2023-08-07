import {createExampleObject} from './Drawable';
import {AmbientLight, Box3, Color, DirectionalLight, OrthographicCamera, Scene, Vector3, WebGLRenderer} from 'three';

function initScene(): [Scene, OrthographicCamera, WebGLRenderer] {
	const scene = new Scene();
	scene.background = new Color(0xd0d0d0); // Light grey background

	const camera = setupCamera(scene);
	camera.updateProjectionMatrix();

	const renderer: WebGLRenderer = new WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	return [scene, camera, renderer];
}

function setupCamera(scene: Scene): OrthographicCamera {
	const width = window.innerWidth;
	const height = window.innerHeight;

	const camera = new OrthographicCamera(
		width / -2,
		width / 2,
		width / 2,
		width / -2,
	);

	camera.zoom = 0.02;
	camera.near = 0;
	camera.far = 10;

	camera.position.set(0, 0, 5);

	return camera;
}

function setupLights(scene: Scene): void {
	const ambientLight: AmbientLight = new AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);

	const directionalLight: DirectionalLight = new DirectionalLight(0xffffff, 1);
	directionalLight.position.set(1, 1, 1);
	scene.add(directionalLight);
}

function resizeRendererToWindow(renderer: WebGLRenderer, camera: OrthographicCamera): void {
	const newWidth = window.innerWidth;
	const newHeight = window.innerHeight;

	// Update camera's size based on the new aspect ratio
	const halfWidth = newWidth / 2;
	const halfHeight = newHeight / 2;
	camera.left = -halfWidth;
	camera.right = halfWidth;
	camera.top = halfHeight;
	camera.bottom = -halfHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(newWidth, newHeight);
}

function animate(scene: Scene, camera: OrthographicCamera, renderer: WebGLRenderer): void {
	requestAnimationFrame(() => animate(scene, camera, renderer));
	renderer.render(scene, camera);
}

function renderObject(scene: Scene): void {
	scene.add(createExampleObject());
}

function main(): void {
	const [scene, camera, renderer] = initScene();

	renderObject(scene)
	setupLights(scene);

	window.addEventListener('resize', () => resizeRendererToWindow(renderer, camera));

	animate(scene, camera, renderer);
}

main();
