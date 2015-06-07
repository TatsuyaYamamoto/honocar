//定数----------------------------------------
var FPS = 1000 / 30;
var GAMESCREAN_WIDTH = 640 ;
var GAMESCREAN_HEIGHT = 896;


var HONOKA_IMG_WIDTH = 186;
var HONOKA_IMG_HEIGHT = 267;

var CAR1_IMG_WIDTH = 174;
var CAR1_IMG_HEIGHT = 103;

var CAR_SPEED = 10;

//変数宣言----------------------------------------
var gameStage;
var gameScrean;
var gameScreenScale;

var queue;
var loadStatusRatio = 0;

var screanState;
var gameTick
var gameFrame

var player;

var honoka;
var isHonokaEscape;

var car =[];

var frameCount;

var ctStatus = false;
var ctCount = 0;
var ctAnchor;

//初期化----------------------------------------
//ゲームプレイヤーの操作座標(これいらんな)
//player = new Position();


//画像系--------------
//背景
var TITLE_LOGO;
var GAMEOVER;
var GAME_BACKGROUND;


//音声系------------

var SOUND_OK;
var SOUND_BACK;
var SOUND_KAIHI;

//ボタン
var BUTTON_TMP_1;
var BUTTON_TMP_2;
var BUTTON_TMP_3;
var BUTTON_TMP_4;
var BUTTON_TMP_5;


//テキスト

var TEXT_HOW_TO;
var TEXT_GAME_TIME;


//座標管理用-----------------------
function position(target, x, y){
	target.x = x;
	target.y = y;
	target.regX = target.image.width/2;
	target.regY = target.image.height/2;
}

//ゲーム内レーン管理クラス---------------------------

function Lane(num){
	this.number = num;
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

