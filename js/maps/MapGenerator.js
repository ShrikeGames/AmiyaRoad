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

const MAP_SEGMENT_LENGTH = 250;
const TILE_WIDTH = 2;
const TILE_LENGTH = 4;
let trackGroup;
class MapGenerator {
    constructor() {

    }
    generateTile(colour, scale = 1) {
        const boxGeometry = new THREE.BoxGeometry(TILE_WIDTH * scale, 0.8, TILE_LENGTH);

        const material = new THREE.MeshPhongMaterial({ color: colour });
        const mesh = new THREE.Mesh(boxGeometry, material);
        mesh.name = "Floor Tile";
        return mesh;
    }
    generatePillar(colour, scale = 1) {
        const boxGeometry = new THREE.BoxGeometry(TILE_WIDTH * scale, 2, TILE_LENGTH);
        const material = new THREE.MeshPhongMaterial({ color: colour });
        const mesh = new THREE.Mesh(boxGeometry, material);
        mesh.name = "Pillar";
        return mesh;
    }
    generateBrambleWall() {
        const boxGeometry = new THREE.BoxGeometry(TILE_WIDTH * 2, 3, TILE_LENGTH *0.5);
        const material = new THREE.MeshPhongMaterial({ map: TEXTURE_BRAMBLE });
        const mesh = new THREE.Mesh(boxGeometry, material);
        mesh.name = "Death";
        return mesh;
    }
    generateBoost(colour, scale = 1) {
        const boxGeometry = new THREE.BoxGeometry(TILE_WIDTH * scale, 0.8, TILE_LENGTH);

        const material = new THREE.MeshPhongMaterial({ map: TEXTURE_BOOST });
        const mesh = new THREE.Mesh(boxGeometry, material);
        mesh.name = "Boost";
        return mesh;
    }
    generateAmiyaBar(scale = 1) {
        const boxGeometry = new THREE.BoxGeometry(3, 0.1, 0.75);

        const material = new THREE.MeshBasicMaterial({ map: TEXTURE_AMIYABAR });
        const mesh = new THREE.Mesh(boxGeometry, material);
        mesh.name = "AmiyaBar";
        mesh.rotation.y = 1.5708;
        return mesh;
    }

    getColour(i) {
        if (i % 2 === 0) {
            return COLOUR_SECONDARY;
        }
        return COLOUR_MAIN;
    }

    getBrambleColour(i) {
        if (i % 2 === 0) {
            return COLOUR_BRAMBLE_SECONDARY;
        }
        return COLOUR_BRAMBLE_MAIN;
    }

    generateGoal(lastTilePos) {
        const geometry = new THREE.BoxGeometry(TILE_LENGTH, TILE_LENGTH, 1);
        const material = new THREE.MeshPhongMaterial({ color: COLOUR_GOAL });
        const goal = new THREE.Mesh(geometry, material);

        goal.position.x = lastTilePos.x;
        goal.position.y = lastTilePos.y;
        goal.position.z = lastTilePos.z;
        goal.name = "Goal";
        goal.receiveShadow = true;
        return goal;
    }

