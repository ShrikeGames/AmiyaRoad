// init
import * as THREE from 'three';
import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { Sky } from './jsm/objects/Sky.js';
import { Water } from './jsm/objects/Water.js';
import { MapGenerator } from './maps/MapGenerator.js';
import Stats from './jsm/libs/stats.module.js';
import { LanguageToggle } from './utils/LanguageToggle.js';
import { Vector3 } from 'three';

const versionString = "PRE-ALPHA Build 0.3.4 \"Cat-Crab\"";

let stats;

const languageToggle = new LanguageToggle();
let mapGenerator;
//global
let initialized = false;
let keyStates;
let won = false;
let dead = false;
let scene;
let renderer;
let camera;
let spotLight;
let clock;
let sky;
let sun;
let water;
let player;
let container;

let waterRises = false;

// Physics
// Physics variables
const GRAVITY = 60;
//to make you come down fast if not actively jumping, allowing for adjusted jump hight by holding
const RESPONSIVE_ARTIFICAL_GRAVITY = 8;
const RESPONSIVE_ARTIFICAL_GRAVITY_UNDERWATER = 3;
const acceleration = 5;
const turnSpeed = 2.5;
const turnSpeedOnGround = 2.5;
const regularMaxSpeed = 40;
const boostMaxSpeed = 65;
const BOOST_DECAY_RATE = 5;
const maxTurnSpeed = 10;
const jumpSpeed = 17;
const waterJumpSpeed = 14;
let maxSpeed = regularMaxSpeed;
const maxStamina = 500;
let seed;

let stamina;
let collisionConfiguration;
let dispatcher;
let broadphase;
let solver;
let physicsWorld;

let onGround;
let timeLastOnGround;
let coyoteTimeLimit = 0.13;
let velocity;
let updates;
let lastUpdateVelocity;

// Rigid bodies include all movable objects
let rigidBodies;
let transformAux1;
let cbContactResult;

//sounds
let bgm;
let currentWorld;
let currentLevel;
let inEditor;
let inPlayTest;

let musicVolume = 0.05;

//ui
let $debug = $('.hud.hud--debug');

//level editor
const BUILD_CAMERA_SPEED = 12;
const BUILD_ROTATION_SPEED = 1;
let tileSelection = 0;
let tileScale = 1;
let minTileScale = 1;
let maxTileScale = 2;

const WATER_LEVEL_Y_WORLD2 = 6;
const WATER_LEVEL_Y_WORLD3 = -4;
let waterLevel = WATER_LEVEL_Y_WORLD2;
let maxWaterLevel = waterLevel;
let defaultEffectController = {
	turbidity: 10,
	rayleigh: 3,
	mieCoefficient: 0.005,
	mieDirectionalG: 0.7,
	elevation: 3,
	azimuth: 180,
	exposure: 1
};
let effectController = defaultEffectController;

Ammo().then(function (AmmoLib) {

	Ammo = AmmoLib;
	initFirstTime();

});

