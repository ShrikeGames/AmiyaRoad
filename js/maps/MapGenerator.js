import * as THREE from 'three';
const COLOUR_MAIN = new THREE.Color(0xc0bdf2);
const COLOUR_SECONDARY = new THREE.Color(0xffbef4);
const COLOUR_PILLAR = new THREE.Color(0xe0afff);
const COLOUR_GOAL = new THREE.Color(0x00ff00);

const COLOUR_BRAMBLE_MAIN = new THREE.Color(0x264e24);
const COLOUR_BRAMBLE_SECONDARY = new THREE.Color(0x65783e);
const TEXTURE_AMIYABAR = new THREE.TextureLoader().load('../images/amiyaroad/Amiyabars-logo.png');
const TEXTURE_BRAMBLE = new THREE.TextureLoader().load('../images/amiyaroad/Bramble.png');
const TEXTURE_BOOST = new THREE.TextureLoader().load('../images/amiyaroad/Boost.png');

const material = new THREE.MeshLambertMaterial();
const deathMaterial = new THREE.MeshPhongMaterial({ map: TEXTURE_BRAMBLE });

let pos;
let quad;
let scene;
let physicsWorld;
let rigidBodies;
const margin = 0.05;
const TEXTURE_PLAYER = new THREE.TextureLoader().load('../images/amiyaroad/AmiyaStare.png');

const TILE_WIDTH = 6;
const TILE_HEIGHT = 4;
const TILE_DEPTH = 12;
const GOAL_WIDTH = 12;
const GOAL_HEIGHT = 12;
const GOAL_DEPTH = 4;

const DEATH_MARGIN = 0.5;

