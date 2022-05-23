// init
import * as THREE from 'three';
import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { Sky } from './jsm/objects/Sky.js';
import { MapGenerator } from './maps/MapGenerator.js';
import Stats from './jsm/libs/stats.module.js';
import { LanguageToggle } from './utils/LanguageToggle.js';

let stats;

const languageToggle = new LanguageToggle();
let mapGenerator;
//global
let initialized = false;
let keyStates;
let won = false;
let scene;
let renderer;
let camera;
let spotLight;
let clock;
let sky;
let sun;
let player;
let container;

// Physics
// Physics variables
const GRAVITY = 30;
const acceleration = 30;
const turnSpeed = 60;
const jumpSpeed = 1700;
const maxSpeed = 30;
const minContactDistance = 0.5;
const maxStamina = 500;
let stamina;
let collisionConfiguration;
let dispatcher;
let broadphase;
let solver;
let physicsWorld;

let jumpReset;

// Rigid bodies include all movable objects
let rigidBodies;

let transformAux1;

//sounds
let bgm;
let lastSelectedLevel;


//ui
let $debug = $('.hud.hud--debug');

Ammo().then(function (AmmoLib) {

	Ammo = AmmoLib;
	initFirstTime();

});

function initFirstTime() {
	console.log("initFirstTime");
	if (initialized) {
		return;
	}


	$('.play-button').on('click', function (e) {
		let $this = $(this);
		lastSelectedLevel = $this.attr("data-level");
		won = false;
		init(lastSelectedLevel);
		animate();
		$('.menu--start-screen').addClass('hide');
	});

	window.addEventListener('resize', onWindowResize);




	initialized = true;
}

function init(levelSelected) {

	clock = new THREE.Clock();

	rigidBodies = [];
	keyStates = {};

	initGraphics();

	initPhysics();

	createObjects(levelSelected);

	initInput();

	initSky(levelSelected);

	initMusic();

	$('.hud').removeClass('hide');
	$('#container').removeClass('hide');
	$('.menu--loading-screen').addClass('hide');

}

function initSky(levelSelected) {
	console.log("initSky");
	// Add Sky
	sky = new Sky();
	sky.scale.setScalar(450000);
	scene.add(sky);

	sun = new THREE.Vector3();
	let effectController = {
		turbidity: 10,
		rayleigh: 3,
		mieCoefficient: 0.005,
		mieDirectionalG: 0.7,
		elevation: 2,
		azimuth: 180,
		exposure: 1
	};
	if (levelSelected == "?-?") {
		effectController = {
			turbidity: Math.random() * 20,
			rayleigh: Math.random() * 6,
			mieCoefficient: Math.random() * 0.001,
			mieDirectionalG: Math.random(),
			elevation: Math.random() * 4,
			azimuth: Math.random() * 360,
			exposure: Math.random()
		}
	}

	const uniforms = sky.material.uniforms;
	uniforms['turbidity'].value = effectController.turbidity;
	uniforms['rayleigh'].value = effectController.rayleigh;
	uniforms['mieCoefficient'].value = effectController.mieCoefficient;
	uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

	const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
	const theta = THREE.MathUtils.degToRad(effectController.azimuth);

	sun.setFromSphericalCoords(1, phi, theta);

	uniforms['sunPosition'].value.copy(sun);


	renderer.toneMappingExposure = effectController.exposure;


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
			bgm.setVolume(0.05);
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


	container = document.getElementById('container');
	container.innerHTML = "";
	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.2, 120);

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xbfd1e5);

	camera.position.set(0, 14, 1);
	camera.lookAt(0, 0.5, -1);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;

	container.appendChild(renderer.domElement);

	const hemisphereLight = new THREE.HemisphereLight(0xfceafc, 0x000000, 0.8);
	scene.add(hemisphereLight);

	spotLight = new THREE.SpotLight(0xffffff, 0.3);
	spotLight.position.set(0, 20, 0);

	spotLight.castShadow = true;

	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;

	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 60;
	spotLight.shadow.camera.fov = 90;
	spotLight.shadow.camera.right = 10.5;
	spotLight.shadow.camera.left = -10.5;
	spotLight.shadow.camera.top = 10.5;
	spotLight.shadow.camera.bottom = - 10.5;

	scene.add(spotLight);

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild(stats.domElement);

	//

	window.addEventListener('resize', onWindowResize);

}

function initPhysics() {

	// Physics configuration

	collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
	dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
	broadphase = new Ammo.btDbvtBroadphase();
	solver = new Ammo.btSequentialImpulseConstraintSolver();
	physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
	physicsWorld.setGravity(new Ammo.btVector3(0, - GRAVITY, 0));

	transformAux1 = new Ammo.btTransform();

	jumpReset = true;
	stamina = maxStamina;

}

function createObjects(levelSelected) {
	mapGenerator = new MapGenerator(scene, physicsWorld);

	// Ground
	rigidBodies = mapGenerator.initMap(levelSelected);
	player = mapGenerator.createPlayer();

	spotLight.target = player;
	// textureLoader.load( 'textures/grid.png', function ( texture ) {

	// 	texture.wrapS = THREE.RepeatWrapping;
	// 	texture.wrapT = THREE.RepeatWrapping;
	// 	texture.repeat.set( 40, 40 );
	// 	ground.material.map = texture;
	// 	ground.material.needsUpdate = true;

	// } );

}