function initFirstTime() {
	console.log("initFirstTime");
	if (initialized) {
		return;
	}

	$('.version').text(versionString);

	$('.play-button').on('click', function (e) {
		e.preventDefault();
		console.log("Play");
		let $this = $(this);
		currentLevel = $this.attr("data-level");
		currentWorld = $this.attr("data-world");
		console.log(currentWorld, "-", currentLevel);
		inEditor = "true" == $this.attr("data-editor");
		inPlayTest = "true" == $this.attr("data-playtest");

		$('.button--menu').removeClass('hide');
		$('.hud--tile_selection').addClass("hide");
		$('.hud--playtest').addClass("hide");
		$('.hud--editor').addClass("hide");

		//random seed when you click play on a level
		//retries within the level will regenerate the same way.
		seed = "amiyaroads_" + Math.random() * 25600;

		if (inEditor) {
			$('.hud--editor').removeClass("hide");
		}

		init(currentWorld, currentLevel, inEditor, inPlayTest);

		animate();
		$('.menu--start-screen').addClass('hide');
	});

	$('.button--menu').on('click', function (e) {
		e.preventDefault();
		console.log("Go to main menu");
		inEditor = false;
		inPlayTest = false;
		mapGenerator.generateLevelString(currentWorld);
		lose();
	});


	$('.hud--worldSelect').on('change', function (e) {
		e.preventDefault();
		console.log("Change world type");
		lose();
		currentWorld = $(this).val();
		inEditor = true;
		inPlayTest = false;
		init(currentWorld, currentLevel, inEditor, inPlayTest);

		$('.menu--start-screen').addClass('hide');
		$('.button--menu').removeClass('hide');
		$('.hud--basic').removeClass('hide');
		$('.hud--playtest').addClass("hide");
		$('.hud--editor').removeClass("hide");


	});


	$('.playtest-button').on('click', function (e) {
		e.preventDefault();
		console.log("Playtest");
		lose();

		inEditor = false;
		inPlayTest = true;

		init(currentWorld, currentLevel, inEditor, inPlayTest);
		$('.menu--start-screen').addClass('hide');
		$('.button--menu').addClass('hide');
		$('.hud--basic').removeClass("hide");
		$('.hud--playtest').removeClass("hide");
		$('.hud--editor').addClass("hide");


	});


	$('.editor-button').on('click', function (e) {
		e.preventDefault();
		console.log("Playtest");
		lose();

		inEditor = true;
		inPlayTest = false;

		init(currentWorld, currentLevel, inEditor, inPlayTest);

		$('.menu--start-screen').addClass('hide');
		$('.button--menu').removeClass('hide');
		$('.hud--basic').removeClass('hide');
		$('.hud--playtest').addClass("hide");
		$('.hud--editor').removeClass("hide");
	});


	$(".hud--volume-slider").slider({
		orientation: "horizontal",
		range: "min",
		min: 0,
		max: 100,
		value: 5,
		slide: function (event, ui) {
			musicVolume = ui.value / 100.0;
			bgm.setVolume(musicVolume);
			$(".hud--volume-display").text(Math.round(musicVolume * 100) + "%");
		}
	});
	musicVolume = $(".hud--volume-slider").slider("value") / 100.0;
	$(".hud--volume-display").text((musicVolume * 100) + "%");

	container = document.getElementById('container');

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xbfd1e5);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;

	container.appendChild(renderer.domElement);
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild(stats.domElement);

	initInput();

	window.addEventListener('resize', onWindowResize);


	initialized = true;
}

function init(currentWorld, currentLevel, inEditor, inPlayTest) {
	console.log("init");
	clock = new THREE.Clock();

	rigidBodies = [];

	initGraphics();

	initPhysics();

	createObjects(currentWorld, currentLevel, inEditor, inPlayTest);

	initSky(currentWorld, currentLevel, inEditor, inPlayTest);

	initWater(currentWorld, currentLevel, inEditor, inPlayTest);

	initMusic();

	$('.hud--basic').removeClass('hide');
	$('#container').removeClass('hide');
	$('.menu--loading-screen').addClass('hide');
	dead = false;
	won = false;
}