class MapGenerator {
    constructor(scene, physicsWorld) {
        this.scene = scene;
        this.physicsWorld = physicsWorld;
        this.pos = new THREE.Vector3();
        this.quat = new THREE.Quaternion();
        this.rigidBodies = [];
    }
    initMap(levelSelected) {
        this.pos = new THREE.Vector3();
        this.quat = new THREE.Quaternion();
        this.rigidBodies = [];
        if (levelSelected == "1-1") {
            this.createMap11();
        } else if (levelSelected == "1-2") {
            this.createMap12();
        } else if (levelSelected == "1-3") {
            this.createMap13();
        }


        return this.rigidBodies;

    }
    createMap11() {
        let lastPos = new THREE.Vector3(0, 2, 0);
        let lastQuat = new THREE.Quaternion();
        const length = 61;
        const rightSideRotation = new THREE.Euler(0, 0, 0.25, 'XYZ')
        const leftSideRotation = new THREE.Euler(0, 0, -0.25, 'XYZ')
        for (let i = 0; i > -length; i--) {
            if (i % 5 == 0) {
                this.pos.set(Math.sin(i) * 2, 0, i * TILE_DEPTH);

                this.quat.set(-0.05 * i / 10.0, 0, 0, 1);
            } else {
                this.pos.set(Math.sin(i) * 2, 0, i * TILE_DEPTH);
                this.quat.set(0, 0, 0, 1);
            }


            let colour = this.createColour(i);

            if (i < 0 && (i % 30 == 0)) {
                let material = new THREE.MeshPhongMaterial({ map: TEXTURE_AMIYABAR });
                this.createAmiyaBarWithPhysics(TILE_WIDTH, 5, TILE_DEPTH/2.0, 0, this.pos, this.quat, material);
            } else {
                let material = new THREE.MeshPhongMaterial({ color: colour });
                this.createTileWithPhysics(TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, material);
                
            }
            lastPos.x = this.pos.x;
            lastPos.y = this.pos.y + 4;
            lastPos.z = this.pos.z - 1;

        }
        for (let i = 0; i > -length; i--) {
            if (i % 5 == 0) {
                continue;
            } else {
                this.pos.set(TILE_WIDTH + Math.sin(i) * 2, 1, i * TILE_DEPTH);
                this.quat.setFromEuler (rightSideRotation);
            }

            let colour = this.createColour(i);
            let material = new THREE.MeshPhongMaterial({ color: colour });
            this.createTileWithPhysics(TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, material);
            
        }
        for (let i = 0; i > -length; i--) {
            if (i % 5 == 0) {
                continue;
            } else {
                this.pos.set(-TILE_WIDTH + Math.sin(i) * 2, 1, i * TILE_DEPTH);
                this.quat.setFromEuler (leftSideRotation);
            }

            let colour = this.createColour(i);
            let material = new THREE.MeshPhongMaterial({ color: colour });
            this.createTileWithPhysics(TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, material);
            
        }
        let material = new THREE.MeshPhongMaterial({ color: COLOUR_GOAL });
        this.createGoalWithPhysics(GOAL_WIDTH, GOAL_HEIGHT, GOAL_DEPTH, 0, lastPos, lastQuat, material);
    }
    createMap12() {
        let lastPos = new THREE.Vector3(0, 2, 0);
        let lastQuat = new THREE.Quaternion();
        const length = 61;
        for (let i = 0; i > -length; i--) {
            if (i < 0) {
                if (i % 10 == 0 || (i-1) % 10 == 0) {
                    continue;
                }
            }

            this.pos.set(Math.cos(i) * 2, Math.sin(i), i * TILE_DEPTH);
            this.quat.set(0, 0, 0, 1);

            let colour = this.createColour(i);

            if (i < 0 && (i % 32 == 0)) {
                let material = new THREE.MeshPhongMaterial({ map: TEXTURE_AMIYABAR });
                this.createAmiyaBarWithPhysics(TILE_WIDTH, 5, TILE_DEPTH/2.0, 0, this.pos, this.quat, material);
                
            } else {
                let material = new THREE.MeshPhongMaterial({ color: colour });
                this.createTileWithPhysics(TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH-0.1, 0, this.pos, this.quat, material);
                
            }


            lastPos.x = this.pos.x;
            lastPos.y = this.pos.y + 4;
            lastPos.z = this.pos.z - 1;

        }

        let material = new THREE.MeshPhongMaterial({ color: COLOUR_GOAL });
        this.createGoalWithPhysics(GOAL_WIDTH, GOAL_HEIGHT, GOAL_DEPTH, 0, lastPos, lastQuat, material);
    }
    createMap13() {
    }
    createPlayer() {
        this.pos.set(0, 3, 0);
        this.quat.set(0, 0, 0, 1);
        const playerMaterial = new THREE.MeshBasicMaterial({ map: TEXTURE_PLAYER, name: "Player" });
        let body = this.createPlayerWithPhysics(0.75, 2, this.pos, this.quat, playerMaterial);

        return body;
    }
    createPlayerWithPhysics(radius, mass, pos, quat, material) {

        const object = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32), material);
        const shape = new Ammo.btSphereShape(radius);
        shape.setMargin(margin);
        object.name = "Player";
        object.receiveShadow = true;
        object.castShadow = true;
        object.body = this.createRigidBody(object, shape, mass, pos, quat, scene);
        return object;

    }
    createTileWithPhysics(sx, sy, sz, mass, pos, quat, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
        shape.setMargin(margin);
        object.name = "Tile";
        object.receiveShadow = true;
        object.body = this.createRigidBody(object, shape, mass, pos, quat);
        //this.pos.set(this.pos.x, this.pos.y, this.pos.z +(TILE_DEPTH/2.0));
        //this.createDeathWithPhysics(TILE_WIDTH -DEATH_MARGIN, TILE_HEIGHT-DEATH_MARGIN, 0.1, 0, this.pos, this.quat, deathMaterial);
        return object;

    }
    createDeathWithPhysics(sx, sy, sz, mass, pos, quat, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
        shape.setMargin(margin);
        object.name = "Death";
        object.body = this.createRigidBody(object, shape, mass, pos, quat);

        return object;

    }
    createAmiyaBarWithPhysics(sx, sy, sz, mass, pos, quat, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
        shape.setMargin(margin);
        object.name = "AmiyaBar";
        object.receiveShadow = true;
        object.body = this.createRigidBody(object, shape, mass, pos, quat);
        return object;

    }
    createGoalWithPhysics(sx, sy, sz, mass, pos, quat, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
        shape.setMargin(margin);
        object.name = "Goal";

        object.receiveShadow = true;
        object.body = this.createRigidBody(object, shape, mass, pos, quat);

        return object;
    }

    createRigidBody(object, physicsShape, mass, pos, quat, vel, angVel) {

        if (pos) {

            object.position.copy(pos);

        } else {

            pos = object.position;

        }

        if (quat) {

            object.quaternion.copy(quat);

        } else {

            quat = object.quaternion;

        }

        const transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
        transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
        const motionState = new Ammo.btDefaultMotionState(transform);

        const localInertia = new Ammo.btVector3(0, 0, 0);
        physicsShape.calculateLocalInertia(mass, localInertia);

        const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, physicsShape, localInertia);
        const body = new Ammo.btRigidBody(rbInfo);

        body.setFriction(0);
        body.setRollingFriction(0);
        //body.setDamping(0.5);
        if (vel) {

            body.setLinearVelocity(new Ammo.btVector3(vel.x, vel.y, vel.z));

        }

        if (angVel) {

            body.setAngularVelocity(new Ammo.btVector3(angVel.x, angVel.y, angVel.z));

        }

        object.userData.physicsBody = body;
        object.userData.collided = false;

        this.scene.add(object);

        if (mass > 0) {

            this.rigidBodies.push(object);

            // Disable deactivation
            body.setActivationState(4);

        }
        body.name = object.name;
        this.physicsWorld.addRigidBody(body);

        return body;

    }


    createColour(i) {
        if (i % 2 == 0) {
            return COLOUR_MAIN
        }
        return COLOUR_SECONDARY;

    }

}

export { MapGenerator };
