import * as THREE from 'three';

const COLOUR_BLANK = new THREE.Color(0xffffff);

const COLOUR_MAIN = new THREE.Color(0xc0bdf2);
const COLOUR_SECONDARY = new THREE.Color(0xffbef4);
const COLOUR_MAIN_WORLD2 = new THREE.Color(0xa2daff);
const COLOUR_SECONDARY_WORLD2 = new THREE.Color(0x8dbede);
const COLOUR_MAIN_WORLD3 = new THREE.Color(0xffffff);
const COLOUR_SECONDARY_WORLD3 = new THREE.Color(0xe6f5ff);

const TEXTURE_TILE_MAIN = new THREE.TextureLoader().load('./images/amiyaroad/tiles/Tile1.png');
TEXTURE_TILE_MAIN.wrapS = THREE.RepeatWrapping;
TEXTURE_TILE_MAIN.wrapT = THREE.RepeatWrapping;
TEXTURE_TILE_MAIN.repeat.set(2, 2);
const TEXTURE_GHOST_TILE = new THREE.TextureLoader().load('./images/amiyaroad/tiles/GhostTile.png');
TEXTURE_GHOST_TILE.wrapS = THREE.RepeatWrapping;
TEXTURE_GHOST_TILE.wrapT = THREE.RepeatWrapping;
TEXTURE_GHOST_TILE.repeat.set(2, 2);
const TEXTURE_AMIYABAR = new THREE.TextureLoader().load('./images/amiyaroad/tiles/Tile2.png');
const TEXTURE_GOAL = new THREE.TextureLoader().load('./images/amiyaroad/tiles/Tile3.png');
const TEXTURE_BOOST = new THREE.TextureLoader().load('./images/amiyaroad/tiles/Tile4.png');
const TEXTURE_DEATH = new THREE.TextureLoader().load('./images/amiyaroad/tiles/Tile5.png');
const TEXTURE_BALL = new THREE.TextureLoader().load('./images/amiyaroad/tiles/Tile6.png');
const TEXTURE_SNACK = new THREE.TextureLoader().load('./images/amiyaroad/tiles/Tile11.png');
TEXTURE_SNACK.wrapS = THREE.RepeatWrapping;
TEXTURE_SNACK.wrapT = THREE.RepeatWrapping;
TEXTURE_SNACK.repeat.set(1, 1);

const TEXTURE_CHOT = new THREE.TextureLoader().load('./images/amiyaroad/tiles/ChotTile.png');
TEXTURE_CHOT.wrapS = THREE.RepeatWrapping;
TEXTURE_CHOT.wrapT = THREE.RepeatWrapping;
TEXTURE_CHOT.repeat.set(500, 500);

let currentWorld;
let currentLevel;
let inEditor;
let inPlaytest;

let editorLastPos = new THREE.Vector3(0, 30, 0);

const colourMap = {
    "1": [COLOUR_MAIN, COLOUR_SECONDARY, COLOUR_BLANK],
    "2": [COLOUR_MAIN_WORLD2, COLOUR_SECONDARY_WORLD2, COLOUR_BLANK],
    "3": [COLOUR_MAIN_WORLD3, COLOUR_SECONDARY_WORLD3, COLOUR_BLANK]
};
const tileTypes = ["Tile", "AmiyaBar", "Goal", "Boost", "Death", "Ball", "Tunnel", "", "", "Player"];

let pos;
let quad;
let scale;
let scene;
let physicsWorld;
let rigidBodies;
let allObjects;
let useTextures = true;
let useShadows = true;

const margin = 0.05;
var TEXTURE_PLAYER = new THREE.TextureLoader().load('./images/amiyaroad/Amiya.png');

TEXTURE_PLAYER.wrapS = THREE.RepeatWrapping;
TEXTURE_PLAYER.wrapT = THREE.RepeatWrapping;
TEXTURE_PLAYER.repeat.set(1, 1);

const TEXTURE_SPRING = new THREE.TextureLoader().load('./images/amiyaroad/tiles/Tile9.png');
TEXTURE_SPRING.wrapS = THREE.RepeatWrapping;
TEXTURE_SPRING.wrapT = THREE.RepeatWrapping;
TEXTURE_SPRING.repeat.set(1, 1);
const SPRING_WIDTH = 50;
const SPRING_HEIGHT = 10;
const SPRING_DEPTH = 50;


const TILE_WIDTH = 50;
const TILE_HEIGHT = 20;
const TILE_DEPTH = 100;

const AMIYABAR_WIDTH = 50;
const AMIYABAR_HEIGHT = 20;
const AMIYABAR_DEPTH = 50;

const SNACK_WIDTH = 30;
const SNACK_HEIGHT = 30;
const SNACK_DEPTH = 0.01;

//const SNACK_RADIUS = 3;

const DEATH_WIDTH = 100;
const DEATH_HEIGHT = 100;
const DEATH_DEPTH = 20;
const GOAL_WIDTH = 120;
const GOAL_HEIGHT = 120;
const GOAL_DEPTH = 40;

const BALL_RADIUS = 6;
const BALL_MASS = 2;


let tileOpacity = 1;
let tunnelOpacity = 0.75;
let tileTransparent = tileOpacity < 1;
let tunnelTransparent = tunnelOpacity < 1;


const TUNNEL_WIDTH = 50;
const TUNNEL_DEPTH = 100;
const TUNNEL_RADIAL_SEGMENTS = 16;
const TUNNEL_THICKNESS = 5;
const TEXTURE_TUNNEL_MAIN = new THREE.TextureLoader().load('./images/amiyaroad/tiles/Tile7.png');
TEXTURE_TUNNEL_MAIN.wrapS = THREE.RepeatWrapping;
TEXTURE_TUNNEL_MAIN.wrapT = THREE.RepeatWrapping;
TEXTURE_TUNNEL_MAIN.repeat.set(2, 2);