function initSky(currentWorld, currentLevel, inEditor, inPlayTest) {
	console.log("initSky");
	// Add Sky
	sky = new Sky();
	sky.scale.setScalar(150000);
	scene.add(sky);
	const fogColour = new THREE.Color(0xfbddff);
	const fog = new THREE.FogExp2(fogColour, 0.008);
	scene.fog = fog;


	sun = new THREE.Vector3();
	effectController = defaultEffectController;
	if (currentWorld == "?") {
		effectController = {
			turbidity: Math.random() * 20,
			rayleigh: Math.random() * 6,
			mieCoefficient: Math.random() * 0.001,
			mieDirectionalG: Math.random(),
			elevation: Math.random() * 4,
			azimuth: Math.random() * 360,
			exposure: Math.random()
		}
	} else if (currentWorld == "2") {
		effectController = {
			turbidity: 20,
			rayleigh: 3,
			mieCoefficient: 0.002,
			mieDirectionalG: 0.5,
			elevation: 2,
			azimuth: 80,
			exposure: 0.5
		}
	}

	const uniforms = sky.material.uniforms;
	uniforms['turbidity'].value = effectController.turbidity;
	uniforms['rayleigh'].value = effectController.rayleigh;
	uniforms['mieCoefficient'].value = effectController.mieCoefficient;
	uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

	const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
	const theta = THREE.MathUtils.degToRad(90 + effectController.azimuth);

	sun.setFromSphericalCoords(1, phi, theta);

	uniforms['sunPosition'].value.copy(sun);

	const materials = [];

	const geometry = new THREE.BufferGeometry();
	const vertices = [];

	const textureLoader = new THREE.TextureLoader();

	const sprite1 = textureLoader.load('./images/amiyaroad/Bucko.png');
	const sprite2 = textureLoader.load('./images/amiyaroad/Bucko2.png');
	const sprite3 = textureLoader.load('./images/amiyaroad/Bucko3.png');
	const sprite4 = textureLoader.load('./images/amiyaroad/Bucko4.png');
	const sprite5 = textureLoader.load('./images/amiyaroad/Bucko5.png');

	let maxBuckos = 50;
	if (currentWorld == "2") {
		maxBuckos = 200;
	}
	for (let i = 0; i < maxBuckos; i++) {

		let x = -50 + i * 2;
		let y = -15;
		let z = -1200 + Math.random() * 1200;
		if (currentWorld == "2") {
			x = -600 + Math.random() * 1200;
			y = -20 + Math.random() * 10;
			z = -600 + Math.random() * 1200;
		}



		vertices.push(x, y, z);

	}

	geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

	let parameters = [
		[[1.0, 0.2, 0.5], sprite1, 5],
		[[0.95, 0.1, 0.5], sprite2, 3],
		[[0.90, 0.05, 0.5], sprite3, 2],
		[[0.85, 0, 0.5], sprite4, 1],
		[[0.80, 0, 0.5], sprite5, 0.5]
	];

	for (let i = 0; i < parameters.length; i++) {

		const color = parameters[i][0];
		const sprite = parameters[i][1];
		const size = parameters[i][2];

		materials[i] = new THREE.PointsMaterial({ size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: true, transparent: true });
		materials[i].color.setHSL(color[0], color[1], color[2]);

		const particles = new THREE.Points(geometry, materials[i]);


		if (currentWorld == "2") {
			particles.rotation.y = Math.random() * 6;
		} else {
			particles.rotation.z = Math.random() * 12;
		}

		scene.add(particles);

	}



	renderer.toneMappingExposure = effectController.exposure;


}

function initWater(currentWorld, currentLevel, inEditor, inPlayTest) {
	waterRises = false;

	if (currentWorld == "2") {
		waterRises = true;
		const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
		water = new Water(
			waterGeometry,
			{
				textureWidth: 1024,
				textureHeight: 1024,
				waterNormals: new THREE.TextureLoader().load('images/amiyaroad/Water.png', function (texture) {

					texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

				}),
				sunDirection: new THREE.Vector3(),
				sunColor: 0xfbddff,
				waterColor: 0xccb8f5,
				distortionScale: -3,
				alpha: 0.7,
				fog: scene.fog !== undefined
			}
		);
		waterLevel = WATER_LEVEL_Y_WORLD2;
		water.position.y = waterLevel;
		water.rotation.x = - Math.PI / 2;
		scene.add(water);
	} else if (currentWorld == "3") {
		const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
		water = new Water(
			waterGeometry,
			{
				textureWidth: 1024,
				textureHeight: 1024,
				waterNormals: new THREE.TextureLoader().load('images/amiyaroad/Snow.png', function (texture) {

					texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

				}),
				sunDirection: new THREE.Vector3(),
				sunColor: 0xffffff,
				waterColor: 0xffffff,
				distortionScale: 0.1,
				alpha: 0.9,
				fog: scene.fog !== undefined
			}
		);
		waterLevel = WATER_LEVEL_Y_WORLD3;
		water.position.y = waterLevel;
		water.rotation.x = - Math.PI / 2;
		scene.add(water);
	}

}


