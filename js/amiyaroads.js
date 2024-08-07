// init
import * as THREE from 'three';
import { Sky } from './jsm/objects/Sky.js';
import { Water } from './jsm/objects/Water.js';
import { MapGenerator } from './maps/MapGenerator.js';
import Stats from './jsm/libs/stats.module.js';
import { LanguageToggle } from './utils/LanguageToggle.js';
import { SVGLoader } from './jsm/loaders/SVGLoader.js';
import { FontLoader } from './jsm/loaders/FontLoader.js';
import { TTFLoader } from './jsm/loaders/TTFLoader.js';
const versionString = "Itch.io Build 1.0.0 \"Ancient Spooder\"";

let stats;

const languageToggle = new LanguageToggle();
let mapGenerator = undefined;
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
const GRAVITY = 380;
//to make you come down fast if not actively jumping, allowing for adjusted jump hight by holding
const RESPONSIVE_ARTIFICAL_GRAVITY = 80;
const RESPONSIVE_ARTIFICAL_GRAVITY_UNDERWATER = 30;
const acceleration = 40;
const BOOST_ACCELERATION = 160;
const turnSpeed = 25;
const turnSpeedOnGround = 25;
const regularMaxSpeed = 420;
const boostMaxSpeed = 820;
const BOOST_DECAY_RATE = 40;
const maxTurnSpeed = 300;
const jumpSpeed = 136;
const waterJumpSpeed = 112;
let maxSpeed = regularMaxSpeed;
const maxStamina = 3000;

// if the player goes above this height the camera will pan with them
const yCameraPan = 60;

let maxBuckos = 50;
let maxBuckosUpperLimit = 200;
var particlesNames = [];

let fogDensity = 0.0008;
const fogColour = new THREE.Color(0xfbddff);

let drawDistance = 6000;

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
let soundEffectsVolume = 0.30;

//ui
let text;

//level editor
const BUILD_CAMERA_SPEED_X = 50;
const BUILD_CAMERA_SPEED_Y = 20;
const BUILD_CAMERA_SPEED_Z = 100;
const BUILD_ROTATION_SPEED = Math.PI;
let tileSelection = 0;
let tileScale = 1;
let minTileScale = 1;
let maxTileScale = 2;

const SPRING_BOOST = 480;
const WATER_LEVEL_Y_WORLD2 = 60;
const WATER_LEVEL_Y_WORLD3 = -40;
let waterLevel = WATER_LEVEL_Y_WORLD2;
let maxWaterLevel = waterLevel;
let WATER_ACCELERATION_DEBUFF = 0.95;

let tileSnapDistanceX = 10;
let tileSnapDistanceY = 5;
let tileSnapDistanceZ = 25;

let defaultEffectController = {
	turbidity: 10,
	rayleigh: 3,
	mieCoefficient: 0.005,
	mieDirectionalG: 0.7,
	elevation: 30,
	azimuth: 360,
	exposure: 1
};
let effectController = defaultEffectController;
const loader = new TTFLoader();
const fontLoader = new FontLoader();
const fontColor = new THREE.Color(0xb84ff4);
let font;
let fontMaterial;
let fontLoaded = false;

let $lastPlayedLevel;

const mainGameLoop = function (deltaTime) {

	if (won || dead) {
		return;
	}
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
};
// game loop limited to 60fps because bullet physics engine only does 60
const gameLoop = createGameLoop(mainGameLoop, 60);

Ammo().then(function (AmmoLib) {

	Ammo = AmmoLib;
	initFirstTime();

});

