import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ParametricGeometry } from "three/addons/geometries/ParametricGeometry.js";
import { ParametricGeometries } from "three/addons/geometries/ParametricGeometries.js";

var screensaver;
function setup_canvas_3d() {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000,
	);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.domElement.style.position = "absolute";
	renderer.domElement.style.top = "0";
	renderer.domElement.style["z-index"] = "5";
	renderer.domElement.style.opacity = "0";
	document.body.appendChild(renderer.domElement);

	// const controls = new OrbitControls(camera, renderer.domElement);
	const loader = new GLTFLoader();
	console.log("Done Three.js");

	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	console.log(ParametricGeometries);
	const clock = new THREE.Clock(true);
	const geom1 = new ParametricGeometry(
		(u, v, vec) => {
			const x = u * 40 - 20;
			const y = v * 40 - 20;
			const c = 0;
			const r = 2 * Math.sqrt(x ** 2 + y ** 2);
			const z = (3 * Math.sin(r - c)) / (1 + r);
			vec.set(x, y, z);
		},
		125,
		125,
	);
	geom1.attributes.position.setUsage(THREE.DynamicDrawUsage);
	// const geom1 = new THREE.PlaneGeometry(10, 3, 20, 3);
	const material2 = new THREE.MeshStandardMaterial({
		color: 0x00ffff,
		roughness: 0.4,
	});
	const klein = new THREE.Mesh(geom1, material2);
	klein.rotation.x -= Math.PI / 2;
	scene.add(klein);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
	scene.add(directionalLight);

	camera.position.x = 5;
	camera.position.y = 5;
	camera.position.z = 5;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	console.log(geom1.attributes.position);

	function animate() {
		requestAnimationFrame(animate);
		geom1.computeVertexNormals();

		const positionAttribute = geom1.getAttribute("position");

		const vertex = new THREE.Vector3();
		const c = clock.getElapsedTime() % (2 * Math.PI);

		for (let i = 0; i < positionAttribute.count; i++) {
			vertex.fromBufferAttribute(positionAttribute, i);

			const r = 2 * Math.sqrt(vertex.x ** 2 + vertex.y ** 2);
			const z = (3 * Math.sin(r - c)) / (1 + r);
			vertex.set(vertex.x, vertex.y, z); // update vertex

			positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
		}

		positionAttribute.needsUpdate = true;

		renderer.render(scene, camera);
	}
	animate();

	screensaver = renderer.domElement;
}
setup_canvas_3d();

let screensaver_timeout = setTimeout(() => {
	add_screensaver();
}, 10_000);
function add_screensaver() {
	screensaver.classList = ["show-screensaver"];
}

function remove_screensaver() {
	screensaver.classList = [];
	clearTimeout(screensaver_timeout);
	screensaver_timeout = setTimeout(() => {
		add_screensaver();
	}, 10_000);
}

var canvas = document.getElementById("canvas-2d");
var ctx = canvas.getContext("2d");

resize();

// last known position
var pos = { x: 0, y: 0 };

window.addEventListener("resize", resize);
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);

document.addEventListener("mousedown", remove_screensaver);

// document.addEventListener("mouseenter", setPosition);

// new position from mouse event
function setPosition(e) {
	pos.x = e.clientX;
	pos.y = e.clientY;
}

// resize canvas
function resize() {
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
}

function draw(e) {
	// mouse left button must be pressed
	if (e.buttons !== 1) return;

	ctx.beginPath(); // begin

	ctx.lineWidth = 5;
	ctx.lineCap = "round";
	ctx.strokeStyle = "#c0392b";

	ctx.moveTo(pos.x, pos.y); // from
	setPosition(e);
	ctx.lineTo(pos.x, pos.y); // to

	ctx.stroke(); // draw it!
}
