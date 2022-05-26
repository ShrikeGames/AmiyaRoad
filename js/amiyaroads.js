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
let dead = false;
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
//to make you come down fast if not actively jumping, allowing for adjusted jump hight by holding
const RESPONSIVE_ARTIFICAL_GRAVITY = 5;
const acceleration = 5;
const turnSpeed = 4;
const jumpSpeed = 17;
const maxSpeed = 30;
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
let coyoteTimeLimit = 0.18;
let velocity;
let updates;
let lastUpdateVelocity;

// Rigid bodies include all movable objects
let rigidBodies;
let transformAux1;
let cbContactResult;

//sounds
let bgm;
let lastSelectedLevel;
let musicVolume = 0.05;

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
		//random seed when you click play on a level
		//retries within the level will regenerate the same way.
		seed = "amiyaroads_" + Math.random() * 256000;
		lastSelectedLevel = $this.attr("data-level");
		won = false;
		init(lastSelectedLevel);
		animate();
		$('.menu--start-screen').addClass('hide');
	});

	$(".hud--volume-slider").slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 5,
		slide: function (event, ui) {
			musicVolume = ui.value / 100.0;
			bgm.setVolume(musicVolume);
			$(".hud--volume-display").text((musicVolume * 100) + "%");
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

function init(levelSelected) {
	console.log("init");
	clock = new THREE.Clock();

	rigidBodies = [];

	initGraphics();

	initPhysics();

	createObjects(levelSelected);

	initSky(levelSelected);

	initMusic();

	$('.hud').removeClass('hide');
	$('#container').removeClass('hide');
	$('.menu--loading-screen').addClass('hide');
	dead = false;
	won = false;
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
	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 200);

	camera.position.set(0, 12, 21);
	camera.lookAt(0, 0.5, 0);

	const hemisphereLight = new THREE.HemisphereLight(0xfceafc, 0x000000, 0.8);
	scene.add(hemisphereLight);

	spotLight = new THREE.DirectionalLight(0xffffff, 0.3);
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


	//


}

function initPhysics() {
	console.log("ininitPhysicsitGraphics");
	// Physics configuration

	collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
	dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
	broadphase = new Ammo.btDbvtBroadphase();
	solver = new Ammo.btSequentialImpulseConstraintSolver();
	physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
	physicsWorld.setGravity(new Ammo.btVector3(0, - GRAVITY, 0));

	transformAux1 = new Ammo.btTransform();

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

		if (lastUpdateVelocity.z <= -maxSpeed / 2.0 && velocity.z() >= -0.1) {
			//last frame going very fast, now stopped completely, hit a wall too hard
			//die
			won = false;
			dead = true;

			console.log("previous velocity", lastUpdateVelocity.z);
			console.log("current velocity", velocity.z());

			reset();
			return;
		}


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

		if (tag == "Death") {
			dead = true;
			won = false;
		} else if (tag == "Goal") {
			won = true;
			dead = false;
		} else if (tag == "AmiyaBar") {
			stamina = maxStamina;
			// if (localPos.y() < 1.98 && Math.abs(localPos.z()) > 2.98) {
			// 	console.log(tag + " x:" + localPos.x() + ", y: " + localPos.y() + ", z: " + localPos.z());
			// 	dead = true;
			// 	won = false;
			// }
			if (localPos.y() >= 2) {
				timeLastOnGround = clock.elapsedTime;
				onGround = true;
			}

		} else if (tag == "Tile") {

			// if (localPos.y() < 1.98 && Math.abs(localPos.z()) > 5.9) {
			// 	console.log(tag + " x:" + localPos.x() + ", y: " + localPos.y() + ", z: " + localPos.z());
			// 	dead = true;
			// 	won = false;
			// }
			if (localPos.y() >= 2) {
				//console.log(tag + " x:" + localPos.x() + ", y: " + localPos.y() + ", z: " + localPos.z());
				timeLastOnGround = clock.elapsedTime;
				onGround = true;
			}
		}

	}

}