function initFirstTime() {
	console.log("initFirstTime");
	$('.menu--loading-screen').removeClass('hide');
	if (initialized) {
		return;
	}

	$('.version').text(versionString);

	$('.modal--close').on('click', function (e) {
		e.preventDefault();
		if (text) {
			text.material.opacity = 0;
		}
		$('.modal').addClass('hide');
	});
	$('.modal').on('click', function (e) {
		if ($(e.target).hasClass("modal")) {
			$('.modal').addClass('hide');
			if (text) {
				text.material.opacity = 0;
			}
		} else {
			e.stopPropagation();
		}
	});
	$('#level-name').on("focus", function (e) {
		$(this).addClass("focused");
	});
	$('#level-name').on("focusout", function (e) {
		$(this).removeClass("focused");
	});
	//https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
	//Not for crypto use, public domain
	const cyrb53 = function (str, seed = 0) {
		let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
		for (let i = 0, ch; i < str.length; i++) {
			ch = str.charCodeAt(i);
			h1 = Math.imul(h1 ^ ch, 2654435761);
			h2 = Math.imul(h2 ^ ch, 1597334677);
		}
		h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
		h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
		return 4294967296 * (2097151 & h2) + (h1 >>> 0);
	};
	$('.apply-chotCode').on('click', function (e) {
		e.preventDefault();
		console.log("test");
		var chotCodeInput = $('input#chotCode').val();
		var chotCodeHashed = cyrb53(chotCodeInput);
		console.log(chotCodeHashed);
		var message = "";

		if (chotCodeHashed == 5370197679744504) {
			message = "Accepted. I'll protect you this time.";
			mapGenerator.activateCheat1();
		} else if (chotCodeHashed == 5269442767054596) {
			message = "Accepted. In your next life you'll see your changes.";
			mapGenerator.activateCheat2();
		} else if (chotCodeHashed == 5120961133847674) {
			message = "Accepted. >         <";
			mapGenerator.activateCheat3();
		} else {
			message = "Denied.";
		}
		$('.hud--chotCode-display').text(message);
	});

	$('.hud--mobile').on('click', function (e) {
		e.stopPropagation();
	});
	$('.hud--mobile-keyCap').on('touchstart', function (e) {
		e.preventDefault();
	});
	$('.hud--mobile-keyCap').on('touchend', function (e) {
		e.preventDefault();
	});
	$('.hud--mobile--left').on('touchstart', function (e) {
		keyStates.ArrowLeft = true;
	});
	$('.hud--mobile--left').on('touchend', function (e) {
		keyStates.ArrowLeft = false;
	});
	$('.hud--mobile--right').on('touchstart', function (e) {
		keyStates.ArrowRight = true;
	});
	$('.hud--mobile--right').on('touchend', function (e) {
		keyStates.ArrowRight = false;
	});
	$('.hud--mobile--top').on('touchstart', function (e) {
		keyStates.ArrowUp = true;
	});
	$('.hud--mobile--top').on('touchend', function (e) {
		keyStates.ArrowUp = false;
	});
	$('.hud--mobile--bottom').on('touchstart', function (e) {
		keyStates.KeyZ = true;
	});
	$('.hud--mobile--bottom').on('touchend', function (e) {
		keyStates.KeyZ = false;
	});
	function create2DVector(vector, camera, width, height) {
		var vector = vector.clone().project(camera);

		vector.x = (vector.x + 1) / 2 * width;
		vector.y = -(vector.y - 1) / 2 * height;

		return vector;
	}
	$('.export-button').on('click', function (e) {
		e.preventDefault();
		initFont();
		var cover = $("#cover");
		text.material.opacity = 1;
		text.position.x = player.position.x;
		text.position.y = player.position.y;
		text.position.z = player.position.z - 10;
		render();

		mapGenerator.generateLevelString();
		var base64LevelString = btoa($('#levelSelect').val());
		var screenshotImage = renderer.domElement.toDataURL("image/png");
		var imageElement = document.getElementById("img");
		imageElement.src = screenshotImage;
		imageElement.onload = function () {
			console.log(text.position);
			let screenWidth = $('#container canvas').attr('width');
			let screenHeight = $('#container canvas').attr('height');

			let screenPos = create2DVector(player.position, camera, screenWidth, screenHeight);
			var dxWindow = Math.max(0, screenPos.x - 300);
			var dyWindow = Math.max(0, screenPos.y - 300);
			console.log(dxWindow, dyWindow);
			var encodedImageURL = steg.encode(base64LevelString, "img", { t: 3, dx: dxWindow, dy: dyWindow, width: 600, height: 600 });
			cover.attr("src", encodedImageURL);

			var link = $('a.download-level-link');
			link.attr('download', 'AmiyaRoads_' + $('#level-name').val() + '.png');
			link.attr('href', encodedImageURL.replace("image/png", "image/octet-stream"));
			link.click();

			$('.modal--share').removeClass('hide');
		};
	});
	$('.open-modal').on('click', function (e) {
		e.preventDefault();
		var $this = $(this);
		var modalId = $this.attr('data-modal-id');
		var $modal = $('#' + modalId);
		$modal.removeClass('hide');
	});
	$('.play-button').on('click', function (e) {
		e.preventDefault();
		console.log("Play");
		let $this = $(this);
		$lastPlayedLevel = $(this);
		currentLevel = $this.attr("data-level");
		currentWorld = $this.attr("data-world");
		console.log(currentWorld, "-", currentLevel);
		inEditor = "true" == $this.attr("data-editor");
		inPlayTest = "true" == $this.attr("data-playtest");
		$('.hud--mobile').removeClass("hide");
		$('.button--menu').removeClass('hide');
		$('.hud--tile_selection').addClass("hide");
		$('.hud--playtest').addClass("hide");
		$('.hud--editor').addClass("hide");

		//random seed
		seed = "amiyaroads_Level" + currentWorld + "-" + currentLevel;

		if (inEditor) {
			if (!fontLoaded) {
				$('.modal').addClass('hide');
				$('.menu--loading-screen').removeClass('hide');
				loader.load('js/fonts/LotuscoderBold-eZZYn.ttf', function (fnt) {
					font = fontLoader.parse(fnt);
					fontMaterial = new THREE.MeshBasicMaterial({
						color: fontColor,
						transparent: true,
						opacity: 0,
						side: THREE.DoubleSide
					});
					console.log("Loaded font");
					$('.hud--editor').removeClass("hide");

					if ($('#levelSelect').val().indexOf("~") > 0) {
						currentWorld = $('#levelSelect').val().split("~")[0];
					} else if (mapGenerator) {
						currentWorld = mapGenerator.currentWorld;
					} else {
						currentWorld = $('.hud--worldSelect').val();
					}
					init(currentWorld, currentLevel, inEditor, inPlayTest, seed, true);
					animate();

					$('.menu--start-screen').addClass('hide');


					fontLoaded = true;
				});
			} else {
				$('.hud--editor').removeClass("hide");

				if ($('#levelSelect').val().indexOf("~") > 0) {
					currentWorld = $('#levelSelect').val().split("~")[0];
				} else if (mapGenerator) {
					currentWorld = mapGenerator.currentWorld;
				} else {
					currentWorld = $('.hud--worldSelect').val();
				}
				init(currentWorld, currentLevel, inEditor, inPlayTest, seed, true);
				animate();

				$('.menu--start-screen').addClass('hide');
				$('.modal').addClass('hide');
			}

		} else {
			var levelImage = $('#Level' + currentWorld + "-" + currentLevel);
			var imageObj = new Image();
			imageObj.src = levelImage.attr("src");
			imageObj.onload = function () {
				var shadowCanvas = document.createElement('canvas');
				shadowCanvas.style.display = 'none';
				shadowCanvas.width = 600;
				shadowCanvas.height = 600;

				var shadowCtx = shadowCanvas.getContext('2d');
				shadowCtx.drawImage(imageObj, 0, 0, 600, 600);

				var imageData = shadowCtx.getImageData(0, 0, 600, 600);
				var decodeMessage = steg.decode(imageData, { t: 3, width: 600, height: 600 });

				$('#levelSelect').val(atob(decodeMessage));

				init(currentWorld, currentLevel, inEditor, inPlayTest, seed, true);
				animate();

				$('.menu--start-screen').addClass('hide');
				$('.modal').addClass('hide');
			};
		}

	});

	$('.button--menu').on('click', function (e) {
		e.preventDefault();
		console.log("Go to main menu");
		$('#levelSelect').val("");
		inEditor = false;
		inPlayTest = false;
		text = null;
		lose();
	});


	$('.hud--worldSelect').on('change', function (e) {
		e.preventDefault();
		console.log("Change world type");
		lose();
		currentWorld = $(this).val();
		inEditor = true;
		inPlayTest = false;
		init(currentWorld, currentLevel, inEditor, inPlayTest, false);

		$('.menu--start-screen').addClass('hide');
		$('.button--menu').removeClass('hide');
		$('.hud--basic').removeClass('hide');
		$('.hud--playtest').addClass("hide");
		$('.hud--editor').removeClass("hide");


	});
	$('.hud--tileSelect').on('change', function (e) {
		e.preventDefault();
		console.log("Change tile type");
		tileSelection = parseInt($(this).val());

	});


	$('#level-name').on('change', function (e) {
		e.preventDefault();
		console.log("Change level name");
		initFont();


	});
	$('.hud--fpsCap').on('change', function (e) {
		e.preventDefault();
		console.log("Change FPS cap");
		var $this = $(this);
		var newFPS = parseInt($this.val());
		gameLoop.fps = newFPS;

	});
	$('.hud--textures').on('change', function (e) {
		e.preventDefault();
		console.log("Change Textures");
		var $this = $(this);
		var textures = $this.val();
		if (textures == "regular") {
			mapGenerator.enableTextures();
		} else {
			mapGenerator.disableTextures();
		}

	});
	$('.hud--shadows').on('change', function (e) {
		e.preventDefault();
		console.log("Change Shadows");
		var $this = $(this);
		var textures = $this.val();
		if (textures == "regular") {
			mapGenerator.enableShadows();
		} else {
			mapGenerator.disableShadows();
		}

	});
	$('.playtest-button').on('click', function (e) {
		e.preventDefault();
		console.log("Playtest");
		lose();
		inEditor = false;
		inPlayTest = true;

		init(currentWorld, currentLevel, inEditor, inPlayTest, false);
		$('.menu--start-screen').addClass('hide');
		$('.hud--mobile').removeClass("hide");
		$('.button--menu').addClass('hide');
		$('.hud--basic').removeClass("hide");
		$('.hud--playtest').removeClass("hide");
		$('.hud--editor').addClass("hide");


	});


	$('.editor-button').on('click', function (e) {
		e.preventDefault();
		console.log("Editor");
		lose();
		$('.modal').addClass('hide');
		$('.menu--loading-screen').removeClass('hide');
		if (!fontLoaded) {
			loader.load('js/fonts/LotuscoderBold-eZZYn.ttf', function (fnt) {
				font = fontLoader.parse(fnt);
				fontMaterial = new THREE.MeshBasicMaterial({
					color: fontColor,
					transparent: true,
					opacity: 0,
					side: THREE.DoubleSide
				});
				console.log("Loaded font");

				inEditor = true;
				inPlayTest = false;
				init(currentWorld, currentLevel, inEditor, inPlayTest, false);

				$('.menu--start-screen').addClass('hide');
				$('.button--menu').removeClass('hide');
				$('.hud--basic').removeClass('hide');
				$('.hud--playtest').addClass("hide");
				$('.hud--editor').removeClass("hide");
				fontLoaded = true;
			});
		} else {

			inEditor = true;
			inPlayTest = false;
			init(currentWorld, currentLevel, inEditor, inPlayTest, false);

			$('.menu--start-screen').addClass('hide');
			$('.button--menu').removeClass('hide');
			$('.hud--basic').removeClass('hide');
			$('.hud--playtest').addClass("hide");
			$('.hud--editor').removeClass("hide");
		}


	});

	$('#image-input').on("change", function (e) {
		const reader = new FileReader();
		$lastPlayedLevel = null;
		reader.addEventListener("load", () => {
			const uploaded_image = reader.result;
			var imageObj = new Image();
			imageObj.src = uploaded_image;
			imageObj.onload = function () {
				var shadowCanvas = document.createElement('canvas');
				shadowCanvas.style.display = 'none';
				shadowCanvas.width = 600;
				shadowCanvas.height = 600;

				var shadowCtx = shadowCanvas.getContext('2d');
				shadowCtx.drawImage(imageObj, 0, 0, 600, 600);

				var imageData = shadowCtx.getImageData(0, 0, 600, 600);
				var decodeMessage = steg.decode(imageData, { t: 3, width: 600, height: 600 });
				var levelString = atob(decodeMessage);
				$('#levelSelect').val(levelString);
				inEditor = false;
				inPlayTest = true;
				if (levelString.indexOf("~") >= 0) {
					let parts = levelString.split("~");
					currentWorld = parts[0];
				} else {
					currentWorld = $('.hud--worldSelect').val();
				}

				currentLevel = "T";
				seed = "amiyaroads_" + levelString;
				init(currentWorld, currentLevel, inEditor, inPlayTest, seed, levelString, true, true);
				$('.menu--start-screen').addClass('hide');
				$('.button--menu').addClass('hide');
				$('.hud--basic').removeClass("hide");
				$('.hud--playtest').removeClass("hide");
				$('.hud--editor').addClass("hide");
				animate();
				return imageObj;
			};

			document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
		});
		reader.readAsDataURL(this.files[0]);
	});


	$(".hud--volume-slider").slider({
		orientation: "horizontal",
		range: "min",
		min: 0,
		max: 100,
		value: 5,
		slide: function (event, ui) {
			musicVolume = ui.value / 100.0;
			if (bgm) {
				bgm.setVolume(musicVolume);
			}

			$(".hud--volume-display").text(Math.round(musicVolume * 100) + "%");
		}
	});
	$(".hud--soundEffectsVolume-slider").slider({
		orientation: "horizontal",
		range: "min",
		min: 0,
		max: 100,
		value: 10,
		slide: function (event, ui) {
			soundEffectsVolume = ui.value / 100.0;

			$(".hud--soundEffectsVolume-display").text(Math.round(soundEffectsVolume * 100) + "%");
		}
	});
	$(".hud--maxBucko-slider").slider({
		orientation: "horizontal",
		range: "min",
		min: 0,
		max: maxBuckosUpperLimit,
		value: 50,
		slide: function (event, ui) {
			maxBuckos = ui.value;
			$(".hud--maxBucko-display").text(maxBuckos + " buckos");
			initBuckoParticles();
		}
	});

	$(".hud--fogDensity-slider").slider({
		orientation: "horizontal",
		range: "min",
		min: 0,
		max: 50,
		value: 8,
		slide: function (event, ui) {
			fogDensity = ui.value / 10000;
			if (scene) {
				const fog = new THREE.FogExp2(fogColour, fogDensity);
				scene.fog = fog;
			}

			$(".hud--fogDensity-display").text(ui.value);
		}
	});

	$(".hud--drawDistance-slider").slider({
		orientation: "horizontal",
		range: "min",
		min: 1000,
		max: 10000,
		value: 6000,
		slide: function (event, ui) {
			drawDistance = ui.value;
			if (camera) {
				camera.far = drawDistance;
				camera.updateProjectionMatrix();
			}

			$(".hud--drawDistance-display").text(ui.value);
		}
	});
	$(".hud--volume-display").text(Math.round(musicVolume * 100) + "%");
	$(".hud--soundEffectsVolume-display").text(Math.round(soundEffectsVolume * 100) + "%");
	$(".hud--maxBucko-display").text(maxBuckos + " buckos");
	$(".hud--fogDensity-display").text(fogDensity * 10000);
	$(".hud--drawDistance-display").text(drawDistance);

	musicVolume = $(".hud--volume-slider").slider("value") / 100.0;
	$(".hud--volume-display").text((musicVolume * 100) + "%");

	container = document.getElementById('container');

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xbfd1e5);

	renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;

	container.appendChild(renderer.domElement);
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild(stats.domElement);

	if (mapGenerator == undefined) {
		initPhysics();
		mapGenerator = new MapGenerator(scene, physicsWorld);
	}

	initInput();
	window.addEventListener('resize', onWindowResize);

	initialized = true;
	$('.menu--loading-screen').addClass('hide');


}