function initInput() {
	console.log("initInput");
	document.addEventListener('keydown', (event) => {
		keyStates[event.code] = true;
	});

	document.addEventListener('keyup', (event) => {
		keyStates[event.code] = false;
	});

}

function onWindowResize() {
	if (won) {
		return;
	}
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
	if (won) {
		return;
	}
	requestAnimationFrame(animate);

	render();
	stats.update();

}

function render() {
	if (won) {
		return;
	}
	const deltaTime = clock.getDelta();

	updatePhysics(deltaTime);

	renderer.render(scene, camera);

}
function calculateOnGround() {
	let numManifolds = dispatcher.getNumManifolds();

	let onGround = false;
	let distance = 0;
	for (let i = 0; i < numManifolds; i++) {
		const contactManifold = dispatcher.getManifoldByIndexInternal(i);

		let body0 = contactManifold.getBody0();
		let body1 = contactManifold.getBody1();
		if (!body0 && !body1) {
			continue;
		}
		let rb0 = Ammo.castObject(contactManifold.getBody0(), Ammo.btRigidBody);
		let rb1 = Ammo.castObject(contactManifold.getBody1(), Ammo.btRigidBody);
		if (rb0.name == "Goal" || rb1.name == "Goal") {
			win();
			return;
		} else if (rb0.name == "AmiyaBar" || rb1.name == "AmiyaBar") {
			stamina = maxStamina;
		}

		let contactPoint = contactManifold.getContactPoint();
		distance = contactPoint.getDistance();
		if (Math.abs(contactPoint.getDistance()) < minContactDistance) {
			onGround = true;
		}

	}
	return onGround;
}
function updatePhysics(deltaTime) {
	if (won) {
		return;
	}
	if (player.position.y <= -5) {
		reset();
		return;
	}
	let velocity = player.body.getLinearVelocity();

	stamina -= (-velocity.z() * deltaTime);//(velocity.x() * deltaTime) + (velocity.y() * deltaTime) + 
	if (stamina < 0) {
		stamina = 0;
	}
	$('.hud--speed').text(-velocity.z().toPrecision(4));
	$('.hud--speed').attr("style", "width:" + ((-velocity.z().toPrecision(4) / maxSpeed) * 50) + "%;");
	$('.hud--stamina').text(Math.round(stamina));
	$('.hud--stamina').attr("style", "width:" + ((stamina / maxStamina).toPrecision(2) * 100) + "%;");

	let onGround = calculateOnGround();

	//console.log(velocity.z());
	if (stamina > 0) {
		if (keyStates.ArrowUp || keyStates.KeyW) {
			let relVelChange = (-acceleration * deltaTime);
			if (velocity.z() + relVelChange >= -maxSpeed) {
				player.body.applyCentralImpulse(new Ammo.btVector3(0, 0, relVelChange));
			}
		}
		if (keyStates.ArrowDown || keyStates.KeyS) {
			let relVelChange = (acceleration * deltaTime);
			if (velocity.z() + relVelChange <= 0) {
				player.body.applyCentralImpulse(new Ammo.btVector3(0, 0, relVelChange));
			}
		}
		if (keyStates.ArrowLeft || keyStates.KeyA) {
			player.body.applyCentralImpulse(new Ammo.btVector3(-turnSpeed * deltaTime, 0, 0));
		}
		if (keyStates.ArrowRight || keyStates.KeyD) {
			player.body.applyCentralImpulse(new Ammo.btVector3(turnSpeed * deltaTime, 0, 0));
		}
	}
	if (keyStates.Space || keyStates.KeyZ || keyStates.KeyM) {
		if (stamina > 0 && onGround && jumpReset) {
			player.body.applyCentralImpulse(new Ammo.btVector3(0, jumpSpeed * deltaTime, 0));
			onGround = false;
			jumpReset = false;
		}

	} else if (!onGround) {
		player.body.applyCentralImpulse(new Ammo.btVector3(0, velocity.y() * 0.25 * deltaTime, 0));
	}
	if (velocity.y() <= 0) {
		jumpReset = true;
	}

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

			objThree.userData.collided = false;

		}

	}

	camera.position.set(0, 7, player.position.z + 10);
	camera.lookAt(0, 0.5, player.position.z);
	spotLight.position.set(0, 20, player.position.z);
}
function win() {
	won = true;
	$('.menu--loading-screen').removeClass('hide');
	$('#container').addClass('hide');
	bgm.stop();
	scene.clear();
	$('.menu--start-screen').removeClass('hide');
	$('.hud').addClass('hide');
	$('.menu--loading-screen').addClass('hide');
}

function reset() {
	$('.menu--loading-screen').removeClass('hide');
	$('#container').addClass('hide');
	scene.clear();
	init(lastSelectedLevel);
	camera.position.set(0, 7, player.position.z + 10);
	camera.lookAt(0, 0.5, player.position.z);
	spotLight.position.set(0, 20, player.position.z);

}