function createObjects(levelSelected) {
	console.log("createObjects");
	onGround = false;
	stamina = maxStamina;
	mapGenerator = new MapGenerator(scene, physicsWorld);
	keyStates = {};
	// Ground
	rigidBodies = mapGenerator.initMap(levelSelected, seed);
	player = mapGenerator.createPlayer();
	player.body.setLinearVelocity(new Ammo.btVector3(0, 0, 0));
	spotLight.target = player;
	lastUpdateVelocity = new THREE.Vector3(0, 0, 0);
	updates = 0;
}


function initInput() {
	console.log("initInput");

	keyStates = {};
	document.addEventListener('keydown', (event) => {
		keyStates[event.code] = true;
	});

	document.addEventListener('keyup', (event) => {
		keyStates[event.code] = false;
	});
}

function onWindowResize() {
	console.log("onWindowResize");
	if (won || dead) {
		return;
	}
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
	if (won || dead) {
		return;
	}
	requestAnimationFrame(animate);

	render();
	stats.update();
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
function updatePhysics(deltaTime) {
	if (won || dead) {
		return;
	}
	velocity = player.body.getLinearVelocity();


	$debug.text("Random Seed: " + seed);
	stamina -= Math.abs((-velocity.z() * deltaTime));//(velocity.x() * deltaTime) + (velocity.y() * deltaTime) + 
	if (stamina < 0) {
		stamina = 0;
	}
	$('.hud--speed').text(Math.abs(-velocity.z().toPrecision(4)));
	$('.hud--speed').attr("style", "width:" + Math.abs((-velocity.z().toPrecision(4) / maxSpeed) * 50) + "%;");
	$('.hud--stamina').text(Math.round(stamina));
	$('.hud--stamina').attr("style", "width:" + ((stamina / maxStamina).toPrecision(2) * 100) + "%;");

	checkContact();
	if (won) {
		win();
		return;
	}
	if (player.position.y <= -5 || dead) {
		reset();
		return;
	}
	if (keyStates.KeyI) {
		//debug info key
		console.log(player);
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
			//allow doubling back to be twice as fast if traveling in the opposite direction
			if (velocity.x() > 0) {
				player.body.applyCentralImpulse(new Ammo.btVector3(-turnSpeed * 1.3, 0, 0));
			} else {
				player.body.applyCentralImpulse(new Ammo.btVector3(-turnSpeed, 0, 0));
			}

		}
		if (keyStates.ArrowRight || keyStates.KeyD) {
			//allow doubling back to be twice as fast if traveling in the opposite direction
			if (velocity.x() < 0) {
				player.body.applyCentralImpulse(new Ammo.btVector3(turnSpeed * 1.3, 0, 0));
			} else {
				player.body.applyCentralImpulse(new Ammo.btVector3(turnSpeed, 0, 0));
			}
		}
	}
	if (keyStates.Space || keyStates.KeyZ || keyStates.KeyM) {
		velocity = player.body.getLinearVelocity();
		if (stamina > 0 && (onGround || (clock.elapsedTime - timeLastOnGround) <= coyoteTimeLimit)) {
			let jumpImpulse = new Ammo.btVector3(velocity.x(), jumpSpeed, velocity.z());
			player.body.setLinearVelocity(jumpImpulse);
			onGround = false;
		}

	} else if (!onGround) {
		//not actively trying to jump and not on the ground
		//fall faster
		player.body.applyCentralImpulse(new Ammo.btVector3(0, -RESPONSIVE_ARTIFICAL_GRAVITY, 0));
	}
	let angularVelocity = new Ammo.btVector3(Math.max(velocity.z(), -9), 0, -velocity.x());
	player.body.setAngularVelocity(angularVelocity);

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



	camera.position.set(0, 10, player.position.z + 20);
	camera.lookAt(0, 0.5, player.position.z);
	spotLight.position.set(player.position.x, 20, player.position.z);
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
	$('.hud').addClass('hide');
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
	init(lastSelectedLevel);
	camera.position.set(0, 12, player.position.z + 20);
	camera.lookAt(0, 0.5, player.position.z);
	spotLight.position.set(0, 20, player.position.z);


}