function init(currentWorld, currentLevel, inEditor, inPlayTest, loadedFromImage = true) {
	console.log("init");
	clock = new THREE.Clock();

	rigidBodies = [];

	initGraphics();

	initPhysics();

	createObjects(currentWorld, currentLevel, inEditor, inPlayTest, loadedFromImage);

	initSky(currentWorld, currentLevel, inEditor, inPlayTest);

	initWater(currentWorld, currentLevel, inEditor, inPlayTest);

	initMusic();

	$('.hud--basic').removeClass('hide');
	$('#container').removeClass('hide');
	$('.menu--loading-screen').addClass('hide');
	dead = false;
	won = false;
}
function removeObject3D(object) {
	if (!object) {
		return false;
	}
	if (!(object instanceof THREE.Object3D)) {
		return false;
	}
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
	if (physicsWorld) {
		physicsWorld.removeRigidBody(object.body);
	}
	// the parent might be the scene or another Object3D, but it is sure to be removed this way
	return true;
}

function initBuckoParticles() {
	for (var i = 0; i < particlesNames.length; i++) {
		var particlesObject = scene.getObjectByName(particlesNames[i]);
		if (particlesObject) {
			removeObject3D(particlesObject);
		}
	}
	particlesNames = [];

	const geometry = new THREE.BufferGeometry();
	const vertices = [];

	const textureLoader = new THREE.TextureLoader();

	const sprite1 = textureLoader.load('./images/amiyaroad/Bucko.png');
	const sprite2 = textureLoader.load('./images/amiyaroad/Bucko2.png');
	const sprite3 = textureLoader.load('./images/amiyaroad/Bucko3.png');
	const sprite4 = textureLoader.load('./images/amiyaroad/Bucko4.png');
	const sprite5 = textureLoader.load('./images/amiyaroad/Bucko5.png');

	for (let i = 0; i < maxBuckos; i++) {

		let x = -2000 + Math.random() * 4000;
		let y = -200 + Math.random() * 400;
		let z = Math.random() * 10000;
		if (currentWorld == "2") {
			y = -25 + Math.random() * 10;
		}

		vertices.push(x, y, z);

	}

	geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	const color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
	const sprite = sprite1;
	const size = 30 + Math.random() * 50;

	const material = new THREE.PointsMaterial({ size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true });
	material.color.setHSL(color[0], color[1], color[2]);

	const particles = new THREE.Points(geometry, material);

	particles.name = "buckoParticles" + particlesNames.length;
	particlesNames.push(particles.name);
	scene.add(particles);

}
function initSky(currentWorld, currentLevel, inEditor, inPlayTest) {
	console.log("initSky");
	// Add Sky
	sky = new Sky();
	sky.scale.setScalar(150000);
	scene.add(sky);
	const fog = new THREE.FogExp2(fogColour, fogDensity);
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

	initBuckoParticles();

	renderer.toneMappingExposure = effectController.exposure;


}