function initMusic() {
	console.log("initMusic");
	if (bgm) {
		if (!bgm.isPlaying) {
			bgm.play();
		}
		return;
	}
	// instantiate a listener
	const audioListener = new THREE.AudioListener();

	// add the listener to the camera
	camera.add(audioListener);

	// instantiate audio object
	bgm = new THREE.Audio(audioListener);

	// add the audio object to the scene
	scene.add(bgm);

	// instantiate a loader
	const loader = new THREE.AudioLoader();

	// load a resource
	loader.load(
		// resource URL
		'../audio/Slizzy_Slick.mp3',

		// onLoad callback
		function (audioBuffer) {
			// set the audio object buffer to the loaded object
			bgm.setBuffer(audioBuffer);

			// play the audio
			bgm.setVolume(musicVolume);
			bgm.setLoop(true);
			bgm.play();
		},

		// onProgress callback
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},

		// onError callback
		function (err) {
			console.log('An error happened');
		}
	);
}


function initGraphics() {
	console.log("initGraphics");
	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 600);

	camera.position.set(0, 12, 21);
	camera.lookAt(0, 0.5, 0);

	const hemisphereLight = new THREE.HemisphereLight(0xc0bdf2, 0xffbef4, 0.9);
	scene.add(hemisphereLight);

	spotLight = new THREE.DirectionalLight(0xffd0fe, 0.4);
	spotLight.position.set(0, 60, 0);

	spotLight.castShadow = true;

	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;

	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 120;
	spotLight.shadow.camera.fov = 90;
	spotLight.shadow.camera.right = 100.5;
	spotLight.shadow.camera.left = -100.5;
	spotLight.shadow.camera.top = 100.5;
	spotLight.shadow.camera.bottom = - 100.5;

	scene.add(spotLight);


	//


}

