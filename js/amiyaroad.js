// init
import * as THREE from 'three';

import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { Sky } from './jsm/objects/Sky.js';
import { MapGenerator } from './maps/MapGenerator.js';
import Stats from './jsm/libs/stats.module.js';

let won = false;

let camera, scene, renderer, composer, clock;

let sky, sun;
let spotLight;

let keyStates, delta;
let trackGroup, playerGroup;
let playerMesh;
let playerDirection;
const TEXTURE_PLAYER = new THREE.TextureLoader().load('../images/amiyaroad/AmiyaStare.png');

let bgm;

//player
const radius = 0.3;

//collision
const forward = new THREE.Vector3(0, 0, -1);
const GRAVITY = new THREE.Vector3(0, -40, 0);
const MAX_Y_VEL = 8;
let onGround, timeLastOnGround;
let jumpSpeed, maxJumpSpeed;

const directions = [];
const direction = new THREE.Vector3(0, -1, 0);
directions.push(direction);
for (let x = -1; x <= 1; x += 0.5) {
	for (let y = -1; y <= 1; y += 0.5) {
		for (let z = -1; z <= 1; z += 0.5) {
			const direction = new THREE.Vector3(x, y, z);
			directions.push(direction);
		}
	}
}


let acceleration, maxDriveSpeed, maxRegularSpeed, maxBoostSpeed, deacceleration, minDriveSpeed, handling;
acceleration = 6;
maxRegularSpeed = 10;
maxBoostSpeed = 20;
maxDriveSpeed = maxRegularSpeed;
maxJumpSpeed = 11;
deacceleration = 10;
minDriveSpeed = 0;
handling = 4;

let stamina;
const maxStamina = 300;

let playerVelocity;
const mapGenerator = new MapGenerator();
const stats = new Stats();

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

$('.play-button').on('click', function (e) {
	let $this = $(this);
	let levelSelected = $this.attr("data-level");
	won = false;
	init(levelSelected);
	animate();
	$('.menu--start-screen').addClass('hide');
});
var $langToggleEN = $('.button--language_toggle_en');
var $langToggleJP = $('.button--language_toggle_jp');
var currentLang = 0;
function toggleLangs() {
	if (currentLang == 0) {
		$('[data-lang-jp]').each(function (index) {
			var newText = $(this).attr('data-lang-jp');
			$(this).html(newText);
		});
	} else {
		$('[data-lang-en]').each(function (index) {
			var newText = $(this).attr('data-lang-en');
			$(this).html(newText);
		});
	}

	currentLang = 1 - currentLang;

	if (currentLang == 0) {
		$langToggleEN.addClass('button-secondary');
		$langToggleEN.removeClass('button-primary');
		$langToggleJP.removeClass('button-secondary');
		$langToggleJP.addClass('button-primary');
	} else {
		$langToggleJP.addClass('button-secondary');
		$langToggleJP.removeClass('button-primary');
		$langToggleEN.removeClass('button-secondary');
		$langToggleEN.addClass('button-primary');
	}
}
$langToggleEN.click(function (e) {
	e.preventDefault();
	toggleLangs();

});
$langToggleJP.click(function (e) {
	e.preventDefault();
	toggleLangs();

});

