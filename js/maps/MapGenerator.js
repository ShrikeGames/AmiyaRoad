import * as THREE from 'three';
import { ConvexGeometry } from '../jsm/geometries/ConvexGeometry.js';
let mapData = {};
mapData["1-1"] = "Tile,c0bdf2,0,0,0,0,0,0|Tile,ffbef4,-1.682941969615793,0,-12,0,0,0|Tile,c0bdf2,-1.8185948536513634,0,-24,0,0,0|Tile,ffbef4,-0.2822400161197344,0,-36,0,0,0|Tile,c0bdf2,1.5136049906158564,0,-48,0,0,0|Tile,ffbef4,1.917848549326277,0,-60,0.012499674481709789,0,0|Tile,c0bdf2,0.5588309963978517,0,-72,0,0,0|Tile,ffbef4,-1.3139731974375781,0,-84,0,0,0|Tile,c0bdf2,-1.9787164932467636,0,-96,0,0,0|Tile,ffbef4,-0.8242369704835132,0,-108,0,0,0|Tile,c0bdf2,1.0880422217787395,0,-120,0.024997395914712332,0,0|Tile,ffbef4,1.999980413101407,0,-132,0,0,0|Tile,c0bdf2,1.0731458360008699,0,-144,0,0,0|Tile,ffbef4,-0.8403340736532818,0,-156,0,0,0|Tile,c0bdf2,-1.9812147113897407,0,-168,0,0,0|Tile,ffbef4,-1.3005756803142337,0,-180,0.037491211555460265,0,0|Tile,c0bdf2,0.5758066333301306,0,-192,0,0,0|Tile,ffbef4,1.9227949837591136,0,-204,0,0,0|Tile,c0bdf2,1.5019744935433523,0,-216,0,0,0|Tile,ffbef4,-0.2997544193259047,0,-228,0,0,0|Tile,c0bdf2,-1.8258905014552553,0,-240,0.04997916927067833,0,0|Tile,ffbef4,-1.6733112770721121,0,-252,0,0,0|Tile,c0bdf2,0.017702618580807752,0,-264,0,0,0|Tile,ffbef4,1.6924408083503413,0,-276,0,0,0|Tile,c0bdf2,1.8111567240132476,0,-288,0,0,0|Tile,ffbef4,0.26470350019554606,0,-300,0.0624593178423802,0,0|Tile,c0bdf2,-1.5251169009592056,0,-312,0,0,0|Tile,ffbef4,-1.912751856809006,0,-324,0,0,0|Tile,c0bdf2,-0.5418115766157381,0,-336,0,0,0|Tile,ffbef4,1.327267768425935,0,-348,0,0,0|AmiyaBar,ffffff,1.9760632481857237,0,-360,0.07492970727274234,0,0|Tile,ffbef4,0.80807529064613,0,-372,0,0,0|Tile,c0bdf2,-1.1028533624833812,0,-384,0,0,0|Tile,ffbef4,-1.9998237202145344,0,-396,0,0,0|Tile,c0bdf2,-1.0581653722400477,0,-408,0,0,0|Tile,ffbef4,0.856365338992302,0,-420,0.0873883890887872,0,0|Tile,c0bdf2,1.9835577068862316,0,-432,0,0,0|Tile,ffbef4,1.287076266713999,0,-444,0,0,0|Tile,c0bdf2,-0.5927371574187706,0,-456,0,0,0|Tile,ffbef4,-1.9275907725681756,0,-468,0,0,0|Tile,c0bdf2,-1.4902263209586977,0,-480,0.09983341664682815,0,0|Tile,ffbef4,0.317245337609418,0,-492,0,0,0|Tile,c0bdf2,1.8330430958312676,0,-504,0,0,0|Tile,ffbef4,1.6635494852571966,0,-516,0,0,0|Tile,c0bdf2,-0.035403850210827155,0,-528,0,0,0|Tile,ffbef4,-1.7018070490682369,0,-540,0.11226284543662858,0,0|Tile,c0bdf2,-1.8035766952976184,0,-552,0,0,0|Tile,ffbef4,-0.247146245490448,0,-564,0,0,0|Tile,c0bdf2,1.5365093226473336,0,-576,0,0,0|Tile,ffbef4,1.9075053055189437,0,-588,0,0,0|Tile,c0bdf2,0.5247497074078575,0,-600,0.12467473338522769,0,0|Tile,ffbef4,-1.3404583516867494,0,-612,0,0,0|Tile,c0bdf2,-1.9732551840809707,0,-624,0,0,0|Tile,ffbef4,-0.7918503003636683,0,-636,0,0,0|Tile,c0bdf2,1.1175780977032326,0,-648,0,0,0|Tile,ffbef4,1.9995103467172397,0,-660,0.13706714116038543,0,0|Tile,c0bdf2,1.0431020041738237,0,-672,0,0,0|Tile,ffbef4,-0.8723295104956499,0,-684,0,0,0|Tile,c0bdf2,-1.9857452961690742,0,-696,0,0,0|Tile,ffbef4,-1.2734760142782757,0,-708,0,0,0|AmiyaBar,ffffff,0.6096212422044334,0,-720,0.14943813247359922,0,0|Tile,ffbef4,4.3170580303842065,1,-12,0,0,0.12467473338522769|Tile,c0bdf2,4.181405146348636,1,-24,0,0,0.12467473338522769|Tile,ffbef4,5.717759983880265,1,-36,0,0,0.12467473338522769|Tile,c0bdf2,7.513604990615857,1,-48,0,0,0.12467473338522769|Tile,c0bdf2,6.558830996397852,1,-72,0,0,0.12467473338522769|Tile,ffbef4,4.686026802562422,1,-84,0,0,0.12467473338522769|Tile,c0bdf2,4.021283506753236,1,-96,0,0,0.12467473338522769|Tile,ffbef4,5.175763029516487,1,-108,0,0,0.12467473338522769|Tile,ffbef4,7.999980413101407,1,-132,0,0,0.12467473338522769|Tile,c0bdf2,7.07314583600087,1,-144,0,0,0.12467473338522769|Tile,ffbef4,5.159665926346718,1,-156,0,0,0.12467473338522769|Tile,c0bdf2,4.0187852886102595,1,-168,0,0,0.12467473338522769|Tile,c0bdf2,6.575806633330131,1,-192,0,0,0.12467473338522769|Tile,ffbef4,7.922794983759114,1,-204,0,0,0.12467473338522769|Tile,c0bdf2,7.5019744935433526,1,-216,0,0,0.12467473338522769|Tile,ffbef4,5.700245580674095,1,-228,0,0,0.12467473338522769|Tile,ffbef4,4.326688722927888,1,-252,0,0,0.12467473338522769|Tile,c0bdf2,6.017702618580808,1,-264,0,0,0.12467473338522769|Tile,ffbef4,7.692440808350341,1,-276,0,0,0.12467473338522769|Tile,c0bdf2,7.811156724013248,1,-288,0,0,0.12467473338522769|Tile,c0bdf2,4.474883099040794,1,-312,0,0,0.12467473338522769|Tile,ffbef4,4.087248143190994,1,-324,0,0,0.12467473338522769|Tile,c0bdf2,5.458188423384262,1,-336,0,0,0.12467473338522769|Tile,ffbef4,7.327267768425935,1,-348,0,0,0.12467473338522769|Tile,ffbef4,6.80807529064613,1,-372,0,0,0.12467473338522769|Tile,c0bdf2,4.897146637516618,1,-384,0,0,0.12467473338522769|Tile,ffbef4,4.000176279785466,1,-396,0,0,0.12467473338522769|Tile,c0bdf2,4.9418346277599525,1,-408,0,0,0.12467473338522769|Tile,c0bdf2,7.983557706886232,1,-432,0,0,0.12467473338522769|Tile,ffbef4,7.287076266713999,1,-444,0,0,0.12467473338522769|Tile,c0bdf2,5.407262842581229,1,-456,0,0,0.12467473338522769|Tile,ffbef4,4.072409227431825,1,-468,0,0,0.12467473338522769|Tile,ffbef4,6.3172453376094175,1,-492,0,0,0.12467473338522769|Tile,c0bdf2,7.833043095831267,1,-504,0,0,0.12467473338522769|Tile,ffbef4,7.663549485257197,1,-516,0,0,0.12467473338522769|Tile,c0bdf2,5.964596149789172,1,-528,0,0,0.12467473338522769|Tile,c0bdf2,4.196423304702382,1,-552,0,0,0.12467473338522769|Tile,ffbef4,5.752853754509552,1,-564,0,0,0.12467473338522769|Tile,c0bdf2,7.536509322647333,1,-576,0,0,0.12467473338522769|Tile,ffbef4,7.907505305518944,1,-588,0,0,0.12467473338522769|Tile,ffbef4,4.659541648313251,1,-612,0,0,0.12467473338522769|Tile,c0bdf2,4.026744815919029,1,-624,0,0,0.12467473338522769|Tile,ffbef4,5.208149699636332,1,-636,0,0,0.12467473338522769|Tile,c0bdf2,7.117578097703232,1,-648,0,0,0.12467473338522769|Tile,c0bdf2,7.043102004173823,1,-672,0,0,0.12467473338522769|Tile,ffbef4,5.12767048950435,1,-684,0,0,0.12467473338522769|Tile,c0bdf2,4.014254703830925,1,-696,0,0,0.12467473338522769|Tile,ffbef4,4.726523985721724,1,-708,0,0,0.12467473338522769|Tile,ffbef4,-7.6829419696157935,1,-12,0,0,-0.12467473338522769|Tile,c0bdf2,-7.818594853651364,1,-24,0,0,-0.12467473338522769|Tile,ffbef4,-6.282240016119735,1,-36,0,0,-0.12467473338522769|Tile,c0bdf2,-4.486395009384143,1,-48,0,0,-0.12467473338522769|Tile,c0bdf2,-5.441169003602148,1,-72,0,0,-0.12467473338522769|Tile,ffbef4,-7.313973197437578,1,-84,0,0,-0.12467473338522769|Tile,c0bdf2,-7.978716493246764,1,-96,0,0,-0.12467473338522769|Tile,ffbef4,-6.824236970483513,1,-108,0,0,-0.12467473338522769|Tile,ffbef4,-4.000019586898593,1,-132,0,0,-0.12467473338522769|Tile,c0bdf2,-4.92685416399913,1,-144,0,0,-0.12467473338522769|Tile,ffbef4,-6.840334073653282,1,-156,0,0,-0.12467473338522769|Tile,c0bdf2,-7.9812147113897405,1,-168,0,0,-0.12467473338522769|Tile,c0bdf2,-5.424193366669869,1,-192,0,0,-0.12467473338522769|Tile,ffbef4,-4.077205016240886,1,-204,0,0,-0.12467473338522769|Tile,c0bdf2,-4.4980255064566474,1,-216,0,0,-0.12467473338522769|Tile,ffbef4,-6.299754419325905,1,-228,0,0,-0.12467473338522769|Tile,ffbef4,-7.673311277072112,1,-252,0,0,-0.12467473338522769|Tile,c0bdf2,-5.982297381419192,1,-264,0,0,-0.12467473338522769|Tile,ffbef4,-4.307559191649659,1,-276,0,0,-0.12467473338522769|Tile,c0bdf2,-4.188843275986752,1,-288,0,0,-0.12467473338522769|Tile,c0bdf2,-7.525116900959206,1,-312,0,0,-0.12467473338522769|Tile,ffbef4,-7.912751856809006,1,-324,0,0,-0.12467473338522769|Tile,c0bdf2,-6.541811576615738,1,-336,0,0,-0.12467473338522769|Tile,ffbef4,-4.672732231574065,1,-348,0,0,-0.12467473338522769|Tile,ffbef4,-5.19192470935387,1,-372,0,0,-0.12467473338522769|Tile,c0bdf2,-7.102853362483382,1,-384,0,0,-0.12467473338522769|Tile,ffbef4,-7.999823720214534,1,-396,0,0,-0.12467473338522769|Tile,c0bdf2,-7.0581653722400475,1,-408,0,0,-0.12467473338522769|Tile,c0bdf2,-4.016442293113768,1,-432,0,0,-0.12467473338522769|Tile,ffbef4,-4.712923733286001,1,-444,0,0,-0.12467473338522769|Tile,c0bdf2,-6.592737157418771,1,-456,0,0,-0.12467473338522769|Tile,ffbef4,-7.927590772568175,1,-468,0,0,-0.12467473338522769|Tile,ffbef4,-5.6827546623905825,1,-492,0,0,-0.12467473338522769|Tile,c0bdf2,-4.166956904168733,1,-504,0,0,-0.12467473338522769|Tile,ffbef4,-4.336450514742803,1,-516,0,0,-0.12467473338522769|Tile,c0bdf2,-6.035403850210828,1,-528,0,0,-0.12467473338522769|Tile,c0bdf2,-7.803576695297618,1,-552,0,0,-0.12467473338522769|Tile,ffbef4,-6.247146245490448,1,-564,0,0,-0.12467473338522769|Tile,c0bdf2,-4.463490677352667,1,-576,0,0,-0.12467473338522769|Tile,ffbef4,-4.092494694481056,1,-588,0,0,-0.12467473338522769|Tile,ffbef4,-7.340458351686749,1,-612,0,0,-0.12467473338522769|Tile,c0bdf2,-7.973255184080971,1,-624,0,0,-0.12467473338522769|Tile,ffbef4,-6.791850300363668,1,-636,0,0,-0.12467473338522769|Tile,c0bdf2,-4.882421902296768,1,-648,0,0,-0.12467473338522769|Tile,c0bdf2,-4.956897995826177,1,-672,0,0,-0.12467473338522769|Tile,ffbef4,-6.87232951049565,1,-684,0,0,-0.12467473338522769|Tile,c0bdf2,-7.985745296169075,1,-696,0,0,-0.12467473338522769|Tile,ffbef4,-7.273476014278276,1,-708,0,0,-0.12467473338522769|Goal,00ff00,0.6096212422044334,4,-721,0,0,0|Player,ffffff,0,3,0,0,-0.6051864057360395,0";
mapData["1-2"] = "Tile0,c0bdf2,0,0,0,0,0,0|Player,ffffff,0,3,0,0,-1.2999999999999998,0|Tile0,ffbef4,-1.7882092606669175e-7,-0.000072479248046875,-12.000005722045898,6.959457437006329e-7,-1.8409884507612555e-13,-5.290609124131399e-7|Tile0,c0bdf2,-1.788183396911336e-7,-0.00006842613220214844,-24.000051498413086,6.959435268072974e-7,-1.8409770480298856e-13,-5.290593207974118e-7|Tile0,ffbef4,-1.7881589542412257e-7,-0.00006437301635742188,-35.80004119873047,6.959380698390867e-7,-1.840947382323216e-13,-5.290549438541595e-7|Tile0,c0bdf2,2.7024373139283853e-7,1.7999396324157715,-47.89985656738281,-0.0000020720194697802347,-1.6318637938109006e-12,0.0000015751433011252777|Tile0,ffbef4,2.702419408251444e-7,1.799941062927246,-59.89967346191406,-0.0000020720151496804013,-1.6318574469121182e-12,0.0000015751404589543346|Tile0,c0bdf2,2.7023898496736365e-7,0.9999423027038574,-82.39933013916016,-0.0000020720076463491116,-1.6318458840718435e-12,0.000001575135001986124|Tile0,ffbef4,2.7023691018257523e-7,0.9999439716339111,-94.29914855957031,-0.000002072002189380901,-1.6318380529503769e-12,0.0000015751315913809923|Tile0,c0bdf2,2.7023457960240194e-7,0.9999454021453857,-118.29878234863281,-0.000002071996959786366,-1.6318293409043442e-12,0.0000015751271575943212|Tile0,ffbef4,2.702326753478701e-7,0.9999468326568604,-130.29869079589844,-0.0000020719921849391815,-1.6318221648141378e-12,0.000001575123860676027|Tile0,c0bdf2,2.702305437196628e-7,0.999948263168335,-160.40052795410156,-0.0000020719869553446463,-1.6318139239257876e-12,0.000001575119881636707|Tile0,ffbef4,2.702285542000027e-7,0.9999496936798096,-172.30125427246094,-0.000002071981953123786,-1.6318058621281921e-12,0.0000015751159025973868|Tile0,c0bdf2,2.702261383547011e-7,0.9999511241912842,-184.2019805908203,-0.000002071976723529251,-1.6317975035027663e-12,0.0000015751118098712288|Tile0,ffbef4,8.940696716308594e-8,0.9999518394470215,-196.2027130126953,-0.0000020719733129241193,-1.6317924618996176e-12,0.0000015751095361344744|Tile0,c0bdf2,5.999999046325684,0.9999585151672363,-196.2027130126953,-0.000002071938297378101,-1.6317368545379495e-12,0.0000015750824786670966|Tile0,ffbef4,-5.9993181228637695,1.010852575302124,-196.2027130126953,-0.0000020203476651672746,-1.5514896675977207e-12,0.0000015358640439450608|Tile0,c0bdf2,-5.9993181228637695,1.0108540058135986,-208.2034454345703,-0.000002020341298704362,-1.5514796106471828e-12,0.0000015358589280373633|Tile0,ffbef4,-5.998637676239014,1.0217480659484863,-220.1041717529297,-0.0000019855995105912686,-1.4992553450527422e-12,0.000001510128640803151|Tile0,c0bdf2,0.0013615190982818604,1.021752119064331,-232.1049041748047,-0.0000019855690425187592,-1.4992128137881113e-12,0.0000015101089729802252|Tile0,ffbef4,2.6013619899749756,2.021754741668701,-244.2056427001953,-0.0000019855451682828373,-1.4991780833931684e-12,0.0000015100921473282424|Tile0,c0bdf2,2.6013619899749756,2.0217556953430176,-256.2063751220703,-0.0000019855392565672757,-1.4991686537226015e-12,0.0000015100871451073826|Tile0,ffbef4,-3.198639154434204,0.6217575073242188,-274.8074951171875,-0.000001985532207983337,-1.4991583656992887e-12,0.0000015100821428865229|Tile0,c0bdf2,-1.3986387252807617,0.6217606067657471,-286.8082275390625,-0.0000019855206119258894,-1.4991408068248246e-12,0.0000015100732753131808|Tile0,ffbef4,-0.19863849878311157,0.6217639446258545,-309.3096008300781,-0.0000019855071968790382,-1.4991207460274387e-12,0.0000015100632708714613|Tile0,c0bdf2,-0.19863849878311157,0.6217656135559082,-321.2103271484375,-0.0000019855010577898013,-1.499111596314121e-12,0.0000015100587233979522|Tile0,ffbef4,-0.19863849878311157,2.0217666625976562,-333.41107177734375,0.23814941558531583,0.0009909819850400434,0.008398387582471419|Tile0,c0bdf2,1.3899827003479004,2.1579012870788574,-354.6926574707031,0.030518741400128162,0.002744293351055239,0.1808312165375447|Tile0,ffbef4,-3.226213216781616,2.2471890449523926,-373.39111328125,0.01946166412278446,-0.0017415355235031202,-0.1799283943428614|Tile0,c0bdf2,4.7802348136901855,1.2829222679138184,-391.49151611328125,0.07262657051314632,0.009847149866116572,0.2746617889300603|Tile0,ffbef4,3.8413383960723877,2.584599018096924,-403.2544860839844,0.07263373438300737,0.009847942168284284,0.2746567282052935|Tile0,c0bdf2,1.4233691692352295,1.4495000839233398,-415.1504211425781,0.07263384643522425,0.009847953008966395,0.27465660477305687|Tile0,ffbef4,-6.315532684326172,-0.4487922191619873,-430.2136535644531,-0.020281270537991964,0.0006653681009926503,-0.06566556641220578|Tile0,c0bdf2,-6.314183712005615,1.371734619140625,-442.51483154296875,0.11854901113666011,-0.002324350796055243,-0.039314449735022315|Tile0,ffbef4,-1.0898926258087158,1.987502098083496,-458.94232177734375,0.02613643312620199,0.00003723878032489545,0.0028498968037035076|Tile0,c0bdf2,-1.0903314352035522,2.1425795555114746,-472.83953857421875,-0.15427372460727792,-0.0003536546858561602,0.004602701356043952|Tile0,ffbef4,-1.0957748889923096,0.318253755569458,-484.32196044921875,-0.1543084122893956,-0.000355490739283936,0.004625565102970226|Tile0,c0bdf2,-1.0965994596481323,-0.9045522212982178,-496.6501159667969,0.002926599686737742,-1.8804349781454215e-7,-0.0001285066540630294|Tile0,ffbef4,-1.0965994596481323,-0.8869795799255371,-508.55084228515625,0.0029267466035030817,-1.8819322816211194e-7,-0.00012860252208134605|Tile0,c0bdf2,-1.0965994596481323,0.33059215545654297,-523.3485717773438,0.0029252429767698293,-0.0000023682952858842516,-0.0016192157144979413|Tile0,ffbef4,-1.0965708494186401,2.148153305053711,-539.3446655273438,0.002925468590628887,-0.00000236868705306923,-0.0016193586727005689|Goal,00ff00,-1.096542239189148,3.3657150268554688,-552.0415649414062,0,0,0"
mapData["1-3"] = "Tile,c0bdf2,0,0,0,0,0,0|Tile,ffbef4,-1.682941969615793,0,-12,0,0,0|Tile,c0bdf2,-1.8185948536513634,0,-24,0,0,0|Tile,ffbef4,-0.2822400161197344,0,-36,0,0,0|Tile,c0bdf2,0.5588309963978517,0,-72,0,0,0|Tile,ffbef4,-1.3139731974375781,0,-84,0,0,0|Tile,c0bdf2,-1.9787164932467636,0,-96,0,0,0|Tile,ffbef4,-1.6733112770721121,0,-252,0,0,0.04|Tile,c0bdf2,0.017702618580807752,0,-264,0,0,0.04|Tile,ffbef4,1.6924408083503413,0,-276,0,0,0.04|Tile,c0bdf2,-1.5251169009592056,0,-298,0,0,0.04|Tile,ffbef4,-1.912751856809006,0,-324,0,0,0.04|Tile,ffbef4,0.317245337609418,0,-492,0,0,0|Tile,c0bdf2,1.8330430958312676,0,-504,0,0,0|Tile,ffbef4,1.6635494852571966,0,-516,0,0,0|Tile,c0bdf2,-1.8035766952976184,0,-552,0,0,0|Tile,ffbef4,-0.247146245490448,0,-564,0,0,0|AmiyaBar,ffffff,1.5365093226473336,0,-576,0,0,0|Tile,ffbef4,7.999980413101407,1.5,-132,0,0,0|Tile,c0bdf2,7.07314583600087,1.5,-144,0,0,0|Tile,ffbef4,5.159665926346718,1.5,-156,0,0,0|Tile,c0bdf2,4.0187852886102595,1.5,-168,0,0,0|Tile,c0bdf2,6.575806633330131,1.5,-192,0,0,0|Tile,ffbef4,7.922794983759114,1.5,-204,0,0,0|AmiyaBar,ffffff,7.5019744935433526,1.5,-216,0,0,0|Tile,ffbef4,5.700245580674095,1.5,-228,0,0,0|Tile,ffbef4,6.80807529064613,1.5,-372,0,0,0.04|Tile,c0bdf2,4.897146637516618,1.5,-384,0,0,0.04|Tile,ffbef4,4.000176279785466,1.5,-396,0,0,0.04|Tile,c0bdf2,4.9418346277599525,1.5,-408,0,0,0.04|Tile,c0bdf2,7.983557706886232,1.5,-432,0,0,0.04|Tile,ffbef4,7.287076266713999,1.5,-444,0,0,0.04|Tile,c0bdf2,5.407262842581229,1.5,-456,0,0,0.04|Tile,ffbef4,4.072409227431825,1.5,-468,0,0,0.04|Tile,ffbef4,4.659541648313251,1.5,-612,0,0,0|Tile,c0bdf2,4.026744815919029,1.5,-624,0,0,0|Tile,ffbef4,5.208149699636332,1.5,-636,0,0,0|Tile,c0bdf2,7.117578097703232,1.5,-648,0,0,0|Tile,c0bdf2,7.043102004173823,1.5,-672,0,0,0|Tile,ffbef4,5.12767048950435,1.5,-684,0,0,0|Tile,c0bdf2,4.014254703830925,1.5,-696,0,0,0|Tile,ffbef4,4.726523985721724,1.5,-708,0,0,0|Tile,c0bdf2,-7.973193476339988,-1,-120,0,0,0|Tile,ffbef4,-4.986732699485144,-1,-132,0,0,0|Tile,ffbef4,-3.697826692476052,-1,-156,0,0,0|Tile,c0bdf2,-6.58039570107137,-1,-168,0,0,0|AmiyaBar,ffffff,-8.585075124305089,-1,-192,0,0,0|Tile,ffbef4,-5.864092522275234,-1,-204,0,0,0|Tile,ffbef4,-3.1837633551029443,-1,-228,0,0,0|Tile,ffbef4,-2.851735281263341,-1,-362,0,0,-0.04|Tile,c0bdf2,-4.04875659972216,-1,-384,0,0,-0.04|Tile,c0bdf2,-9.074793510473839,-1,-408,0,0,-0.04|Tile,ffbef4,-8.282893945778369,-1,-420,0,0,-0.04|Tile,ffbef4,-3.06021971080697,-1,-444,0,0,-0.04|Tile,c0bdf2,-3.431147646567501,-1,-456,0,0,-0.04|Tile,c0bdf2,-2.8427270608197315,-1,-600,0,0,0|Tile,c0bdf2,-7.475599934427602,-1,-624,0,0,0|Tile,ffbef4,-9.15077350881819,-1,-636,0,0,0|Tile,ffbef4,-4.933864557855513,-1,-660,0,0,0|Tile,c0bdf2,-2.918788674745336,-1,-672,0,0,0|Tile,c0bdf2,-6.635332241738079,-1,-696,0,0,0|Tile,ffbef4,-8.949978676066673,-1,-708,0,0,0|Goal,00ff00,-8.949978676066673,3,-709,0,0,0|Player,ffffff,0,3,0,0,-0.6051864057360395,0"