function initPhysics() {
	console.log("ininitPhysicsitGraphics");
	// Physics configuration

	if (!collisionConfiguration) {
		collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
		dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
		broadphase = new Ammo.btDbvtBroadphase();
		solver = new Ammo.btSequentialImpulseConstraintSolver();
		physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);

		transformAux1 = new Ammo.btTransform();
	}
	if (inEditor) {
		physicsWorld.setGravity(new Ammo.btVector3(0, 0, 0));
	} else {
		physicsWorld.setGravity(new Ammo.btVector3(0, - GRAVITY, 0));
	}

	setupContactResultCallback();

}
function setupContactResultCallback() {
	console.log("setupContactResultCallback");

	if (won || dead) {
		return;
	}

	cbContactResult = new Ammo.ConcreteContactResultCallback();

	cbContactResult.addSingleResult = function (cp, colObj0Wrap, partId0, index0, colObj1Wrap, partId1, index1) {
		if (won || dead) {
			return;
		}
		let contactPoint = Ammo.wrapPointer(cp, Ammo.btManifoldPoint);
		onGround = false;
		const distance = contactPoint.getDistance();

		if (distance > 0) return;

		/*if (lastUpdateVelocity.z <= -maxSpeed / 2.0 && velocity.z() >= -0.1) {
			//last frame going very fast, now stopped completely, hit a wall too hard
			//die
			won = false;
			dead = true;

			console.log("previous velocity", lastUpdateVelocity.z);
			console.log("current velocity", velocity.z());

			reset();
			return;
		}
		*/

		let colWrapper0 = Ammo.wrapPointer(colObj0Wrap, Ammo.btCollisionObjectWrapper);
		let rb0 = Ammo.castObject(colWrapper0.getCollisionObject(), Ammo.btRigidBody);

		let colWrapper1 = Ammo.wrapPointer(colObj1Wrap, Ammo.btCollisionObjectWrapper);
		let rb1 = Ammo.castObject(colWrapper1.getCollisionObject(), Ammo.btRigidBody);

		let tag, localPos, worldPos

		if (rb0.name != "Player") {

			tag = rb0.name;
			localPos = contactPoint.get_m_localPointA();
			worldPos = contactPoint.get_m_positionWorldOnA();

		} else {

			tag = rb1.name;
			localPos = contactPoint.get_m_localPointB();
			worldPos = contactPoint.get_m_positionWorldOnB();
		}
		if (keyStates.KeyB || keyStates.KeyZ) {
			//debug block key
			console.log(tag);
		}
		if (tag.indexOf("Death") >= 0) {
			dead = true;
			won = false;
		} else if (tag.indexOf("Goal") >= 0) {
			won = true;
			dead = false;
		} else if (tag.indexOf("Boost") >= 0) {
			if (localPos.y() >= 0.99) {
				maxSpeed = boostMaxSpeed;
				//always accelerate when on a boost tile
				let boostImpulse = new Ammo.btVector3(velocity.x(), velocity.y(), velocity.z());
				boostImpulse.normalize();
				boostImpulse.op_mul(acceleration * 2);
				player.body.applyCentralImpulse(boostImpulse);
				timeLastOnGround = clock.elapsedTime;
				onGround = true;
			}
		} else if (tag.indexOf("AmiyaBar") >= 0) {
			stamina = maxStamina;
			if (localPos.y() >= 0.99) {
				timeLastOnGround = clock.elapsedTime;
				onGround = true;
			}

		} else if (tag.indexOf("Tile") >= 0) {
			if (localPos.y() >= 0.99) {
				//console.log(tag + " x:" + localPos.x() + ", y: " + localPos.y() + ", z: " + localPos.z());
				timeLastOnGround = clock.elapsedTime;
				onGround = true;
			}
		}

	}

}

function createObjects(currentWorld, currentLevel, inEditor, inPlayTest) {
	console.log("createObjects");
	onGround = false;
	stamina = maxStamina;
	timeLastOnGround = 0;
	maxSpeed = regularMaxSpeed;
	tileSelection = 0;
	tileScale = 1;
	if (mapGenerator == null) {
		mapGenerator = new MapGenerator(scene, physicsWorld);
	}
	// Ground
	rigidBodies = mapGenerator.initMap(currentWorld, currentLevel, inEditor, inPlayTest, seed, $('#levelSelect').val());
	player = mapGenerator.createPlayer();
	player.body.setLinearVelocity(new Ammo.btVector3(0, 0, 0));
	spotLight.target = player;
	lastUpdateVelocity = new THREE.Vector3(0, 0, 0);
	updates = 0;
}


function initInput() {
	console.log("initInput");

	keyStates = {};
	$(document).ready(function () {
		document.addEventListener('keydown', (event) => {
			keyStates[event.code] = true;
		});

		document.addEventListener('keyup', (event) => {
			console.log(event.code);
			if (inEditor) {
				if (keyStates.Digit0 && event.code == "Digit0") {
					tileSelection = 0;
				} else if (keyStates.Digit1 && event.code == "Digit1") {
					tileSelection = 1;
				} else if (keyStates.Digit2 && event.code == "Digit2") {
					tileSelection = 2;
				} else if (keyStates.Digit3 && event.code == "Digit3") {
					tileSelection = 3;
				} else if (keyStates.Digit4 && event.code == "Digit4") {
					tileSelection = 4;
				} else if (keyStates.Digit5 && event.code == "Digit5") {
					tileSelection = 5;
				} else if (keyStates.Digit6 && event.code == "Digit6") {
					tileSelection = 6;
				}

				if (keyStates.Equal && event.code == "Equal") {
					tileScale = Math.min(tileScale + 0.25, maxTileScale);
				} else if (keyStates.Minus && event.code == "Minus") {
					tileScale = Math.max(tileScale - 0.25, minTileScale);
				}

				if (keyStates.Enter && event.code == "Enter") {
					mapGenerator.addTile(tileScale, tileSelection);
				} else if (keyStates.Backspace && event.code == "Backspace") {
					mapGenerator.undoLastTile();
				}

			}
			keyStates[event.code] = false;
		});
	});

}