const TEXTURE_HALFPIPE_MAIN = new THREE.TextureLoader().load('./images/amiyaroad/tiles/Tile8.png');
TEXTURE_HALFPIPE_MAIN.wrapS = THREE.RepeatWrapping;
TEXTURE_HALFPIPE_MAIN.wrapT = THREE.RepeatWrapping;
TEXTURE_HALFPIPE_MAIN.repeat.set(2, 2);

const TEXTURE_CORKSCREW_MAIN = new THREE.TextureLoader().load('./images/amiyaroad/tiles/Tile10.png');
TEXTURE_CORKSCREW_MAIN.wrapS = THREE.RepeatWrapping;
TEXTURE_CORKSCREW_MAIN.wrapT = THREE.RepeatWrapping;
TEXTURE_CORKSCREW_MAIN.repeat.set(2, 2);

const CORKSCREW_OFFSET = TUNNEL_DEPTH * 0.2;
const CORK_START_ANGLE = Math.PI * 1.25;
const CORK_END_ANGLE = Math.PI * 3.25;
const CORK_RADIUS_SCALE = 1;

let playerShininess = 30;
let iceShininess = 70;
let regularShininess = 4;
let dullShininess = 2;
let tileShininess = 0;

const DEATH_MARGIN = 0.5;
let seed;
let xFriction = 0.25;
let physicsFriction = 0.2;
let rollingFriciton = 0;
let ghostTile;

let lastTileSelection = 0;


let cheat1 = false;
let cheat2 = false;
let cheat3 = false;
const PLAYER_RADIUS = 8;
const PLAYER_SCALE = 1;
const PLAYER_MASS = 4;
let playerRadius = PLAYER_RADIUS;
let playerScale = PLAYER_SCALE;
let playerMass = PLAYER_MASS;

class MapGenerator {
    constructor(scene, physicsWorld) {
        this.scene = scene;
        this.physicsWorld = physicsWorld;
        this.pos = new THREE.Vector3();
        this.quat = new THREE.Quaternion();
        this.rigidBodies = [];
        this.allObjects = [];
        this.levelString = "";
        this.snapPosition = true;
        this.snapRotation = true;
    }

    initMap(currentWorld, currentLevel, inEditor, inPlayTest, seed, levelString = "", loadedFromImage = false) {
        this.seed = seed;
        this.lastTileSelection = 0;
        console.log(seed);
        console.log("levelString", levelString);
        Math.seedrandom(seed);
        if (inEditor) {
            console.log("In editor");
            if (levelString.indexOf("~") >= 0) {

                let parts = levelString.split("~");
                this.currentWorld = parts[0];
            } else {
                this.currentWorld = $('.hud--worldSelect').val();
            }

        } else {
            this.currentWorld = currentWorld;
        }
        this.currentLevel = currentLevel;
        this.inEditor = inEditor;
        this.inPlayTest = inPlayTest;

        console.log("World", this.currentWorld);
        console.log("Level", this.currentLevel);

        this.pos = new THREE.Vector3();
        this.quat = new THREE.Quaternion();
        this.scale = new THREE.Vector3(1, 1, 1);
        this.rigidBodies = [];
        this.allObjects = [];
        if (this.editorLastPos == undefined) {
            this.editorLastPos = new THREE.Vector3(0, 30, 0);
        }

        if (inEditor) {
            this.xFriction = 0;
            this.physicsFriction = 0;
            this.rollingFriciton = 0;

        } else if (this.currentWorld == "1") {
            this.xFriction = 0.15;
            this.physicsFriction = 0.2;
            this.rollingFriciton = 0;
            this.tileShininess = regularShininess;
        } else if (this.currentWorld == "2") {
            this.xFriction = 0.4;
            this.physicsFriction = 0.4;
            this.rollingFriciton = 0;
            this.tileShininess = dullShininess;
        } else if (this.currentWorld == "3") {
            this.xFriction = 0.05;
            this.physicsFriction = 0;
            this.rollingFriciton = 0;
            this.tileShininess = iceShininess;
        } else {
            this.xFriction = 0.15;
            this.physicsFriction = 0.2;
            this.rollingFriciton = 0;
            this.tileShininess = regularShininess;
        }

        if (inEditor) {
            console.log(">Editor");
            this.levelString = levelString;
            this.createMapBuilder();
        } else if (inPlayTest) {
            console.log(">Playtest");
            if (levelString != "") {
                this.loadMapFromLevelString(levelString);
            } else {
                this.loadMapFromLevelString(this.levelString);
            }

        } else if (this.currentLevel == "?") {
            console.log(">Random Map");
            this.levelString = "";
            this.createMapRandomChaos();
        } else {
            console.log(">Level");
            if (loadedFromImage) {
                this.levelString = levelString;

            }
            this.loadMapFromLevelString(this.levelString);
        }

        return this.rigidBodies;

    }

