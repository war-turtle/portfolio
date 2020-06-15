import THREE from "../dep/three";
import gsap from 'gsap';
import { randomInt } from "../helper";

// Geometries
const sphereGeometry = new THREE.SphereBufferGeometry(1, 6, 3, 0, Math.PI * 2, 0, 0.5 * Math.PI);
const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);

// Materials
const Materials = {
    brown: new THREE.MeshPhongMaterial({ color: '#442727', flatShading: true, shininess: 30 }),
    green: new THREE.MeshPhongMaterial({ color: '#06623b', flatShading: true, shininess: 30 }),
    grey: new THREE.MeshPhongMaterial({ color: '#eeeeee', flatShading: true }),
};

// Mesh classeseeeeee
class Turtle {
    constructor(x, y) {
        this.initX = x;
        this.mesh = new THREE.Group();

        this.mesh.add(this.createShell());
        this.mesh.add(this.createFace());

        const legs = this.createLeg();
        this.mesh.add(legs[0]);

        this.mesh.rotation.set(0, -0.3, 0);
        this.mesh.position.set(x, y, 0);

        this.animateTurtle(legs[1], legs[2]);
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
        backLeg.position.set(-0.1, 0, 0.25);
        backLeg.scale.set(0.2, 0.2, 0.25);

        backLegPivot.add(backLeg);

        legs.add(frontLegPivot);
        legs.add(backLegPivot);
        return [legs, frontLegPivot, backLegPivot];
    }

    animateTurtle(frontLegPivot, backLegPivot) {
        const initX = this.initX;

        function animation(turtle) {
            if (turtle.x >= -initX) {
                turtle.x = initX;
            }
            gsap.to(turtle, {
                duration: 1,
                delay: 1,
                x: "+=0.1",
                ease: "power1.out",
                onComplete: animation,
                onCompleteParams: [turtle]
            });
        }

        gsap.delayedCall(1, animation, [this.mesh.position]);
        gsap.to(frontLegPivot.rotation, {
            duration: 1,
            y: 0,
            x: Math.PI / 6,
            repeat: -1,
            yoyo: true,
            ease: "power1.out"
        }, 0);
        gsap.to(backLegPivot.rotation, {
            duration: 1,
            y: -Math.PI / 3,
            x: Math.PI / 6,
            repeat: -1,
            yoyo: true,
            ease: "power1.out"
        }, 0);
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
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.mesh = this.createClouds(width / 200 + 2, randomInt(-height / 300, height / 300), 1);

        this.animateCloud();
    }

    createClouds(x, y, z) {
        const clouds = new THREE.Group();

        const cloudGeo = new THREE.SphereGeometry(5, 4, 6);
        const cloud1 = new THREE.Mesh(cloudGeo, Materials.grey);
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
            duration: randomInt(10, 15),
            x: -this.width / 200 - 2,
            repeat: -1,
            repeatDelay: 0,
            delay: randomInt(0, 10),
            ease: "none",
            onRepeat: () => {
                this.mesh.position.y = randomInt(-this.height / 300, this.height / 300);
            }
        });
    }
}

export { Turtle, Cloud };