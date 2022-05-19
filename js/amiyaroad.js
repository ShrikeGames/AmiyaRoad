// init
import * as THREE from 'three';

import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './jsm/postprocessing/ShaderPass.js';
import { PixelShader } from './jsm/shaders/PixelShader.js';
import { Sky } from './jsm/objects/Sky.js';
import Stats from './jsm/libs/stats.module.js';

let camera, scene, renderer, composer, clock;

let sky, sun;
let spotLight;

let pixelPass, params;
let keyStates, delta;
let trackGroup, playerGroup;
let playerMesh;
let playerDirection;

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


let acceleration, maxDriveSpeed, deacceleration, minDriveSpeed, handling;
acceleration = 6;
maxDriveSpeed = 15;
maxJumpSpeed = 8;
deacceleration = 10;
minDriveSpeed = 0;
handling = 4;

let stamina;
const maxStamina = 300;

let playerVelocity;

const COLOUR_MAIN = new THREE.Color(0xc0bdf2);
const COLOUR_SECONDARY = new THREE.Color(0xffbef4);
const COLOUR_PILLAR = new THREE.Color(0xe0afff);
const MAP_SEGMENT_LENGTH = 250;
const TILE_WIDTH = 2;
const TILE_LENGTH = 4;
const stats = new Stats();

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);

	//pixelPass.uniforms.resolution.value.set( window.innerWidth, window.innerHeight ).multiplyScalar( window.devicePixelRatio );

}

