import * as THREE from 'https://cdn.skypack.dev/three';

let scene, camera, renderer, sub;
let log = document.getElementById('log');

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x330000, 5, 15);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('game') });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.PointLight(0xff3333, 1, 100);
  light.position.set(0, 0, 2);
  scene.add(light);

  const geometry = new THREE.BoxGeometry(2, 2, 4);
  const material = new THREE.MeshStandardMaterial({ color: 0x111111 });
  sub = new THREE.Mesh(geometry, material);
  scene.add(sub);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.moveForward = function () {
  sub.position.z -= 0.2;
  logMessage("Подлодка движется вперёд...");
};

window.moveBackward = function () {
  sub.position.z += 0.2;
  logMessage("Подлодка движется назад...");
};

window.pingSonar = function () {
  logMessage("Сонар: *ПИНГ* ... ничего не обнаружено.");
};

function logMessage(msg) {
  const p = document.createElement("div");
  p.textContent = msg;
  log.prepend(p);
}