function animate() {
	if (!won) {
		delta = clock.getDelta();
		update(delta);

		composer.render();

		stats.update();

		window.requestAnimationFrame(animate);
	}
}
function collides(raycaster, direction, delta) {
	const intersects = raycaster.intersectObjects(trackGroup.children);
	let results = []
	let result = null;
	for (let i = 0; i < intersects.length; i++) {
		result = intersects[i];
		if (result.distance <= radius) {
			if (result.face.normal.x != 0 || result.face.normal.y != 0 || result.face.normal.z != 0) {
				//result.object.material.color.set( 0xFF0000 );
				if (direction.y < 0) {
					onGround = true;
					timeLastOnGround = clock.elapsedTime;
				}
				results.push(result);
			}

		}
	}
	return results;
}
function sphereCollision(delta) {
	let raycasters = [];
	let adjustedFar = 30;
	const startPos = new THREE.Vector3(playerGroup.position.x, playerGroup.position.y, playerGroup.position.z);


	for (let d = 0; d < directions.length; d++) {
		const raycaster = new THREE.Raycaster(startPos, directions[d], 0, adjustedFar);
		raycasters.push(raycaster);
	}

	onGround = false;
	let playPosAdjustment = new THREE.Vector3(0, 0, 0);
	for (let r = 0; r < raycasters.length; r++) {
		const raycaster = raycasters[r];
		const direction = directions[r];
		let collisionResults = collides(raycaster, direction, delta);
		for (let c = 0; c < collisionResults.length; c++) {
			let collisionResult = collisionResults[c];
			if (collisionResult != null) {
				if (collisionResult.object.name == "Player") {
					continue;
				}
				if (collisionResult.object.name == "Goal") {
					win();
					return;
				}
				if (collisionResult.object.name == "Boost") {
					maxDriveSpeed = maxBoostSpeed;
					playerVelocity.z = maxDriveSpeed;
					playerVelocity.y = maxJumpSpeed * 4;
					onGround = false;
				}
				
				if (collisionResult.object.name == "Death") {
					reset();
					return;
				} else if (collisionResult.object.name == "AmiyaBar") {
					stamina = maxStamina;
				}
				playPosAdjustment.x += ((-direction.x * Math.abs(radius - collisionResult.distance)));
				playPosAdjustment.y += ((-direction.y * Math.abs(radius - collisionResult.distance)));

				playPosAdjustment.z += ((-direction.z * Math.abs(radius - collisionResult.distance)));
				if (collisionResult.object.name != "Boost" && direction.z < 0 && direction.y >= 0) {
					if (collisionResult.distance <= radius / 2.0) {
						console.log(collisionResult.distance);
						reset();
						return;
					}
				}

			}
		}

	}
	playerGroup.position.x += playPosAdjustment.x * delta;
	playerGroup.position.y += playPosAdjustment.y * delta;
	playerGroup.position.z += playPosAdjustment.z * delta;
	if (playPosAdjustment.x > 0 && playPosAdjustment.y <= 0.5) {
		if (keyStates.KeyA || keyStates.ArrowLeft) {
			playerVelocity.x = 0;
		}
	} else if (playPosAdjustment.x < 0 && playPosAdjustment.y <= 0.5) {
		if (keyStates.KeyD || keyStates.ArrowRight) {
			playerVelocity.x = 0;
		}
	}

	if (playPosAdjustment.z >= maxDriveSpeed) {
		console.log(playPosAdjustment.z);
		reset();
	}

	return false;
}
function update(delta) {
	if (won) {
		return;
	}
	if (stamina >= 0) {
		if (keyStates.KeyW || keyStates.ArrowUp) {
			playerVelocity.z = Math.min(playerVelocity.z + (acceleration * delta), maxDriveSpeed);
		}
		if (keyStates.KeyS || keyStates.ArrowDown) {
			playerVelocity.z = Math.max(playerVelocity.z - (deacceleration * delta), 0);
		}

		playerVelocity.x = 0;
		if (keyStates.KeyA || keyStates.ArrowLeft) {
			playerVelocity.x = -handling;
		}
		if (keyStates.KeyD || keyStates.ArrowRight) {
			playerVelocity.x = handling;
		}
	}
	if (!onGround) {
		playerVelocity.x *= 0.75;
	}
	sphereCollision(delta);
	if (stamina >= 0) {
		if (keyStates.Space || keyStates.KeyZ || keyStates.KeyM) {
			if (onGround) {
				playerVelocity.y = maxJumpSpeed;
				onGround = false;
			} else if (clock.elapsedTime - timeLastOnGround < 0.15) {
				playerVelocity.y = maxJumpSpeed;
				onGround = false;
			}
		}
	}

	if (!keyStates.Space && !keyStates.KeyZ && !keyStates.KeyM && !onGround && playerVelocity.y > 0) {
		playerVelocity.y *= 0.75 * delta;
	}
	if (playerVelocity.z > maxBoostSpeed) {
		playerVelocity.z = maxBoostSpeed;
	}
	if (onGround && maxDriveSpeed > maxRegularSpeed) {
		maxDriveSpeed = Math.max(maxDriveSpeed - (10 * delta), maxRegularSpeed);
		if (playerVelocity.z > maxDriveSpeed) {
			playerVelocity.z = maxDriveSpeed;
		}
		console.log(maxDriveSpeed);
	}
	//trackGroup.position.add(new THREE.Vector3(0, 0, -forward.z * playerVelocity.z * delta));
	playerGroup.position.add(new THREE.Vector3(0, 0, forward.z * playerVelocity.z * delta));
	stamina -= playerVelocity.z * delta;
	if (stamina <= 0) {
		reset();
		return;
	}
	playerGroup.position.add(new THREE.Vector3(playerVelocity.x * delta, playerVelocity.y * delta, 0));
	playerGroup.rotation.x += -playerVelocity.z * delta;
	playerGroup.rotation.z += playerVelocity.x * delta;
	$('.hud--debug').text(onGround + " " + (clock.elapsedTime - timeLastOnGround) + " " + playerGroup.position.x.toPrecision(2) + "," + playerGroup.position.y.toPrecision(2) + "," + playerGroup.position.z.toPrecision(2) + " " + playerVelocity.x.toPrecision(2) + "," + playerVelocity.y.toPrecision(2) + "," + playerVelocity.z.toPrecision(2));

	if (playerVelocity.z < maxBoostSpeed) {
		$('.hud--speed').text(playerVelocity.z.toPrecision(2));
		$('.hud--speed').attr("style", "width:" + ((playerVelocity.z.toPrecision(2) / 10) * 50) + "%;");
	} else {
		$('.hud--speed').text("AMI SPEED");
		$('.hud--speed').attr("style", "width:100%;");
	}

	$('.hud--stamina').text(Math.round(stamina));
	$('.hud--stamina').attr("style", "width:" + ((stamina / maxStamina).toPrecision(2) * 100) + "%;");
	if (!onGround) {
		playerVelocity.y += (GRAVITY.y) * delta;
		if (playerVelocity.y < -MAX_Y_VEL) {
			playerVelocity.y = -MAX_Y_VEL;
		}
	} else {
		playerVelocity.y = 0;
	}

	camera.position.set(0, 2.5, playerGroup.position.z + 3);
	camera.lookAt(0, 0.5, playerGroup.position.z);
	spotLight.position.set(0, 15, playerGroup.position.z);

	if (playerGroup.position.y < -5) {
		reset();
	}
}
function clearThree(obj) {
	obj.clear();
}

