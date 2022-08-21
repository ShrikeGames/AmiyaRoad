import * as THREE from 'three';
import { Vector3 } from 'three';
import { ConvexGeometry } from '../jsm/geometries/ConvexGeometry.js';
let mapData = {};
mapData["1"] = {};
mapData["2"] = {};
mapData["3"] = {};

mapData["1"]["1"] = "1~Tile0,0,0,10,0,0,0,0,1,1,1,1|Tile1,1,0,10,100,0,0,0,1,1,1,1|Tile2,0,0,10,200,0,0,0,1,1,1,1|Tile3,1,0,10,300,0,0,0,1,1,1,1|Tile4,0,-50,10,0,0,0,0,1,1,1,1|Tile5,1,-50,10,100,0,0,0,1,1,1,1|Tile6,0,-50,10,200,0,0,0,1,1,1,1|Tile7,1,-50,10,300,0,0,0,1,1,1,1|Tile8,0,50,10,0,0,0,0,1,1,1,1|Tile9,1,50,10,100,0,0,0,1,1,1,1|Tile10,0,50,10,200,0,0,0,1,1,1,1|Tile11,1,50,10,300,0,0,0,1,1,1,1|Tile12,0,-50,10,400,0,0,0,1,1,1,1|Tile13,1,-50,10,500,0,0,0,1,1,1,1|Tile14,0,-50,10,600,0,0,0,1,1,1,1|Tile15,1,-50,10,700,0,0,0,1,1,1,1|Tile16,0,0,10,600,0,0,0,1,1,1,1|Tile17,1,0,10,700,0,0,0,1,1,1,1|Tile18,0,-50,10,800,0,0,0,1,1,1,1|Tile19,1,-50,10,900,0,0,0,1,1,1,1|Tile20,0,0,10,800,0,0,0,1,1,1,1|Tile21,1,0,10,900,0,0,0,1,1,1,1|Tile22,0,0,10,1000,0,0,0,1,1,1,1|Tile23,1,0,10,1100,0,0,0,1,1,1,1|Tile24,0,50,10,1000,0,0,0,1,1,1,1|Tile25,1,50,10,1100,0,0,0,1,1,1,1|Tile26,0,50,10,1200,0,0,0,1,1,1,1|Tile27,1,50,10,1300,0,0,0,1,1,1,1|Tile28,0,0,10,1200,0,0,0,1,1,1,1|Tile29,1,0,10,1300,0,0,0,1,1,1,1|Tile30,0,0,10,1400,0,0,0,1,1,1,1|Tile31,1,0,10,1500,0,0,0,1,1,1,1|Tile32,0,-20,10,1600,0,0,0,1,1,1,1|Tile33,1,-40,10,1700,0,0,0,1,1,1,1|Tile34,0,-40,10,1800,0,0,0,1,1,1,1|Tile35,1,-40,10,1900,0,0,0,1,1,1,1|Tile36,0,-40,10,2000,0,0,0,1,1,1,1|Tile37,1,-20,10,2100,0,0,0,1,1,1,1|Tile38,0,0,10,2200,0,0,0,1,1,1,1|Tile39,1,0,10,2300,0,0,0,1,1,1,1|Tile40,0,0,10,2400,0,0,0,1,1,1,1|Tile41,1,0,10,2675,0,0,0,1,1,1,1|AmiyaBar,0,0,10,2750,0,0,0,1,1,1,1|AmiyaBar,1,0,10,2800,0,0,0,1,1,1,1|AmiyaBar,0,0,10,2850,0,0,0,1,1,1,1|AmiyaBar,1,0,10,2900,0,0,0,1,1,1,1|Tile47,0,0,10,2975,0,0,0,1,1,1,1|Tile48,1,0,10,3075,0,0,0,1,1,1,1|Tile49,0,0,30,2400,0,0,0,1,1,1,1|Tile50,1,0,30,2500,0,0,0,1,1,1,1|Tile51,0,0,30,3175,0,0,0,1,1,1,1|Tile52,1,0,30,3275,0,0,0,1,1,1,1|Tile53,0,0,30,3475,0,0,0,1,1,1,1|Tile54,1,0,30,3575,0,0,0,1,1,1,1|Tile55,0,0,30,3675,0,0,0,1,1,1,1|Tile56,1,-50,30,3850,0,0,0,1,1,1,1|Tile57,0,-50,30,3950,0,0,0,1,1,1,1|Tile58,1,10,30,4125,0,0,0,1,1,1,1|Tile59,0,10,30,4225,0,0,0,1,1,1,1|Tile60,1,70,30,4400,0,0,0,1,1,1,1|Tile61,0,70,30,4500,0,0,0,1,1,1,1|Tile62,1,40,30,4600,0,0,0,1,1,1,1|Tile63,0,0,30,4700,0,0,0,1,1,1,1|Tile64,1,-40,30,4800,0,0,0,1,1,1,1|Tile65,0,-40,30,4900,0,0,0,1,1,1,1|Tile66,1,0,20,5050,0,0,0,1,1,1,1|Tile67,0,0,20,5150,0,0,0,1,1,1,1|Tile68,1,0,20,5300,0,0,0,1,1,1,1|Tile69,0,0,20,5450,0,0,0,1,1,1,1|Tile70,1,0,20,5600,0,0,0,1,1,1,1|Tile71,0,0,20,5750,0,0,0,1,1,1,1|Goal,2,0,20,5875,0,0,0,1,1,1,1|Player,2,-2,41,2588,0,0,0,1,1,1,1|Tile73,0,-40,45,4425,0,0,0,1,1,1,1|Tile74,1,0,20,2600,0.1,0,0,1,1,1,1"
mapData["1"]["2"] = "1~Tile0,0,0,10,0,0,0,0,1,1,1,1|Tile1,1,0,10,100,0,0,0,1,1,1,1|Boost2,0,0,30,200,-0.2,0,0,1,1,1,1|Boost3,1,0,70,300,-0.2,0,0,1,1,1,1|Tile4,0,0,95,500,0,0,0,1,1,1,1|Tile5,1,0,95,600,0,0,0,1,1,1,1|Boost6,0,0,85,700,0.1,0,0,1,1,1,1|Boost7,1,0,70,775,0.1,0,0,1,1,1,1|Boost8,0,0,50,875,0.1,0,0,1,1,1,1|Boost9,1,0,30,975,0.1,0,0,1,1,1,1|Boost10,0,0,10,1075,0.1,0,0,1,1,1,1|Boost11,1,0,0,1175,0,0,0,1,1,1,1|Tile12,0,0,0,1275,0,0,0,1,1,1,1|Tile13,1,-40,0,1375,0,0,0,1,1,1,1|Tile14,0,40,0,1375,0,0,0,1,1,1,1|Tile15,1,40,0,1475,0,0,0,1,1,1,1|Tile16,0,-40,0,1475,0,0,0,1,1,1,1|AmiyaBar,1,-40,0,1550,0,0,0,1,1,1,1|AmiyaBar,0,-40,0,1600,0,0,0,1,1,1,1|Tunnel19,1,-40,10,1575,0,0,0,1,1,1,1|Tunnel20,0,-40,10,1675,0,0,0,1,1,1,1|Tile21,1,-40,0,1675,0,0,0,1,1,1,1|Tile22,0,-40,0,1775,0,0,0,1,1,1,1|Tile23,1,40,0,1775,0,0,0,1,1,1,1|AmiyaBar,0,40,0,1850,0,0,0,1,1,1,1|AmiyaBar,1,40,0,1900,0,0,0,1,1,1,1|Tile26,0,40,0,1975,0,0,0,1,1,1,1|Tile27,1,40,0,2075,0,0,0,1,1,1,1|Tile28,0,-50,0,2075,0,0,0,1,1,1,1|Tunnel29,1,40,15,1875,0,0,0,1,1,1,1|Tunnel30,0,40,15,1975,0,0,0,1,1,1,1|HalfPipe31,1,0,10,2350,0,0,0,1,1,1,1|HalfPipe32,0,0,10,2450,0,0,0,1,1,1,1|HalfPipe33,1,0,10,2550,0,0,0,1,1,1,1|HalfPipe34,0,0,10,2650,0,0,-0.1,1,1,1,1|HalfPipe35,1,0,10,2750,0,0,-0.30000000000000004,1,1,1,1|HalfPipe36,0,0,10,2850,0,0,-0.4,0.9,1,1,1|HalfPipe37,1,0,10,2950,0,0,-0.5,0.9,1,1,1|HalfPipe38,0,0,10,3050,0,0,-0.5,0.8,1,1,1|HalfPipe39,1,0,10,3150,0,0,-0.6000000000000001,0.8,1,1,1|HalfPipe40,0,0,10,3250,0,0,-0.6000000000000001,0.8,1,1,1|HalfPipe41,1,0,10,3350,0,0,0.5,0.9,1,1,1|HalfPipe42,0,0,10,3450,0,0,0.4,0.9,1,1,1|HalfPipe43,1,0,10,3550,0,0,0.30000000000000004,1,1,1,1|HalfPipe44,0,0,10,3650,0,0,0.2,1,1,1,1|HalfPipe45,1,0,10,3750,0,0,0.1,1,1,1,1|HalfPipe46,0,0,10,3850,0,0,0,1,1,1,1|AmiyaBar,1,0,-25,3925,0,0,0,1,1,1,1|AmiyaBar,0,0,-25,3975,0,0,0,1,1,1,1|Tile50,1,0,-25,4050,0,0,0,1,1,1,1|Tile51,0,0,-25,4150,0,0,0,1,1,1,1|Tunnel52,1,0,-10,3950,0,0,0,1,1,1,1|Tunnel53,0,0,-10,4050,0,0,0,1,1,1,1|Tile54,1,0,-5,4250,0,0,0,1,1,1,1|Tile55,0,0,-5,4350,0,0,0,1,1,1,1|Tunnel56,1,0,20,4475,0,0,0,1,2,2,2|Tunnel57,0,0,20,4675,0,0,0,1,2,2,2|Tunnel58,1,0,20,4875,0,0,0,1,2,2,2|Tile59,0,0,25,4900,0,0,0,1,1,1,1|Tile60,1,0,25,5000,0,0,0,1,1,1,1|Tile61,0,0,25,5100,0,0,0,1,1,1,1|Tile62,1,0,25,5200,0,0,0,1,1,1,1|Player,2,-18,68,7615,0,0,0,1,1,1,1|AmiyaBar63,0,0,25,5275,0,0,0,1,1,1,1|AmiyaBar64,1,0,25,5325,0,0,0,1,1,1,1|AmiyaBar65,0,0,25,5375,0,0,0,1,1,1,1|Tile66,1,0,25,5450,0,0,0,1,1,1,1|Tunnel67,0,0,40,5300,0,0,0,1,1,1,1|Tunnel68,1,0,40,5400,0,0,0,1,1,1,1|Tile69,0,0,25,5550,0,0,0,1,1,1,1|Tile70,1,-30,30,5650,0,0,-0.2,1,1,1,1|Tile71,0,-30,30,5750,0,0,-0.2,1,1,1,1|Tile72,1,-30,30,5850,0,0,-0.2,1,1,1,1|Tile73,0,10,30,5950,0,0,0.2,1,1,1,1|Tile74,1,10,30,6050,0,0,0.2,1,1,1,1|Tile75,0,10,30,6150,0,0,0.2,1,1,1,1|Tile76,1,-20,20,6250,0,0,0,1,1,1,1|Tile77,0,-20,20,6350,0,0,0,1,1,1,1|Tile78,1,-20,20,6450,0,0,0,1,1,1,1|Tunnel79,0,-20,5,6475,0,0,0,1,1,1,1|Tunnel80,1,-20,5,6575,0,0,0,1,1,1,1|Tunnel81,0,-20,5,6675,0,0,0,1,1,1,1|Tile82,1,-20,20,6775,0,0,0,1,1,1,1|Tile83,0,-20,20,6875,0,0,0,1,1,1,1|Tunnel84,1,-20,0,6925,0,0,0,1,1,1,1|Tunnel85,0,-20,0,7025,0,0,0,1,1,1,1|Tunnel86,1,-20,0,7250,0,0,0,1,1,1,1|Tunnel87,0,-20,0,7350,0,0,0,1,1,1,1|Tile88,1,-20,15,7450,0,0,0,1,1,1,1|Tile89,0,-20,15,7550,0,0,0,1,1,1,1|Goal,1,-20,50,7625,0,0,0,1,1,1,1"
mapData["1"]["3"] = "1~Tile0,0,0,10,0,0,0,0,1,1,1,1|Tile1,1,0,10,100,0,0,0,1,1,1,1|Tunnel2,0,0,65,200,0,0,0,1,2,2,2|Tunnel3,1,0,65,400,0,0,0,1,2,2,2|Tunnel4,0,0,65,600,0,0,0,1,2,2,2|Tunnel5,1,0,65,800,0,0,0,1,2,2,2|Tunnel6,0,0,65,1000,0,0,0,1,2,2,2|Tunnel7,1,0,65,1200,0,0,0,1,2,2,2|Tunnel8,0,0,65,1400,0,0,0,1,2,2,2|Tunnel9,1,30,65,1575,0,0,0,1,1,1,1|Tunnel10,0,30,65,1675,0,0,0,1,1,1,1|Tunnel11,1,30,65,1775,0,0,0,1,1,1,1|Tunnel12,0,-30,50,1525,0,0,0,1,1,1,1|Tunnel13,1,-30,50,1625,0,0,0,1,1,1,1|Tunnel14,0,-30,50,1725,0,0,0,1,1,1,1|Tunnel15,1,-30,50,1825,0,0,0,1,1,1,1|Tunnel16,0,-50,50,1950,0,0,0,1,2,2,2|Tunnel17,1,-50,50,2150,0,0,0,1,2,2,2|Tunnel18,0,50,55,1900,0,0,0,1,2,2,2|Tunnel19,1,50,55,2100,0,0,0,1,2,2,2|Tunnel20,0,30,55,2200,0,0,0,1,1,1,1|Tunnel21,1,30,55,2300,0,0,0,1,1,1,1|Tunnel22,0,-30,55,2200,0,0,0,1,1,1,1|Tunnel23,1,-30,55,2300,0,0,0,1,1,1,1|Tunnel24,0,-30,55,2400,0,0,0,1,1,1,1|Tunnel25,1,30,55,2400,0,0,0,1,1,1,1|Tunnel26,0,30,55,2500,0,0,0,1,1,1,1|Tunnel27,1,-30,55,2500,0,0,0,1,1,1,1|Tile28,0,0,45,2700,0,0,0,1,1,1,1|Tile29,1,0,45,2800,0,0,0,1,1,1,1|Tile30,0,0,45,2900,0,0,0,1,1,1,1|Tile31,1,0,45,3000,0,0,0,1,1,1,1|AmiyaBar,0,0,45,3075,0,0,0,1,1,1,1|AmiyaBar,1,0,45,3125,0,0,0,1,1,1,1|AmiyaBar,0,0,45,3175,0,0,0,1,1,1,1|AmiyaBar,1,0,45,3225,0,0,0,1,1,1,1|AmiyaBar,0,0,45,3275,0,0,0,1,1,1,1|AmiyaBar,1,0,45,3325,0,0,0,1,1,1,1|Tile38,0,0,45,3400,0,0,0,1,1,1,1|Tunnel39,1,0,100,3500,0,0,0,1,2,2,2|Tunnel40,0,0,100,3700,0,0,0,1,2,2,2|Tunnel41,1,0,100,3900,0,0,0,1,2,2,2|Tunnel42,0,0,100,4100,0,0,0,1,2,2,2|Tunnel43,1,0,100,4300,0,0,0,1,2,2,2|Death44,0,70,55,500,0,0,0,1,1,1,1|Death45,1,-70,55,700,0,0,0,1,1,1,1|Death46,0,0,5,900,0,0,0,1,1,1,1|Death47,1,0,160,1875,0,0,0,1,2,1,2|Death48,0,0,155,2025,0,0,0,1,2,1,2|Death49,1,0,45,3600,0,0,0,1,1,1,1|Death50,0,0,150,4000,0,0,0,1,1,1,1|Death51,1,-50,100,4325,0,0,0,1,1,1,1|Tunnel52,0,0,100,4500,0,0,0,1,2,2,2|Tile53,1,0,80,4600,0,0,0,1,1,1,1|Tile54,0,0,80,4700,0,0,0,1,1,1,1|Tile55,1,0,80,4800,0,0,0,1,1,1,1|Tile57,0,0,80,4900,0,0,0,1,1,1,1|AmiyaBar,1,0,80,4975,0,0,0,1,1,1,1|AmiyaBar,0,0,80,5025,0,0,0,1,1,1,1|AmiyaBar,1,0,80,5075,0,0,0,1,1,1,1|AmiyaBar,0,0,80,5125,0,0,0,1,1,1,1|Tile62,1,0,80,5200,0,0,0,1,1,1,1|Tile63,0,0,65,5425,0,0,0,1,1,1,1|Tile64,1,0,65,5525,0,0,0,1,1,1,1|Tile65,0,0,50,5750,0,0,0,1,1,1,1|Tile66,1,0,50,5850,0,0,0,1,1,1,1|Tunnel67,0,0,25,6025,0,0,0,1,1,1,1|Tunnel68,1,0,25,6125,0,0,0,1,1,1,1|Tunnel69,0,0,25,6225,0,0,0,1,1,1,1|Tunnel70,1,-140,65,6450,0,0,0,1,2,2,2|Tunnel71,0,80,65,6675,0,0,0,1,2,2,2|Player,2,84,128,7133,0,0,0,1,1,1,1|Tunnel72,1,0,25,6325,0,0,0,1,1,1,1|Tunnel73,0,0,25,6425,0,0,0,1,1,1,1|Goal,1,-130,175,6550,0,0,0,1,1,1,1|Tunnel75,0,70,110,6800,0,0,0,1,1,1,1|Tunnel76,1,70,110,6900,0,0,0,1,1,1,1|Tunnel77,0,70,110,7000,0,0,0,1,1,1,1|Goal,1,80,110,7125,0,0,0,1,1,1,1"
mapData["1"]["4"] = "1~Player,2,0,30,298,0,0,0,1,1,1,1|Tile1,0,0,10,0,0,0,0,1,1,1,1|Tile2,1,0,10,100,0,0,0,1,1,1,1|Tile3,0,0,10,200,0,0,0,1,1,1,1|Goal,1,0,10,300,0,0,0,1,1,1,1"
mapData["1"]["5"] = "1~Player,2,0,30,298,0,0,0,1,1,1,1|Tile1,0,0,10,0,0,0,0,1,1,1,1|Tile2,1,0,10,100,0,0,0,1,1,1,1|Tile3,0,0,10,200,0,0,0,1,1,1,1|Goal,1,0,10,300,0,0,0,1,1,1,1"
mapData["1"]["6"] = "1~Player,2,0,30,298,0,0,0,1,1,1,1|Tile1,0,0,10,0,0,0,0,1,1,1,1|Tile2,1,0,10,100,0,0,0,1,1,1,1|Tile3,0,0,10,200,0,0,0,1,1,1,1|Goal,1,0,10,300,0,0,0,1,1,1,1"
mapData["1"]["7"] = "1~Player,2,0,30,298,0,0,0,1,1,1,1|Tile1,0,0,10,0,0,0,0,1,1,1,1|Tile2,1,0,10,100,0,0,0,1,1,1,1|Tile3,0,0,10,200,0,0,0,1,1,1,1|Goal,1,0,10,300,0,0,0,1,1,1,1"
mapData["1"]["8"] = "1~Player,2,0,30,298,0,0,0,1,1,1,1|Tile1,0,0,10,0,0,0,0,1,1,1,1|Tile2,1,0,10,100,0,0,0,1,1,1,1|Tile3,0,0,10,200,0,0,0,1,1,1,1|Goal,1,0,10,300,0,0,0,1,1,1,1"