function initWater(currentWorld, currentLevel, inEditor, inPlayTest) {
	waterRises = false;

	if (currentWorld == "2") {
		waterRises = true;
		const waterGeometry = new THREE.PlaneGeometry(100000, 100000);
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
				distortionScale: -1,
				alpha: 0.7,
				fog: scene.fog !== undefined
			}
		);
		waterLevel = WATER_LEVEL_Y_WORLD2;
		water.position.y = waterLevel;
		water.rotation.x = - Math.PI / 2;
		scene.add(water);
	} else if (currentWorld == "3") {
		const waterGeometry = new THREE.PlaneGeometry(100000, 100000);
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
		'./Slizzy_Slick.mp3',

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
			//console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},

		// onError callback
		function (err) {
			console.log('An error happened loading the music');
		}
	);
}

function initSoundEffects() {
	console.log("initSoundEffects");
	// instantiate a listener
	const audioListener = new THREE.AudioListener();

	// add the listener to the camera
	camera.add(audioListener);



	// instantiate a loader
	const loader = new THREE.AudioLoader();

	// load a resource
	loader.load(
		// resource URL
		'./tsunderia amiya scream 6.mp3',

		// onLoad callback
		function (audioBuffer) {
			// instantiate audio object
			const soundEffects1 = new THREE.Audio(audioListener);
			soundEffects1.name = "Scream";
			soundEffects1.setBuffer(audioBuffer);
			soundEffects1.setVolume(soundEffectsVolume);
			soundEffects1.setLoop(false);
			player.add(soundEffects1);
		},

		// onProgress callback
		function (xhr) {
			//console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},

		// onError callback
		function (err) {
			console.log('An error happened loading the sound effect');
		}
	);
	// load a resource
	loader.load(
		// resource URL
		'./tsunderia amiya bonko.mp3',

		// onLoad callback
		function (audioBuffer) {
			const soundEffects2 = new THREE.Audio(audioListener);
			soundEffects2.name = "Bonk";
			soundEffects2.setBuffer(audioBuffer);
			soundEffects2.setVolume(soundEffectsVolume);
			soundEffects2.setLoop(false);
			player.add(soundEffects2);

		},

		// onProgress callback
		function (xhr) {
			//console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},

		// onError callback
		function (err) {
			console.log('An error happened loading the sound effect');
		}
	);
	loader.load(
		// resource URL
		'./tsunderia amiya yummy.mp3',

		// onLoad callback
		function (audioBuffer) {
			const soundEffects3 = new THREE.Audio(audioListener);
			soundEffects3.name = "Yummy";
			soundEffects3.setBuffer(audioBuffer);
			soundEffects3.setVolume(soundEffectsVolume);
			soundEffects3.setLoop(false);
			player.add(soundEffects3);

		},

		// onProgress callback
		function (xhr) {
			//console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},

		// onError callback
		function (err) {
			console.log('An error happened loading the sound effect');
		}
	);
}

function playSoundEffect(soundName) {
	console.log("play sound effect", soundName);
	for (var i = 0; i < player.children.length; i++) {
		const audio = player.children[i];
		console.log(audio);
		if (audio && audio.name == soundName && !audio.isPlaying) {
			audio.setVolume(soundEffectsVolume);
			audio.play();
		}

	}

}
function stopSoundEffects() {
	console.log("stops sound effects");
	for (var i = 0; i < player.children.length; i++) {
		const audio = player.children[i];
		if (audio) {
			if (audio.isPlaying) {
				audio.stop();
			}
		}

	}

}

function initGraphics() {
	console.log("initGraphics");
	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, drawDistance);

	camera.position.set(0, 120, -210);
	camera.lookAt(0, 5, 0);

	const hemisphereLight = new THREE.HemisphereLight(0xc0bdf2, 0xffbef4, 0.9);
	scene.add(hemisphereLight);

	spotLight = new THREE.DirectionalLight(0xffd0fe, 0.4);
	spotLight.position.set(0, 600, 0);

	spotLight.castShadow = true;

	spotLight.shadow.mapSize.width = 10240;
	spotLight.shadow.mapSize.height = 10240;

	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 1200;
	spotLight.shadow.camera.fov = 900;
	spotLight.shadow.camera.right = 1000;
	spotLight.shadow.camera.left = -1000;
	spotLight.shadow.camera.top = 1000;
	spotLight.shadow.camera.bottom = - 1000;

	scene.add(spotLight);

}

function initPhysics() {
	console.log("initPhysics");
	// Physics configuration

	if (!collisionConfiguration) {
		console.log("collisionConfiguration");
		collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
		dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
		broadphase = new Ammo.btDbvtBroadphase();
		solver = new Ammo.btSequentialImpulseConstraintSolver();
		physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);

		transformAux1 = new Ammo.btTransform();
		setupContactResultCallback();
	}
	if (inEditor) {
		physicsWorld.setGravity(new Ammo.btVector3(0, 0, 0));
	} else {
		physicsWorld.setGravity(new Ammo.btVector3(0, - GRAVITY, 0));
	}



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

		let tag, localPos, worldPos, playerPos;


		if (rb0.name != "Player") {

			tag = rb0.name;
			localPos = contactPoint.get_m_localPointA();
			worldPos = contactPoint.get_m_positionWorldOnA();
			playerPos = contactPoint.get_m_localPointB();

		} else {

			tag = rb1.name;
			localPos = contactPoint.get_m_localPointB();
			worldPos = contactPoint.get_m_positionWorldOnB();
			playerPos = contactPoint.get_m_localPointA();
		}

		if (keyStates.KeyI) {
			//debug info key
			console.log(tag);
			console.log(rb1);

			//const vector = new THREE.Vector3( velocity.x(), velocity.y(), velocity.z() ).normalize();
			//vector.applyQuaternion( quaternion );
			//console.log(vector.x, vector.y, vector.z);



			//console.log(direction.x, direction.y, direction.z);
		}
		if (tag.indexOf("Death") >= 0) {
			dead = true;
			won = false;
		} else if (tag.indexOf("Goal") >= 0) {
			won = true;
			dead = false;
		} else if (tag.indexOf("Boost") >= 0) {

			if (localPos.y() >= 9.99 && velocity.z() <= boostMaxSpeed) {
				maxSpeed = boostMaxSpeed;
				let quat = colWrapper1.getCollisionObject().getWorldTransform().getRotation().normalized();
				const quaternion = new THREE.Quaternion(quat.x(), quat.y(), quat.z(), quat.w());

				//default direction is traveling on the z axis, and a little bit down so the tile keeps you more grounded by default
				const direction = new THREE.Vector3(0, -0.1, 1);
				direction.applyQuaternion(quaternion);

				const b = new THREE.Vector3();

				//always accelerate when on a boost tile
				let boostImpulse = new Ammo.btVector3(direction.x, direction.y, direction.z);
				boostImpulse.normalize();
				boostImpulse.op_mul(BOOST_ACCELERATION);
				player.body.applyCentralImpulse(boostImpulse);

				timeLastOnGround = clock.elapsedTime;
				onGround = true;

			}

		} else if (tag.indexOf("Spring") >= 0) {
			if (localPos.y() >= 0) {
				playSoundEffect("Bonk");
				var tileObject = scene.getObjectByName(tag);

				maxSpeed = boostMaxSpeed;
				let quat = colWrapper1.getCollisionObject().getWorldTransform().getRotation().normalized();
				const quaternion = new THREE.Quaternion(quat.x(), quat.y(), quat.z(), quat.w());

				//default direction is straight up
				const direction = new THREE.Vector3(0, 1, 0);
				direction.applyQuaternion(quaternion);

				//always accelerate when on a boost tile
				let boostImpulse = new Ammo.btVector3(direction.x, direction.y, direction.z);
				boostImpulse.normalize();
				let prevVelocity = new Ammo.btVector3(velocity.x(), 0, velocity.z());
				console.log(player.body);
				if (localPos.y() <= 0) {
					boostImpulse.op_mul(-SPRING_BOOST * rb1.scale.z);
					player.body.clearForces();
					player.body.setLinearVelocity(boostImpulse * 0.5);

				} else {
					boostImpulse.op_mul(SPRING_BOOST * rb1.scale.z);
					player.body.clearForces();
					player.body.setLinearVelocity(boostImpulse);

				}

				prevVelocity.normalize();
				prevVelocity.op_mul(SPRING_BOOST * rb1.scale.z)
				player.body.applyCentralImpulse(prevVelocity);

				tileObject.userData.collided = true;
				tileObject.userData.collidedTime = clock.elapsedTime;

				timeLastOnGround = clock.elapsedTime;
				onGround = true;

			}

		} else if (tag.indexOf("AmiyaBar") >= 0) {
			stamina = maxStamina;
			if (localPos.y() >= 9.99) {
				timeLastOnGround = clock.elapsedTime;
				onGround = true;
			}

		} else if (tag.indexOf("Snack") >= 0) {
			var snackObject = scene.getObjectByName(tag);
			if (snackObject.userData.collided != true) {
				playSoundEffect("Yummy");
				console.log("snack get");
				var snackStaminaGain = maxStamina * 0.05;
				stamina = Math.min(stamina + snackStaminaGain, maxStamina);
				console.log(tag);

				//console.log(snackObject);
				snackObject.userData.collided = true;
				removeObject3D(snackObject);
			}


		} else if (tag.indexOf("Tile") >= 0) {
			if (localPos.y() >= 9.99) {
				timeLastOnGround = clock.elapsedTime;
				onGround = true;
			}
		} else if (tag.indexOf("Tunnel") >= 0 || tag.indexOf("HalfPipe") >= 0 || tag.indexOf("Corkscrew") >= 0) {
			console.log(localPos.y());
			console.log(playerPos.y());
			if (localPos.y() <= 0 && playerPos.y() <= -2) {
				timeLastOnGround = clock.elapsedTime;
				onGround = true;
			}


		}

	}

}
function initPlayer() {
	if (player) {
		removeObject3D(player);
	}
	$('#modal--noStamina').addClass("hide");
	onGround = false;
	stamina = maxStamina;
	timeLastOnGround = 0;
	maxSpeed = regularMaxSpeed;
	tileSelection = parseInt($('.hud--tileSelect').val());
	tileScale = 1;
	player = mapGenerator.createPlayer();
	player.body.setLinearVelocity(new Ammo.btVector3(0, 0, 0));
	spotLight.target = player;
	lastUpdateVelocity = new THREE.Vector3(0, 0, 0);
	updates = 0;
	initSoundEffects();
}
function createObjects(currentWorld, currentLevel, inEditor, inPlayTest, loadedFromImage = true) {
	console.log("createObjects");

	if (mapGenerator == undefined) {
		mapGenerator = new MapGenerator(scene, physicsWorld);
	}

	rigidBodies = mapGenerator.initMap(currentWorld, currentLevel, inEditor, inPlayTest, seed, $('#levelSelect').val(), loadedFromImage);
	initPlayer();
	if (!text && inEditor) {
		initFont();
	}
}

