import * as THREE from 'three';
import { ConvexGeometry } from '../jsm/geometries/ConvexGeometry.js';
let mapData = {};
mapData["1-1"] = "Tile0,c0bdf2,0,0.25,0,0,0,0|Tile1,ffbef4,-7.549517245077422e-14,0.2500004768371582,-11.999993324279785,-9.301209840306343e-14,1.1817645273406578e-33,-2.5410985186454742e-20|Tile2,c0bdf2,-3.3861802251067274e-14,0.2500009536743164,-24.000019073486328,-2.427072215080428e-13,-6.281645554053844e-34,5.176315327597851e-21|Tile3,ffbef4,6.522550105277428e-14,0.2500014305114746,-36.000064849853516,-1.875660217420805e-12,-1.9070465944374998e-31,2.033467017880087e-19|Tile4,c0bdf2,4.000000476837158,0.2500019073486328,-48.0001106262207,-3.761189276696442e-12,-6.690286628020419e-31,3.5575378614801786e-19|Tile5,ffbef4,4.000000476837158,0.250002384185791,-60.00015640258789,-5.6467179022912095e-12,9.663637573362777e-27,-3.422744943373801e-15|Tile6,c0bdf2,4.000000476837158,0.2500028610229492,-72.00004577636719,-7.532246527885977e-12,7.135962433915067e-25,-1.8947766532856347e-13|Tile7,ffbef4,4.000000476837158,0.2500033378601074,-83.99986267089844,-8.88764496026484e-12,1.754179236930123e-24,-3.947455697820429e-13|Tile8,c0bdf2,-0.6000004410743713,0.2500038146972656,-95.99967956542969,-1.0243043392643703e-11,3.072982304020927e-24,-6.000135284456309e-13|Tile9,ffbef4,-0.6000004410743713,0.25000429153442383,-107.99949645996094,-1.1598441825022565e-11,3.513949706890555e-24,-6.059347901904433e-13|Tile10,c0bdf2,-0.6000004410743713,0.25000476837158203,-119.99931335449219,-1.2953840257401428e-11,3.9629427786468064e-24,-6.118560519352556e-13|Tile11,ffbef4,-0.6000004410743713,-0.549994945526123,-131.59913635253906,-0.15041569556705242,4.6159394472277037e-14,-6.160393375975735e-13|Tile12,c0bdf2,-0.6000003218650818,-1.473527193069458,-143.5514678955078,-0.000020194444006400938,9.19529896793969e-13,-9.106761211796777e-8|Tile13,ffbef4,-0.6000003218650818,-1.473527193069458,-155.55128479003906,-0.000020194444006400938,9.19529896793969e-13,-9.106761211796777e-8|Tile14,c0bdf2,-0.6000003218650818,0.3264729976654053,-168.35108947753906,0.33764912185633267,-1.5095548775123893e-8,-9.099975528670269e-8|Tile15,ffbef4,-0.6000000834465027,2.1657118797302246,-179.32687377929688,-0.00003836862743842256,2.1520424084757622e-12,-1.1217719020351098e-7|Player,ffffff,3.000007390975952,6.915328502655029,-364.739990234375,0.0015631532491201209,0.006090078249492892,-0.0000045733961576767535|Tile17,c0bdf2,-0.5999994874000549,2.165323257446289,-191.3845672607422,-0.000043245228894029886,-8.958204388582269e-13,4.1429792929648115e-8|Tile18,ffbef4,-0.5999994874000549,2.165323257446289,-203.38438415527344,-0.000043245228894029886,-8.958204388582269e-13,4.1429792929648115e-8|AmiyaBar19,ffffff,-0.5999994874000549,2.165323257446289,-212.38424682617188,-0.000043245228894029886,-8.958204388582269e-13,4.1429792929648115e-8|Tile20,ffbef4,-0.5999994874000549,2.1653294563293457,-221.3841094970703,-0.000043246731379278625,-8.601896574433868e-13,3.978056284381638e-8|Tile21,c0bdf2,-0.5999994874000549,-1.2346704006195068,-238.58384704589844,-0.000043246731379278625,-8.601904256596572e-13,3.978059837095317e-8|Tile22,ffbef4,1.6000008583068848,-1.2346704006195068,-250.5836639404297,-0.000043246731379278625,-8.601904256596572e-13,3.978059837095317e-8|Tile23,c0bdf2,4.200001239776611,-1.2346704006195068,-262.583984375,-0.000043246731379278625,-8.601895806217597e-13,3.9780559291102704e-8|Tile24,ffbef4,7.199998378753662,-1.2346704006195068,-274.584716796875,-0.000043246731379278625,-8.601891196919975e-13,3.978053797482063e-8|Tile25,c0bdf2,3.800001382827759,-1.2346704006195068,-286.58544921875,-0.000043246731379278625,-8.601885051189811e-13,3.97805095531112e-8|Tile26,ffbef4,5.662441253662109e-7,-1.2346704006195068,-298.586181640625,-0.000043246731379278625,-8.601878905459648e-13,3.978048113140177e-8|Tile27,c0bdf2,-4.399999618530273,-1.2346704006195068,-310.5869140625,-0.000043246731379278625,-8.601878905459648e-13,3.978048113140177e-8|Tile28,ffbef4,-0.7999989986419678,-1.2346704006195068,-322.587646484375,-0.000043246731379278625,-8.601874296162025e-13,3.97804598151197e-8|Tile29,c0bdf2,3.600001811981201,-1.2346704006195068,-334.58837890625,-0.000043246731379278625,-8.601874296162025e-13,3.97804598151197e-8|Tile30,ffbef4,0.40000107884407043,-1.2346704006195068,-346.589111328125,-0.000043246731379278625,-8.601859700052887e-13,3.97803923135598e-8|Tile31,c0bdf2,-3.5999996662139893,-1.2346704006195068,-358.58984375,-0.000043246731379278625,-8.601859700052887e-13,3.97803923135598e-8|Tile32,ffbef4,0.000001043081283569336,-1.2346704006195068,-370.590576171875,-0.000043246731379278625,-8.601855090755264e-13,3.978037099727773e-8|Tile33,c0bdf2,0.000001043081283569336,-1.2346704006195068,-382.59130859375,-0.000043246731379278625,-8.601855090755264e-13,3.978037099727773e-8|Goal,00ff00,0.000001043081283569336,4.165327548980713,-391.59185791015625,0,0,0";
mapData["1-2"] = "Tile0,c0bdf2,0,0.25,0,0,0,0|Tile1,ffbef4,-9.769963294327735e-14,0.2500007152557373,-11.999993324279785,-1.4728973249389377e-13,2.9110486771156162e-33,-3.952819558873597e-20|Tile2,c0bdf2,-7.882583474838611e-14,0.2500009536743164,-24.000019073486328,6.846353182727444e-14,-9.020798114429831e-34,-2.635212608425829e-20|Tile3,ffbef4,1.7125188799590324e-13,0.2500014305114746,-47.00010681152344,-1.6376368577181166e-12,-3.1884780935263985e-32,3.893998939385407e-20|Tile4,c0bdf2,2.829679849811195e-13,0.2500019073486328,-59.000152587890625,-3.648991265398083e-12,-4.847643445922909e-31,2.6569772813057476e-19|Tile5,ffbef4,4.078679939362867e-13,2.2500014305114746,-71.00006103515625,-5.3596593309335194e-12,-1.2467131947893334e-30,4.652210589556956e-19|Tile6,c0bdf2,1.047356645855757e-12,2.250002861022949,-82.9998779296875,-9.017845498116017e-12,-2.9304451107554885e-30,6.499213390532603e-19|Tile7,ffbef4,1.4709069465906888e-12,-0.34999561309814453,-111.59944152832031,-1.1413153408468268e-11,-4.407692625594931e-30,7.723882204763034e-19|Tile8,c0bdf2,6.799997806549072,-0.34999537467956543,-131.79913330078125,-1.215422727740556e-11,-5.072090110718265e-30,8.346215674520367e-19|Tile9,ffbef4,6.799997806549072,-0.3499948978424072,-143.7989501953125,-1.2688985279174503e-11,-3.9915415744691156e-25,6.291348735379398e-14|Tile10,c0bdf2,-6.7999982833862305,-0.33911848068237305,-131.7998046875,-4.169747853666322e-7,-3.160543813295284e-20,1.5159400156613378e-13|Tile11,ffbef4,-6.7999982833862305,-0.33911824226379395,-143.79962158203125,-4.169750127403076e-7,-6.915570133300213e-21,3.317018968523877e-14|Tile12,c0bdf2,-8.940696716308594e-8,-0.33911800384521484,-161.79934692382812,-4.1697524011398306e-7,1.7774324792809786e-20,-8.525362219565652e-14|Tile13,ffbef4,4.995730478185578e-7,-0.33911943435668945,-173.79916381835938,-0.000001609067794561964,-1.8365233661318123e-19,2.2827172010270236e-13|Tile14,c0bdf2,4.995730478185578e-7,1.4608807563781738,-186.198974609375,-0.000001609067794561964,-1.8365233661318123e-19,2.2827172010270236e-13|Tile15,ffbef4,5.075348781247158e-7,1.4608697891235352,-198.13241577148438,0.000027880261772198902,4.590973413221045e-18,3.2933502929974323e-13|Tile16,c0bdf2,5.074222144685336e-7,4.4610395431518555,-210.13223266601562,0.000027876234529657886,-5.756809494898125e-15,-4.130263353552266e-10|Tile17,ffbef4,5.074761588730325e-7,-1.3387906551361084,-232.7318878173828,0.00002787220183014866,-2.8756938203643213e-15,-2.0634852160306139e-10|Tile18,c0bdf2,5.075232820672682e-7,-1.3386235237121582,-244.73170471191406,0.000027868118198936114,4.58854811196961e-18,3.29304481903534e-13|Tile19,ffbef4,6.999998092651367,-1.3384562730789185,-265.73211669921875,0.00002786401819681885,-2.8748494800451775e-15,-2.063485216030611e-10|Tile20,c0bdf2,6.999318599700928,-1.3382891416549683,-277.7328796386719,0.00010709260116079806,-5.882329454130293e-11,-0.0000010985501148754704|Tile21,ffbef4,0.5993204116821289,-1.337646245956421,-300.3342590332031,0.00010712810055820129,-5.846471907160678e-11,-0.0000010914917538686843|Tile22,c0bdf2,0.5993204116821289,-1.3370035886764526,-312.3349914550781,0.00010716370181901155,-5.8099174461479495e-11,-0.000001084306973098347|Tile23,ffbef4,-7.000677585601807,-1.3363784551620483,-336.5364685058594,0.00010719660369953187,-5.792190097633433e-11,-0.000001080666720554501|Tile24,c0bdf2,-7.000677585601807,-1.3357138633728027,-348.5372009277344,0.00010723154284819599,-5.7757557909980753e-11,-0.0000010772494078994251|Tile25,ffbef4,0.5993204712867737,0.4647977352142334,-361.1379699707031,0.00010726065395477804,-5.73903179723538e-11,-0.0000010701094197431525|Tile26,c0bdf2,6.799318790435791,2.065244674682617,-375.9388732910156,0.00010728449726801661,-5.721096919639108e-11,-0.0000010665281706680796|Tile27,ffbef4,6.599318981170654,0.06565618515014648,-398.7402648925781,0.00010730635424481543,-5.702781989471695e-11,-0.000001062897354131767|Tile28,c0bdf2,6.599318981170654,0.0662999153137207,-419.1415100097656,0.0001073399109615256,-5.686496784871525e-11,-0.0000010595307458063174|Tile29,ffbef4,6.599318981170654,0.06694412231445312,-442.9429626464844,0.00010737513387253886,-5.6510119779512467e-11,-0.0000010525736797719367|Tile30,c0bdf2,-0.0006796419620513916,0.06733417510986328,-467.1444396972656,0.00010739625597761431,-5.6330602401633384e-11,-0.0000010490235808903996|Tile31,ffbef4,-0.0006796402740292251,0.0679783821105957,-479.1451721191406,0.00010742981997028231,-5.6155865066801795e-11,-0.0000010454427865626774|AmiyaBar,ffffff,-6.950000762939453,-1.3155920505523682,-272.59222412109375,0.00003065866986187839,6.479514651304152e-12,4.2268726474504897e-7|Tile33,ffbef4,-6.950000762939453,-1.3047664165496826,-281.5920715332031,0.00003126040247079617,6.426554218554006e-12,4.111626026315317e-7|Tile34,c0bdf2,-10.349310874938965,-1.2937648296356201,-293.5928039550781,0.000031607731221617237,6.61367532980743e-12,4.184846602584125e-7|Tile35,ffbef4,7.050682067871094,1.9064240455627441,-330.5950622558594,0.00003161335553685581,6.612559188328687e-12,4.183395958534794e-7|AmiyaBar,ffffff,-0.04413611441850662,0.08990645408630371,-458.1903381347656,0.00043620790457680087,3.8990441084731576e-10,0.000001787699943634877|Tile37,ffbef4,-6.844134330749512,0.09121513366699219,-497.3927307128906,0.000433846739692252,-0.000039713243804463133,-0.1840872623071561|Tile38,c0bdf2,-6.835370063781738,0.13869404792785645,-509.3934326171875,0.0004341526209791589,-0.00003974124340951776,-0.1840872623071561|Tile39,ffbef4,-6.826605796813965,0.18617653846740723,-521.3941040039062,0.0004343916216574067,-0.00003976312093156428,-0.18408726230715625|Tile40,c0bdf2,2.582157611846924,0.2336595058441162,-539.1951904296875,0.00043532189658208393,0.00002537955105362447,0.11686444375105157|Tile41,ffbef4,2.5796916484832764,0.2547426223754883,-551.1959228515625,0.00043341012398669115,0.000025268093468940046,0.11686444375105144|Tile42,c0bdf2,2.577226161956787,0.2758142948150635,-563.1966552734375,0.00043162146060717846,0.000025163813231461114,0.1168644437510513|Tile43,ffbef4,-3.0252187252044678,0.29670262336730957,-583.3978881835938,0.0004302390867397896,-0.0000035850817781786748,-0.01666630456824123|Goal,00ff00,-3.025170087814331,4.899662494659424,-595.5986328125,0,0,0|Tile45,ffbef4,2.1650444637089095e-7,-0.13884902000427246,-227.43214416503906,-0.00012968631963276246,-2.7013760906542913e-11,4.1660155147839164e-7|Tile46,c0bdf2,-6.949939727783203,-1.3156455755233765,-263.6321716308594,-0.00001912770312745346,-1.0415977787337488e-11,0.000001089098645934643|Player,ffffff,-3.6248707099753654e-26,3,-7.249741419950731e-26,1.536420781161052e-32,-5.901472041958843e-65,-7.68210390580526e-33"
mapData["1-3"] = "Tile,c0bdf2,0,0,0,0,0,0|Tile,ffbef4,-1.682941969615793,0,-12,0,0,0|Tile,c0bdf2,-1.8185948536513634,0,-24,0,0,0|Tile,ffbef4,-0.2822400161197344,0,-36,0,0,0|Tile,c0bdf2,0.5588309963978517,0,-72,0,0,0|Tile,ffbef4,-1.3139731974375781,0,-84,0,0,0|Tile,c0bdf2,-1.9787164932467636,0,-96,0,0,0|Tile,ffbef4,-1.6733112770721121,0,-252,0,0,0.04|Tile,c0bdf2,0.017702618580807752,0,-264,0,0,0.04|Tile,ffbef4,1.6924408083503413,0,-276,0,0,0.04|Tile,c0bdf2,-1.5251169009592056,0,-298,0,0,0.04|Tile,ffbef4,-1.912751856809006,0,-324,0,0,0.04|Tile,ffbef4,0.317245337609418,0,-492,0,0,0|Tile,c0bdf2,1.8330430958312676,0,-504,0,0,0|Tile,ffbef4,1.6635494852571966,0,-516,0,0,0|Tile,c0bdf2,-1.8035766952976184,0,-552,0,0,0|Tile,ffbef4,-0.247146245490448,0,-564,0,0,0|AmiyaBar,ffffff,1.5365093226473336,0,-576,0,0,0|Tile,ffbef4,7.999980413101407,1.5,-132,0,0,0|Tile,c0bdf2,7.07314583600087,1.5,-144,0,0,0|Tile,ffbef4,5.159665926346718,1.5,-156,0,0,0|Tile,c0bdf2,4.0187852886102595,1.5,-168,0,0,0|Tile,c0bdf2,6.575806633330131,1.5,-192,0,0,0|Tile,ffbef4,7.922794983759114,1.5,-204,0,0,0|AmiyaBar,ffffff,7.5019744935433526,1.5,-216,0,0,0|Tile,ffbef4,5.700245580674095,1.5,-228,0,0,0|Tile,ffbef4,6.80807529064613,1.5,-372,0,0,0.04|Tile,c0bdf2,4.897146637516618,1.5,-384,0,0,0.04|Tile,ffbef4,4.000176279785466,1.5,-396,0,0,0.04|Tile,c0bdf2,4.9418346277599525,1.5,-408,0,0,0.04|Tile,c0bdf2,7.983557706886232,1.5,-432,0,0,0.04|Tile,ffbef4,7.287076266713999,1.5,-444,0,0,0.04|Tile,c0bdf2,5.407262842581229,1.5,-456,0,0,0.04|Tile,ffbef4,4.072409227431825,1.5,-468,0,0,0.04|Tile,ffbef4,4.659541648313251,1.5,-612,0,0,0|Tile,c0bdf2,4.026744815919029,1.5,-624,0,0,0|Tile,ffbef4,5.208149699636332,1.5,-636,0,0,0|Tile,c0bdf2,7.117578097703232,1.5,-648,0,0,0|Tile,c0bdf2,7.043102004173823,1.5,-672,0,0,0|Tile,ffbef4,5.12767048950435,1.5,-684,0,0,0|Tile,c0bdf2,4.014254703830925,1.5,-696,0,0,0|Tile,ffbef4,4.726523985721724,1.5,-708,0,0,0|Tile,c0bdf2,-7.973193476339988,-1,-120,0,0,0|Tile,ffbef4,-4.986732699485144,-1,-132,0,0,0|Tile,ffbef4,-3.697826692476052,-1,-156,0,0,0|Tile,c0bdf2,-6.58039570107137,-1,-168,0,0,0|AmiyaBar,ffffff,-8.585075124305089,-1,-192,0,0,0|Tile,ffbef4,-5.864092522275234,-1,-204,0,0,0|Tile,ffbef4,-3.1837633551029443,-1,-228,0,0,0|Tile,ffbef4,-2.851735281263341,-1,-362,0,0,-0.04|Tile,c0bdf2,-4.04875659972216,-1,-384,0,0,-0.04|Tile,c0bdf2,-9.074793510473839,-1,-408,0,0,-0.04|Tile,ffbef4,-8.282893945778369,-1,-420,0,0,-0.04|Tile,ffbef4,-3.06021971080697,-1,-444,0,0,-0.04|Tile,c0bdf2,-3.431147646567501,-1,-456,0,0,-0.04|Tile,c0bdf2,-2.8427270608197315,-1,-600,0,0,0|Tile,c0bdf2,-7.475599934427602,-1,-624,0,0,0|Tile,ffbef4,-9.15077350881819,-1,-636,0,0,0|Tile,ffbef4,-4.933864557855513,-1,-660,0,0,0|Tile,c0bdf2,-2.918788674745336,-1,-672,0,0,0|Tile,c0bdf2,-6.635332241738079,-1,-696,0,0,0|Tile,ffbef4,-8.949978676066673,-1,-708,0,0,0|Goal,00ff00,-8.949978676066673,3,-709,0,0,0|Player,ffffff,0,3,0,0,-0.6051864057360395,0"