mapData["2"]["1"] = "1~Tile0,0,0,10,0,0,0,0,1,1,1,1|Tile1,1,0,10,100,0,0,0,1,1,1,1|Tile2,0,0,10,200,0,0,0,1,1,1,1|Tile3,1,0,10,300,0,0,0,1,1,1,1|Tile4,0,-50,10,0,0,0,0,1,1,1,1|Tile5,1,-50,10,100,0,0,0,1,1,1,1|Tile6,0,-50,10,200,0,0,0,1,1,1,1|Tile7,1,-50,10,300,0,0,0,1,1,1,1|Tile8,0,50,10,0,0,0,0,1,1,1,1|Tile9,1,50,10,100,0,0,0,1,1,1,1|Tile10,0,50,10,200,0,0,0,1,1,1,1|Tile11,1,50,10,300,0,0,0,1,1,1,1|Tile12,0,-50,10,400,0,0,0,1,1,1,1|Tile13,1,-50,10,500,0,0,0,1,1,1,1|Tile14,0,-50,10,600,0,0,0,1,1,1,1|Tile15,1,-50,10,700,0,0,0,1,1,1,1|Tile16,0,0,10,600,0,0,0,1,1,1,1|Tile17,1,0,10,700,0,0,0,1,1,1,1|Tile18,0,-50,10,800,0,0,0,1,1,1,1|Tile19,1,-50,10,900,0,0,0,1,1,1,1|Tile20,0,0,10,800,0,0,0,1,1,1,1|Tile21,1,0,10,900,0,0,0,1,1,1,1|Tile22,0,0,10,1000,0,0,0,1,1,1,1|Tile23,1,0,10,1100,0,0,0,1,1,1,1|Tile24,0,50,10,1000,0,0,0,1,1,1,1|Tile25,1,50,10,1100,0,0,0,1,1,1,1|Tile26,0,50,10,1200,0,0,0,1,1,1,1|Tile27,1,50,10,1300,0,0,0,1,1,1,1|Tile28,0,0,10,1200,0,0,0,1,1,1,1|Tile29,1,0,10,1300,0,0,0,1,1,1,1|Tile30,0,0,10,1400,0,0,0,1,1,1,1|Tile31,1,0,10,1500,0,0,0,1,1,1,1|Tile32,0,-20,10,1600,0,0,0,1,1,1,1|Tile33,1,-40,10,1700,0,0,0,1,1,1,1|Tile34,0,-40,10,1800,0,0,0,1,1,1,1|Tile35,1,-40,10,1900,0,0,0,1,1,1,1|Tile36,0,-40,10,2000,0,0,0,1,1,1,1|Tile37,1,-20,10,2100,0,0,0,1,1,1,1|Tile38,0,0,10,2200,0,0,0,1,1,1,1|Tile39,1,0,10,2300,0,0,0,1,1,1,1|Tile40,0,0,10,2400,0,0,0,1,1,1,1|Tile41,1,0,10,2675,0,0,0,1,1,1,1|AmiyaBar,0,0,10,2750,0,0,0,1,1,1,1|AmiyaBar,1,0,10,2800,0,0,0,1,1,1,1|AmiyaBar,0,0,10,2850,0,0,0,1,1,1,1|AmiyaBar,1,0,10,2900,0,0,0,1,1,1,1|Tile47,0,0,10,2975,0,0,0,1,1,1,1|Tile48,1,0,10,3075,0,0,0,1,1,1,1|Tile49,0,0,30,2400,0,0,0,1,1,1,1|Tile50,1,0,30,2500,0,0,0,1,1,1,1|Tile51,0,0,30,3175,0,0,0,1,1,1,1|Tile52,1,0,30,3275,0,0,0,1,1,1,1|Tile53,0,0,30,3475,0,0,0,1,1,1,1|Tile54,1,0,30,3575,0,0,0,1,1,1,1|Tile55,0,0,30,3675,0,0,0,1,1,1,1|Tile56,1,-50,30,3850,0,0,0,1,1,1,1|Tile57,0,-50,30,3950,0,0,0,1,1,1,1|Tile58,1,10,30,4125,0,0,0,1,1,1,1|Tile59,0,10,30,4225,0,0,0,1,1,1,1|Tile60,1,70,30,4400,0,0,0,1,1,1,1|Tile61,0,70,30,4500,0,0,0,1,1,1,1|Tile62,1,40,30,4600,0,0,0,1,1,1,1|Tile63,0,0,30,4700,0,0,0,1,1,1,1|Tile64,1,-40,30,4800,0,0,0,1,1,1,1|Tile65,0,-40,30,4900,0,0,0,1,1,1,1|Tile66,1,0,20,5050,0,0,0,1,1,1,1|Tile67,0,0,20,5150,0,0,0,1,1,1,1|Tile68,1,0,20,5300,0,0,0,1,1,1,1|Tile69,0,0,20,5450,0,0,0,1,1,1,1|Tile70,1,0,20,5600,0,0,0,1,1,1,1|Tile71,0,0,20,5750,0,0,0,1,1,1,1|Goal,2,0,20,5875,0,0,0,1,1,1,1|Player,2,-2,41,2588,0,0,0,1,1,1,1|Tile73,0,-40,45,4425,0,0,0,1,1,1,1|Tile74,1,0,20,2600,0.1,0,0,1,1,1,1"
mapData["2"]["2"] = "1~Tile0,0,0,10,0,0,0,0,1,1,1,1|Tile1,1,0,10,100,0,0,0,1,1,1,1|Boost2,0,0,30,200,-0.2,0,0,1,1,1,1|Boost3,1,0,70,300,-0.2,0,0,1,1,1,1|Tile4,0,0,95,500,0,0,0,1,1,1,1|Tile5,1,0,95,600,0,0,0,1,1,1,1|Boost6,0,0,85,700,0.1,0,0,1,1,1,1|Boost7,1,0,70,775,0.1,0,0,1,1,1,1|Boost8,0,0,50,875,0.1,0,0,1,1,1,1|Boost9,1,0,30,975,0.1,0,0,1,1,1,1|Boost10,0,0,10,1075,0.1,0,0,1,1,1,1|Boost11,1,0,0,1175,0,0,0,1,1,1,1|Tile12,0,0,0,1275,0,0,0,1,1,1,1|Tile13,1,-40,0,1375,0,0,0,1,1,1,1|Tile14,0,40,0,1375,0,0,0,1,1,1,1|Tile15,1,40,0,1475,0,0,0,1,1,1,1|Tile16,0,-40,0,1475,0,0,0,1,1,1,1|AmiyaBar,1,-40,0,1550,0,0,0,1,1,1,1|AmiyaBar,0,-40,0,1600,0,0,0,1,1,1,1|Tunnel19,1,-40,10,1575,0,0,0,1,1,1,1|Tunnel20,0,-40,10,1675,0,0,0,1,1,1,1|Tile21,1,-40,0,1675,0,0,0,1,1,1,1|Tile22,0,-40,0,1775,0,0,0,1,1,1,1|Tile23,1,40,0,1775,0,0,0,1,1,1,1|AmiyaBar,0,40,0,1850,0,0,0,1,1,1,1|AmiyaBar,1,40,0,1900,0,0,0,1,1,1,1|Tile26,0,40,0,1975,0,0,0,1,1,1,1|Tile27,1,40,0,2075,0,0,0,1,1,1,1|Tile28,0,-50,0,2075,0,0,0,1,1,1,1|Tunnel29,1,40,15,1875,0,0,0,1,1,1,1|Tunnel30,0,40,15,1975,0,0,0,1,1,1,1|HalfPipe31,1,0,10,2350,0,0,0,1,1,1,1|HalfPipe32,0,0,10,2450,0,0,0,1,1,1,1|HalfPipe33,1,0,10,2550,0,0,0,1,1,1,1|HalfPipe34,0,0,10,2650,0,0,-0.1,1,1,1,1|HalfPipe35,1,0,10,2750,0,0,-0.30000000000000004,1,1,1,1|HalfPipe36,0,0,10,2850,0,0,-0.4,0.9,1,1,1|HalfPipe37,1,0,10,2950,0,0,-0.5,0.9,1,1,1|HalfPipe38,0,0,10,3050,0,0,-0.5,0.8,1,1,1|HalfPipe39,1,0,10,3150,0,0,-0.6000000000000001,0.8,1,1,1|HalfPipe40,0,0,10,3250,0,0,-0.6000000000000001,0.8,1,1,1|HalfPipe41,1,0,10,3350,0,0,0.5,0.9,1,1,1|HalfPipe42,0,0,10,3450,0,0,0.4,0.9,1,1,1|HalfPipe43,1,0,10,3550,0,0,0.30000000000000004,1,1,1,1|HalfPipe44,0,0,10,3650,0,0,0.2,1,1,1,1|HalfPipe45,1,0,10,3750,0,0,0.1,1,1,1,1|HalfPipe46,0,0,10,3850,0,0,0,1,1,1,1|AmiyaBar,1,0,-25,3925,0,0,0,1,1,1,1|AmiyaBar,0,0,-25,3975,0,0,0,1,1,1,1|Tile50,1,0,-25,4050,0,0,0,1,1,1,1|Tile51,0,0,-25,4150,0,0,0,1,1,1,1|Tunnel52,1,0,-10,3950,0,0,0,1,1,1,1|Tunnel53,0,0,-10,4050,0,0,0,1,1,1,1|Tile54,1,0,-5,4250,0,0,0,1,1,1,1|Tile55,0,0,-5,4350,0,0,0,1,1,1,1|Tunnel56,1,0,20,4475,0,0,0,1,2,2,2|Tunnel57,0,0,20,4675,0,0,0,1,2,2,2|Tunnel58,1,0,20,4875,0,0,0,1,2,2,2|Tile59,0,0,25,4900,0,0,0,1,1,1,1|Tile60,1,0,25,5000,0,0,0,1,1,1,1|Tile61,0,0,25,5100,0,0,0,1,1,1,1|Tile62,1,0,25,5200,0,0,0,1,1,1,1|Player,2,-18,68,7615,0,0,0,1,1,1,1|AmiyaBar63,0,0,25,5275,0,0,0,1,1,1,1|AmiyaBar64,1,0,25,5325,0,0,0,1,1,1,1|AmiyaBar65,0,0,25,5375,0,0,0,1,1,1,1|Tile66,1,0,25,5450,0,0,0,1,1,1,1|Tunnel67,0,0,40,5300,0,0,0,1,1,1,1|Tunnel68,1,0,40,5400,0,0,0,1,1,1,1|Tile69,0,0,25,5550,0,0,0,1,1,1,1|Tile70,1,-30,30,5650,0,0,-0.2,1,1,1,1|Tile71,0,-30,30,5750,0,0,-0.2,1,1,1,1|Tile72,1,-30,30,5850,0,0,-0.2,1,1,1,1|Tile73,0,10,30,5950,0,0,0.2,1,1,1,1|Tile74,1,10,30,6050,0,0,0.2,1,1,1,1|Tile75,0,10,30,6150,0,0,0.2,1,1,1,1|Tile76,1,-20,20,6250,0,0,0,1,1,1,1|Tile77,0,-20,20,6350,0,0,0,1,1,1,1|Tile78,1,-20,20,6450,0,0,0,1,1,1,1|Tunnel79,0,-20,5,6475,0,0,0,1,1,1,1|Tunnel80,1,-20,5,6575,0,0,0,1,1,1,1|Tunnel81,0,-20,5,6675,0,0,0,1,1,1,1|Tile82,1,-20,20,6775,0,0,0,1,1,1,1|Tile83,0,-20,20,6875,0,0,0,1,1,1,1|Tunnel84,1,-20,0,6925,0,0,0,1,1,1,1|Tunnel85,0,-20,0,7025,0,0,0,1,1,1,1|Tunnel86,1,-20,0,7250,0,0,0,1,1,1,1|Tunnel87,0,-20,0,7350,0,0,0,1,1,1,1|Tile88,1,-20,15,7450,0,0,0,1,1,1,1|Tile89,0,-20,15,7550,0,0,0,1,1,1,1|Goal,1,-20,50,7625,0,0,0,1,1,1,1"
mapData["2"]["3"] = "1~Tile0,0,0,10,0,0,0,0,1,1,1,1|Tile1,1,0,10,100,0,0,0,1,1,1,1|Tunnel2,0,0,65,200,0,0,0,1,2,2,2|Tunnel3,1,0,65,400,0,0,0,1,2,2,2|Tunnel4,0,0,65,600,0,0,0,1,2,2,2|Tunnel5,1,0,65,800,0,0,0,1,2,2,2|Tunnel6,0,0,65,1000,0,0,0,1,2,2,2|Tunnel7,1,0,65,1200,0,0,0,1,2,2,2|Tunnel8,0,0,65,1400,0,0,0,1,2,2,2|Tunnel9,1,30,65,1575,0,0,0,1,1,1,1|Tunnel10,0,30,65,1675,0,0,0,1,1,1,1|Tunnel11,1,30,65,1775,0,0,0,1,1,1,1|Tunnel12,0,-30,50,1525,0,0,0,1,1,1,1|Tunnel13,1,-30,50,1625,0,0,0,1,1,1,1|Tunnel14,0,-30,50,1725,0,0,0,1,1,1,1|Tunnel15,1,-30,50,1825,0,0,0,1,1,1,1|Tunnel16,0,-50,50,1950,0,0,0,1,2,2,2|Tunnel17,1,-50,50,2150,0,0,0,1,2,2,2|Tunnel18,0,50,55,1900,0,0,0,1,2,2,2|Tunnel19,1,50,55,2100,0,0,0,1,2,2,2|Tunnel20,0,30,55,2200,0,0,0,1,1,1,1|Tunnel21,1,30,55,2300,0,0,0,1,1,1,1|Tunnel22,0,-30,55,2200,0,0,0,1,1,1,1|Tunnel23,1,-30,55,2300,0,0,0,1,1,1,1|Tunnel24,0,-30,55,2400,0,0,0,1,1,1,1|Tunnel25,1,30,55,2400,0,0,0,1,1,1,1|Tunnel26,0,30,55,2500,0,0,0,1,1,1,1|Tunnel27,1,-30,55,2500,0,0,0,1,1,1,1|Tile28,0,0,45,2700,0,0,0,1,1,1,1|Tile29,1,0,45,2800,0,0,0,1,1,1,1|Tile30,0,0,45,2900,0,0,0,1,1,1,1|Tile31,1,0,45,3000,0,0,0,1,1,1,1|AmiyaBar,0,0,45,3075,0,0,0,1,1,1,1|AmiyaBar,1,0,45,3125,0,0,0,1,1,1,1|AmiyaBar,0,0,45,3175,0,0,0,1,1,1,1|AmiyaBar,1,0,45,3225,0,0,0,1,1,1,1|AmiyaBar,0,0,45,3275,0,0,0,1,1,1,1|AmiyaBar,1,0,45,3325,0,0,0,1,1,1,1|Tile38,0,0,45,3400,0,0,0,1,1,1,1|Tunnel39,1,0,100,3500,0,0,0,1,2,2,2|Tunnel40,0,0,100,3700,0,0,0,1,2,2,2|Tunnel41,1,0,100,3900,0,0,0,1,2,2,2|Tunnel42,0,0,100,4100,0,0,0,1,2,2,2|Tunnel43,1,0,100,4300,0,0,0,1,2,2,2|Death44,0,70,55,500,0,0,0,1,1,1,1|Death45,1,-70,55,700,0,0,0,1,1,1,1|Death46,0,0,5,900,0,0,0,1,1,1,1|Death47,1,0,160,1875,0,0,0,1,2,1,2|Death48,0,0,155,2025,0,0,0,1,2,1,2|Death49,1,0,45,3600,0,0,0,1,1,1,1|Death50,0,0,150,4000,0,0,0,1,1,1,1|Death51,1,-50,100,4325,0,0,0,1,1,1,1|Tunnel52,0,0,100,4500,0,0,0,1,2,2,2|Tile53,1,0,80,4600,0,0,0,1,1,1,1|Tile54,0,0,80,4700,0,0,0,1,1,1,1|Tile55,1,0,80,4800,0,0,0,1,1,1,1|Tile57,0,0,80,4900,0,0,0,1,1,1,1|AmiyaBar,1,0,80,4975,0,0,0,1,1,1,1|AmiyaBar,0,0,80,5025,0,0,0,1,1,1,1|AmiyaBar,1,0,80,5075,0,0,0,1,1,1,1|AmiyaBar,0,0,80,5125,0,0,0,1,1,1,1|Tile62,1,0,80,5200,0,0,0,1,1,1,1|Tile63,0,0,65,5425,0,0,0,1,1,1,1|Tile64,1,0,65,5525,0,0,0,1,1,1,1|Tile65,0,0,50,5750,0,0,0,1,1,1,1|Tile66,1,0,50,5850,0,0,0,1,1,1,1|Tunnel67,0,0,25,6025,0,0,0,1,1,1,1|Tunnel68,1,0,25,6125,0,0,0,1,1,1,1|Tunnel69,0,0,25,6225,0,0,0,1,1,1,1|Tunnel70,1,-140,65,6450,0,0,0,1,2,2,2|Tunnel71,0,80,65,6675,0,0,0,1,2,2,2|Player,2,84,128,7133,0,0,0,1,1,1,1|Tunnel72,1,0,25,6325,0,0,0,1,1,1,1|Tunnel73,0,0,25,6425,0,0,0,1,1,1,1|Goal,1,-130,175,6550,0,0,0,1,1,1,1|Tunnel75,0,70,110,6800,0,0,0,1,1,1,1|Tunnel76,1,70,110,6900,0,0,0,1,1,1,1|Tunnel77,0,70,110,7000,0,0,0,1,1,1,1|Goal,1,80,110,7125,0,0,0,1,1,1,1"
mapData["2"]["4"] = "1~Player,2,0,30,298,0,0,0,1,1,1,1|Tile1,0,0,10,0,0,0,0,1,1,1,1|Tile2,1,0,10,100,0,0,0,1,1,1,1|Tile3,0,0,10,200,0,0,0,1,1,1,1|Goal,1,0,10,300,0,0,0,1,1,1,1"
mapData["2"]["5"] = "1~Player,2,0,30,298,0,0,0,1,1,1,1|Tile1,0,0,10,0,0,0,0,1,1,1,1|Tile2,1,0,10,100,0,0,0,1,1,1,1|Tile3,0,0,10,200,0,0,0,1,1,1,1|Goal,1,0,10,300,0,0,0,1,1,1,1"
mapData["2"]["6"] = "1~Player,2,0,30,298,0,0,0,1,1,1,1|Tile1,0,0,10,0,0,0,0,1,1,1,1|Tile2,1,0,10,100,0,0,0,1,1,1,1|Tile3,0,0,10,200,0,0,0,1,1,1,1|Goal,1,0,10,300,0,0,0,1,1,1,1"
mapData["2"]["7"] = "1~Player,2,0,30,298,0,0,0,1,1,1,1|Tile1,0,0,10,0,0,0,0,1,1,1,1|Tile2,1,0,10,100,0,0,0,1,1,1,1|Tile3,0,0,10,200,0,0,0,1,1,1,1|Goal,1,0,10,300,0,0,0,1,1,1,1"
mapData["2"]["8"] = "1~Player,2,0,30,298,0,0,0,1,1,1,1|Tile1,0,0,10,0,0,0,0,1,1,1,1|Tile2,1,0,10,100,0,0,0,1,1,1,1|Tile3,0,0,10,200,0,0,0,1,1,1,1|Goal,1,0,10,300,0,0,0,1,1,1,1"