function initFont() {
	console.log("init font");
	$('.menu--loading-screen').removeClass('hide');
	removeObject3D(text);

	const message = $('#level-name').val();
	const shapes = font.generateShapes(message, 8);
	const geometry = new THREE.ShapeGeometry(shapes);
	geometry.rotateY(Math.PI);
	geometry.center();

	// make shape ( N.B. edge view not visible )
	text = new THREE.Mesh(geometry, fontMaterial);
	text.name = "LevelName";
	text.position.x = player.position.x;
	text.position.y = player.position.y;
	text.position.z = player.position.z - 10;

	scene.add(text);
	$('.menu--loading-screen').addClass('hide');
}
function gameFocused() {
	return !$('#level-name').hasClass("focused");
}

function initInput() {
	console.log("initInput");

	keyStates = {};
	$(document).ready(function () {
		document.addEventListener('keydown', (event) => {
			if (gameFocused()) {
				keyStates[event.code] = true;
			} else {
				keyStates[event.code] = false;
			}

		});
		function updateTileSelectionDropdown(tileSelection) {
			$('.hud--tilesSelect[val=' + tileSelection + ']').attr("selected", "selected")
			$('.hud--tileSelect').val('' + tileSelection);
		}
		document.addEventListener('keyup', (event) => {
			if (inEditor && gameFocused()) {
				if (keyStates.Digit0 && event.code == "Digit0") {
					tileSelection = 0;
					updateTileSelectionDropdown(tileSelection);
				} else if (keyStates.Digit1 && event.code == "Digit1") {
					tileSelection = 1;
					updateTileSelectionDropdown(tileSelection);
				} else if (keyStates.Digit2 && event.code == "Digit2") {
					tileSelection = 2;
					updateTileSelectionDropdown(tileSelection);
				} else if (keyStates.Digit3 && event.code == "Digit3") {
					tileSelection = 3;
					updateTileSelectionDropdown(tileSelection);
				} else if (keyStates.Digit4 && event.code == "Digit4") {
					tileSelection = 4;
					updateTileSelectionDropdown(tileSelection);
				} else if (keyStates.Digit5 && event.code == "Digit5") {
					tileSelection = 5;
					updateTileSelectionDropdown(tileSelection);
				} else if (keyStates.Digit6 && event.code == "Digit6") {
					tileSelection = 6;
					updateTileSelectionDropdown(tileSelection);
				} else if (keyStates.Digit7 && event.code == "Digit7") {
					tileSelection = 7;
					updateTileSelectionDropdown(tileSelection);
				} else if (keyStates.Digit8 && event.code == "Digit8") {
					tileSelection = 8;
					updateTileSelectionDropdown(tileSelection);
				} else if (keyStates.Digit9 && event.code == "Digit9") {
					tileSelection = 9;
					updateTileSelectionDropdown(tileSelection);
				}

				if (keyStates.KeyY && event.code == "KeyY") {
					mapGenerator.toggleSnapPosition();
					mapGenerator.toggleSnapRotation();
				}

				if (keyStates.Equal && event.code == "Equal") {
					tileScale = Math.min(tileScale + 0.25, maxTileScale);
				} else if (keyStates.Minus && event.code == "Minus") {
					tileScale = Math.max(tileScale - 0.25, minTileScale);
				}

				if (keyStates.Enter && event.code == "Enter") {
					tileSelection = parseInt($('.hud--tileSelect').val());
					mapGenerator.addTile(tileScale, tileSelection, null, null, true);
					// var symmetryMode = $('.hud--symmetrySelect').val();
					// if(symmetryMode=="1" || symmetryMode=="4"){

					// }
					// if(symmetryMode=="1"){

					// }
				} else if (keyStates.Backspace && event.code == "Backspace") {
					mapGenerator.undoLastTile();
				}

			} else {
				if (keyStates.KeyR && event.code == "KeyR") {
					reset();
				}
			}
			keyStates[event.code] = false;
		});
	});

}

