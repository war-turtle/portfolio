import THREE from "../dep/three";

// Geometries
const sphereGeometry = new THREE.SphereBufferGeometry(1, 6, 3, 0, Math.PI * 2, 0, 0.5 * Math.PI);
const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);

// Materials
const Materials = {
    brown: new THREE.MeshPhongMaterial({ color: 'brown', flatShading: true }),
    green: new THREE.MeshPhongMaterial({ color: 'green', flatShading: true }),
    grey: new THREE.MeshPhongMaterial({ color: 'grey', flatShading: true })
};

// Mesh classes
class Turtle {
    constructor() {
        this.mesh = new THREE.Group();

        this.mesh.add(this.createShell());
        this.mesh.add(this.createFace());
        this.mesh.add(this.createEye());
        this.mesh.add(this.createLeg());
    }

    createShell() {
        const sphere = new THREE.Mesh(sphereGeometry, Materials.brown);
        sphere.rotation.set(0, Math.PI / 2, 0);

        return sphere;
    }

    createFace() {
        const face = new THREE.Mesh(boxGeometry, Materials.green);
        face.position.set(1, 0.2, 0);
        face.scale.set(0.5, 0.4, 0.4);

        return face;
    }

    createEye() {
        const eye = new THREE.Mesh(boxGeometry, Materials.grey);
        eye.position.set(1.05, 0.2, 0.2);
        eye.scale.set(0.05, 0.15, 0.05);

        return eye;
    }

    createLeg() {
        const legs = new THREE.Group();

        const frontLeg = new THREE.Mesh(boxGeometry, Materials.green);
        frontLeg.position.set(0.5, 0.1, 0.8);
        frontLeg.scale.set(0.2, 0.2, 0.3);
        frontLeg.rotation.set(0, Math.PI / 6, 0);

        const backLeg = new THREE.Mesh(boxGeometry, Materials.green);
        backLeg.position.set(-0.6, 0.1, 0.75);
        backLeg.scale.set(0.2, 0.2, 0.25);
        backLeg.rotation.set(0, -Math.PI / 6, 0);

        legs.add(frontLeg);
        legs.add(backLeg);
        return legs;
    }
}

export { Turtle };