mapData["3"]["1"] = "1~Tile0,0,0,10,0,0,0,0,1,1,1,1|Tile1,1,0,10,100,0,0,0,1,1,1,1|Tile2,0,0,10,200,0,0,0,1,1,1,1|Tile3,1,0,10,300,0,0,0,1,1,1,1|Tile4,0,-50,10,0,0,0,0,1,1,1,1|Tile5,1,-50,10,100,0,0,0,1,1,1,1|Tile6,0,-50,10,200,0,0,0,1,1,1,1|Tile7,1,-50,10,300,0,0,0,1,1,1,1|Tile8,0,50,10,0,0,0,0,1,1,1,1|Tile9,1,50,10,100,0,0,0,1,1,1,1|Tile10,0,50,10,200,0,0,0,1,1,1,1|Tile11,1,50,10,300,0,0,0,1,1,1,1|Tile12,0,-50,10,400,0,0,0,1,1,1,1|Tile13,1,-50,10,500,0,0,0,1,1,1,1|Tile14,0,-50,10,600,0,0,0,1,1,1,1|Tile15,1,-50,10,700,0,0,0,1,1,1,1|Tile16,0,0,10,600,0,0,0,1,1,1,1|Tile17,1,0,10,700,0,0,0,1,1,1,1|Tile18,0,-50,10,800,0,0,0,1,1,1,1|Tile19,1,-50,10,900,0,0,0,1,1,1,1|Tile20,0,0,10,800,0,0,0,1,1,1,1|Tile21,1,0,10,900,0,0,0,1,1,1,1|Tile22,0,0,10,1000,0,0,0,1,1,1,1|Tile23,1,0,10,1100,0,0,0,1,1,1,1|Tile24,0,50,10,1000,0,0,0,1,1,1,1|Tile25,1,50,10,1100,0,0,0,1,1,1,1|Tile26,0,50,10,1200,0,0,0,1,1,1,1|Tile27,1,50,10,1300,0,0,0,1,1,1,1|Tile28,0,0,10,1200,0,0,0,1,1,1,1|Tile29,1,0,10,1300,0,0,0,1,1,1,1|Tile30,0,0,10,1400,0,0,0,1,1,1,1|Tile31,1,0,10,1500,0,0,0,1,1,1,1|Tile32,0,-20,10,1600,0,0,0,1,1,1,1|Tile33,1,-40,10,1700,0,0,0,1,1,1,1|Tile34,0,-40,10,1800,0,0,0,1,1,1,1|Tile35,1,-40,10,1900,0,0,0,1,1,1,1|Tile36,0,-40,10,2000,0,0,0,1,1,1,1|Tile37,1,-20,10,2100,0,0,0,1,1,1,1|Tile38,0,0,10,2200,0,0,0,1,1,1,1|Tile39,1,0,10,2300,0,0,0,1,1,1,1|Tile40,0,0,10,2400,0,0,0,1,1,1,1|Tile41,1,0,10,2675,0,0,0,1,1,1,1|AmiyaBar,0,0,10,2750,0,0,0,1,1,1,1|AmiyaBar,1,0,10,2800,0,0,0,1,1,1,1|AmiyaBar,0,0,10,2850,0,0,0,1,1,1,1|AmiyaBar,1,0,10,2900,0,0,0,1,1,1,1|Tile47,0,0,10,2975,0,0,0,1,1,1,1|Tile48,1,0,10,3075,0,0,0,1,1,1,1|Tile49,0,0,30,2400,0,0,0,1,1,1,1|Tile50,1,0,30,2500,0,0,0,1,1,1,1|Tile51,0,0,30,3175,0,0,0,1,1,1,1|Tile52,1,0,30,3275,0,0,0,1,1,1,1|Tile53,0,0,30,3475,0,0,0,1,1,1,1|Tile54,1,0,30,3575,0,0,0,1,1,1,1|Tile55,0,0,30,3675,0,0,0,1,1,1,1|Tile56,1,-50,30,3850,0,0,0,1,1,1,1|Tile57,0,-50,30,3950,0,0,0,1,1,1,1|Tile58,1,10,30,4125,0,0,0,1,1,1,1|Tile59,0,10,30,4225,0,0,0,1,1,1,1|Tile60,1,70,30,4400,0,0,0,1,1,1,1|Tile61,0,70,30,4500,0,0,0,1,1,1,1|Tile62,1,40,30,4600,0,0,0,1,1,1,1|Tile63,0,0,30,4700,0,0,0,1,1,1,1|Tile64,1,-40,30,4800,0,0,0,1,1,1,1|Tile65,0,-40,30,4900,0,0,0,1,1,1,1|Tile66,1,0,20,5050,0,0,0,1,1,1,1|Tile67,0,0,20,5150,0,0,0,1,1,1,1|Tile68,1,0,20,5300,0,0,0,1,1,1,1|Tile69,0,0,20,5450,0,0,0,1,1,1,1|Tile70,1,0,20,5600,0,0,0,1,1,1,1|Tile71,0,0,20,5750,0,0,0,1,1,1,1|Goal,2,0,20,5875,0,0,0,1,1,1,1|Player,2,-2,41,2588,0,0,0,1,1,1,1|Tile73,0,-40,45,4425,0,0,0,1,1,1,1|Tile74,1,0,20,2600,0.1,0,0,1,1,1,1"
mapData["3"]["2"] = "1~Tile0,0,0,10,0,0,0,0,1,1,1,1|Tile1,1,0,10,100,0,0,0,1,1,1,1|Boost2,0,0,30,200,-0.2,0,0,1,1,1,1|Boost3,1,0,70,300,-0.2,0,0,1,1,1,1|Tile4,0,0,95,500,0,0,0,1,1,1,1|Tile5,1,0,95,600,0,0,0,1,1,1,1|Boost6,0,0,85,700,0.1,0,0,1,1,1,1|Boost7,1,0,70,775,0.1,0,0,1,1,1,1|Boost8,0,0,50,875,0.1,0,0,1,1,1,1|Boost9,1,0,30,975,0.1,0,0,1,1,1,1|Boost10,0,0,10,1075,0.1,0,0,1,1,1,1|Boost11,1,0,0,1175,0,0,0,1,1,1,1|Tile12,0,0,0,1275,0,0,0,1,1,1,1|Tile13,1,-40,0,1375,0,0,0,1,1,1,1|Tile14,0,40,0,1375,0,0,0,1,1,1,1|Tile15,1,40,0,1475,0,0,0,1,1,1,1|Tile16,0,-40,0,1475,0,0,0,1,1,1,1|AmiyaBar,1,-40,0,1550,0,0,0,1,1,1,1|AmiyaBar,0,-40,0,1600,0,0,0,1,1,1,1|Tunnel19,1,-40,10,1575,0,0,0,1,1,1,1|Tunnel20,0,-40,10,1675,0,0,0,1,1,1,1|Tile21,1,-40,0,1675,0,0,0,1,1,1,1|Tile22,0,-40,0,1775,0,0,0,1,1,1,1|Tile23,1,40,0,1775,0,0,0,1,1,1,1|AmiyaBar,0,40,0,1850,0,0,0,1,1,1,1|AmiyaBar,1,40,0,1900,0,0,0,1,1,1,1|Tile26,0,40,0,1975,0,0,0,1,1,1,1|Tile27,1,40,0,2075,0,0,0,1,1,1,1|Tile28,0,-50,0,2075,0,0,0,1,1,1,1|Tunnel29,1,40,15,1875,0,0,0,1,1,1,1|Tunnel30,0,40,15,1975,0,0,0,1,1,1,1|HalfPipe31,1,0,10,2350,0,0,0,1,1,1,1|HalfPipe32,0,0,10,2450,0,0,0,1,1,1,1|HalfPipe33,1,0,10,2550,0,0,0,1,1,1,1|HalfPipe34,0,0,10,2650,0,0,-0.1,1,1,1,1|HalfPipe35,1,0,10,2750,0,0,-0.30000000000000004,1,1,1,1|HalfPipe36,0,0,10,2850,0,0,-0.4,0.9,1,1,1|HalfPipe37,1,0,10,2950,0,0,-0.5,0.9,1,1,1|HalfPipe38,0,0,10,3050,0,0,-0.5,0.8,1,1,1|HalfPipe39,1,0,10,3150,0,0,-0.6000000000000001,0.8,1,1,1|HalfPipe40,0,0,10,3250,0,0,-0.6000000000000001,0.8,1,1,1|HalfPipe41,1,0,10,3350,0,0,0.5,0.9,1,1,1|HalfPipe42,0,0,10,3450,0,0,0.4,0.9,1,1,1|HalfPipe43,1,0,10,3550,0,0,0.30000000000000004,1,1,1,1|HalfPipe44,0,0,10,3650,0,0,0.2,1,1,1,1|HalfPipe45,1,0,10,3750,0,0,0.1,1,1,1,1|HalfPipe46,0,0,10,3850,0,0,0,1,1,1,1|AmiyaBar,1,0,-25,3925,0,0,0,1,1,1,1|AmiyaBar,0,0,-25,3975,0,0,0,1,1,1,1|Tile50,1,0,-25,4050,0,0,0,1,1,1,1|Tile51,0,0,-25,4150,0,0,0,1,1,1,1|Tunnel52,1,0,-10,3950,0,0,0,1,1,1,1|Tunnel53,0,0,-10,4050,0,0,0,1,1,1,1|Tile54,1,0,-5,4250,0,0,0,1,1,1,1|Tile55,0,0,-5,4350,0,0,0,1,1,1,1|Tunnel56,1,0,20,4475,0,0,0,1,2,2,2|Tunnel57,0,0,20,4675,0,0,0,1,2,2,2|Tunnel58,1,0,20,4875,0,0,0,1,2,2,2|Tile59,0,0,25,4900,0,0,0,1,1,1,1|Tile60,1,0,25,5000,0,0,0,1,1,1,1|Tile61,0,0,25,5100,0,0,0,1,1,1,1|Tile62,1,0,25,5200,0,0,0,1,1,1,1|Player,2,-18,68,7615,0,0,0,1,1,1,1|AmiyaBar63,0,0,25,5275,0,0,0,1,1,1,1|AmiyaBar64,1,0,25,5325,0,0,0,1,1,1,1|AmiyaBar65,0,0,25,5375,0,0,0,1,1,1,1|Tile66,1,0,25,5450,0,0,0,1,1,1,1|Tunnel67,0,0,40,5300,0,0,0,1,1,1,1|Tunnel68,1,0,40,5400,0,0,0,1,1,1,1|Tile69,0,0,25,5550,0,0,0,1,1,1,1|Tile70,1,-30,30,5650,0,0,-0.2,1,1,1,1|Tile71,0,-30,30,5750,0,0,-0.2,1,1,1,1|Tile72,1,-30,30,5850,0,0,-0.2,1,1,1,1|Tile73,0,10,30,5950,0,0,0.2,1,1,1,1|Tile74,1,10,30,6050,0,0,0.2,1,1,1,1|Tile75,0,10,30,6150,0,0,0.2,1,1,1,1|Tile76,1,-20,20,6250,0,0,0,1,1,1,1|Tile77,0,-20,20,6350,0,0,0,1,1,1,1|Tile78,1,-20,20,6450,0,0,0,1,1,1,1|Tunnel79,0,-20,5,6475,0,0,0,1,1,1,1|Tunnel80,1,-20,5,6575,0,0,0,1,1,1,1|Tunnel81,0,-20,5,6675,0,0,0,1,1,1,1|Tile82,1,-20,20,6775,0,0,0,1,1,1,1|Tile83,0,-20,20,6875,0,0,0,1,1,1,1|Tunnel84,1,-20,0,6925,0,0,0,1,1,1,1|Tunnel85,0,-20,0,7025,0,0,0,1,1,1,1|Tunnel86,1,-20,0,7250,0,0,0,1,1,1,1|Tunnel87,0,-20,0,7350,0,0,0,1,1,1,1|Tile88,1,-20,15,7450,0,0,0,1,1,1,1|Tile89,0,-20,15,7550,0,0,0,1,1,1,1|Goal,1,-20,50,7625,0,0,0,1,1,1,1"
mapData["3"]["3"] = "1~Tile0,0,0,10,0,0,0,0,1,1,1,1|Tile1,1,0,10,100,0,0,0,1,1,1,1|Tunnel2,0,0,65,200,0,0,0,1,2,2,2|Tunnel3,1,0,65,400,0,0,0,1,2,2,2|Tunnel4,0,0,65,600,0,0,0,1,2,2,2|Tunnel5,1,0,65,800,0,0,0,1,2,2,2|Tunnel6,0,0,65,1000,0,0,0,1,2,2,2|Tunnel7,1,0,65,1200,0,0,0,1,2,2,2|Tunnel8,0,0,65,1400,0,0,0,1,2,2,2|Tunnel9,1,30,65,1575,0,0,0,1,1,1,1|Tunnel10,0,30,65,1675,0,0,0,1,1,1,1|Tunnel11,1,30,65,1775,0,0,0,1,1,1,1|Tunnel12,0,-30,50,1525,0,0,0,1,1,1,1|Tunnel13,1,-30,50,1625,0,0,0,1,1,1,1|Tunnel14,0,-30,50,1725,0,0,0,1,1,1,1|Tunnel15,1,-30,50,1825,0,0,0,1,1,1,1|Tunnel16,0,-50,50,1950,0,0,0,1,2,2,2|Tunnel17,1,-50,50,2150,0,0,0,1,2,2,2|Tunnel18,0,50,55,1900,0,0,0,1,2,2,2|Tunnel19,1,50,55,2100,0,0,0,1,2,2,2|Tunnel20,0,30,55,2200,0,0,0,1,1,1,1|Tunnel21,1,30,55,2300,0,0,0,1,1,1,1|Tunnel22,0,-30,55,2200,0,0,0,1,1,1,1|Tunnel23,1,-30,55,2300,0,0,0,1,1,1,1|Tunnel24,0,-30,55,2400,0,0,0,1,1,1,1|Tunnel25,1,30,55,2400,0,0,0,1,1,1,1|Tunnel26,0,30,55,2500,0,0,0,1,1,1,1|Tunnel27,1,-30,55,2500,0,0,0,1,1,1,1|Tile28,0,0,45,2700,0,0,0,1,1,1,1|Tile29,1,0,45,2800,0,0,0,1,1,1,1|Tile30,0,0,45,2900,0,0,0,1,1,1,1|Tile31,1,0,45,3000,0,0,0,1,1,1,1|AmiyaBar,0,0,45,3075,0,0,0,1,1,1,1|AmiyaBar,1,0,45,3125,0,0,0,1,1,1,1|AmiyaBar,0,0,45,3175,0,0,0,1,1,1,1|AmiyaBar,1,0,45,3225,0,0,0,1,1,1,1|AmiyaBar,0,0,45,3275,0,0,0,1,1,1,1|AmiyaBar,1,0,45,3325,0,0,0,1,1,1,1|Tile38,0,0,45,3400,0,0,0,1,1,1,1|Tunnel39,1,0,100,3500,0,0,0,1,2,2,2|Tunnel40,0,0,100,3700,0,0,0,1,2,2,2|Tunnel41,1,0,100,3900,0,0,0,1,2,2,2|Tunnel42,0,0,100,4100,0,0,0,1,2,2,2|Tunnel43,1,0,100,4300,0,0,0,1,2,2,2|Death44,0,70,55,500,0,0,0,1,1,1,1|Death45,1,-70,55,700,0,0,0,1,1,1,1|Death46,0,0,5,900,0,0,0,1,1,1,1|Death47,1,0,160,1875,0,0,0,1,2,1,2|Death48,0,0,155,2025,0,0,0,1,2,1,2|Death49,1,0,45,3600,0,0,0,1,1,1,1|Death50,0,0,150,4000,0,0,0,1,1,1,1|Death51,1,-50,100,4325,0,0,0,1,1,1,1|Tunnel52,0,0,100,4500,0,0,0,1,2,2,2|Tile53,1,0,80,4600,0,0,0,1,1,1,1|Tile54,0,0,80,4700,0,0,0,1,1,1,1|Tile55,1,0,80,4800,0,0,0,1,1,1,1|Tile57,0,0,80,4900,0,0,0,1,1,1,1|AmiyaBar,1,0,80,4975,0,0,0,1,1,1,1|AmiyaBar,0,0,80,5025,0,0,0,1,1,1,1|AmiyaBar,1,0,80,5075,0,0,0,1,1,1,1|AmiyaBar,0,0,80,5125,0,0,0,1,1,1,1|Tile62,1,0,80,5200,0,0,0,1,1,1,1|Tile63,0,0,65,5425,0,0,0,1,1,1,1|Tile64,1,0,65,5525,0,0,0,1,1,1,1|Tile65,0,0,50,5750,0,0,0,1,1,1,1|Tile66,1,0,50,5850,0,0,0,1,1,1,1|Tunnel67,0,0,25,6025,0,0,0,1,1,1,1|Tunnel68,1,0,25,6125,0,0,0,1,1,1,1|Tunnel69,0,0,25,6225,0,0,0,1,1,1,1|Tunnel70,1,-140,65,6450,0,0,0,1,2,2,2|Tunnel71,0,80,65,6675,0,0,0,1,2,2,2|Player,2,84,128,7133,0,0,0,1,1,1,1|Tunnel72,1,0,25,6325,0,0,0,1,1,1,1|Tunnel73,0,0,25,6425,0,0,0,1,1,1,1|Goal,1,-130,175,6550,0,0,0,1,1,1,1|Tunnel75,0,70,110,6800,0,0,0,1,1,1,1|Tunnel76,1,70,110,6900,0,0,0,1,1,1,1|Tunnel77,0,70,110,7000,0,0,0,1,1,1,1|Goal,1,80,110,7125,0,0,0,1,1,1,1"
mapData["3"]["4"] = "1~Player,2,0,30,298,0,0,0,1,1,1,1|Tile1,0,0,10,0,0,0,0,1,1,1,1|Tile2,1,0,10,100,0,0,0,1,1,1,1|Tile3,0,0,10,200,0,0,0,1,1,1,1|Goal,1,0,10,300,0,0,0,1,1,1,1"
mapData["3"]["5"] = "1~Player,2,0,30,298,0,0,0,1,1,1,1|Tile1,0,0,10,0,0,0,0,1,1,1,1|Tile2,1,0,10,100,0,0,0,1,1,1,1|Tile3,0,0,10,200,0,0,0,1,1,1,1|Goal,1,0,10,300,0,0,0,1,1,1,1"
mapData["3"]["6"] = "1~Player,2,0,30,298,0,0,0,1,1,1,1|Tile1,0,0,10,0,0,0,0,1,1,1,1|Tile2,1,0,10,100,0,0,0,1,1,1,1|Tile3,0,0,10,200,0,0,0,1,1,1,1|Goal,1,0,10,300,0,0,0,1,1,1,1"
mapData["3"]["7"] = "1~Player,2,0,30,298,0,0,0,1,1,1,1|Tile1,0,0,10,0,0,0,0,1,1,1,1|Tile2,1,0,10,100,0,0,0,1,1,1,1|Tile3,0,0,10,200,0,0,0,1,1,1,1|Goal,1,0,10,300,0,0,0,1,1,1,1"
mapData["3"]["8"] = "1~Player,2,0,30,298,0,0,0,1,1,1,1|Tile1,0,0,10,0,0,0,0,1,1,1,1|Tile2,1,0,10,100,0,0,0,1,1,1,1|Tile3,0,0,10,200,0,0,0,1,1,1,1|Goal,1,0,10,300,0,0,0,1,1,1,1"