function win() {
	if (!won) {
		clearThree(scene);
		if (bgm != null) {
			bgm.stop();
		}

		$('.menu--start-screen').removeClass('hide');
		$('.hud').addClass('hide');
		won = true;
	}

}
function reset() {
	playerDirection = new THREE.Vector3(0, 0, 1);
	playerVelocity = new THREE.Vector3(0, 0, 0);
	onGround = false;
	jumpSpeed = 0;
	stamina = maxStamina;
	maxDriveSpeed = maxRegularSpeed;

	playerGroup.position.x = 0;
	playerGroup.position.y = 1;
	playerGroup.position.z = -1;

	trackGroup.position.x = 0;
	trackGroup.position.y = 0;
	trackGroup.position.z = 0;

	camera.position.set(0, 2.5, playerGroup.position.z + 3);
	camera.lookAt(0, 0.5, playerGroup.position.z);
	spotLight.position.set(0, 15, playerGroup.position.z);

}

function initMap(levelSelected) {
	console.log(levelSelected);
	if (levelSelected == "?-?") {
		trackGroup = mapGenerator.generateRandomLevel();
	} else if (levelSelected == "1-1") {
		trackGroup = mapGenerator.generateLevel_1_1();
	} else if (levelSelected == "1-2") {
		trackGroup = mapGenerator.generateLevel_1_2();
	} else if (levelSelected == "1-3") {
		trackGroup = mapGenerator.generateLevel_1_3();
	} else if (levelSelected == "2-1") {
		trackGroup = mapGenerator.generateLevel_2_1();
	} else {
		trackGroup = new THREE.Group();
	}
	scene.add(trackGroup);
}