const COLOUR_MAIN = new THREE.Color(0xc0bdf2);
const COLOUR_SECONDARY = new THREE.Color(0xffbef4);
const COLOUR_PILLAR = new THREE.Color(0xe0afff);
const COLOUR_GOAL = new THREE.Color(0x00ff00);

const COLOUR_BRAMBLE_MAIN = new THREE.Color(0x264e24);
const COLOUR_BRAMBLE_SECONDARY = new THREE.Color(0x65783e);
const TEXTURE_TILE_MAIN = new THREE.TextureLoader().load('../images/amiyaroad/TileMain.png');
TEXTURE_TILE_MAIN.wrapS = THREE.RepeatWrapping;
TEXTURE_TILE_MAIN.wrapT = THREE.RepeatWrapping;
TEXTURE_TILE_MAIN.repeat.set(2, 2);
const TEXTURE_GHOST_TILE = new THREE.TextureLoader().load('../images/amiyaroad/GhostTile.png');
TEXTURE_GHOST_TILE.wrapS = THREE.RepeatWrapping;
TEXTURE_GHOST_TILE.wrapT = THREE.RepeatWrapping;
TEXTURE_GHOST_TILE.repeat.set(2, 2);
const TEXTURE_TILE_SECONDARY = new THREE.TextureLoader().load('../images/amiyaroad/TileSecondary.png');
const TEXTURE_AMIYABAR = new THREE.TextureLoader().load('../images/amiyaroad/Amiyabars-logo.png');
const TEXTURE_BRAMBLE = new THREE.TextureLoader().load('../images/amiyaroad/Bramble.png');
const TEXTURE_BOOST = new THREE.TextureLoader().load('../images/amiyaroad/Boost.png');