const COLOUR_BLANK = new THREE.Color(0xffffff);

const COLOUR_MAIN = new THREE.Color(0xc0bdf2);
const COLOUR_SECONDARY = new THREE.Color(0xffbef4);
const COLOUR_MAIN_WORLD2 = new THREE.Color(0xa2daff);
const COLOUR_SECONDARY_WORLD2 = new THREE.Color(0x8dbede);
const COLOUR_MAIN_WORLD3 = new THREE.Color(0xffffff);
const COLOUR_SECONDARY_WORLD3 = new THREE.Color(0xe6f5ff);

const TEXTURE_TILE_MAIN = new THREE.TextureLoader().load('../images/amiyaroad/tiles/Tile1.png');
TEXTURE_TILE_MAIN.wrapS = THREE.RepeatWrapping;
TEXTURE_TILE_MAIN.wrapT = THREE.RepeatWrapping;
TEXTURE_TILE_MAIN.repeat.set(2, 2);
const TEXTURE_GHOST_TILE = new THREE.TextureLoader().load('../images/amiyaroad/tiles/GhostTile.png');
TEXTURE_GHOST_TILE.wrapS = THREE.RepeatWrapping;
TEXTURE_GHOST_TILE.wrapT = THREE.RepeatWrapping;
TEXTURE_GHOST_TILE.repeat.set(2, 2);
const TEXTURE_AMIYABAR = new THREE.TextureLoader().load('../images/amiyaroad/tiles/Tile2.png');
const TEXTURE_GOAL = new THREE.TextureLoader().load('../images/amiyaroad/tiles/Tile3.png');
const TEXTURE_BOOST = new THREE.TextureLoader().load('../images/amiyaroad/tiles/Tile4.png');
const TEXTURE_DEATH = new THREE.TextureLoader().load('../images/amiyaroad/tiles/Tile5.png');
const TEXTURE_BALL = new THREE.TextureLoader().load('../images/amiyaroad/tiles/Tile6.png');

