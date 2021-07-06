import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// textloader
const tl = new THREE.TextureLoader();
const normalMap = tl.load("/textures/NormalMap.png");
/**
 * Test sphere
 */
const testSphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({
    normalMap,
    roughness: 0.2,
    color: "#292929",
    metalness: 0.7
  })
);
scene.add(testSphere);

// lights
const pointL = new THREE.PointLight("#ff0000", 2.5);
pointL.position.set(1, 1, 0.5);
scene.add(pointL);

const pointL2 = new THREE.PointLight("#0000ff", 2.5);
pointL2.position.set(-1, -1, 0.5);
scene.add(pointL2);

const pointL3 = new THREE.PointLight("#ffffff", 0.5);
pointL3.position.set(0, 1, 0.5);
scene.add(pointL3);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 4);
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let time,
  mouseX = 0,
  mouseY = 0,
  prevY = 0;

window.onmousemove = e => {
  prevY = mouseY;
  mouseX = e.clientX / window.innerWidth - 0.5;
  mouseY = -e.clientY / window.innerHeight;
  camera.position.z += mouseY - prevY;
};

(function animate() {
  time = clock.getElapsedTime();

  testSphere.rotation.y = time / 2;
  testSphere.rotation.y += mouseX - testSphere.rotation.y;

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
})();
