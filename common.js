//定数----------------------------------------
var FPS = 30;
var GAMESCREAN_WIDTH = 640 ;
var GAMESCREAN_HEIGHT = 896;


var HONOKA_IMG_WIDTH = 186;
var HONOKA_IMG_HEIGHT = 267;

var CAR1_IMG_WIDTH = 174;
var CAR1_IMG_HEIGHT = 103;

var CAR_SPEED_FAST = 1600;
var CAR_SPEED_SLOW = 2000;


//変数宣言----------------------------------------
var gameStage;
var gameScrean;
var gameScreenScale;

var queue;
var loadStatusRatio = 0;

var screanState;
var gameFrame;
var gameTimeCount;
var passCarCount;
var gameScore;

var player;

var playerTouchedX;

var honoka;
var isHonokaEscape;

var car;

var frameCount;

var ctStatus = false;
var ctCount = 0;
var ctAnchor;

//初期化----------------------------------------
//ゲームプレイヤーの操作座標(これいらんな)
//player = new setCoordinates();


//画像系--------------
//背景
var TITLE_LOGO;
var GAMEOVER;
var GAME_BACKGROUND;


//音声系------------

var SOUND_OK;
var SOUND_BACK;
var SOUND_KAIHI;
var SOUND_TWITTER;
var SOUND_CRASH;
var SOUND_PI1;
var SOUND_PI2;
var SOUND_SUSUME_LOOP;
var SOUND_SUSUME_END;
//ボタン
var BUTTON_TMP_1;
var BUTTON_TMP_2;
var BUTTON_TMP_3;
var BUTTON_TMP_4;
var BUTTON_TMP_5;
var BUTTON_TMP_6;

var BUTTON_TWITTER_TOP;
var BUTTON_TWITTER_GAMEOVER;



//テキスト

var TEXT_HOW_TO;
var TEXT_GAME_COUNT;


var text_how_to = "車道ど真ん中の穂乃果ちゃんを車が襲う！\rなかなか始まらないススメ→トゥモロウを尻目に\r左右のボタンで穂乃果ちゃんを操作して\r車から助けてあげよう！"
var text_game_count_L = "よけったー : "
var text_game_count_R = "台"

//座標管理用-----------------------

function setCoordinates(target, x, y){
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

function addAllEventListener(){
   //イベントリスナー登録--------------------------------

    BUTTON_RIGHT.addEventListener("click", clickButtonRight);

    BUTTON_LEFT.addEventListener("click", clickButtonLeft);

    BUTTON_TMP_1.addEventListener("click", function() {
        SOUND_ZENKAI.stop();
        SOUND_OK.play();
        gameState();
    } );
    BUTTON_TMP_2.addEventListener("click", function() {
        SOUND_OK.play();
        howToPlayState();
    } );

    BUTTON_TMP_3.addEventListener( 'click', function() {
        SOUND_BACK.play();
        topState();
    });

    BUTTON_TMP_4.addEventListener( 'click', function() {
        SOUND_BACK.play();
        gameTick.removeEventListener("tick", processHowToPlay);
        topState();
    } );

    BUTTON_TMP_5.addEventListener( 'click', function() {
        SOUND_BACK.play();
        gameState();
    });

    BUTTON_TMP_6.addEventListener("click", function(){
        if(createjs.Sound.muted){
            soundTurnOn();
        }else{
            soundTurnOff();            
        }
    });

    BUTTON_TWITTER_TOP.addEventListener("click", function(){
        SOUND_TWEET.play();
        window.open().location.href="https://twitter.com/t28_tatsuya"
    });

    BUTTON_TWITTER_GAMEOVER.addEventListener("click", function(){
        SOUND_TWEET.play();
        window.open().location.href="https://twitter.com/intent/tweet?hashtags=ほのCAR!&text=ことりちゃーん！穂乃果、"+gameScore+"台も車を避けたのに、海未ちゃんちっとも褒めてくれないよー！&url=http://tatsuyayamamoto.github.io/honocar/";
    });
}
