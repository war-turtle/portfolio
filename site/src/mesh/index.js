import THREE from "../dep/three";
import gsap from 'gsap';
import { randomInt } from "../helper";

// Geometries
const sphereGeometry = new THREE.SphereBufferGeometry(1, 6, 3, 0, Math.PI * 2, 0, 0.5 * Math.PI);
const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);

// const wingGeometry = new THREE.BoxGeometry(1, 0.05, 1);
// wingGeometry.vertices[0].x -= 0.5;
// wingGeometry.vertices[2].x -= 0.5;

// Materials
const Materials = {
    brown: new THREE.MeshPhongMaterial({ color: '#442727', flatShading: true, shininess: 30 }),
    green: new THREE.MeshPhongMaterial({ color: '#06623b', flatShading: true, shininess: 30 }),
    grey: new THREE.MeshPhongMaterial({ color: 'grey', flatShading: true }),
    clouds: new THREE.MeshPhongMaterial({ color: 0xeeeeee, flatShading: true }),
};

// Mesh classes
class Turtle {
    constructor() {
        this.mesh = new THREE.Group();

        this.mesh.add(this.createShell());
        this.mesh.add(this.createFace());
        this.mesh.add(this.createLeg());

        this.mesh.position.set(-1, 0, 0);

        this.animateTurtle();
    }

    createShell() {
        const sphere = new THREE.Mesh(sphereGeometry, Materials.brown);
        sphere.rotation.set(0, Math.PI / 2, 0);

        return sphere;
    }

    createFace() {
        const group = new THREE.Group;

        const face = new THREE.Mesh(boxGeometry, Materials.green);
        face.position.set(1, 0.2, 0);
        face.scale.set(0.5, 0.4, 0.4);

        const eye = new THREE.Mesh(boxGeometry, Materials.grey);
        eye.position.set(1.05, 0.2, 0.2);
        eye.scale.set(0.05, 0.01, 0.05);

        group.add(face);
        group.add(eye);

        this.animateFace(face);
        this.animateEye(eye);

        return group;
    }

    createLeg() {
        const legs = new THREE.Group();

        const frontLegPivot = new THREE.Group();
        frontLegPivot.position.set(0.5, 0, 0.7);
        frontLegPivot.rotation.set(0, Math.PI / 6, 0);

        const frontLeg = new THREE.Mesh(boxGeometry, Materials.green);
        frontLeg.position.set(0, 0.1, 0.05);
        frontLeg.scale.set(0.2, 0.2, 0.3);

        frontLegPivot.add(frontLeg);

        const backLegPivot = new THREE.Group();
        backLegPivot.position.set(-0.5, 0.1, 0.5);
        backLegPivot.rotation.set(0, -Math.PI / 6, 0);

        const backLeg = new THREE.Mesh(boxGeometry, Materials.green);
        // backLeg.position.set(-0.6, 0.1, 0.75);
        backLeg.position.set(-0.1, 0, 0.25);
        backLeg.scale.set(0.2, 0.2, 0.25);

        backLegPivot.add(backLeg);

        const point = new THREE.Geometry();
        point.vertices.push(
            new THREE.Vector3(-0.5, 0.1, 0.5)
        );

        legs.add(new THREE.Points(point, new THREE.PointsMaterial({ color: "red", size: 0.1 })))

        this.animateLegs(frontLegPivot, backLegPivot);

        legs.add(frontLegPivot);
        legs.add(backLegPivot);
        return legs;
    }

    animateTurtle() {
        gsap.to(this.mesh.position, {
            duration: 1,
            y: 0.2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
        });
    }

    animateLegs(frontLegPivot, backLegPivot) {
        gsap.to(frontLegPivot.rotation, {
            duration: 1,
            y: 0,
            x: Math.PI / 6,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

        gsap.to(backLegPivot.rotation, {
            duration: 1,
            y: -Math.PI / 3,
            x: Math.PI / 6,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        })
    }

    animateFace(face) {
        gsap.to(face.rotation, {
            duration: 1,
            z: -Math.PI / 10,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
        });
    }

    animateEye(eye) {
        gsap.to(eye.scale, {
            duration: 1,
            y: 0.1,
            repeat: -1,
            yoyo: true,
        });
    }
}

class Cloud {
    constructor(x, y, z) {
        this.mesh = this.createClouds(x, y, z);

        this.animateCloud();
    }

    createClouds(x, y, z) {
        const clouds = new THREE.Group();

        const cloudGeo = new THREE.SphereGeometry(5, 4, 6);
        const cloud1 = new THREE.Mesh(cloudGeo, Materials.clouds);
        cloud1.scale.set(1, 0.8, 1);

        const cloud2 = cloud1.clone();
        cloud2.scale.set(.55, .35, 1);
        cloud2.position.set(5, -1.5, 2);

        const cloud3 = cloud1.clone();
        cloud3.scale.set(.75, .5, 1);
        cloud3.position.set(-5.5, -2, -1);

        clouds.add(cloud1);
        clouds.add(cloud2);
        clouds.add(cloud3);

        clouds.scale.set(0.1, 0.1, 0.1);
        clouds.position.set(x, y, z);

        return clouds;
    }

    animateCloud() {
        gsap.to(this.mesh.position, {
            duration: 5,
            x: -20,
            repeat: -1,
            repeatDelay: 0,
            delay: randomInt(0, 10),
            repeatDelay: randomInt(0, 5),
            onRepeat: () => {
                this.mesh.position.y = randomInt(-2, 2);
                this.mesh.position.z = randomInt(-2, 2);
            }
        });
    }
}

export { Turtle, Cloud };