const TEXTURE_CHOT = new THREE.TextureLoader().load('../images/amiyaroad/tiles/ChotTile.png');
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
const margin = 0.05;
var TEXTURE_PLAYER = new THREE.TextureLoader().load('../images/amiyaroad/Amiya.png');

TEXTURE_PLAYER.wrapS = THREE.RepeatWrapping;
TEXTURE_PLAYER.wrapT = THREE.RepeatWrapping;
TEXTURE_PLAYER.repeat.set(1, 1);

const TEXTURE_SPRING = new THREE.TextureLoader().load('../images/amiyaroad/tiles/Tile9.png');
TEXTURE_SPRING.wrapS = THREE.RepeatWrapping;
TEXTURE_SPRING.wrapT = THREE.RepeatWrapping;
TEXTURE_SPRING.repeat.set(1, 1);
const SPRING_WIDTH = 50;
const SPRING_HEIGHT = 20;
const SPRING_DEPTH = 50;


const TILE_WIDTH = 50;
const TILE_HEIGHT = 20;
const TILE_DEPTH = 100;

const AMIYABAR_WIDTH = 50;
const AMIYABAR_HEIGHT = 20;
const AMIYABAR_DEPTH = 50;

const DEATH_WIDTH = 100;
const DEATH_HEIGHT = 100;
const DEATH_DEPTH = 20;
const GOAL_WIDTH = 120;
const GOAL_HEIGHT = 120;
const GOAL_DEPTH = 40;
const playerRadius = 8;
const BALL_RADIUS = 6;
const BALL_MASS = 2;