$('.play-button').on('click', function (e) {
	init();
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
	delta = clock.getDelta();
	update(delta);

	composer.render();

	stats.update();

	window.requestAnimationFrame(animate);
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
	let adjustedFar = 8;
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
				if (collisionResult.object.name == "AmiyaBar") {
					stamina = maxStamina;
				}
				playPosAdjustment.x += ((-direction.x * Math.abs(radius - collisionResult.distance)));
				playPosAdjustment.y += ((-direction.y * Math.abs(radius - collisionResult.distance)));

				playPosAdjustment.z += ((-direction.z * Math.abs(radius - collisionResult.distance)));

				if (direction.z < 0 && direction.y >= 0 && direction.y < 1 && direction.x == 0) {
					if (playerVelocity.z >= maxDriveSpeed / 2.0) {
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
	if (stamina >= 0) {
		if (keyStates.KeyW || keyStates.ArrowUp) {
			playerVelocity.z = Math.min(playerVelocity.z + (acceleration * delta), maxDriveSpeed);
		}
		if (keyStates.KeyS || keyStates.ArrowDown) {
			playerVelocity.z = Math.max(playerVelocity.z - (deacceleration * delta), minDriveSpeed);
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
		playerVelocity.y *= 0.75;
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

	$('.hud--speed').text(playerVelocity.z.toPrecision(2));
	$('.hud--speed').attr("style", "width:" + ((playerVelocity.z.toPrecision(2) / 10) * 50) + "%;");
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
function reset() {
	playerDirection = new THREE.Vector3(0, 0, 1);
	playerVelocity = new THREE.Vector3(0, 0, 0);
	onGround = false;
	jumpSpeed = 0;
	stamina = maxStamina;

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
function generateTile(colour, scale = 1) {
	const boxGeometry = new THREE.BoxGeometry(TILE_WIDTH * scale, 0.4, TILE_LENGTH);

	const material = new THREE.MeshPhongMaterial({ color: colour });
	const mesh = new THREE.Mesh(boxGeometry, material);
	mesh.name = "Floor Tile";
	return mesh;
}
function generatePillar(colour, scale = 1) {
	const boxGeometry = new THREE.BoxGeometry(TILE_WIDTH * scale, 1, TILE_LENGTH);
	const material = new THREE.MeshPhongMaterial({ color: colour });
	const mesh = new THREE.Mesh(boxGeometry, material);
	mesh.name = "Pillar";
	return mesh;
}
function generateAmiyaBar(scale = 1) {
	const boxGeometry = new THREE.BoxGeometry(3, 0.1, 0.75);
	const texture = new THREE.TextureLoader().load('../images/amiyaroad/Amiyabars-logo.png');
	const material = new THREE.MeshBasicMaterial({ map: texture });
	const mesh = new THREE.Mesh(boxGeometry, material);
	mesh.name = "AmiyaBar";
	mesh.rotation.y = 1.5708;
	return mesh;
}
function initMap() {
	trackGroup = new THREE.Group();
	let t = 0;
	for (let i = 0; i < MAP_SEGMENT_LENGTH; i++) {
		t++;
		let random_skip = Math.random();
		if (random_skip <= 0.1 && i > 10 && i % 30 != 0) {

		} else {

			let colour = COLOUR_MAIN;
			if (i % 2 === 0) {
				colour = COLOUR_SECONDARY;
			}

			let tileMesh = generateTile(colour, 1);
			tileMesh.position.y = -0.2;

			if (i > 0 && i % 30 == 0) {
				tileMesh = generateAmiyaBar();
			}

			tileMesh.position.z = -i * TILE_LENGTH;
			tileMesh.position.x = 0;
			if (i >= 60) {
				tileMesh.position.x = Math.cos(t) * 1.5;
			} else if (i >= 30) {
				tileMesh.position.x = Math.cos(t);
			} else if (i >= 10) {
				tileMesh.position.x = Math.random() - 0.5;
			}

			if (i >= 20 && i % 30 != 0) {
				tileMesh.position.y += Math.floor(Math.random() * 2) * 0.3;
			}
			if (i >= 60) {
				tileMesh.rotation.x = Math.sin(t) * 0.10;
			}
			tileMesh.receiveShadow = true;
			trackGroup.add(tileMesh);
		}


		random_skip = Math.random();
		if (random_skip <= 0.5 && i > 10) {

		} else {
			let colour = COLOUR_MAIN;
			if (i % 2 === 0) {
				colour = COLOUR_SECONDARY;
			}
			let tileMesh = generatePillar(colour, 1);

			tileMesh.position.z = -i * TILE_LENGTH;
			tileMesh.position.x = -TILE_WIDTH;
			if (i >= 60) {
				tileMesh.position.x = -TILE_WIDTH + Math.cos(t) * 1.5;
			} else if (i >= 30) {
				tileMesh.position.x = -TILE_WIDTH + Math.cos(t);
			} else if (i >= 10) {
				tileMesh.position.x = -TILE_WIDTH + Math.random() - 0.5;
			}
			tileMesh.position.y = 0.4;

			if (i >= 20) {
				tileMesh.position.y += Math.floor(Math.random() * 2) * 0.3;
			}
			if (i >= 40) {
				tileMesh.rotation.x = Math.sin(t) * 0.05;
			}
			if (i >= 90) {
				tileMesh.rotation.z = Math.sin(t) * 0.05;
			}
			tileMesh.receiveShadow = true;
			trackGroup.add(tileMesh);
		}

		random_skip = Math.random();
		if (random_skip <= 0.5 && i > 10) {
			continue;
		} else {
			let colour = COLOUR_MAIN;
			if (i % 2 === 0) {
				colour = COLOUR_SECONDARY;
			}
			let tileMesh = generatePillar(colour, 1);

			tileMesh.position.z = -i * TILE_LENGTH;
			tileMesh.position.x = TILE_WIDTH;
			if (i >= 60) {
				tileMesh.position.x = TILE_WIDTH + Math.cos(t) * 1.5;
			} else if (i >= 30) {
				tileMesh.position.x = TILE_WIDTH + Math.cos(t);
			} else if (i >= 10) {
				tileMesh.position.x = TILE_WIDTH + Math.random() - 0.5;
			}
			tileMesh.position.y = 0.4;
			if (i >= 20) {
				tileMesh.position.y += Math.floor(Math.random() * 2) * 0.3;
			}
			if (i >= 40) {
				tileMesh.rotation.x = Math.sin(t) * 0.05;
			}
			if (i >= 90) {
				tileMesh.rotation.z = Math.sin(t) * 0.05;
			}
			tileMesh.receiveShadow = true;
			//tileMesh.rotation.z = 0.5;
			trackGroup.add(tileMesh);
		}

	}

	scene.add(trackGroup);
}

function initPlayer() {
	playerGroup = new THREE.Group();
	//(radius : Float, length : Float, capSubdivisions : Integer, radialSegments : Integer

	const capSubdivisions = 32;
	const radialSegments = 32;
	const texture = new THREE.TextureLoader().load('../images/amiyaroad/AmiyaStare.png');

	const playerGeometry = new THREE.SphereGeometry(radius * 0.75, capSubdivisions, radialSegments);
	const playerMaterial = new THREE.MeshBasicMaterial({ map: texture, name: "Player" });
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
function initSky() {

	// Add Sky
	sky = new Sky();
	sky.scale.setScalar(450000);
	scene.add(sky);

	sun = new THREE.Vector3();
	const effectController = {
		turbidity: 10,
		rayleigh: 3,
		mieCoefficient: 0.005,
		mieDirectionalG: 0.7,
		elevation: 2,
		azimuth: 180,
		exposure: 1
	};

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
	const bgm = new THREE.Audio(audioListener);

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
function init() {
	clock = new THREE.Clock();
	keyStates = {};
	playerDirection = new THREE.Vector3(0, 0, 1);
	playerVelocity = new THREE.Vector3(0, 0, 0);


	onGround = false;
	jumpSpeed = 0;
	stamina = maxStamina;

	document.addEventListener('keydown', (event) => {
		keyStates[event.code] = true;
	});

	document.addEventListener('keyup', (event) => {
		keyStates[event.code] = false;
	});

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

	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 60);
	camera.position.set(0, 1.9, 1);
	camera.lookAt(0, 0.5, -1);

	scene = new THREE.Scene();

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


	initSky();
	initMap();
	initPlayer();

	spotLight.target = playerMesh;
	scene.add(spotLight);

	initMusic();

	composer = new EffectComposer(renderer);
	composer.addPass(new RenderPass(scene, camera));

	/*pixelPass = new ShaderPass( PixelShader );
	pixelPass.uniforms.resolution.value = new THREE.Vector2( window.innerWidth, window.innerHeight );
	pixelPass.uniforms.resolution.value.multiplyScalar( window.devicePixelRatio );
	pixelPass.uniforms.pixelSize.value = 4;
	composer.addPass( pixelPass );*/


	window.addEventListener('resize', onWindowResize);
}
