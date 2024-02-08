import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
let scene, camera, renderer, pointLight, controls;

window.addEventListener("load", init);

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  camera.position.set(0, 0, +500);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // textureを追加
  let texture = new THREE.TextureLoader().load("./textures/earth.jpg");

  // ジオメトリを作成
  let ballGeometry = new THREE.SphereGeometry(100, 64, 32);

  // マテリアルを作成
  let ballMaterial = new THREE.MeshPhysicalMaterial({ map: texture });

  // メッシュ化
  let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);

  scene.add(ballMesh);

  // 平行光源を追加
  let directionalLight = new THREE.DirectionalLight(0xffffff, 4);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // ポイント光源
  pointLight = new THREE.PointLight(0xffffff, 60000);

  // ポイント光源の位置を特定
  pointLight.position.set(-200, -200, -200);
  scene.add(pointLight);

  // マウス操作
  controls = new OrbitControls(camera, renderer.domElement);
  // let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  // scene.add(pointLightHelper);

  window.addEventListener("resize", onWindowResize);
  animate();
}

// ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  // カメラのアスペクト比
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

// ポイント光源を球の周りを巡回させる

const animate = () => {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );

  // レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