function onWindowResize() {
	console.log("onWindowResize");
	if (won || dead) {
		return;
	}
	if (camera) {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

	}
	if (renderer) {
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

}

function animate() {
	if (won || dead) {
		return;
	}
	requestAnimationFrame(animate);

	render();
	stats.update();

	if (inEditor) {
		return;
	}

	updates++;
	if (updates >= 5) {
		lastUpdateVelocity.z = velocity.z();
		updates = 0;
	}


}

function render() {
	if (won || dead) {
		return;
	}

	const deltaTime = clock.getDelta();

	updatePhysics(deltaTime);

	renderer.render(scene, camera);

}

function checkContact() {
	if (won || dead) {
		return;
	}
	physicsWorld.contactTest(player.body, cbContactResult);
}
function updateWorld(deltaTime) {
	// Step world
	physicsWorld.stepSimulation(deltaTime, 10);


	// Update rigid bodies
	for (let i = 0, il = rigidBodies.length; i < il; i++) {

		const objThree = rigidBodies[i];
		const objPhys = objThree.userData.physicsBody;
		const ms = objPhys.getMotionState();

		if (ms) {

			ms.getWorldTransform(transformAux1);
			const p = transformAux1.getOrigin();
			const q = transformAux1.getRotation();
			objThree.position.set(p.x(), p.y(), p.z());
			objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());

		}

	}
	//sun sets as your stamina goes down
	effectController.elevation = (stamina / maxStamina) * 3;

	//in world 2 the water level rises as you run out of stamina
	if (waterRises) {
		waterLevel = maxWaterLevel * (1 - (stamina / maxStamina));
		water.position.y = waterLevel;
	}


	const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
	const theta = THREE.MathUtils.degToRad(effectController.azimuth);

	sun.setFromSphericalCoords(1, phi, theta);

	sky.material.uniforms['sunPosition'].value.copy(sun);
	if (water) {
		water.material.uniforms['sunDirection'].value.copy(sun).normalize();
		water.material.uniforms['time'].value += deltaTime;
	}

	camera.position.set(0, 10, player.position.z + 20);
	camera.lookAt(0, 0.5, player.position.z);
	spotLight.position.set(player.position.x, 20, player.position.z);

}
function updatePhysics(deltaTime) {
	if (won || dead) {
		return;
	}
	if (inEditor) {
		let impulse = new Ammo.btVector3(0, 0, 0);
		let angularImpulse = new Ammo.btVector3(0, 0, 0);

		if (keyStates.ArrowUp) {
			impulse.setZ(-BUILD_CAMERA_SPEED);
		}
		if (keyStates.ArrowDown) {
			impulse.setZ(BUILD_CAMERA_SPEED);
		}
		if (keyStates.ArrowRight) {
			impulse.setX(BUILD_CAMERA_SPEED);
		}
		if (keyStates.ArrowLeft) {
			impulse.setX(-BUILD_CAMERA_SPEED);
		}
		if (keyStates.KeyW) {
			angularImpulse.setX(-BUILD_ROTATION_SPEED);
		}
		if (keyStates.KeyS) {
			angularImpulse.setX(BUILD_ROTATION_SPEED);
		}
		if (keyStates.KeyD) {
			angularImpulse.setZ(-BUILD_ROTATION_SPEED);
		}
		if (keyStates.KeyA) {
			angularImpulse.setZ(BUILD_ROTATION_SPEED);
		}
		if (keyStates.KeyR) {
			angularImpulse.setX(-player.quaternion.x);
			angularImpulse.setY(-player.quaternion.y);
			angularImpulse.setZ(-player.quaternion.z);
		}
		if (keyStates.Space) {
			impulse.setY(BUILD_CAMERA_SPEED);
		}
		if (keyStates.ControlLeft) {
			impulse.setY(-BUILD_CAMERA_SPEED);
		}
		if (keyStates.KeyI) {
			//debug info key
			console.log(mapGenerator.generateLevelString());
		}
		player.body.setLinearVelocity(impulse);
		player.body.setAngularVelocity(angularImpulse);
		if (inEditor) {
			mapGenerator.moveGhostTile(player, new THREE.Vector3(0, 0, 0), tileScale, tileSelection);
		}
		updateWorld(deltaTime);
		return;
	}
	velocity = player.body.getLinearVelocity();


	$debug.text("Random Seed: " + seed);
	stamina -= Math.abs((-velocity.z() * deltaTime));//(velocity.x() * deltaTime) + (velocity.y() * deltaTime) + 
	if (stamina < 0) {
		stamina = 0;
	}
	//$('.hud--speed').text(Math.abs(-velocity.z().toPrecision(4)));
	//$('.hud--speed').attr("style", "height:" + Math.abs((-velocity.z().toPrecision(4) / maxSpeed) * 50) + "%;");
	let staminaPercent = ((stamina / maxStamina).toPrecision(2) * 100);
	$('.hud--stamina-label').text(Math.round(staminaPercent) + "%");
	$('.hud--stamina-value').attr("style", "height:" + staminaPercent + "%;");

	checkContact();
	if (won) {
		win();
		return;
	}
	if (player.position.y <= -5 || dead) {
		reset();
		return;
	}

	if (maxSpeed >= regularMaxSpeed) {
		maxSpeed -= BOOST_DECAY_RATE * deltaTime;
	}
	if (stamina > 0) {
		if (keyStates.ArrowUp || keyStates.KeyW) {
			let relVelChange = (-acceleration);
			if (velocity.z() + relVelChange >= -maxSpeed) {
				player.body.applyCentralImpulse(new Ammo.btVector3(0, 0, relVelChange));
			} else {
				let impulse = new Ammo.btVector3(velocity.x(), velocity.y(), -maxSpeed);
				player.body.setLinearVelocity(impulse);
			}
		}
		if (keyStates.ArrowDown || keyStates.KeyS) {
			let relVelChange = (acceleration);
			if (velocity.z() + relVelChange <= 0) {
				player.body.applyCentralImpulse(new Ammo.btVector3(0, 0, relVelChange));
			} else {
				let impulse = new Ammo.btVector3(velocity.x(), velocity.y(), 0);
				player.body.setLinearVelocity(impulse);
			}
		}
		if (keyStates.ArrowLeft || keyStates.KeyA) {
			if (!onGround) {
				//apply forces if not on the ground
				let relVelChange = (-turnSpeed);
				player.body.applyCentralImpulse(new Ammo.btVector3(relVelChange, 0, 0));
			} else {
				//better handling on the ground and at higher speeds
				let relVelChange = -turnSpeedOnGround + (turnSpeedOnGround * (velocity.z() / regularMaxSpeed));
				player.body.applyCentralImpulse(new Ammo.btVector3(relVelChange, 0, 0));
			}

		}
		if (keyStates.ArrowRight || keyStates.KeyD) {
			if (!onGround) {
				//apply forces if not on the ground
				let relVelChange = (turnSpeed);
				player.body.applyCentralImpulse(new Ammo.btVector3(relVelChange, 0, 0));
			} else {
				//better handling on the ground and at higher speeds
				let relVelChange = turnSpeedOnGround + (-turnSpeedOnGround * (velocity.z() / regularMaxSpeed));
				player.body.applyCentralImpulse(new Ammo.btVector3(relVelChange, 0, 0));
			}
		}
		//if not actively moving left or right and on the ground
		if (!keyStates.ArrowLeft && !keyStates.KeyA && !keyStates.ArrowRight && !keyStates.KeyD) {
			if (onGround) {
				//apply some extra friction to the x-axis movement
				let relVelChange = -velocity.x() * mapGenerator.xFriction;
				player.body.applyCentralImpulse(new Ammo.btVector3(relVelChange, 0, 0));
			}
		}
	}
	if (keyStates.Space || keyStates.KeyZ || keyStates.KeyM) {
		velocity = player.body.getLinearVelocity();
		if (stamina > 0 && (onGround || (clock.elapsedTime - timeLastOnGround) <= coyoteTimeLimit)) {
			if (player.position.y < WATER_LEVEL_Y_WORLD2) {
				let jumpImpulse = new Ammo.btVector3(velocity.x(), waterJumpSpeed, velocity.z());
				player.body.setLinearVelocity(jumpImpulse);
			} else {
				let jumpImpulse = new Ammo.btVector3(velocity.x(), jumpSpeed, velocity.z());
				player.body.setLinearVelocity(jumpImpulse);
			}

			onGround = false;
		}

	} else if (!onGround) {
		//not actively trying to jump and not on the ground
		//fall faster
		if (player.position.y < WATER_LEVEL_Y_WORLD2) {
			player.body.applyCentralImpulse(new Ammo.btVector3(0, -RESPONSIVE_ARTIFICAL_GRAVITY_UNDERWATER, 0));
		} else {
			player.body.applyCentralImpulse(new Ammo.btVector3(0, -RESPONSIVE_ARTIFICAL_GRAVITY, 0));
		}

	}
	let angularVelocity = new Ammo.btVector3(Math.max(velocity.z(), -9), 0, -velocity.x());
	player.body.setAngularVelocity(angularVelocity);

	//limit some speeds
	let linearX = Math.min(maxTurnSpeed, Math.max(-maxTurnSpeed, player.body.getLinearVelocity().x()));
	let linearY = player.body.getLinearVelocity().y();
	let linearZ = player.body.getLinearVelocity().z();
	let linearVelocity = new Ammo.btVector3(linearX, linearY, linearZ);
	player.body.setLinearVelocity(linearVelocity);

	updateWorld(deltaTime);
}
function lose() {
	console.log("lose");
	won = false;
	dead = true;
	$('.menu--loading-screen').removeClass('hide');
	$('#container').addClass('hide');
	if (bgm && bgm.isPlaying) {
		bgm.stop();
	}
	mapGenerator.clear();

	scene.clear();

	$('.menu--start-screen').removeClass('hide');
	$('.hud--basic').addClass('hide');
	$('.menu--loading-screen').addClass('hide');
}
function win() {
	console.log("win");
	won = true;
	dead = false;
	$('.menu--loading-screen').removeClass('hide');
	$('#container').addClass('hide');
	if (bgm && bgm.isPlaying) {
		bgm.stop();
	}

	mapGenerator.clear();
	scene.clear();
	$('.menu--start-screen').removeClass('hide');
	$('.hud--basic').addClass('hide');
	$('.menu--loading-screen').addClass('hide');
}

function reset() {
	console.log("reset");
	won = false;
	dead = true;

	$('.menu--loading-screen').removeClass('hide');
	$('#container').addClass('hide');

	mapGenerator.clear();
	scene.clear();
	init(currentWorld, currentLevel, inEditor, inPlayTest);

	camera.position.set(0, 12, player.position.z + 20);
	camera.lookAt(0, 0.5, player.position.z);
	spotLight.position.set(0, 20, player.position.z);
}