const material = new THREE.MeshLambertMaterial();
const deathMaterial = new THREE.MeshPhongMaterial({ map: TEXTURE_BRAMBLE });

let pos;
let quad;
let scene;
let physicsWorld;
let rigidBodies;
let allBodies;
const margin = 0.05;
const TEXTURE_PLAYER = new THREE.TextureLoader().load('../images/amiyaroad/Amiya.png');
TEXTURE_PLAYER.wrapS = THREE.RepeatWrapping;
TEXTURE_PLAYER.wrapT = THREE.RepeatWrapping;
TEXTURE_PLAYER.repeat.set(1, 1);

const TILE_WIDTH = 6;
const TILE_HEIGHT = 4;
const TILE_DEPTH = 12;
const GOAL_WIDTH = 12;
const GOAL_HEIGHT = 12;
const GOAL_DEPTH = 4;
const playerRadius = 0.75;

const DEATH_MARGIN = 0.5;
let seed;
let levelString;

let ghostTile;


class MapGenerator {
    constructor(scene, physicsWorld) {
        this.scene = scene;
        this.physicsWorld = physicsWorld;
        this.pos = new THREE.Vector3();
        this.quat = new THREE.Quaternion();
        this.rigidBodies = [];
        this.allBodies = [];
    }
    generateLevelString() {
        return this.levelString.slice(0, -1);
    }
    loadMap(levelSelected) {
        this.levelString = mapData[levelSelected];
        this.loadMapFromLevelString(this.levelString);
    }
    loadMapFromLevelString(levelString) {
        let mapTiles = this.levelString.split("|");
        console.log(mapTiles.length);
        for (let i = 0; i < mapTiles.length; i++) {
            const tile = mapTiles[i].split(",");
            let tileType = tile[0];
            console.log(tileType);
            let materialHex = "#" + tile[1];
            this.pos.set(tile[2], tile[3], tile[4]);
            this.quat.setFromEuler(new THREE.Euler(tile[5], tile[6], tile[7], 'XYZ'));

            if (tileType.indexOf("Tile") >= 0) {
                let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_TILE_MAIN, shininess: 30, specular: 0xd4aae7 });
                this.createTileWithPhysics("Tile" + i, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, material);
            } else if (tileType == "AmiyaBar") {
                let material = new THREE.MeshPhongMaterial({ map: TEXTURE_AMIYABAR });
                this.createAmiyaBarWithPhysics(TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH / 2.0, 0, this.pos, this.quat, material);
            } else if (tileType == "Goal") {
                let material = new THREE.MeshPhongMaterial({ color: materialHex });
                this.createGoalWithPhysics(GOAL_WIDTH, GOAL_HEIGHT, GOAL_DEPTH, 0, this.pos, this.quat, material);
            }
        }
    }
    initMap(levelSelected, seed, levelString = "") {
        this.levelString = levelString;
        this.seed = seed;
        this.levelSelected = levelSelected;
        console.log(seed);
        console.log(levelString);
        Math.seedrandom(seed);
        this.pos = new THREE.Vector3();
        this.quat = new THREE.Quaternion();
        this.rigidBodies = [];
        this.allBodies = [];
        if (levelSelected == "?-?") {
            console.log("A");
            this.createMapRandomChaos();
        } else if (levelSelected == "*-*") {
            console.log("B");
            this.createMapBuilder();
        } else {
            console.log("C");
            this.loadMap(levelSelected);
        }


        return this.rigidBodies;

    }

    v3(x, y, z) {
        return new THREE.Vector3(x, y, z);
    }

    createPlayer() {
        this.pos.set(0, 3, 0);
        this.quat.setFromEuler(new THREE.Euler(0, -1.3, 0, 'XYZ'));
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
        object.body = this.createRigidBody(object, shape, 4, pos, quat, scene);
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
        //this.pos.set(this.pos.x, this.pos.y, this.pos.z +(TILE_DEPTH/2.0));
        //this.createDeathWithPhysics(TILE_WIDTH -DEATH_MARGIN, TILE_HEIGHT-DEATH_MARGIN, 0.1, 0, this.pos, this.quat, deathMaterial);
        return object;

    }
    createDeathWithPhysics(sx, sy, sz, mass, pos, quat, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
        shape.setMargin(margin);
        object.name = "Death";
        object.receiveShadow = true;
        object.castShadow = true;
        object.body = this.createRigidBody(object, shape, mass, pos, quat);

        return object;

    }
    createAmiyaBarWithPhysics(sx, sy, sz, mass, pos, quat, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
        shape.setMargin(margin);
        object.name = "AmiyaBar";
        object.receiveShadow = true;
        object.castShadow = true;
        object.body = this.createRigidBody(object, shape, mass, pos, quat);
        return object;

    }
    createGoalWithPhysics(sx, sy, sz, mass, pos, quat, material) {
        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
        shape.setMargin(margin);
        object.name = "Goal";
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
        let materialInfo = object.material.color.getHexString();
        var rotation = new THREE.Euler().setFromQuaternion(quat, "XYZ");
        if (object.name != "GhostTile") {
            this.levelString += object.name + "," + materialInfo + "," + pos.x + "," + pos.y + "," + pos.z + "," + rotation.x + "," + rotation.y + "," + rotation.z + "|";
        }
        this.scene.add(object);

        if (mass > 0) {
            if (object.name != "GhostTile") {
                this.rigidBodies.push(object);
            }

            // Disable deactivation
            body.setActivationState(4);

        }
        body.name = object.name;
        this.allBodies.push(body);
        if (object.name != "GhostTile") {
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
        for (let i = 0; i < this.allBodies.length; i++) {
            this.physicsWorld.removeRigidBody(this.allBodies[i]);
        }

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
                    this.createAmiyaBarWithPhysics(TILE_WIDTH, 5, TILE_DEPTH / 2.0, 0, this.pos, this.quat, material);
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
                    this.createAmiyaBarWithPhysics(TILE_WIDTH, 5, TILE_DEPTH / 2.0, 0, this.pos, this.quat, material);
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
                    this.createAmiyaBarWithPhysics(TILE_WIDTH, 5, TILE_DEPTH / 2.0, 0, this.pos, this.quat, material);
                } else {
                    let material = new THREE.MeshPhongMaterial({ color: colour });
                    this.createTileWithPhysics("Tile" + i, TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, material);
                }
            }
        }



        let material = new THREE.MeshPhongMaterial({ color: COLOUR_GOAL });
        this.createGoalWithPhysics(GOAL_WIDTH, GOAL_HEIGHT, GOAL_DEPTH, 0, lastPos, lastQuat, material);

    }

    createMapBuilder() {
        console.log("Map builder");
        this.pos.set(0, 0, 0);
        this.quat.set(0, 0, 0, 1);
        if (this.levelString != "") {
            this.loadMapFromLevelString(this.levelString);
        } else {
            let material = new THREE.MeshPhongMaterial({ color: COLOUR_MAIN, map: TEXTURE_TILE_MAIN, shininess: 30, specular: 0xd4aae7 });
            let firstTile = this.createTileWithPhysics("Tile0", TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, material);
            this.allBodies.push(firstTile);
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

        let newZ = playerPos.z + Math.round((direction.z * TILE_DEPTH) / TILE_DEPTH);
        this.pos.set(playerPos.x + direction.x * TILE_WIDTH, playerPos.y - playerRadius - (TILE_HEIGHT / 2.0) + direction.y * TILE_HEIGHT, newZ);
        this.quat.set(rotation.x, 0, rotation.z, 1);
        if (tileSelection > 0) {
            if (this.ghostTile != null) {
                this.ghostTile.position.x = this.pos.x;
                this.ghostTile.position.y = this.pos.y;
                this.ghostTile.position.z = this.pos.z;
                this.ghostTile.quaternion.x = this.quat.x;
                this.ghostTile.quaternion.y = this.quat.y;
                this.ghostTile.quaternion.z = this.quat.z;
            } else {
                let materialHex = this.createColour(this.allBodies.length);
                let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_GHOST_TILE, transparent: true, opacity: 0.75 });
                this.ghostTile = this.createTileWithPhysics("GhostTile", TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, material);
            }

        }

    }
    addTile(player, direction, tileSelection) {
        let playerPos = player.position;
        let rotation = player.quaternion;


        if (tileSelection == 1) {
            console.log("Add tile");
            let newZ = playerPos.z + Math.round((direction.z * TILE_DEPTH) / TILE_DEPTH);
            this.pos.set(playerPos.x + direction.x * TILE_WIDTH, playerPos.y - playerRadius - (TILE_HEIGHT / 2.0) + direction.y * TILE_HEIGHT, newZ);
            this.quat.set(rotation.x, 0, rotation.z, 1);

            //+1 for ghost tile
            let materialHex = this.createColour(this.allBodies.length + 1);

            let material = new THREE.MeshPhongMaterial({ color: materialHex, map: TEXTURE_TILE_MAIN, shininess: 30, specular: 0xd4aae7 });
            this.createTileWithPhysics("Tile0", TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, material);
        } else if (tileSelection == 2) {
            console.log("Add amiyabar");
            let newZ = playerPos.z + Math.round((direction.z * (TILE_DEPTH / 2.0)) / (TILE_DEPTH / 2.0));
            this.pos.set(playerPos.x + direction.x * TILE_WIDTH, playerPos.y - playerRadius - (TILE_HEIGHT / 2.0) + direction.y * TILE_HEIGHT, newZ);
            this.quat.set(rotation.x, 0, rotation.z, 1);

            let material = new THREE.MeshPhongMaterial({ map: TEXTURE_AMIYABAR });
            this.createAmiyaBarWithPhysics(TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH / 2.0, 0, this.pos, this.quat, material);
        } else if (tileSelection == 3) {
            console.log("Add goal");
            let newZ = playerPos.z + Math.round((direction.z * TILE_DEPTH) / TILE_DEPTH);
            this.pos.set(playerPos.x + direction.x * TILE_WIDTH, playerPos.y - playerRadius - (TILE_HEIGHT / 2.0) + direction.y * TILE_HEIGHT, newZ);
            this.quat.set(rotation.x, 0, rotation.z, 1);

            let material = new THREE.MeshPhongMaterial({ color: COLOUR_GOAL });
            this.createGoalWithPhysics(GOAL_WIDTH, GOAL_HEIGHT, GOAL_DEPTH, 0, this.pos, this.quart, material);
        }

    }


}

export { MapGenerator };
