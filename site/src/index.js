import THREE from './dep/three';
import { Turtle, Cloud } from './mesh';

// WebGL Renderer
const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

// Camera
const near = 0;
const far = 100;
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, near, far);
camera.position.set(0, 1, 10);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

// Lights
const directional = new THREE.DirectionalLight(0xffffff, 1.5);
directional.position.set(20, 20, 0);

scene.add(new THREE.AmbientLight(0xc5f5f5, 1));
scene.add(directional);

// Adding Meshes to the scene
scene.add(new Turtle(-width / 200 - 1.5, -height / 200).mesh);
scene.add(new Cloud(width, height).mesh);
scene.add(new Cloud(width, height).mesh);
scene.add(new Cloud(width, height).mesh);
scene.add(new Cloud(width, height).mesh);

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

        camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);