let tileOpacity = 1;
let tileTransparent = tileOpacity < 1;

let tunnelOpacity = 0.75;
let tunnelTransparent = tunnelOpacity < 1;


const TUNNEL_WIDTH = 50;
const TUNNEL_DEPTH = 100;
const TUNNEL_RADIAL_SEGMENTS = 16;

const TEXTURE_TUNNEL_MAIN = new THREE.TextureLoader().load('../images/amiyaroad/tiles/Tile7.png');
TEXTURE_TUNNEL_MAIN.wrapS = THREE.RepeatWrapping;
TEXTURE_TUNNEL_MAIN.wrapT = THREE.RepeatWrapping;
TEXTURE_TUNNEL_MAIN.repeat.set(2, 2);

const TEXTURE_HALFPIPE_MAIN = new THREE.TextureLoader().load('../images/amiyaroad/tiles/Tile8.png');
TEXTURE_HALFPIPE_MAIN.wrapS = THREE.RepeatWrapping;
TEXTURE_HALFPIPE_MAIN.wrapT = THREE.RepeatWrapping;
TEXTURE_HALFPIPE_MAIN.repeat.set(2, 2);


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

class MapGenerator {
    constructor(scene, physicsWorld) {
        this.scene = scene;
        this.physicsWorld = physicsWorld;
        this.pos = new THREE.Vector3();
        this.quat = new THREE.Quaternion();
        this.rigidBodies = [];
        this.allObjects = [];
        this.levelString = "";
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
            this.levelString = mapData[this.currentWorld][this.currentLevel];
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
            let newLevelString = world + "~";
            let colourSelection = colourMap[world];


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
        }
        return this.levelString;
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
                let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_TILE_MAIN, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity });
                newTile = this.createTileWithPhysics("Tile" + i, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, this.scale, material);
            } else if (tileType.indexOf("AmiyaBar") >= 0) {
                let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_AMIYABAR, transparent: tileTransparent, opacity: tileOpacity });
                newTile = this.createAmiyaBarWithPhysics("AmiyaBar", AMIYABAR_WIDTH, AMIYABAR_HEIGHT, AMIYABAR_DEPTH, 0, this.pos, this.quat, this.scale, material);
            } else if (tileType.indexOf("Goal") >= 0) {
                let material = new THREE.MeshPhongMaterial({ map: TEXTURE_GOAL, transparent: tileTransparent, opacity: tileOpacity });
                newTile = this.createGoalWithPhysics("Goal", GOAL_WIDTH, GOAL_HEIGHT, GOAL_DEPTH, 0, this.pos, this.quat, this.scale, material);
            } else if (tileType.indexOf("Boost") >= 0) {
                let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_BOOST, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity });
                newTile = this.createTileWithPhysics("Boost" + i, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, this.scale, material);
            } else if (tileType.indexOf("Death") >= 0) {
                let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_DEATH, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity });
                newTile = this.createTileWithPhysics("Death" + i, DEATH_WIDTH, DEATH_HEIGHT, DEATH_DEPTH, 0, this.pos, this.quat, this.scale, material);
            } else if (tileType.indexOf("Ball") >= 0) {
                let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_BALL, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity });
                newTile = this.createBallWithPhysics("Ball" + i, BALL_RADIUS, BALL_MASS, this.pos, this.quat, this.scale, material);
            } else if (tileType.indexOf("Tunnel") >= 0) {
                let material = new THREE.MeshPhongMaterial({ color: materialHex, side: THREE.DoubleSide, map: TEXTURE_TUNNEL_MAIN, shininess: tileShininess, specular: 0xd4aae7, transparent: tunnelTransparent, opacity: tunnelOpacity });
                newTile = this.createTunnelWithPhysics("Tunnel" + i, 0, this.pos, this.quat, this.scale, material);
            } else if (tileType.indexOf("HalfPipe") >= 0) {
                let material = new THREE.MeshPhongMaterial({ color: materialHex, side: THREE.DoubleSide, map: TEXTURE_HALFPIPE_MAIN, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity });
                newTile = this.createTunnelWithPhysics("HalfPipe" + i, 0, this.pos, this.quat, this.scale, material, Math.PI);
            } else if (tileType.indexOf("Spring") >= 0) {
                let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_SPRING, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity });
                newTile = this.createTileWithPhysics("Spring" + i, SPRING_WIDTH, SPRING_HEIGHT, SPRING_DEPTH, 0, this.pos, this.quat, this.scale, material);
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
        this.scale.set(1, 1, 1);
        this.quat.setFromEuler(new THREE.Euler(0, 0, 0, 'XYZ'));
        const playerMaterial = new THREE.MeshPhongMaterial({ map: TEXTURE_PLAYER, name: "Player", shininess: playerShininess, specular: 0xd4aae7 });
        if (this.inEditor) {
            this.pos.set(this.editorLastPos.x, this.editorLastPos.y, this.editorLastPos.z);
        }
        let body = this.createPlayerWithPhysics(playerRadius, 4, this.pos, this.quat, this.scale, playerMaterial);

        return body;

    }
    createPlayerWithPhysics(radius, mass, pos, quat, scale, material) {
        const object = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32), material);
        //use x scaling for all directions for ball, never be squished
        object.scale.set(scale.x, scale.x, scale.x);
        const shape = new Ammo.btSphereShape(radius);
        shape.setMargin(margin);
        object.name = "Player";
        object.receiveShadow = true;
        object.castShadow = true;
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
        object.receiveShadow = true;
        object.castShadow = true;
        object.body = this.createRigidBody(object, shape, mass * scale.x, pos, quat, scale);

        return object;

    }
    createTileWithPhysics(name, sx, sy, sz, mass, pos, quat, scale, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
        object.scale.set(scale.x, scale.y, scale.z);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5 * scale.x, sy * 0.5 * scale.y, sz * 0.5 * scale.z));
        shape.setMargin(margin);
        object.name = name;
        object.receiveShadow = true;
        object.castShadow = true;
        object.body = this.createRigidBody(object, shape, mass, pos, quat, scale);

        return object;

    }
    createTunnelWithPhysics(name, mass, pos, quat, scale, material, startAngle = 0, endAngle = 2 * Math.PI) {
        const mesh = new Ammo.btTriangleMesh(true, true);
        mesh.setScaling(new Ammo.btVector3(scale.x, scale.y, scale.z));
        let points = [];
        var geometry = new THREE.BufferGeometry();

        let r = (TUNNEL_WIDTH * 0.5);
        let step = (endAngle - startAngle) / TUNNEL_RADIAL_SEGMENTS;

        let dx = 0;
        let dy = 0;
        let dz = 0;
        console.log(dx, dy, dz);
        for (let i = startAngle; i <= endAngle; i += step) {
            let x = dx + (r * Math.cos(i));
            let y = dy + (r * Math.sin(i));
            let z = dz + ((TUNNEL_DEPTH * 0.5));
            let x2 = dx + (r * Math.cos(i + step));
            let y2 = dy + (r * Math.sin(i + step));
            let z2 = dz - (TUNNEL_DEPTH * 0.5);

            mesh.addTriangle(
                new Ammo.btVector3(x, y, z),
                new Ammo.btVector3(x, y, z2),
                new Ammo.btVector3(x2, y2, z2),
                true
            );

            mesh.addTriangle(
                new Ammo.btVector3(x2, y2, z2),
                new Ammo.btVector3(x2, y2, z),
                new Ammo.btVector3(x, y, z),
                true
            );

            points.push(x);
            points.push(y);
            points.push(z2);

            points.push(x2);
            points.push(y2);
            points.push(z);

            points.push(x);
            points.push(y);
            points.push(z);


            points.push(x2);
            points.push(y2);
            points.push(z2);

            points.push(x2);
            points.push(y2);
            points.push(z);

            points.push(x);
            points.push(y);
            points.push(z2);
        }

        class Tunnel extends THREE.Curve {

            constructor(scale = 1) {

                super();

                this.scale = scale;

            }

            getPoint(t, optionalTarget = new THREE.Vector3()) {

                const tx = 0;
                const ty = 0;
                const tz = t * TUNNEL_DEPTH - (TUNNEL_DEPTH * 0.5);

                return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);

            }

        }

        //const path = new Tunnel(1);
        //const geometry = new THREE.TubeGeometry(path, 24, TUNNEL_WIDTH * 0.5, TUNNEL_RADIAL_SEGMENTS, true);
        const vertices = new Float32Array(points);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals();
        geometry.normalizeNormals();

        const shape = new Ammo.btBvhTriangleMeshShape(mesh, true, true);
        shape.setMargin(margin);

        const object = new THREE.Mesh(geometry, material);
        object.scale.set(scale.x, scale.y, scale.z);
        object.name = name;
        object.receiveShadow = true;
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
        object.receiveShadow = true;
        object.castShadow = true;
        object.body = this.createRigidBody(object, shape, mass, pos, quat, scale);

        return object;

    }
    createAmiyaBarWithPhysics(name, sx, sy, sz, mass, pos, quat, scale, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
        object.scale.set(scale.x, scale.y, scale.z);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5 * scale.x, sy * 0.5 * scale.y, sz * 0.5 * scale.z));
        shape.setMargin(margin);
        object.name = name;
        object.receiveShadow = true;
        object.castShadow = true;
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
        object.castShadow = true;
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
        body.scale = new Vector3(scale.x, scale.y, scale.z);
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
        this.allObjects = [];
        this.rigidBodies = [];

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
            TEXTURE_PLAYER = new THREE.TextureLoader().load('../images/amiyaroad/Plok.png');
        } else {
            TEXTURE_PLAYER = new THREE.TextureLoader().load('../images/amiyaroad/Amiya.png');
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
        const gridSize = TILE_WIDTH * gridTileCount;
        const gridHelper = new THREE.GridHelper(gridSize, gridTileCount);
        gridHelper.position.x = -TILE_WIDTH / 2;
        gridHelper.position.z = -TILE_WIDTH / 2;
        gridHelper.receiveShadow = true;
        gridHelper.castShadow = false;
        this.scene.add(gridHelper);

    }
    moveGhostTile(player, tileScale, tileSelection, tileSnapDistanceX, tileSnapDistanceY, tileSnapDistanceZ) {
        let playerPos = player.position;
        let rotation = player.quaternion;
        let rotationSnap = 0.1;

        this.pos.set(Math.round(playerPos.x / tileSnapDistanceX) * tileSnapDistanceX, Math.round(playerPos.y / tileSnapDistanceY) * tileSnapDistanceY, Math.round(playerPos.z / tileSnapDistanceZ) * tileSnapDistanceZ);

        this.quat.set(Math.round(rotation.x / rotationSnap) * rotationSnap, 0, Math.round(rotation.z / rotationSnap) * rotationSnap, Math.round(rotation.w / rotationSnap) * rotationSnap);

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
                if (tileSelection == 6 || tileSelection == 7) {
                    this.ghostTile.scale.y = tileScale;
                } else {
                    this.ghostTile.scale.y = 1;
                }
                this.ghostTile.scale.z = tileScale;
                this.scale.set(this.ghostTile.scale.x, this.ghostTile.scale.y, this.ghostTile.scale.z);

            } else {

                let materialHex = this.createColour(this.allObjects.length);
                let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_GHOST_TILE, side: THREE.DoubleSide, transparent: true, opacity: 0.75 });

                this.ghostTile = this.getTileFromSelection(tileSelection, "GhostTile", material);
                this.ghostTile.scale.x = tileScale;
                if (tileSelection == 6 || tileSelection == 7) {
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
            let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_TILE_MAIN, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity });

            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Tile" + this.allObjects.length);
            return this.createTileWithPhysics(actualTileName, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, this.scale, material);
        } else if (tileSelection == 2) {
            //console.log("Add amiyabar");

            let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_AMIYABAR, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity });
            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "AmiyaBar" + this.allObjects.length);
            return this.createAmiyaBarWithPhysics(actualTileName, AMIYABAR_WIDTH, AMIYABAR_HEIGHT, AMIYABAR_DEPTH, 0, this.pos, this.quat, this.scale, material);
        } else if (tileSelection == 3) {
            //console.log("Add goal");

            let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_GOAL });
            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Goal");
            return this.createGoalWithPhysics(actualTileName, GOAL_WIDTH, GOAL_HEIGHT, GOAL_DEPTH, 0, this.pos, this.quart, this.scale, material);
        } else if (tileSelection == 4) {
            //console.log("Add boost");

            let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_BOOST, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity });
            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Boost" + this.allObjects.length);
            return this.createTileWithPhysics(actualTileName, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, this.scale, material);
        } else if (tileSelection == 5) {
            //console.log("Add death");

            let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_DEATH, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity });
            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Death" + this.allObjects.length);
            return this.createDeathWithPhysics(actualTileName, DEATH_WIDTH, DEATH_HEIGHT, DEATH_DEPTH, 0, this.pos, this.quat, this.scale, material);
        } else if (tileSelection == 6) {
            //console.log("Add ball");

            let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_BALL, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity });
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
            let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_TUNNEL_MAIN, shininess: tileShininess, specular: 0xd4aae7, transparent: tunnelTransparent, opacity: tunnelOpacity });

            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Tunnel" + this.allObjects.length);
            return this.createTunnelWithPhysics(actualTileName, 0, this.pos, this.quat, this.scale, material);
        } else if (tileSelection == 8) {
            //console.log("Add half-pipe");
            let material = new THREE.MeshPhongMaterial({ color: materialHex, side: THREE.DoubleSide, map: TEXTURE_HALFPIPE_MAIN, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity });

            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "HalfPipe" + this.allObjects.length);
            return this.createTunnelWithPhysics(actualTileName, 0, this.pos, this.quat, this.scale, material, Math.PI);
        } else if (tileSelection == 9) {
            //console.log("Add spring");

            let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_SPRING, shininess: tileShininess, specular: 0xd4aae7, transparent: tileTransparent, opacity: tileOpacity });
            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Spring" + this.allObjects.length);
            return this.createTileWithPhysics(actualTileName, SPRING_WIDTH, SPRING_HEIGHT, SPRING_DEPTH, 0, this.pos, this.quat, this.scale, material);
        }

        return null;
    }
    addTile(scale, tileSelection, tilePos = null, tileQuat = null, genLevelString) {
        this.scale = new Vector3(scale, scale, scale);
        if (tileSelection != 6 && tileSelection != 7) {
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