const COLOUR_MAIN = new THREE.Color(0xc0bdf2);
const COLOUR_SECONDARY = new THREE.Color(0xffbef4);
const COLOUR_GOAL = new THREE.Color(0x00ff00);

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
const TEXTURE_BRAMBLE = new THREE.TextureLoader().load('../images/amiyaroad/tiles/Tile5.png');

let pos;
let quad;
let scene;
let physicsWorld;
let rigidBodies;
let allObjects;
const margin = 0.05;
const TEXTURE_PLAYER = new THREE.TextureLoader().load('../images/amiyaroad/Amiya.png');
TEXTURE_PLAYER.wrapS = THREE.RepeatWrapping;
TEXTURE_PLAYER.wrapT = THREE.RepeatWrapping;
TEXTURE_PLAYER.repeat.set(1, 1);

const TILE_WIDTH = 6;
const TILE_HEIGHT = 2;
const TILE_DEPTH = 12;
const GOAL_WIDTH = 12;
const GOAL_HEIGHT = 12;
const GOAL_DEPTH = 4;
const playerRadius = 0.75;

const DEATH_MARGIN = 0.5;
let seed;
let levelString;

let ghostTile;

let lastTileSelection = 0;

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
    generateLevelString() {
        let newLevelString = "";
        console.log("Generate level string");
        for (let i = 0; i < this.allObjects.length; i++) {
            let object = this.allObjects[i];
            let materialInfo = object.material.color.getHexString();
            let pos = object.position;
            let rotation = new THREE.Euler().setFromQuaternion(object.quaternion, "XYZ");
            if (object.name.indexOf("GhostTile") < 0) {
                newLevelString += object.name + "," + materialInfo + "," + pos.x + "," + pos.y + "," + pos.z + "," + rotation.x + "," + rotation.y + "," + rotation.z + "|";
            }
        }
        this.levelString = newLevelString.slice(0, -1);
        return this.levelString;
    }
    loadMap(levelSelected) {
        this.levelString = mapData[levelSelected];
        this.loadMapFromLevelString(this.levelString);
    }
    loadMapFromLevelString(levelString = "") {
        this.rigidBodies = [];
        this.allObjects = [];
        let mapTiles = levelString.split("|");

        for (let i = 0; i < mapTiles.length; i++) {
            const tile = mapTiles[i].split(",");
            let tileType = tile[0];
            let materialHex = "#" + tile[1];
            this.pos.set(tile[2], tile[3], tile[4]);
            this.quat.setFromEuler(new THREE.Euler(tile[5], tile[6], tile[7], 'XYZ'));
            if (tileType.indexOf("GhostTile") >= 0) {
                continue;
            }
            if (tileType.indexOf("Tile") >= 0) {
                let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_TILE_MAIN, shininess: 30, specular: 0xd4aae7 });
                this.createTileWithPhysics("Tile" + i, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, material);
            } else if (tileType.indexOf("AmiyaBar") >= 0) {
                let material = new THREE.MeshPhongMaterial({ map: TEXTURE_AMIYABAR });
                this.createAmiyaBarWithPhysics("AmiyaBar", TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH / 2.0, 0, this.pos, this.quat, material);
            } else if (tileType.indexOf("Goal") >= 0) {
                let material = new THREE.MeshPhongMaterial({ color: materialHex });
                this.createGoalWithPhysics("Goal", GOAL_WIDTH, GOAL_HEIGHT, GOAL_DEPTH, 0, this.pos, this.quat, material);
            }
        }
    }
    initMap(levelSelected, seed, levelString = "") {
        this.seed = seed;
        this.levelSelected = levelSelected;
        this.lastTileSelection = 0;
        console.log(seed);
        console.log(levelString);
        Math.seedrandom(seed);
        this.pos = new THREE.Vector3();
        this.quat = new THREE.Quaternion();
        this.rigidBodies = [];
        this.allObjects = [];
        if (levelSelected == "T-T") {
            console.log("Test");
            this.loadMapFromLevelString(this.levelString);
        } else if (levelSelected == "?-?") {
            console.log("A");
            this.levelString = "";
            this.createMapRandomChaos();
        } else if (levelSelected == "*-*") {
            console.log("B");
            if (levelString != "") {
                this.levelString = levelString;
            }

            this.createMapBuilder();
        } else {
            console.log("C");
            this.levelString = "";
            this.loadMap(levelSelected);
        }

        this.generateLevelString();
        return this.rigidBodies;

    }

    v3(x, y, z) {
        return new THREE.Vector3(x, y, z);
    }

    createPlayer() {
        this.pos.set(0, 3, 0);
        this.quat.setFromEuler(new THREE.Euler(0, 0, 0, 'XYZ'));
        const playerMaterial = new THREE.MeshPhongMaterial({ map: TEXTURE_PLAYER, name: "Player", shininess: 30, specular: 0xd4aae7 });

        let body = this.createPlayerWithPhysics(playerRadius, 4, this.pos, this.quat, playerMaterial);

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
    createTileWithPhysics(name, sx, sy, sz, mass, pos, quat, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
        shape.setMargin(margin);
        object.name = name;
        object.receiveShadow = true;
        object.castShadow = true;
        object.body = this.createRigidBody(object, shape, mass, pos, quat);
        return object;

    }
    createDeathWithPhysics(name, sx, sy, sz, mass, pos, quat, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
        shape.setMargin(margin);
        object.name = name;
        object.receiveShadow = true;
        object.castShadow = true;
        object.body = this.createRigidBody(object, shape, mass, pos, quat);

        return object;

    }
    createAmiyaBarWithPhysics(name, sx, sy, sz, mass, pos, quat, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
        shape.setMargin(margin);
        object.name = name;
        object.receiveShadow = true;
        object.castShadow = true;
        object.body = this.createRigidBody(object, shape, mass, pos, quat);
        return object;

    }
    createGoalWithPhysics(name, sx, sy, sz, mass, pos, quat, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
        shape.setMargin(margin);
        object.name = name;
        object.receiveShadow = false;
        object.castShadow = true;
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
            if (object.name.indexOf("GhostTile") < 0) {
                this.rigidBodies.push(object);
            }

            // Disable deactivation
            body.setActivationState(4);

        }
        body.name = object.name;

        if (object.name.indexOf("GhostTile") < 0) {
            this.allObjects.push(object);
            this.physicsWorld.addRigidBody(body);
        }


        return body;

    }


    createColour(i) {
        if (i % 2 == 0) {
            return COLOUR_MAIN
        }
        return COLOUR_SECONDARY;

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
        let lastPos = new THREE.Vector3(0, 0, 0);
        let lastQuat = new THREE.Quaternion();
        const length = 100;
        for (let i = 0; i < length; i++) {
            this.quat.set(0, 0, 0, 1);

            let random_skip = Math.random();
            if (random_skip <= 0.2 && i > 6 && (i % 30) != 0) {

            } else {
                let colour = this.createColour(i);

                let x = 0;
                let y = -0.2;
                let z = -i * TILE_DEPTH;

                if (i >= 60) {
                    x = Math.cos(i) * 2.5;
                } else if (i >= 30) {
                    x = Math.cos(i) * 1.5;
                } else if (i >= 10) {
                    x = Math.random() - 0.5;
                }
                if (i >= 20 && i % 30 != 0) {
                    y += Math.floor(Math.random() * 2) * 0.3;
                    this.quat.set(0.10 * (i / 100.0), 0, 0, 1);
                }
                this.pos.set(x, y, z);
                if (i > 0 && i % 30 == 0) {
                    let material = new THREE.MeshPhongMaterial({ map: TEXTURE_AMIYABAR });
                    this.createAmiyaBarWithPhysics("AmiyaBar", TILE_WIDTH, 5, TILE_DEPTH / 2.0, 0, this.pos, this.quat, material);
                } else {
                    let material = new THREE.MeshPhongMaterial({ color: colour });
                    this.createTileWithPhysics("Tile" + i, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, material);
                }
            }
            lastPos.x = this.pos.x;
            lastPos.y = this.pos.y + 4;
            lastPos.z = this.pos.z - 1;

            random_skip = Math.random();
            if (random_skip <= 0.33 && i > 6) {

            } else {
                let colour = this.createColour(i);

                let x = -TILE_WIDTH;
                let y = 2;
                let z = -i * TILE_DEPTH;

                if (i >= 60) {
                    x = -TILE_WIDTH + Math.cos(i) * 2.5;
                } else if (i >= 30) {
                    x = -TILE_WIDTH + Math.cos(i) * 1.5;
                } else if (i >= 10) {
                    x = -TILE_WIDTH + Math.random() - 0.5;
                }
                if (i >= 20 && i % 30 != 0) {
                    y += Math.floor(Math.random() * 2) * 0.3;
                }
                if (i >= 50) {
                    this.quat.set(0, 0, Math.random() * 0.2, 1);
                } else {
                    this.quat.set(0, 0, (0.5 - Math.random()) * 0.1, 1);
                }
                this.pos.set(x, y, z);
                if (i > 0 && Math.random() <= 0.02) {
                    let material = new THREE.MeshPhongMaterial({ map: TEXTURE_AMIYABAR });
                    this.createAmiyaBarWithPhysics("AmiyaBar", TILE_WIDTH, 5, TILE_DEPTH / 2.0, 0, this.pos, this.quat, material);
                } else {
                    let material = new THREE.MeshPhongMaterial({ color: colour });
                    this.createTileWithPhysics("Tile" + i, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, material);
                }
            }

            random_skip = Math.random();
            if (random_skip <= 0.33 && i > 6) {

            } else {
                let colour = this.createColour(i);

                let x = TILE_WIDTH;
                let y = 2;
                let z = -i * TILE_DEPTH;

                if (i >= 60) {
                    x = TILE_WIDTH + Math.cos(i) * 2.5;
                } else if (i >= 30) {
                    x = TILE_WIDTH + Math.cos(i) * 1.5;
                } else if (i >= 10) {
                    x = TILE_WIDTH + Math.random() - 0.5;
                }
                if (i >= 20 && i % 30 != 0) {
                    y += Math.floor(Math.random() * 2) * 0.3;
                }
                if (i >= 50) {
                    this.quat.set(0, 0, Math.random() * -0.2, 1);
                } else {
                    this.quat.set(0, 0, (0.5 - Math.random()) * 0.1, 1);
                }

                this.pos.set(x, y, z);
                if (i > 0 && Math.random() <= 0.02) {
                    let material = new THREE.MeshPhongMaterial({ map: TEXTURE_AMIYABAR });
                    this.createAmiyaBarWithPhysics("AmiyaBar", TILE_WIDTH, 5, TILE_DEPTH / 2.0, 0, this.pos, this.quat, material);
                } else {
                    let material = new THREE.MeshPhongMaterial({ color: colour });
                    this.createTileWithPhysics("Tile" + i, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, material);
                }
            }
        }



        let material = new THREE.MeshPhongMaterial({ map: TEXTURE_GOAL });
        this.createGoalWithPhysics("Goal", GOAL_WIDTH, GOAL_HEIGHT, GOAL_DEPTH, 0, lastPos, lastQuat, material);

    }

    createMapBuilder() {
        console.log("Map builder");
        this.pos.set(0, 0, 0);
        this.quat.set(0, 0, 0, 1);
        if (this.levelString != "") {
            this.loadMapFromLevelString(this.levelString);
        }

        // grid
        const gridTileCount = 200;
        const gridSize = TILE_WIDTH * gridTileCount;
        const gridHelper = new THREE.GridHelper(gridSize, gridTileCount);
        gridHelper.position.x = -TILE_WIDTH / 2;
        gridHelper.position.z = -TILE_WIDTH / 2;
        this.scene.add(gridHelper);

    }
    moveGhostTile(player, direction, tileSelection) {
        let playerPos = player.position;
        let rotation = player.quaternion;

        this.pos.set(playerPos.x, playerPos.y - playerRadius - TILE_HEIGHT / 2.0, playerPos.z);
        this.quat.set(rotation.x, 0, rotation.z, 1);

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

            } else {

                let materialHex = this.createColour(this.allObjects.length);
                let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_GHOST_TILE, transparent: true, opacity: 0.75 });

                this.ghostTile = this.getTileFromSelection(tileSelection, "GhostTile", material);
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
    getTileFromSelection(tileSelection, tileName, tileMaterial = null) {


        if (tileSelection == 1) {
            console.log("Add tile");

            //+1 for ghost tile
            let materialHex = this.createColour(this.allObjects.length + 1);
            let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_TILE_MAIN, shininess: 30, specular: 0xd4aae7 });

            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Tile" + this.allObjects.length);
            return this.createTileWithPhysics(actualTileName, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, material);
        } else if (tileSelection == 2) {
            console.log("Add amiyabar");

            let material = new THREE.MeshPhongMaterial({ map: TEXTURE_AMIYABAR });
            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "AmiyaBar" + this.allObjects.length);
            return this.createAmiyaBarWithPhysics(actualTileName, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH / 2.0, 0, this.pos, this.quat, material);
        } else if (tileSelection == 3) {
            console.log("Add goal");

            let material = new THREE.MeshPhongMaterial({ color: COLOUR_GOAL });
            if (tileMaterial != null) {
                material = tileMaterial;
            }
            let actualTileName = this.getOrDefault(tileName, "Goal");
            return this.createGoalWithPhysics(actualTileName, GOAL_WIDTH, GOAL_HEIGHT, GOAL_DEPTH, 0, this.pos, this.quart, material);
        }
        return null;
    }
    addTile(player, direction, tileSelection) {
        let playerPos = player.position;
        let rotation = player.quaternion;

        this.pos.set(playerPos.x, playerPos.y - playerRadius - TILE_HEIGHT / 2.0, playerPos.z);
        this.quat.set(rotation.x, 0, rotation.z, 1);
        let newTile = this.getTileFromSelection(tileSelection);
        this.generateLevelString();
        return newTile;
    }
    undoLastTile() {
        console.log("Undo");
        let index = this.allObjects.length - 1;
        let lastObject = this.allObjects[index];

        if (lastObject) {
            let lastTile = lastObject.body;
            while (lastTile.name.indexOf("GhostTile") >= 0 || lastTile.name.indexOf("Player") >= 0) {
                console.log("Last Tile", lastTile.name);
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
        this.generateLevelString();
    }


}

export { MapGenerator };