    generateRandomLevel() {
        trackGroup = new THREE.Group();
        let t = 0;
        let lastTilePos;
        for (let i = 0; i < MAP_SEGMENT_LENGTH; i++) {
            t++;
            let random_skip = Math.random();
            if (random_skip <= 0.1 && i > 10 && i % 30 != 0) {

            } else {

                let colour = COLOUR_MAIN;
                if (i % 2 === 0) {
                    colour = COLOUR_SECONDARY;
                }

                let tileMesh = this.generateTile(colour, 1);
                tileMesh.position.y = -0.2;

                if (i > 0 && i % 30 == 0) {
                    tileMesh = this.generateAmiyaBar();
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
                lastTilePos = tileMesh.position;
                trackGroup.add(tileMesh);
            }


            random_skip = Math.random();
            if (random_skip <= 0.5 && i > 10) {

            } else {
                let colour = COLOUR_MAIN;
                if (i % 2 === 0) {
                    colour = COLOUR_SECONDARY;
                }
                let tileMesh = this.generatePillar(colour, 1);

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
                let tileMesh = this.generatePillar(colour, 1);

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
        const goal = this.generateGoal(lastTilePos);
        trackGroup.add(goal);
        return trackGroup;
    }

    generateLevel_1_1() {
        trackGroup = new THREE.Group();
        const mapLength = 40;
        let direction = 0;
        let lastTilePos;
        for (let i = 0; i < mapLength; i++) {

            let colour = this.getColour(i);
            let tileMesh = this.generateTile(colour, 1);
            if (i == 30) {
                tileMesh = this.generateAmiyaBar();
                tileMesh.position.y = 0.1;
            }
            if (i > 0 && i % 10 == 0) {
                direction = 1 - direction;
            }
            if (i != 30) {
                if (direction == 0) {
                    tileMesh.position.y = -0.2 + ((-0.5 + Math.cos(i)) * 0.15);
                } else if (direction == 1) {
                    tileMesh.position.y = -0.2 + ((-0.5 + Math.sin(i)) * 0.15);
                }
            }

            tileMesh.position.x = (-0.5 + Math.cos(i));
            tileMesh.position.z = -i * TILE_LENGTH;
            lastTilePos = new THREE.Vector3(tileMesh.position.x, tileMesh.position.y, tileMesh.position.z);
            //tileMesh.rotation.x = Math.cos(i) * 0.06;
            tileMesh.receiveShadow = true;
            trackGroup.add(tileMesh);
        }
        const goal = this.generateGoal(lastTilePos);
        trackGroup.add(goal);
        return trackGroup;
    }
    generateLevel_1_2() {
        trackGroup = new THREE.Group();
        const mapLength = 80;
        let direction = 0;
        let lastTilePos;
        for (let i = 0; i < mapLength; i++) {
            if (i > 0) {
                if (i % 3 == 0 || i % 7 == 0) {
                    continue;
                }
            }

            let colour = this.getColour(i);
            let tileMesh = this.generateTile(colour, 1);
            if (i == 41) {
                tileMesh = this.generateAmiyaBar();
                tileMesh.position.y = 0.2;
            }

            if (i > 0 && i % 10 == 0) {
                direction = 1 - direction;
            }

            tileMesh.position.y = -0.2;

            tileMesh.position.x = (-0.5 + Math.cos(i));
            tileMesh.position.z = -i * TILE_LENGTH;
            lastTilePos = new THREE.Vector3(tileMesh.position.x, tileMesh.position.y, tileMesh.position.z);
            //tileMesh.rotation.x = Math.cos(i) * 0.06;
            tileMesh.receiveShadow = true;
            trackGroup.add(tileMesh);
        }
        const goal = this.generateGoal(lastTilePos);
        trackGroup.add(goal);
        return trackGroup;
    }

    generateLevel_1_3() {
        trackGroup = new THREE.Group();
        const mapLength = 120;
        let direction = 0;
        let lastTilePos;
        for (let i = 0; i < mapLength; i++) {

            if (i > 0 && i % 5 == 0) {
                direction = 1 - direction;
            }
            if (direction == 1) {
                continue;
            }

            let colour = this.getColour(i);
            let tileMesh = this.generateTile(colour, 1);
            if (i == 51) {
                tileMesh = this.generateAmiyaBar();
                tileMesh.position.y = 0.2;
            }

            tileMesh.position.y = -0.2;

            tileMesh.position.x = (-0.5 + Math.cos(i));
            tileMesh.position.z = -i * TILE_LENGTH;
            lastTilePos = new THREE.Vector3(tileMesh.position.x, tileMesh.position.y, tileMesh.position.z);
            //tileMesh.rotation.x = Math.sin(i) * 0.15;
            tileMesh.receiveShadow = true;
            trackGroup.add(tileMesh);
        }
        direction = 0;
        for (let i = 0; i < mapLength; i++) {
            if (i > 0 && i % 5 == 0) {
                direction = 1 - direction;
            }
            if (direction == 0) {
                continue;
            }

            let colour = this.getColour(i);
            let tileMesh = this.generateTile(colour, 1);
            if (i == 81) {
                tileMesh = this.generateAmiyaBar();
                tileMesh.position.y = 0.5;
            } else if (i >= 50) {
                tileMesh = this.generatePillar(colour, 1);
            }

            tileMesh.position.y = 0.3;

            tileMesh.position.x = 2.5 + (-0.5 + Math.sin(i));
            tileMesh.position.z = -i * TILE_LENGTH;
            //tileMesh.rotation.z = Math.cos(i) * 0.25;
            tileMesh.receiveShadow = true;
            lastTilePos = new THREE.Vector3(tileMesh.position.x, tileMesh.position.y, tileMesh.position.z);
            trackGroup.add(tileMesh);
        }
        direction = 0;
        for (let i = 0; i < mapLength; i++) {
            if (i > 0 && i % 5 == 0) {
                direction = 1 - direction;
            }
            if (direction == 0) {
                continue;
            }

            let colour = this.getColour(i);
            let tileMesh = this.generatePillar(colour, 1);
            if (i == 21) {
                tileMesh = this.generateAmiyaBar();
                tileMesh.position.y = -.02;
            } else if (i >= 50) {
                tileMesh = this.generateTile(colour, 1);
            }

            tileMesh.position.y = -0.4;

            tileMesh.position.x = -2.5 + (-0.5 + Math.sin(i));
            tileMesh.position.z = -i * TILE_LENGTH;
            //tileMesh.rotation.z = Math.cos(i) * 0.25;
            tileMesh.receiveShadow = true;
            lastTilePos = new THREE.Vector3(tileMesh.position.x, tileMesh.position.y, tileMesh.position.z);
            trackGroup.add(tileMesh);
        }
        const goal = this.generateGoal(lastTilePos);
        trackGroup.add(goal);
        return trackGroup;
    }
    generateLevel_2_1() {
        trackGroup = new THREE.Group();
        const mapLength = 123;
        let lastTilePos;
        for (let i = 0; i < mapLength; i++) {

            let colour = this.getBrambleColour(i);
            let tileMesh = this.generateTile(colour, 1);
            if (i > 0 && i % 40 == 0) {
                tileMesh = this.generateAmiyaBar();
                tileMesh.position.y = 0.2;
            } else if (i > 0 && i % 10 == 0) {
                tileMesh = this.generateBrambleWall();
                tileMesh.position.y = -0.2;
            } else if (i > 0 && i % 4 == 0) {
                tileMesh = this.generateBoost(colour);
                tileMesh.rotation.x = 0.2;
                tileMesh.position.y = 0.3;
            }else{
                tileMesh.position.y = -0.2;
            }

            tileMesh.position.x = (-1 + Math.cos(i) + Math.sin(i))*0.5;
            tileMesh.position.z = -i * TILE_LENGTH;
            lastTilePos = new THREE.Vector3(tileMesh.position.x, tileMesh.position.y, tileMesh.position.z);

            tileMesh.receiveShadow = true;
            trackGroup.add(tileMesh);
        }
        const goal = this.generateGoal(lastTilePos);
        trackGroup.add(goal);
        return trackGroup;
    }
}

export { MapGenerator };
