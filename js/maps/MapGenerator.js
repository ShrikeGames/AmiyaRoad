import * as THREE from 'three';
import { ConvexGeometry } from '../jsm/geometries/ConvexGeometry.js';
let mapData = {};
mapData["1-1"] = "Tile,c0bdf2,0,0,0,0,0,0|Tile,ffbef4,-1.682941969615793,0,-12,0,0,0|Tile,c0bdf2,-1.8185948536513634,0,-24,0,0,0|Tile,ffbef4,-0.2822400161197344,0,-36,0,0,0|Tile,c0bdf2,1.5136049906158564,0,-48,0,0,0|Tile,ffbef4,1.917848549326277,0,-60,0.012499674481709789,0,0|Tile,c0bdf2,0.5588309963978517,0,-72,0,0,0|Tile,ffbef4,-1.3139731974375781,0,-84,0,0,0|Tile,c0bdf2,-1.9787164932467636,0,-96,0,0,0|Tile,ffbef4,-0.8242369704835132,0,-108,0,0,0|Tile,c0bdf2,1.0880422217787395,0,-120,0.024997395914712332,0,0|Tile,ffbef4,1.999980413101407,0,-132,0,0,0|Tile,c0bdf2,1.0731458360008699,0,-144,0,0,0|Tile,ffbef4,-0.8403340736532818,0,-156,0,0,0|Tile,c0bdf2,-1.9812147113897407,0,-168,0,0,0|Tile,ffbef4,-1.3005756803142337,0,-180,0.037491211555460265,0,0|Tile,c0bdf2,0.5758066333301306,0,-192,0,0,0|Tile,ffbef4,1.9227949837591136,0,-204,0,0,0|Tile,c0bdf2,1.5019744935433523,0,-216,0,0,0|Tile,ffbef4,-0.2997544193259047,0,-228,0,0,0|Tile,c0bdf2,-1.8258905014552553,0,-240,0.04997916927067833,0,0|Tile,ffbef4,-1.6733112770721121,0,-252,0,0,0|Tile,c0bdf2,0.017702618580807752,0,-264,0,0,0|Tile,ffbef4,1.6924408083503413,0,-276,0,0,0|Tile,c0bdf2,1.8111567240132476,0,-288,0,0,0|Tile,ffbef4,0.26470350019554606,0,-300,0.0624593178423802,0,0|Tile,c0bdf2,-1.5251169009592056,0,-312,0,0,0|Tile,ffbef4,-1.912751856809006,0,-324,0,0,0|Tile,c0bdf2,-0.5418115766157381,0,-336,0,0,0|Tile,ffbef4,1.327267768425935,0,-348,0,0,0|AmiyaBar,ffffff,1.9760632481857237,0,-360,0.07492970727274234,0,0|Tile,ffbef4,0.80807529064613,0,-372,0,0,0|Tile,c0bdf2,-1.1028533624833812,0,-384,0,0,0|Tile,ffbef4,-1.9998237202145344,0,-396,0,0,0|Tile,c0bdf2,-1.0581653722400477,0,-408,0,0,0|Tile,ffbef4,0.856365338992302,0,-420,0.0873883890887872,0,0|Tile,c0bdf2,1.9835577068862316,0,-432,0,0,0|Tile,ffbef4,1.287076266713999,0,-444,0,0,0|Tile,c0bdf2,-0.5927371574187706,0,-456,0,0,0|Tile,ffbef4,-1.9275907725681756,0,-468,0,0,0|Tile,c0bdf2,-1.4902263209586977,0,-480,0.09983341664682815,0,0|Tile,ffbef4,0.317245337609418,0,-492,0,0,0|Tile,c0bdf2,1.8330430958312676,0,-504,0,0,0|Tile,ffbef4,1.6635494852571966,0,-516,0,0,0|Tile,c0bdf2,-0.035403850210827155,0,-528,0,0,0|Tile,ffbef4,-1.7018070490682369,0,-540,0.11226284543662858,0,0|Tile,c0bdf2,-1.8035766952976184,0,-552,0,0,0|Tile,ffbef4,-0.247146245490448,0,-564,0,0,0|Tile,c0bdf2,1.5365093226473336,0,-576,0,0,0|Tile,ffbef4,1.9075053055189437,0,-588,0,0,0|Tile,c0bdf2,0.5247497074078575,0,-600,0.12467473338522769,0,0|Tile,ffbef4,-1.3404583516867494,0,-612,0,0,0|Tile,c0bdf2,-1.9732551840809707,0,-624,0,0,0|Tile,ffbef4,-0.7918503003636683,0,-636,0,0,0|Tile,c0bdf2,1.1175780977032326,0,-648,0,0,0|Tile,ffbef4,1.9995103467172397,0,-660,0.13706714116038543,0,0|Tile,c0bdf2,1.0431020041738237,0,-672,0,0,0|Tile,ffbef4,-0.8723295104956499,0,-684,0,0,0|Tile,c0bdf2,-1.9857452961690742,0,-696,0,0,0|Tile,ffbef4,-1.2734760142782757,0,-708,0,0,0|AmiyaBar,ffffff,0.6096212422044334,0,-720,0.14943813247359922,0,0|Tile,ffbef4,4.3170580303842065,1,-12,0,0,0.12467473338522769|Tile,c0bdf2,4.181405146348636,1,-24,0,0,0.12467473338522769|Tile,ffbef4,5.717759983880265,1,-36,0,0,0.12467473338522769|Tile,c0bdf2,7.513604990615857,1,-48,0,0,0.12467473338522769|Tile,c0bdf2,6.558830996397852,1,-72,0,0,0.12467473338522769|Tile,ffbef4,4.686026802562422,1,-84,0,0,0.12467473338522769|Tile,c0bdf2,4.021283506753236,1,-96,0,0,0.12467473338522769|Tile,ffbef4,5.175763029516487,1,-108,0,0,0.12467473338522769|Tile,ffbef4,7.999980413101407,1,-132,0,0,0.12467473338522769|Tile,c0bdf2,7.07314583600087,1,-144,0,0,0.12467473338522769|Tile,ffbef4,5.159665926346718,1,-156,0,0,0.12467473338522769|Tile,c0bdf2,4.0187852886102595,1,-168,0,0,0.12467473338522769|Tile,c0bdf2,6.575806633330131,1,-192,0,0,0.12467473338522769|Tile,ffbef4,7.922794983759114,1,-204,0,0,0.12467473338522769|Tile,c0bdf2,7.5019744935433526,1,-216,0,0,0.12467473338522769|Tile,ffbef4,5.700245580674095,1,-228,0,0,0.12467473338522769|Tile,ffbef4,4.326688722927888,1,-252,0,0,0.12467473338522769|Tile,c0bdf2,6.017702618580808,1,-264,0,0,0.12467473338522769|Tile,ffbef4,7.692440808350341,1,-276,0,0,0.12467473338522769|Tile,c0bdf2,7.811156724013248,1,-288,0,0,0.12467473338522769|Tile,c0bdf2,4.474883099040794,1,-312,0,0,0.12467473338522769|Tile,ffbef4,4.087248143190994,1,-324,0,0,0.12467473338522769|Tile,c0bdf2,5.458188423384262,1,-336,0,0,0.12467473338522769|Tile,ffbef4,7.327267768425935,1,-348,0,0,0.12467473338522769|Tile,ffbef4,6.80807529064613,1,-372,0,0,0.12467473338522769|Tile,c0bdf2,4.897146637516618,1,-384,0,0,0.12467473338522769|Tile,ffbef4,4.000176279785466,1,-396,0,0,0.12467473338522769|Tile,c0bdf2,4.9418346277599525,1,-408,0,0,0.12467473338522769|Tile,c0bdf2,7.983557706886232,1,-432,0,0,0.12467473338522769|Tile,ffbef4,7.287076266713999,1,-444,0,0,0.12467473338522769|Tile,c0bdf2,5.407262842581229,1,-456,0,0,0.12467473338522769|Tile,ffbef4,4.072409227431825,1,-468,0,0,0.12467473338522769|Tile,ffbef4,6.3172453376094175,1,-492,0,0,0.12467473338522769|Tile,c0bdf2,7.833043095831267,1,-504,0,0,0.12467473338522769|Tile,ffbef4,7.663549485257197,1,-516,0,0,0.12467473338522769|Tile,c0bdf2,5.964596149789172,1,-528,0,0,0.12467473338522769|Tile,c0bdf2,4.196423304702382,1,-552,0,0,0.12467473338522769|Tile,ffbef4,5.752853754509552,1,-564,0,0,0.12467473338522769|Tile,c0bdf2,7.536509322647333,1,-576,0,0,0.12467473338522769|Tile,ffbef4,7.907505305518944,1,-588,0,0,0.12467473338522769|Tile,ffbef4,4.659541648313251,1,-612,0,0,0.12467473338522769|Tile,c0bdf2,4.026744815919029,1,-624,0,0,0.12467473338522769|Tile,ffbef4,5.208149699636332,1,-636,0,0,0.12467473338522769|Tile,c0bdf2,7.117578097703232,1,-648,0,0,0.12467473338522769|Tile,c0bdf2,7.043102004173823,1,-672,0,0,0.12467473338522769|Tile,ffbef4,5.12767048950435,1,-684,0,0,0.12467473338522769|Tile,c0bdf2,4.014254703830925,1,-696,0,0,0.12467473338522769|Tile,ffbef4,4.726523985721724,1,-708,0,0,0.12467473338522769|Tile,ffbef4,-7.6829419696157935,1,-12,0,0,-0.12467473338522769|Tile,c0bdf2,-7.818594853651364,1,-24,0,0,-0.12467473338522769|Tile,ffbef4,-6.282240016119735,1,-36,0,0,-0.12467473338522769|Tile,c0bdf2,-4.486395009384143,1,-48,0,0,-0.12467473338522769|Tile,c0bdf2,-5.441169003602148,1,-72,0,0,-0.12467473338522769|Tile,ffbef4,-7.313973197437578,1,-84,0,0,-0.12467473338522769|Tile,c0bdf2,-7.978716493246764,1,-96,0,0,-0.12467473338522769|Tile,ffbef4,-6.824236970483513,1,-108,0,0,-0.12467473338522769|Tile,ffbef4,-4.000019586898593,1,-132,0,0,-0.12467473338522769|Tile,c0bdf2,-4.92685416399913,1,-144,0,0,-0.12467473338522769|Tile,ffbef4,-6.840334073653282,1,-156,0,0,-0.12467473338522769|Tile,c0bdf2,-7.9812147113897405,1,-168,0,0,-0.12467473338522769|Tile,c0bdf2,-5.424193366669869,1,-192,0,0,-0.12467473338522769|Tile,ffbef4,-4.077205016240886,1,-204,0,0,-0.12467473338522769|Tile,c0bdf2,-4.4980255064566474,1,-216,0,0,-0.12467473338522769|Tile,ffbef4,-6.299754419325905,1,-228,0,0,-0.12467473338522769|Tile,ffbef4,-7.673311277072112,1,-252,0,0,-0.12467473338522769|Tile,c0bdf2,-5.982297381419192,1,-264,0,0,-0.12467473338522769|Tile,ffbef4,-4.307559191649659,1,-276,0,0,-0.12467473338522769|Tile,c0bdf2,-4.188843275986752,1,-288,0,0,-0.12467473338522769|Tile,c0bdf2,-7.525116900959206,1,-312,0,0,-0.12467473338522769|Tile,ffbef4,-7.912751856809006,1,-324,0,0,-0.12467473338522769|Tile,c0bdf2,-6.541811576615738,1,-336,0,0,-0.12467473338522769|Tile,ffbef4,-4.672732231574065,1,-348,0,0,-0.12467473338522769|Tile,ffbef4,-5.19192470935387,1,-372,0,0,-0.12467473338522769|Tile,c0bdf2,-7.102853362483382,1,-384,0,0,-0.12467473338522769|Tile,ffbef4,-7.999823720214534,1,-396,0,0,-0.12467473338522769|Tile,c0bdf2,-7.0581653722400475,1,-408,0,0,-0.12467473338522769|Tile,c0bdf2,-4.016442293113768,1,-432,0,0,-0.12467473338522769|Tile,ffbef4,-4.712923733286001,1,-444,0,0,-0.12467473338522769|Tile,c0bdf2,-6.592737157418771,1,-456,0,0,-0.12467473338522769|Tile,ffbef4,-7.927590772568175,1,-468,0,0,-0.12467473338522769|Tile,ffbef4,-5.6827546623905825,1,-492,0,0,-0.12467473338522769|Tile,c0bdf2,-4.166956904168733,1,-504,0,0,-0.12467473338522769|Tile,ffbef4,-4.336450514742803,1,-516,0,0,-0.12467473338522769|Tile,c0bdf2,-6.035403850210828,1,-528,0,0,-0.12467473338522769|Tile,c0bdf2,-7.803576695297618,1,-552,0,0,-0.12467473338522769|Tile,ffbef4,-6.247146245490448,1,-564,0,0,-0.12467473338522769|Tile,c0bdf2,-4.463490677352667,1,-576,0,0,-0.12467473338522769|Tile,ffbef4,-4.092494694481056,1,-588,0,0,-0.12467473338522769|Tile,ffbef4,-7.340458351686749,1,-612,0,0,-0.12467473338522769|Tile,c0bdf2,-7.973255184080971,1,-624,0,0,-0.12467473338522769|Tile,ffbef4,-6.791850300363668,1,-636,0,0,-0.12467473338522769|Tile,c0bdf2,-4.882421902296768,1,-648,0,0,-0.12467473338522769|Tile,c0bdf2,-4.956897995826177,1,-672,0,0,-0.12467473338522769|Tile,ffbef4,-6.87232951049565,1,-684,0,0,-0.12467473338522769|Tile,c0bdf2,-7.985745296169075,1,-696,0,0,-0.12467473338522769|Tile,ffbef4,-7.273476014278276,1,-708,0,0,-0.12467473338522769|Goal,00ff00,0.6096212422044334,4,-721,0,0,0|Player,ffffff,0,3,0,0,-0.6051864057360395,0";
mapData["1-2"] = "Tile0,c0bdf2,0,0,0,0,0,0|Player,ffffff,0,3,0,0,0,0|Tile0,ffbef4,0,-0.08333349227905273,-12.166668891906738,0,0,0|Tile0,c0bdf2,-1.0579499787072982e-13,-0.08333301544189453,-24.166650772094727,0,0,0|Tile0,ffbef4,-2.682209014892578e-7,0.7500011920928955,-40.16667175292969,0,0,0|Tile0,c0bdf2,-2.682208730675484e-7,0.7500014305114746,-59.091793060302734,0,0,0|Tile0,ffbef4,-2.682208730675484e-7,0.7500019073486328,-82.33325958251953,0,0,0|Tile0,c0bdf2,-2.6822579002327984e-7,0.7500026226043701,-112.83279418945312,0,0,0|Tile0,ffbef4,6.6666646003723145,0.7500030994415283,-131.33261108398438,0,0,0|Tile0,c0bdf2,6.6666646003723145,0.7500033378601074,-143.49964904785156,0,0,0|Tile0,ffbef4,-6.499998569488525,0.758852481842041,-131.16650390625,0,0,0|Tile0,c0bdf2,-6.499998569488525,0.7588527202606201,-143.0001983642578,0,0,0|Tile0,ffbef4,0.16666652262210846,0.7588529586791992,-154.83389282226562,0,0,0|Tile0,c0bdf2,0.16666652262210846,0.7588531970977783,-166.66758728027344,0,0,0|Tile0,ffbef4,0.16666652262210846,2.4255189895629883,-179.0012969970703,0,0,0|Tile0,c0bdf2,0.16666652262210846,0.2588529586791992,-191.66835021972656,0,0,0|Tile0,ffbef4,0.16666652262210846,0.2588531970977783,-203.83538818359375,0,0,0|Tile0,c0bdf2,0.16666652262210846,2.5921859741210938,-216.3357696533203,0,0,0|Tile0,ffbef4,-2.682209014892578e-7,0.2588534355163574,-246.50335693359375,0,0,0|Tile0,c0bdf2,-2.682210720195144e-7,0.2588536739349365,-258.3369140625,0,0,0|Tile0,ffbef4,-2.682959632238635e-7,0.25885605812072754,-270.5028381347656,0,0,0|Tile0,c0bdf2,-2.683708544282126e-7,0.25885844230651855,-299.33441162109375,0,0,0|Tile0,ffbef4,-2.684456887891429e-7,0.25886082649230957,-322.1663513183594,0,0,0|Tile0,c0bdf2,3.833333730697632,0.2588632106781006,-347.33148193359375,0,0,0|Tile0,ffbef4,-2.1666667461395264,0.2588655948638916,-365.33038330078125,0,0,0|Tile0,c0bdf2,2.3333332538604736,0.2588679790496826,-388.99560546875,0,0,0|Tile0,ffbef4,0.5000000596046448,1.425537109375,-401.1615295410156,0,0,0|Tile0,c0bdf2,-1.833333134651184,2.4255385398864746,-414.4940490722656,0,0,0|Tile0,ffbef4,-1.833333134651184,2.4255409240722656,-426.32666015625,0,0,0|Tile0,c0bdf2,-4.5,2.4255433082580566,-444.8255310058594,0,0,0|Tile0,ffbef4,-0.7499617338180542,1.763676643371582,-460.14312744140625,0,0,0|Tile0,c0bdf2,4.58345365524292,2.602987289428711,-476.30889892578125,0,0,0|Tile0,ffbef4,4.38671350479126,3.051708221435547,-488.4539794921875,0,0,0|Tile0,c0bdf2,-0.31001824140548706,0.16707682609558105,-506.5986022949219,0,0,0|Goal,00ff00,-0.3143731653690338,0.42242932319641113,-517.4219360351562,0,0,0"
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
    initMap(levelSelected, seed) {
        this.levelString = "";
        this.seed = seed;
        this.levelSelected = levelSelected;
        console.log(seed);
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
        if (!quat.x || !quat.y || !quat.z) {
            quat = new THREE.Quaternion(0, 0, 0, 1);
        }
        if (object.name != "GhostTile") {
            this.levelString += object.name + "," + materialInfo + "," + pos.x + "," + pos.y + "," + pos.z + "," + quat.x + "," + quat.y + "," + quat.z + "|";
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

        let material = new THREE.MeshPhongMaterial({ color: COLOUR_MAIN, map: TEXTURE_TILE_MAIN, shininess: 30, specular: 0xd4aae7 });
        let firstTile = this.createTileWithPhysics("Tile0", TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH, 0, this.pos, this.quat, material);
        this.allBodies.push(firstTile);
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