function initPlayer() {
	playerGroup = new THREE.Group();
	//(radius : Float, length : Float, capSubdivisions : Integer, radialSegments : Integer

	const capSubdivisions = 32;
	const radialSegments = 32;


	const playerGeometry = new THREE.SphereGeometry(radius, capSubdivisions, radialSegments);
	const playerMaterial = new THREE.MeshBasicMaterial({ map: TEXTURE_PLAYER, name: "Player" });
	//const playerMaterial = new THREE.MeshBasicMaterial( {color: 0xb9adeb, shininess: 0.5} );
	playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
	playerMesh.position.z = 0;
	playerMesh.position.x = 0;
	playerMesh.position.y = 0;
	playerMesh.castShadow = true;
	playerMesh.receiveShadow = true;
	playerMesh.name = "Player";

	playerGroup.add(playerMesh);

	playerGroup.position.x = 0;
	playerGroup.position.y = 1;
	playerGroup.position.z = -1;

	scene.add(playerGroup);

}
function initSky(levelSelected) {

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
	renderer.render(scene, camera);

}

function initMusic() {
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
function initFirstTime() {

	document.addEventListener('keydown', (event) => {
		keyStates[event.code] = true;
	});

	document.addEventListener('keyup', (event) => {
		keyStates[event.code] = false;
	});

	window.addEventListener('resize', onWindowResize);


	const container = document.getElementById('container');
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	container.appendChild(renderer.domElement);

	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild(stats.domElement);
}

function init(levelSelected = "") {
	clock = new THREE.Clock();
	keyStates = {};
	playerDirection = new THREE.Vector3(0, 0, 1);
	playerVelocity = new THREE.Vector3(0, 0, 0);

	onGround = false;
	jumpSpeed = 0;
	stamina = maxStamina;

	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 60);
	camera.position.set(0, 1.9, 1);
	camera.lookAt(0, 0.5, -1);


	scene = new THREE.Scene();
	if (levelSelected != "") {
		const hemisphereLight = new THREE.HemisphereLight(0xfceafc, 0x000000, 0.8);
		scene.add(hemisphereLight);

		spotLight = new THREE.SpotLight(0xffffff, 0.3);
		spotLight.position.set(0, 15, 0);

		spotLight.castShadow = true;

		spotLight.shadow.mapSize.width = 1024;
		spotLight.shadow.mapSize.height = 1024;

		spotLight.shadow.camera.near = 1;
		spotLight.shadow.camera.far = 20;
		spotLight.shadow.camera.fov = 90;
		spotLight.shadow.camera.right = 1.5;
		spotLight.shadow.camera.left = - 1.5;
		spotLight.shadow.camera.top = 1.5;
		spotLight.shadow.camera.bottom = - 1.5;

		initSky(levelSelected);
		initMusic();
		initMap(levelSelected);
		initPlayer();

		spotLight.target = playerMesh;
		scene.add(spotLight);
	}

	composer = new EffectComposer(renderer);
	composer.addPass(new RenderPass(scene, camera));
	$('.hud').removeClass('hide');
}
initFirstTime();