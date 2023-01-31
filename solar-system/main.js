import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);


//Sun
const sunTexture = new THREE.TextureLoader().load('/textures/2k_sun.jpg');
const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshBasicMaterial( {map: sunTexture } );
const sun = new THREE.Mesh(geometry, material);

scene.add(sun);

//Mercury
const mercuryTexture = new THREE.TextureLoader().load('/textures/2k_mercury.jpg');
const sphereMercury = new THREE.SphereGeometry( 4, 16, 16 );
const mercuryMaterial = new THREE.MeshBasicMaterial( {map: mercuryTexture } );
const mercury = new THREE.Mesh(sphereMercury, mercuryMaterial);

mercury.position.set(100, 0,0)
scene.add(mercury);

//Edge for Mercury
const edge = new THREE.CircleGeometry( 100, 100, 100 );
const edges = new THREE.EdgesGeometry( edge );
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
scene.add( line );

//Light
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(10,10,10);  

const gridHelper = new THREE.GridHelper( 1000, 1000 );
const lightHelper = new THREE.PointLightHelper(light);
const ambientLight = new THREE.AmbientLight(0x404040);

scene.add(light, lightHelper, ambientLight, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);


const spaceTexture = new THREE.TextureLoader().load('/textures/space.jpg');
scene.background = spaceTexture; 


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  sun.rotation.x += 0.01;


  mercury.rotation.x += 0.01;

  camera.position.z = t * -0.01;
  camera.position.y = t * -0.01;
  camera.position.x = t * -0.01;

}
document.body.onscroll = moveCamera;
function animate() {
  sun.rotation.x += 0.01;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  controls.update();
}
animate();
