//定数----------------------------------------
var FPS = 1000 / 30;
var GAMESCREAN_WIDTH = 640 ;
var GAMESCREAN_HEIGHT = 896;

var CAR_SPEED = 10;

//変数宣言----------------------------------------
var gameStage;
var gameScrean;
var gameScreenScale;
var fc;


var queue;
var loadStatusRatio = 0;

var screanState;

var player;

var honoka;
var honokaSpriteSheet;
var isHonokaEscape;

var car =[];

var frameCount;

var ctStatus = false;
var ctCount = 0;
var ctAnchor;

//初期化----------------------------------------
//ゲームプレイヤーの操作座標(これいらんな)
//player = new Position();


//画像系プリロード
//TOP用
var TOP_BACKGROUND;

var GAME_BACKGROUND;

//ほのか画像
var HONOKA_IMG;
var HONOKA_KIHON;
var HONOKA_KAIHI1_1;
var HONOKA_KAIHI1_2;

//車
var CAR_IMG;
var CAR1;



//音声系プリロード

var SOUND_OK;
var SOUND_BACK;
var SOUND_KAIHI;

//ボタン
var BUTTON_TMP_1;

var BUTTON_TMP_2;

var BUTTON_TMP_3;



//テキスト

var TEXT_HOW_TO;

//座標管理用-----------------------
function position(target, x, y){
	target.x = x;
	target.y = y;
	target.regX = target.image.width/2;
	target.regY = target.image.height/2;
}

//ゲームスクリーンサイズ初期化用-----------------------
function initGameScreenScale(){

	if(window.innerHeight/window.innerWidth < GAMESCREAN_HEIGHT/GAMESCREAN_WIDTH){
		gameScreenScale = window.innerHeight/GAMESCREAN_HEIGHT;
	}else{
		gameScreenScale = window.innerWidth/GAMESCREAN_WIDTH;
	}

	gameScrean.height = GAMESCREAN_HEIGHT*gameScreenScale;
	gameScrean.width = GAMESCREAN_WIDTH*gameScreenScale;
}