function onWindowResize() {
	console.log("onWindowResize");
	if (camera) {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

	}
	if (renderer) {
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

}
let animating = false;
function animate() {
	if (animating) {
		return;
	}

	console.log("animate");
	animating = true;
	const deltaTime = clock.getDelta();
	//requestAnimationFrame(animate);
	renderer.setAnimationLoop(gameLoop.loop);
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
	physicsWorld.stepSimulation(deltaTime, 10, 1.0 / gameLoop.fps);

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
	effectController.elevation = (stamina / maxStamina) * 2;

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

	camera.position.set(0, 100 + Math.max(player.position.y - yCameraPan, 0), player.position.z - 200);
	camera.lookAt(player.position.x * 0.15, 5 + Math.max(player.position.y - yCameraPan, 0), player.position.z);
	spotLight.position.set(player.position.x, player.position.y + 200, player.position.z);

}
function isUnderWater() {
	return waterRises && player.position.y < waterLevel;
}
function updateEditorPhysics(deltaTime) {
	let impulse = new Ammo.btVector3(0, 0, 0);
	let angularImpulse = new Ammo.btVector3(0, 0, 0);

	if (keyStates.ArrowUp) {
		impulse.setZ(BUILD_CAMERA_SPEED_Z);
	}
	if (keyStates.ArrowDown) {
		impulse.setZ(-BUILD_CAMERA_SPEED_Z);
	}
	if (keyStates.ArrowRight) {
		impulse.setX(-BUILD_CAMERA_SPEED_X);
	}
	if (keyStates.ArrowLeft) {
		impulse.setX(BUILD_CAMERA_SPEED_X);
	}
	let xAxis = new THREE.Vector3(1, 0, 0);
	let yAxis = new THREE.Vector3(0, 1, 0);
	let zAxis = new THREE.Vector3(0, 0, 1);
	var xVector = new THREE.Vector3(1, 0, 0);
	var yVector = new THREE.Vector3(0, 1, 0);
	var zVector = new THREE.Vector3(0, 0, 1);
	if (keyStates.KeyW) {
		yVector.applyAxisAngle(xAxis, BUILD_ROTATION_SPEED);
		angularImpulse.setX(xVector.x);
	}
	if (keyStates.KeyS) {
		yVector.applyAxisAngle(xAxis, -BUILD_ROTATION_SPEED);
		angularImpulse.setX(-xVector.x);
	}
	if (keyStates.KeyD) {
		yVector.applyAxisAngle(zAxis, BUILD_ROTATION_SPEED);
		angularImpulse.setZ(zVector.z);
	}
	if (keyStates.KeyA) {
		yVector.applyAxisAngle(zAxis, -BUILD_ROTATION_SPEED);
		angularImpulse.setZ(-zVector.z);
	}

	if (keyStates.KeyQ) {
		yVector.applyAxisAngle(yAxis, BUILD_ROTATION_SPEED);
		angularImpulse.setY(yVector.y);

	}
	if (keyStates.KeyE) {
		yVector.applyAxisAngle(yAxis, -BUILD_ROTATION_SPEED);
		angularImpulse.setY(-yVector.y);
	}

	if (keyStates.Space) {
		impulse.setY(BUILD_CAMERA_SPEED_Y);
	}
	if (keyStates.ShiftLeft) {
		impulse.setY(-BUILD_CAMERA_SPEED_Y);
	}
	if (keyStates.KeyI) {
		//debug info key
		console.log(mapGenerator.generateLevelString(currentWorld));
	}
	player.body.setLinearVelocity(impulse);
	player.body.setAngularVelocity(angularImpulse);

	if (inEditor) {
		mapGenerator.moveGhostTile(player, player.quaternion, tileScale, tileSelection, tileSnapDistanceX, tileSnapDistanceY, tileSnapDistanceZ);
	}
	updateWorld(deltaTime);
	return;
}
function updatePhysics(deltaTime) {
	if (won || dead) {
		return;
	}
	if (inEditor) {
		updateEditorPhysics(deltaTime);
		return;
	}
	velocity = player.body.getLinearVelocity();


	//$debug.text("Random Seed: " + seed);
	stamina -= Math.abs((-velocity.z() * deltaTime));//(velocity.x() * deltaTime) + (velocity.y() * deltaTime) + 
	if (stamina <= 0) {
		stamina = 0;
		if ($('#modal--noStamina').hasClass("hide") && Math.abs(velocity.z()) <= 5) {
			$('#modal--noStamina').removeClass("hide");
		}
	}
	//$('.hud--speed').text(Math.abs(-velocity.z().toPrecision(4)));
	//$('.hud--speed').attr("style", "height:" + Math.abs((-velocity.z().toPrecision(4) / maxSpeed) * 50) + "%;");
	// let staminaPercent = ((stamina / maxStamina).toPrecision(2) * 100);
	// $('.hud--stamina-label').text(Math.round(staminaPercent) + "%");
	// $('.hud--stamina-value').attr("style", "height:" + staminaPercent + "%;");

	checkContact();
	if (won) {
		win();
		return;
	}

	if (player.position.y <= -50 || dead) {
		reset();
		return;
	}

	if (maxSpeed >= regularMaxSpeed) {
		maxSpeed -= BOOST_DECAY_RATE * deltaTime;
	}

	if (stamina > 0) {
		var xImpulse = 0;
		var yImpulse = 0;
		var zImpulse = 0;
		if (keyStates.ArrowUp || keyStates.KeyW) {
			let relVelChange = (acceleration);
			if (isUnderWater()) {
				relVelChange *= WATER_ACCELERATION_DEBUFF;
			}
			zImpulse += relVelChange;

		}
		if (keyStates.ArrowDown || keyStates.KeyS) {
			let relVelChange = (-acceleration);
			if (isUnderWater()) {
				relVelChange *= WATER_ACCELERATION_DEBUFF;
			}
			zImpulse += relVelChange;
		}
		if (keyStates.ArrowLeft || keyStates.KeyA) {
			let relVelChange = (turnSpeed);
			if (onGround) {
				//better handling on the ground and at higher speeds
				relVelChange = turnSpeedOnGround + (turnSpeedOnGround * (velocity.z() / regularMaxSpeed));
			}
			if (isUnderWater()) {
				relVelChange *= WATER_ACCELERATION_DEBUFF;
			}
			xImpulse += relVelChange;
		}
		if (keyStates.ArrowRight || keyStates.KeyD) {
			let relVelChange = (-turnSpeed);
			if (onGround) {
				//better handling on the ground and at higher speeds
				relVelChange = -turnSpeedOnGround + (-turnSpeedOnGround * (velocity.z() / regularMaxSpeed));
			}
			if (isUnderWater()) {
				relVelChange *= WATER_ACCELERATION_DEBUFF;
			}
			xImpulse += relVelChange;

		}
		//if not actively moving left or right and on the ground
		if (!keyStates.ArrowLeft && !keyStates.KeyA && !keyStates.ArrowRight && !keyStates.KeyD) {
			if (onGround) {
				//apply some extra friction to the x-axis movement
				let relVelChange = -velocity.x() * mapGenerator.xFriction;
				if (isUnderWater()) {
					relVelChange *= WATER_ACCELERATION_DEBUFF;
				}
				xImpulse += relVelChange;
			}
		}
		var xImpulseCapped = Math.max(Math.min(xImpulse, maxTurnSpeed), -maxTurnSpeed);
		var yImpulseCapped = yImpulse;
		var zImpulseCapped = Math.max(Math.min(zImpulse, maxSpeed), -maxSpeed);
		player.body.applyCentralImpulse(new Ammo.btVector3(xImpulseCapped, yImpulseCapped, zImpulseCapped));
		if (velocity.z() > maxSpeed) {
			let impulse = new Ammo.btVector3(velocity.x(), velocity.y(), maxSpeed);
			player.body.setLinearVelocity(impulse);
		}
		if (velocity.x() > maxTurnSpeed) {
			let impulse = new Ammo.btVector3(maxTurnSpeed, velocity.y(), velocity.z());
			player.body.setLinearVelocity(impulse);
		} else if (velocity.x() < -maxTurnSpeed) {
			let impulse = new Ammo.btVector3(-maxTurnSpeed, velocity.y(), velocity.z());
			player.body.setLinearVelocity(impulse);
		}
	}
	if (keyStates.Space || keyStates.KeyZ || keyStates.KeyM) {
		velocity = player.body.getLinearVelocity();
		if (stamina > 0 && (onGround || (clock.elapsedTime - timeLastOnGround) <= coyoteTimeLimit)) {
			//jump higher if you're going faster
			let jumpSpeedBonus = (velocity.z() * 0.1);
			let jumpImpulse = new Ammo.btVector3(velocity.x(), jumpSpeed + jumpSpeedBonus, velocity.z());
			if (isUnderWater()) {
				jumpImpulse = new Ammo.btVector3(velocity.x() * WATER_ACCELERATION_DEBUFF, (waterJumpSpeed + jumpSpeedBonus) * WATER_ACCELERATION_DEBUFF, velocity.z() * WATER_ACCELERATION_DEBUFF);
			}
			player.body.setLinearVelocity(jumpImpulse);
			onGround = false;
		}

	} else if (!onGround) {
		//not actively trying to jump and not on the ground
		//fall faster
		if (isUnderWater()) {
			player.body.applyCentralImpulse(new Ammo.btVector3(0, -RESPONSIVE_ARTIFICAL_GRAVITY_UNDERWATER, 0));
		} else {
			player.body.applyCentralImpulse(new Ammo.btVector3(0, -RESPONSIVE_ARTIFICAL_GRAVITY, 0));
		}

	}
	let angularVelocity = new Ammo.btVector3(Math.max(velocity.z() * 0.05, -9), 0, -velocity.x() * 0.1);
	player.body.setAngularVelocity(angularVelocity);

	//limit some speeds
	let linearX = Math.min(maxTurnSpeed, Math.max(-maxTurnSpeed, player.body.getLinearVelocity().x()));
	let linearY = player.body.getLinearVelocity().y();
	let linearZ = player.body.getLinearVelocity().z();
	let linearVelocity = new Ammo.btVector3(linearX, linearY, linearZ);
	player.body.setLinearVelocity(linearVelocity);

	updateWorld(deltaTime);
	onGround = false;
}
function clearScene() {
	mapGenerator.clear();
	scene.clear();
	console.log("remove", scene.children.length);
	for (var i = 0; i < scene.children.length; i++) {
		removeObject3D(scene.children[i]);
	}
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
	stopSoundEffects();
	clearScene();

	$('.hud--mobile').addClass("hide");
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

	stopSoundEffects();

	clearScene();

	// check if there's another level in this world to jump to
	var $nextLevelButton = $('#Level' + currentWorld + "-" + (parseInt(currentLevel) + 1));
	if ($nextLevelButton.length > 0) {
		$nextLevelButton.click();
		return;
	}
	// check if there's another world to jump to
	$nextLevelButton = $('#Level' + (parseInt(currentWorld) + 1) + "-1");
	if ($nextLevelButton.length > 0) {
		$nextLevelButton.click();
		return;
	}
	if (bgm && bgm.isPlaying) {
		bgm.stop();
	}

	//otherwise go back to main menu
	$('.hud--mobile').addClass("hide");
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

	playSoundEffect("Scream");
	//re-add any eaten snacks and set them as not collided (eaten)
	for (var i = 0; i < mapGenerator.allObjects.length; i++) {
		const objThree = mapGenerator.allObjects[i];
		if (objThree.name.indexOf("Snack") >= 0 && objThree.userData.collided) {
			console.log(objThree);
			scene.add(objThree);
			physicsWorld.addRigidBody(objThree.userData.physicsBody);
			objThree.userData.collided = false;
		}
	}
	//reset the player
	initPlayer();
	camera.position.set(0, 120, player.position.z - 200);
	camera.lookAt(0, 5, player.position.z);
	spotLight.position.set(0, 200, player.position.z);
	won = false;
	dead = false;

	$('.menu--loading-screen').addClass('hide');
	$('#container').removeClass('hide');

}

export function createGameLoop(func, fps = 60) {
	let targetFps = 0, fpsInterval = 0;
	let lastTime = 0, lastOverTime = 0, prevOverTime = 0, deltaTime = 0;

	function updateFps(value) {
		targetFps = value;
		fpsInterval = 1000 / targetFps;
	}

	updateFps(fps);

	return {
		// getter/setter for targeted frame rate
		get fps() {
			return targetFps;
		},
		set fps(value) {
			updateFps(value);
		},

		// the frame-capped loop function
		loop(time) {
			deltaTime = time - lastTime;

			if (deltaTime >= fpsInterval) {
				prevOverTime = lastOverTime;
				lastOverTime = deltaTime % fpsInterval;
				lastTime = time - lastOverTime;

				// keep time elapsed in sync with real life
				deltaTime -= prevOverTime;

				// "normalize" the delta time (so 1 equals to 1 second)
				deltaTime *= 0.001;

				func(deltaTime);
			}
		},
	}
}