    getColourIndex(colourSelection, hexCode) {
        if (colourSelection && colourSelection.length > 0) {
            for (let i = 0; i < colourSelection.length; i++) {
                if (colourSelection[i].getHexString() == hexCode) {
                    return i;
                }
            }
        }
        return 0;
    }
    generateLevelString(world) {

        if (world) {
            this.currentWorld = world;
        }
        let newLevelString = this.currentWorld + "~";
        let colourSelection = colourMap[this.currentWorld];


        for (let i = 0; i < this.allObjects.length; i++) {
            let object = this.allObjects[i];
            let materialInfo = this.getColourIndex(colourSelection, object.material.color.getHexString());
            let pos = object.position;
            let rotation = object.quaternion;

            let scale = object.scale;
            if (object.name.indexOf("Player") >= 0) {
                rotation.set(0, 0, 0, 1);
            }
            if (object.name.indexOf("GhostTile") < 0) {
                newLevelString += object.name + "," + materialInfo + "," + Math.round(pos.x) + "," + Math.round(pos.y) + "," + Math.round(pos.z) + "," + rotation.x + "," + rotation.y + "," + rotation.z + "," + rotation.w + "," + scale.x + "," + scale.y + "," + scale.z + "|";
            }


        }

        this.levelString = newLevelString.slice(0, -1);
        $('#levelSelect').val(this.levelString);

        return this.levelString;
    }
    getMaterial(material) {
        console.log(useTextures);
        if (useTextures) {
            return material;
        }

        material.map = null;
        return material;
    }
    loadMapFromLevelString(levelString = "") {
        this.rigidBodies = [];
        this.allObjects = [];
        console.log("loadMapFromLevelString", levelString);
        if (levelString.indexOf("~") < 0) {
            return;
        }
        let parts = levelString.split("~");

        let mapTiles = parts[1].split("|");
        if (!this.inEditor) {
            this.currentWorld = parts[0];
        }
        let colourSelection = colourMap[this.currentWorld];
        console.log("mapTiles.length", mapTiles.length);
        for (let i = 0; i < mapTiles.length; i++) {
            const tile = mapTiles[i].split(",");
            let tileType = tile[0];
            let colourIndex = parseInt(tile[1]);
            let materialHex = colourSelection[colourIndex];
            this.pos.set(parseFloat(tile[2]), parseFloat(tile[3]), parseFloat(tile[4]));
            this.quat.set(parseFloat(tile[5]), parseFloat(tile[6]), parseFloat(tile[7]), parseFloat(tile[8]));

            if (tile.length > 10) {
                this.scale = new THREE.Vector3(parseFloat(tile[9]), parseFloat(tile[10]), parseFloat(tile[11]));
            } else {
                this.scale = new THREE.Vector3(1, 1, 1);
            }
            if (tileType.indexOf("GhostTile") >= 0) {
                continue;
            }
            let newTile;

            if (tileType.indexOf("Tile") >= 0) {
                let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_TILE_MAIN, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity }));
                newTile = this.createTileWithPhysics("Tile" + i, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, this.scale, material);
            } else if (tileType.indexOf("AmiyaBar") >= 0) {
                let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_AMIYABAR, transparent: tileTransparent, opacity: tileOpacity }));
                newTile = this.createAmiyaBarWithPhysics("AmiyaBar", AMIYABAR_WIDTH, AMIYABAR_HEIGHT, AMIYABAR_DEPTH, 0, this.pos, this.quat, this.scale, material);
            } else if (tileType.indexOf("Goal") >= 0) {
                let material = this.getMaterial(new THREE.MeshPhongMaterial({ map: TEXTURE_GOAL, transparent: tileTransparent, opacity: tileOpacity }));
                newTile = this.createGoalWithPhysics("Goal", GOAL_WIDTH, GOAL_HEIGHT, GOAL_DEPTH, 0, this.pos, this.quat, this.scale, material);
            } else if (tileType.indexOf("Boost") >= 0) {
                let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_BOOST, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity }));
                newTile = this.createTileWithPhysics("Boost" + i, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, this.scale, material);
            } else if (tileType.indexOf("Death") >= 0) {
                let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_DEATH, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity }));
                newTile = this.createTileWithPhysics("Death" + i, DEATH_WIDTH, DEATH_HEIGHT, DEATH_DEPTH, 0, this.pos, this.quat, this.scale, material);
            } else if (tileType.indexOf("Ball") >= 0) {
                let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_BALL, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity }));
                newTile = this.createBallWithPhysics("Ball" + i, BALL_RADIUS, BALL_MASS, this.pos, this.quat, this.scale, material);
            } else if (tileType.indexOf("Tunnel") >= 0) {
                let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex/*, side: THREE.DoubleSide*/, map: TEXTURE_TUNNEL_MAIN, shininess: tileShininess, specular: 0xd4aae7, transparent: tunnelTransparent, opacity: tunnelOpacity }));
                newTile = this.createTunnelWithPhysics("Tunnel" + i, 0, this.pos, this.quat, this.scale, material);
            } else if (tileType.indexOf("HalfPipe") >= 0) {
                let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex/*, side: THREE.DoubleSide*/, map: TEXTURE_HALFPIPE_MAIN, shininess: tileShininess, specular: 0xd4aae7, transparent: tunnelTransparent, opacity: tunnelOpacity }));
                newTile = this.createTunnelWithPhysics("HalfPipe" + i, 0, this.pos, this.quat, this.scale, material, Math.PI);
            } else if (tileType.indexOf("Spring") >= 0) {
                let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_SPRING, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity }));
                newTile = this.createSpringWithPhysics("Spring" + i, SPRING_WIDTH, SPRING_HEIGHT, SPRING_DEPTH, 0, this.pos, this.quat, this.scale, material);
            } else if (tileType.indexOf("Corkscrew") >= 0) {
                let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex/*, side: THREE.DoubleSide*/, map: TEXTURE_CORKSCREW_MAIN, shininess: tileShininess, specular: 0xd4aae7, transparent: tunnelTransparent, opacity: tunnelOpacity }));
                newTile = this.createTunnelWithPhysics("Corkscrew" + i, 0, this.pos, this.quat, this.scale, material, CORK_START_ANGLE, CORK_END_ANGLE, CORKSCREW_OFFSET);
            } else if (tileType.indexOf("Snack") >= 0) {
                let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex/*, side: THREE.DoubleSide*/, map: TEXTURE_SNACK, shininess: tileShininess, specular: 0xd4aae7, transparent: true, opacity: 1 }));
                newTile = this.createTileWithoutPhysics("Snack" + i, SNACK_WIDTH, SNACK_HEIGHT, SNACK_DEPTH, 0, this.pos, this.quat, this.scale, material);
            }
            if (newTile) {
                newTile.scale.x = this.scale.x;
                newTile.scale.y = this.scale.y;
                newTile.scale.z = this.scale.z;
            }

        }
        if (cheat1) {
            this.createCheatBarrier();
        }
    }


    v3(x, y, z) {
        return new THREE.Vector3(x, y, z);
    }

    createPlayer() {
        this.pos.set(0, 30, 0);
        this.scale.set(playerScale, playerScale, playerScale);
        this.quat.set(0, 0, 0, 1);
        const playerMaterial = new THREE.MeshPhongMaterial({ map: TEXTURE_PLAYER, name: "Player", shininess: playerShininess, specular: 0xd4aae7 });
        if (this.inEditor) {
            this.pos.set(this.editorLastPos.x, this.editorLastPos.y, this.editorLastPos.z);
        }
        let body = this.createPlayerWithPhysics(playerRadius, playerMass, this.pos, this.quat, this.scale, playerMaterial);

        return body;

    }
    createPlayerWithPhysics(radius, mass, pos, quat, scale, material) {
        const object = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32), material);
        //use x scaling for all directions for ball, never be squished
        object.scale.set(scale.x, scale.x, scale.x);
        const shape = new Ammo.btSphereShape(radius);
        shape.setMargin(margin);
        object.name = "Player";
        object.receiveShadow = useShadows;
        object.castShadow = useShadows;
        object.body = this.createRigidBody(object, shape, mass, pos, quat, scale);

        return object;

    }
    createBallWithPhysics(name, radius, mass, pos, quat, scale, material) {
        const object = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32), material);
        //use x scaling for all directions for ball, never be squished
        object.scale.set(scale.x, scale.x, scale.x);
        const shape = new Ammo.btSphereShape(radius * scale.x);
        shape.setMargin(margin);
        object.name = name;
        object.receiveShadow = useShadows;
        object.castShadow = useShadows;
        object.body = this.createRigidBody(object, shape, mass * scale.x, pos, quat, scale);

        return object;

    }
    createTileWithPhysics(name, sx, sy, sz, mass, pos, quat, scale, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
        object.scale.set(scale.x, scale.y, scale.z);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5 * scale.x, sy * 0.5 * scale.y, sz * 0.5 * scale.z));
        shape.setMargin(margin);
        object.name = name;
        object.receiveShadow = useShadows;
        object.castShadow = useShadows;
        object.body = this.createRigidBody(object, shape, mass, pos, quat, scale);

        return object;

    }
    createTileWithoutPhysics(name, sx, sy, sz, mass, pos, quat, scale, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
        object.scale.set(scale.x, scale.y, scale.z);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5 * scale.x, sy * 0.5 * scale.y, sz * 0.5 * scale.z));
        shape.setMargin(margin);
        object.name = name;
        object.receiveShadow = useShadows;
        object.castShadow = useShadows;
        object.body = this.createRigidBody(object, shape, mass, pos, quat, scale);

        return object;

    }
    createTunnelWithPhysics(name, mass, pos, quat, scale, material, startAngle = 0, endAngle = 2 * Math.PI, corkZ = 0) {
        const mesh = new Ammo.btTriangleMesh(true, true);
        mesh.setScaling(new Ammo.btVector3(scale.x, scale.y, scale.z));
        let points = [];
        var geometry = new THREE.BufferGeometry();

        let r = (TUNNEL_WIDTH * 0.5);
        if (corkZ > 0) {
            r *= CORK_RADIUS_SCALE;
        }
        let step = (endAngle - startAngle) / TUNNEL_RADIAL_SEGMENTS;

        let dx = 0;
        let dy = 0;
        let dz = 0;


        for (let i = startAngle; i <= endAngle; i += step) {
            let x = dx + (r * Math.cos(i));
            let y = dy + (r * Math.sin(i));
            let z = dz + ((TUNNEL_DEPTH * 0.5));
            let x2 = dx + (r * Math.cos(i + step));
            let y2 = dy + (r * Math.sin(i + step));
            let z2 = dz - (TUNNEL_DEPTH * 0.5);
            let r2 = r + TUNNEL_THICKNESS;
            let x3 = dx + (r2 * Math.cos(i));
            let x4 = dx + (r2 * Math.cos(i + step));

            let y3 = dy + (r2 * Math.sin(i));
            let y4 = dy + (r2 * Math.sin(i + step));

            // visible triangles
            if ((i == startAngle && (endAngle - startAngle < 2 * Math.PI)) || corkZ > 0) {
                //top caps of halfpipe clockwise
                //A
                points.push(x3);
                points.push(y3);
                points.push(z2);
                //A2
                points.push(x3);
                points.push(y3);
                points.push(z);
                //D2
                points.push(x);
                points.push(y);
                points.push(z);

                mesh.addTriangle(
                    new Ammo.btVector3(x3, y3, z2),
                    new Ammo.btVector3(x3, y3, z),
                    new Ammo.btVector3(x, y, z),
                    true
                );

                //A
                points.push(x3);
                points.push(y3);
                points.push(z2);
                //D2
                points.push(x);
                points.push(y);
                points.push(z);
                //D
                points.push(x);
                points.push(y);
                points.push(z2);

                mesh.addTriangle(
                    new Ammo.btVector3(x3, y3, z2),
                    new Ammo.btVector3(x, y, z),
                    new Ammo.btVector3(x, y, z2),
                    true
                );

            }

            if ((i >= endAngle - step && (endAngle - startAngle < 2 * Math.PI)) || corkZ > 0) {
                //top caps of halfpipe counterclockwise

                //B2
                points.push(x4);
                points.push(y4);
                points.push(z);
                //B
                points.push(x4);
                points.push(y4);
                points.push(z2);
                //C2
                points.push(x2);
                points.push(y2);
                points.push(z);

                mesh.addTriangle(
                    new Ammo.btVector3(x4, y4, z),
                    new Ammo.btVector3(x4, y4, z2),
                    new Ammo.btVector3(x2, y2, z),
                    true
                );

                //B
                points.push(x4);
                points.push(y4);
                points.push(z2);
                //C
                points.push(x2);
                points.push(y2);
                points.push(z2);
                //C2
                points.push(x2);
                points.push(y2);
                points.push(z);

                mesh.addTriangle(
                    new Ammo.btVector3(x4, y4, z2),
                    new Ammo.btVector3(x2, y2, z2),
                    new Ammo.btVector3(x2, y2, z),
                    true
                );


            }

            //inside clockwise
            //D2
            points.push(x);
            points.push(y);
            points.push(z);
            //C2
            points.push(x2);
            points.push(y2);
            points.push(z);
            //D
            points.push(x);
            points.push(y);
            points.push(z2);

            //inside clockwise
            //C
            points.push(x2);
            points.push(y2);
            points.push(z2);
            //D
            points.push(x);
            points.push(y);
            points.push(z2);
            //C2
            points.push(x2);
            points.push(y2);
            points.push(z);

            //outer counterclockwise

            //A
            points.push(x3);
            points.push(y3);
            points.push(z2);
            //B2
            points.push(x4);
            points.push(y4);
            points.push(z);
            //A2
            points.push(x3);
            points.push(y3);
            points.push(z);

            //outer counterclockwise
            //A
            points.push(x3);
            points.push(y3);
            points.push(z2);
            //B
            points.push(x4);
            points.push(y4);
            points.push(z2);
            //B2
            points.push(x4);
            points.push(y4);
            points.push(z);


            //camera facing cap counterclockwise
            //D
            points.push(x);
            points.push(y);
            points.push(z2);
            //C
            points.push(x2);
            points.push(y2);
            points.push(z2);
            //A
            points.push(x3);
            points.push(y3);
            points.push(z2);

            //camera facing cap counterclockwise
            //C
            points.push(x2);
            points.push(y2);
            points.push(z2);
            //B
            points.push(x4);
            points.push(y4);
            points.push(z2);
            //A
            points.push(x3);
            points.push(y3);
            points.push(z2);

            //facing away cap counterclockwise
            //D2
            points.push(x);
            points.push(y);
            points.push(z);
            //C2
            points.push(x2);
            points.push(y2);
            points.push(z);
            //A2
            points.push(x3);
            points.push(y3);
            points.push(z);

            //facing away cap counterclockwise
            //C2
            points.push(x2);
            points.push(y2);
            points.push(z);
            //B2
            points.push(x4);
            points.push(y4);
            points.push(z);
            //A2
            points.push(x3);
            points.push(y3);
            points.push(z);

            mesh.addTriangle(
                new Ammo.btVector3(x, y, z),//D2
                new Ammo.btVector3(x, y, z2),//D
                new Ammo.btVector3(x2, y2, z2),//C
                true
            );

            mesh.addTriangle(
                new Ammo.btVector3(x2, y2, z2),
                new Ammo.btVector3(x2, y2, z),
                new Ammo.btVector3(x, y, z),
                true
            );
            mesh.addTriangle(
                new Ammo.btVector3(x3, y3, z),
                new Ammo.btVector3(x3, y3, z2),
                new Ammo.btVector3(x4, y4, z2),
                true
            );

            mesh.addTriangle(
                new Ammo.btVector3(x4, y4, z2),
                new Ammo.btVector3(x4, y4, z),
                new Ammo.btVector3(x3, y3, z),
                true
            );

            mesh.addTriangle(
                new Ammo.btVector3(x, y, z2),
                new Ammo.btVector3(x2, y2, z2),
                new Ammo.btVector3(x3, y3, z2),
                true
            );

            mesh.addTriangle(
                new Ammo.btVector3(x2, y2, z2),
                new Ammo.btVector3(x4, y4, z2),
                new Ammo.btVector3(x3, y3, z2),
                true
            );

            mesh.addTriangle(
                new Ammo.btVector3(x, y, z),
                new Ammo.btVector3(x2, y2, z),
                new Ammo.btVector3(x3, y3, z),
                true
            );

            mesh.addTriangle(
                new Ammo.btVector3(x2, y2, z),
                new Ammo.btVector3(x4, y4, z),
                new Ammo.btVector3(x3, y3, z),
                true
            );



            dz += corkZ;
        }

        const vertices = new Float32Array(points);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals();
        geometry.normalizeNormals();

        const shape = new Ammo.btBvhTriangleMeshShape(mesh, true, true);
        shape.setMargin(margin);

        const object = new THREE.Mesh(geometry, material);
        object.scale.set(scale.x, scale.y, scale.z);
        object.name = name;
        object.receiveShadow = useShadows;
        object.castShadow = false;
        object.body = this.createRigidBody(object, shape, mass, pos, quat, scale);

        return object;

    }
    createSpringWithPhysics(name, sx, sy, sz, mass, pos, quat, scale, material) {
        const SPRING_HEIGHT_SEGMENTS = 1;
        const SPRING_RADIAL_SEGMENTS = 32;
        const geometry = new THREE.CylinderGeometry(SPRING_WIDTH * 0.5, SPRING_DEPTH * 0.5, SPRING_HEIGHT, SPRING_RADIAL_SEGMENTS, SPRING_HEIGHT_SEGMENTS);

        const object = new THREE.Mesh(geometry, material);

        const shape = new Ammo.btCylinderShape(new Ammo.btVector3(sx * 0.5 * scale.x, sy * 0.5 * scale.y, sz * 0.5 * scale.z));

        object.scale.set(scale.x, scale.y, scale.z);
        object.name = name;
        object.receiveShadow = useShadows;
        object.castShadow = false;
        object.body = this.createRigidBody(object, shape, mass, pos, quat, scale);

        return object;
    }

    createDeathWithPhysics(name, sx, sy, sz, mass, pos, quat, scale, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
        object.scale.set(scale.x, scale.y, scale.z);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5 * scale.x, sy * 0.5 * scale.y, sz * 0.5 * scale.z));
        shape.setMargin(margin);
        object.name = name;
        object.receiveShadow = useShadows;
        object.castShadow = useShadows;
        object.body = this.createRigidBody(object, shape, mass, pos, quat, scale);

        return object;

    }
    createAmiyaBarWithPhysics(name, sx, sy, sz, mass, pos, quat, scale, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
        object.scale.set(scale.x, scale.y, scale.z);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5 * scale.x, sy * 0.5 * scale.y, sz * 0.5 * scale.z));
        shape.setMargin(margin);
        object.name = name;
        object.receiveShadow = useShadows;
        object.castShadow = useShadows;
        object.body = this.createRigidBody(object, shape, mass, pos, quat, scale);

        return object;

    }
    createGoalWithPhysics(name, sx, sy, sz, mass, pos, quat, scale, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
        object.scale.set(scale.x, scale.y, scale.z);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5 * scale.x, sy * 0.5 * scale.y, sz * 0.5 * scale.z));
        shape.setMargin(margin);
        object.name = name;
        object.receiveShadow = false;
        object.castShadow = useShadows;
        object.body = this.createRigidBody(object, shape, mass, pos, quat, scale);

        return object;
    }

    createRigidBody(object, physicsShape, mass, pos, quat, scale) {

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

        body.setFriction(this.physicsFriction);
        body.setRollingFriction(this.rollingFriction);

        //body.setDamping(50);
        // if (vel) {

        //     body.setLinearVelocity(new Ammo.btVector3(vel.x, vel.y, vel.z));

        // }

        // if (angVel) {

        //     body.setAngularVelocity(new Ammo.btVector3(angVel.x, angVel.y, angVel.z));

        // }

        object.userData.physicsBody = body;
        object.userData.collided = false;

        this.scene.add(object);


        if (mass > 0) {
            if (object.name.indexOf("GhostTile") < 0) {
                this.rigidBodies.push(object);
            }

            // Disable deactivation
            body.setActivationState(4);

        }
        body.name = object.name;
        body.scale = new THREE.Vector3(scale.x, scale.y, scale.z);
        if (object.name.indexOf("GhostTile") < 0) {
            this.allObjects.push(object);
            if (!this.inEditor || object.name.indexOf("Player") >= 0) {
                this.physicsWorld.addRigidBody(body);
            }

        }

        return body;

    }


    createColour(i) {
        if (i % 2 == 0) {

            return colourMap[this.currentWorld][0];
        }
        return colourMap[this.currentWorld][1];

    }
    clear() {
        console.log("clear");
        for (let i = 0; i < this.rigidBodies.length; i++) {
            this.physicsWorld.removeRigidBody(this.rigidBodies[i]);
        }
        for (let i = 0; i < this.allObjects.length; i++) {
            this.physicsWorld.removeRigidBody(this.allObjects[i].body);
        }
        this.allObjects = undefined;
        this.rigidBodies = undefined;

    }

    createMapRandomChaos() {

    }
    removeObject3D(object) {
        if (!(object instanceof THREE.Object3D)) return false;
        // for better memory management and performance
        if (object.geometry) {
            object.geometry.dispose();
        }
        if (object.material) {
            if (object.material instanceof Array) {
                // for better memory management and performance
                object.material.forEach(material => material.dispose());
            } else {
                // for better memory management and performance
                object.material.dispose();
            }
        }
        if (object.parent) {
            object.parent.remove(object);
        }
        for (var i = 0; i < this.allObjects.length - 1; i++) {
            let tile = this.allObjects[i];
            if (tile.name == object.name || tile.name == object.body.name) {
                this.allObjects.splice(i, 1);
                console.log(this.allObjects);
                break;
            }
        }
        for (var i = this.rigidBodies.length - 1; i >= 0; i--) {
            let tile = this.rigidBodies[i].body;
            if (tile.name == object.name || tile.name == object.body.name) {
                this.rigidBodies.splice(i, 1);
                break;
            }
        }
        // the parent might be the scene or another Object3D, but it is sure to be removed this way
        return true;
    }
    disableTextures() {
        useTextures = false;
        console.log("disableTextures");
    }
    enableTextures() {
        useTextures = true;
        console.log("enableTextures");
    }
    disableShadows() {
        useShadows = false;
        console.log("disableShadows");
    }
    enableShadows() {
        useShadows = true;
        console.log("enableShadows");
    }
    createCheatBarrier() {
        if (cheat1) {
            this.pos.set(0, -45, 24000);
            this.quat.set(0, 0, 0, 1);
            this.scale = new THREE.Vector3(1, 1, 1);
            let material = new THREE.MeshPhongMaterial({ map: TEXTURE_CHOT, shininess: tileShininess, specular: 0xd4aae7 });
            let newTile = this.createTileWithPhysics("AmiyaBarChot", 50000, 50, 50000, 0, this.pos, this.quat, this.scale, material);
        } else {
            let cheat1Object = this.scene.getObjectByName("AmiyaBarChot");
            this.removeObject3D(cheat1Object);
            this.physicsWorld.removeRigidBody(cheat1Object.body);
        }

    }
    activateCheat1() {
        //toggle
        cheat1 = !cheat1;
        this.createCheatBarrier();
    }
    activateCheat2() {
        //toggle
        cheat2 = !cheat2;
        if (cheat2) {
            TEXTURE_PLAYER = new THREE.TextureLoader().load('./images/amiyaroad/Plok.png');
        } else {
            TEXTURE_PLAYER = new THREE.TextureLoader().load('./images/amiyaroad/Amiya.png');
        }
    }
    activateCheat3() {
        //toggle
        cheat3 = !cheat3;
        if (cheat3) {
            playerRadius = PLAYER_RADIUS * 4;
            playerMass = PLAYER_MASS * 4;
        } else {
            playerRadius = PLAYER_RADIUS;
            playerMass = PLAYER_MASS;
        }
    }
    createMapBuilder() {
        console.log("Map builder");
        this.pos.set(0, 0, 0);
        this.quat.set(0, 0, 0, 1);
        if (this.levelString != "") {
            this.loadMapFromLevelString(this.levelString);
        }

        // grid
        const gridTileCount = 500;
        const gridSize = TILE_DEPTH * gridTileCount;
        const gridHelper = new THREE.GridHelper(gridSize, gridTileCount);
        gridHelper.position.x = -TILE_WIDTH / 2;
        gridHelper.position.z = (-TILE_DEPTH / 2) - 3;
        gridHelper.receiveShadow = useShadows;
        gridHelper.castShadow = false;
        this.scene.add(gridHelper);

    }
    toggleSnapPosition() {
        this.snapPosition = !this.snapPosition;
    }
    toggleSnapRotation() {
        this.snapRotation = !this.snapRotation;
    }
    toggleTranspancy() {
        tileOpacity = 1.5 - tileOpacity;
        tunnelOpacity = 1.5 - tileOpacity;

        tileTransparent = tileOpacity < 1;
        tunnelTransparent = tunnelOpacity < 1;


    }
    moveGhostTile(player, rotation, tileScale, tileSelection, tileSnapDistanceX, tileSnapDistanceY, tileSnapDistanceZ) {
        let playerPos = player.position;
        //let rotationSnap = 0.1;

        let yOffset = playerRadius * 3;
        //spring
        if (tileSelection == 9) {
            yOffset -= 10;
        }
        if (this.snapPosition) {
            this.pos.set(Math.round(playerPos.x / tileSnapDistanceX) * tileSnapDistanceX, Math.round((playerPos.y - yOffset) / tileSnapDistanceY) * tileSnapDistanceY, Math.round(playerPos.z / tileSnapDistanceZ) * tileSnapDistanceZ);
        } else {
            this.pos.set(playerPos.x, playerPos.y - yOffset, playerPos.z);
        }
        //if (this.snapRotation) {
        //this.quat.set(Math.round(rotation.x / rotationSnap) * rotationSnap, Math.round(rotation.y / rotationSnap) * rotationSnap, Math.round(rotation.z / rotationSnap) * rotationSnap, Math.round(rotation.w / rotationSnap) * rotationSnap);
        //} else {
        this.quat.set(rotation.x, rotation.y, rotation.z, rotation.w);
        //}
        //console.log(this.quat.x, this.quat.y, this.quat.z, this.quat.w);
        if (this.lastTileSelection != tileSelection) {
            this.scene.remove(this.ghostTile);
            this.ghostTile = null;
        }

        if (tileSelection > 0) {
            if (this.ghostTile != null) {
                this.ghostTile.position.x = this.pos.x;
                this.ghostTile.position.y = this.pos.y;
                this.ghostTile.position.z = this.pos.z;
                this.ghostTile.quaternion.x = this.quat.x;
                this.ghostTile.quaternion.y = this.quat.y;
                this.ghostTile.quaternion.z = this.quat.z;
                this.ghostTile.quaternion.w = this.quat.w;
                this.ghostTile.scale.x = tileScale;
                if (tileSelection >= 6) {
                    this.ghostTile.scale.y = tileScale;
                } else {
                    this.ghostTile.scale.y = 1;
                }
                this.ghostTile.scale.z = tileScale;
                this.scale.set(this.ghostTile.scale.x, this.ghostTile.scale.y, this.ghostTile.scale.z);

            } else {

                let materialHex = this.createColour(this.allObjects.length);
                let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_GHOST_TILE/*, side: THREE.DoubleSide*/, transparent: true, opacity: 0.75 });

                this.ghostTile = this.getTileFromSelection(tileSelection, "GhostTile", material);
                this.ghostTile.scale.x = tileScale;
                if (tileSelection >= 6) {
                    this.ghostTile.scale.y = tileScale;
                } else {
                    this.ghostTile.scale.y = 1;
                }
                this.ghostTile.scale.z = tileScale;
                this.scale.set(this.ghostTile.scale.x, this.ghostTile.scale.y, this.ghostTile.scale.z);
                $('.hud--tile_selection img').attr("src", "./images/amiyaroad/tiles/Tile" + tileSelection + ".png");
            }

        }

        this.lastTileSelection = tileSelection;


    }
    getOrDefault(value, defaultValue) {
        if (value && value != "") {
            return value;
        }
        return defaultValue;
    }

    getTileNameFromIndex(tileIndex, i) {
        return tileTypes[tileIndex] + i;
    }
    getTileIndexFromName(tileName) {
        for (var i = 0; i < tileTypes.length; i++) {
            if (tileTypes[i].indexOf(tileName) >= 0) {
                return i;
            }
        }
        //default to regular tile
        return 0;
    }
    getTileFromSelection(tileSelection, tileName, tileMaterial = null) {
        //+1 for ghost tile
        let materialHex = this.createColour(this.allObjects.length + 1);

        if (tileSelection == 1) {
            //console.log("Add tile");
            let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_TILE_MAIN, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity }));

            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Tile" + this.allObjects.length);
            return this.createTileWithPhysics(actualTileName, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, this.scale, material);
        } else if (tileSelection == 2) {
            //console.log("Add amiyabar");

            let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_AMIYABAR, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity }));
            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "AmiyaBar" + this.allObjects.length);
            return this.createAmiyaBarWithPhysics(actualTileName, AMIYABAR_WIDTH, AMIYABAR_HEIGHT, AMIYABAR_DEPTH, 0, this.pos, this.quat, this.scale, material);
        } else if (tileSelection == 3) {
            //console.log("Add goal");

            let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_GOAL }));
            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Goal");
            return this.createGoalWithPhysics(actualTileName, GOAL_WIDTH, GOAL_HEIGHT, GOAL_DEPTH, 0, this.pos, this.quart, this.scale, material);
        } else if (tileSelection == 4) {
            //console.log("Add boost");

            let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_BOOST, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity }));
            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Boost" + this.allObjects.length);
            return this.createTileWithPhysics(actualTileName, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, this.scale, material);
        } else if (tileSelection == 5) {
            //console.log("Add death");

            let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_DEATH, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity }));
            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Death" + this.allObjects.length);
            return this.createDeathWithPhysics(actualTileName, DEATH_WIDTH, DEATH_HEIGHT, DEATH_DEPTH, 0, this.pos, this.quat, this.scale, material);
        } else if (tileSelection == 6) {
            //console.log("Add ball");

            let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_BALL, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity }));
            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Ball" + this.allObjects.length);
            if (this.inEditor) {
                return this.createBallWithPhysics(actualTileName, BALL_RADIUS, 0, this.pos, this.quat, this.scale, material);
            }
            return this.createBallWithPhysics(actualTileName, BALL_RADIUS, BALL_MASS, this.pos, this.quat, this.scale, material);
        } else if (tileSelection == 7) {
            //console.log("Add tunnel");
            let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_TUNNEL_MAIN/*, side: THREE.DoubleSide*/, shininess: tileShininess, specular: 0xd4aae7, transparent: tunnelTransparent, opacity: tunnelOpacity }));

            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Tunnel" + this.allObjects.length);
            return this.createTunnelWithPhysics(actualTileName, 0, this.pos, this.quat, this.scale, material);
        } else if (tileSelection == 8) {
            //console.log("Add half-pipe");
            let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex/*, side: THREE.DoubleSide*/, map: TEXTURE_HALFPIPE_MAIN, shininess: tileShininess, specular: 0xd4aae7, transparent: tunnelTransparent, opacity: tunnelOpacity }));

            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "HalfPipe" + this.allObjects.length);
            return this.createTunnelWithPhysics(actualTileName, 0, this.pos, this.quat, this.scale, material, Math.PI);
        } else if (tileSelection == 9) {
            //console.log("Add spring");

            let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_SPRING, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity }));
            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Spring" + this.allObjects.length);
            return this.createSpringWithPhysics(actualTileName, SPRING_WIDTH, SPRING_HEIGHT, SPRING_DEPTH, 0, this.pos, this.quat, this.scale, material);
        } else if (tileSelection == 10) {
            //console.log("Add half-pipe");
            let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex/*, side: THREE.DoubleSide*/, map: TEXTURE_HALFPIPE_MAIN, shininess: tileShininess, specular: 0xd4aae7, transparent: tunnelTransparent, opacity: tunnelOpacity }));

            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Corkscrew" + this.allObjects.length);
            return this.createTunnelWithPhysics(actualTileName, 0, this.pos, this.quat, this.scale, material, CORK_START_ANGLE, CORK_END_ANGLE, CORKSCREW_OFFSET);
        } else if (tileSelection == 11) {
            //console.log("Add snack");

            let material = this.getMaterial(new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_SNACK, shininess: tileShininess, specular: 0xd4aae7, transparent: true, opacity: 1 }));
            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Snack" + this.allObjects.length);
            
            return this.createTileWithoutPhysics(actualTileName, SNACK_WIDTH, SNACK_HEIGHT, SNACK_DEPTH, 0, this.pos, this.quat, this.scale, material);
        }

        return null;
    }
    addTile(scale, tileSelection, tilePos = null, tileQuat = null, genLevelString) {
        this.scale = new THREE.Vector3(scale, scale, scale);
        if (tileSelection < 6) {
            this.scale.y = 1;
        }
        this.editorLastPos.set(this.pos.x, this.pos.y + 20, this.pos.z);
        if (tilePos != null) {
            this.pos.x = tilePos.x;
            this.pos.y = tilePos.y;
            this.pos.z = tilePos.z;
        }
        if (tileQuat != null) {
            this.quat.x = tileQuat.x;
            this.quat.y = tileQuat.y;
            this.quat.z = tileQuat.z;
            this.quat.w = tileQuat.w;
        }


        let newTile = this.getTileFromSelection(tileSelection);
        if (genLevelString) {
            this.generateLevelString(this.currentWorld);
        }

        return newTile;
    }
    undoLastTile() {
        console.log("Undo");
        let index = this.allObjects.length - 1;
        let lastObject = this.allObjects[index];

        if (lastObject) {
            let lastTile = lastObject.body;
            while (lastTile.name.indexOf("GhostTile") >= 0 || lastTile.name.indexOf("Player") >= 0) {
                index--;
                if (index < 0) {
                    return;
                }
                lastObject = this.allObjects[index];
                lastTile = lastObject.body;

            }
            if (index < 0) {
                return;
            }

            this.physicsWorld.removeRigidBody(lastTile);
            this.scene.remove(lastObject);

            this.allObjects.splice(index, 1);

        }
        this.generateLevelString(this.currentWorld);
    }


}

export { MapGenerator };
