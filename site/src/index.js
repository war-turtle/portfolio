import THREE from './dep/three';
import { Turtle, Cloud } from './mesh';
import { randomInt } from './helper';

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setClearColor(0x51c4f5);

const near = -10;
const far = 100;
const width = 10;
const height = 10;
const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, near, far);

// const fov = 75;
// const aspect = 2;
// const near = 0.1;
// const far = 1000;
// const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

var controls = new THREE.OrbitControls(camera, canvas);
camera.position.set(2, 2, 10);
controls.update();

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x51c4f5, 40, 60);

// Lights

const directional = new THREE.DirectionalLight(0xffffff, 1.5);
directional.position.set(20, 20, 0);

scene.add(new THREE.AmbientLight(0xc5f5f5, 1));
scene.add(directional);

// var lights = [];
// lights[0] = new THREE.PointLight(0xffffff, 1, 0);
// lights[1] = new THREE.PointLight(0xffffff, 1, 0);
// lights[2] = new THREE.PointLight(0xffffff, 1, 0);

// lights[0].position.set(0, 200, 100);
// lights[1].position.set(100, 200, 100);
// lights[2].position.set(- 100, - 200, - 100);

// scene.add(lights[0]);
// scene.add(lights[1]);
// scene.add(lights[2]);

// var axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);

// Adding Meshes to the scene
scene.add(new Turtle().mesh);
scene.add(new Cloud(50, randomInt(-2, 2), randomInt(-2, 2)).mesh);
scene.add(new Cloud(50, randomInt(-2, 2), randomInt(-2, 2)).mesh);
scene.add(new Cloud(50, randomInt(-2, 2), randomInt(-2, 2)).mesh);
scene.add(new Cloud(50, randomInt(-2, 2), randomInt(-2, 2)).mesh);

(function createFloor() {

    const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100), new THREE.MeshBasicMaterial({ color: 0xe0dacd }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -10;

    scene.add(floor);
}());


function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function render() {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;

        camera.left = -canvas.clientWidth / 200;
        camera.right = canvas.clientWidth / 200;
        camera.top = canvas.clientHeight / 200;
        camera.bottom = -canvas.clientHeight / 200;

        // camera.aspect = canvas.clientWidth / canvas.clientHeight;

        camera.updateProjectionMatrix();
        controls.update();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);
