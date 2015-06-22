//定数----------------------------------------
var FPS = 30;
var GAMESCREAN_WIDTH = 640 ;
var GAMESCREAN_HEIGHT = 896;


var HONOKA_IMG_WIDTH = 186;
var HONOKA_IMG_HEIGHT = 266;

var CAR1_IMG_WIDTH = 135;
var CAR1_IMG_HEIGHT = 169;

var CAR_SPEED_FAST = 1600;
var CAR_SPEED_SLOW = 2000;


//変数宣言----------------------------------------
var gameStage;
var gameScrean;
var gameScreenScale;

var queue;
var loadStatusRatio = 0;
var contentsCount;


var screanState;
var gameFrame;
var gameTimeCount;
var passCarCount;
var gameScore;
var tickListener;

var isSoundMute;

var player;

var honoka;

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
var MENU_LOGO;
var GAMEOVER;
var GAME_BACKGROUND;
var WHITE_SHEET;

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
var BUTTON_START;
var BUTTON_HOW_TO;
var BUTTON_CREDIT;
var BUTTON_BACK_TOP;
var BUTTON_BACK_TOP_FROM_CREDIT;
var BUTTON_BACK_TOP_FROM_HOW_TO;
var BUTTON_RESTART;
var BUTTON_TURN_SWITCH;

var BUTTON_LEFT;
var BUTTON_RIGHT;
var BUTTON_LEFT_HOW_TO;
var BUTTON_RIGHT_HOW_TO;

var BUTTON_TWITTER_TOP;
var BUTTON_TWITTER_GAMEOVER;



//テキスト

var TEXT_HOW_TO;
var TEXT_GAME_COUNT;
var TEXT_START;

var TEXT_LINK_LOVELIVE;
var TEXT_LINK_ME;
var TEXT_LINK_SAN;
var TEXT_LINK_1;
var TEXT_LINK_2;

var text_how_to = "車道ど真ん中の穂乃果ちゃんを車が襲う！\rなかなか始まらないススメ→トゥモロウを尻目に\r左右のボタンで穂乃果ちゃんを操作して\r車から助けてあげよう！"
var text_game_count_L = "よけたー : "
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

    BUTTON_START.addEventListener("click", function() {
        SOUND_ZENKAI.stop();
        SOUND_OK.play("none",0,0,0,1,0);
        gameState();
    } );
    BUTTON_HOW_TO.addEventListener("click", function() {
        SOUND_OK.play("none",0,0,0,1,0);
        howToPlayState();
    } );

	BUTTON_CREDIT.addEventListener("click",function(){
        SOUND_OK.play("none",0,0,0,1,0);
        creditState();		
	})

    BUTTON_BACK_TOP.addEventListener( 'click', function() {
        createjs.Ticker.removeEventListener("tick", tickListener);
        SOUND_BACK.play("none",0,0,0,1,0);
        topState();
    });

    BUTTON_BACK_TOP_FROM_HOW_TO.addEventListener( 'click', function() {
        SOUND_BACK.play("none",0,0,0,1,0);
        createjs.Ticker.removeEventListener("tick", tickListener);
        menuState();

    } );

	BUTTON_BACK_TOP_FROM_CREDIT.addEventListener( 'click', function() {
        SOUND_BACK.play("none",0,0,0,1,0);
        menuState();
    });

    BUTTON_RESTART.addEventListener( 'click', function() {
        createjs.Ticker.removeEventListener("tick", tickListener);
        SOUND_BACK.play("none",0,0,0,1,0);
        gameState();
    });

    BUTTON_TURN_SWITCH.addEventListener("click", function(){
		SOUND_TURN_SWITCH.play("none",0,0,0,1,0);
        if(isSoundMute){
            // this.image = "aaa";
            BUTTON_TURN_SWITCH.gotoAndPlay("on");
            gameStage.update();
            soundTurnOn();
        }else{
            BUTTON_TURN_SWITCH.gotoAndPlay("off");
            gameStage.update();
            soundTurnOff();            
        }
    });

    BUTTON_TWITTER_TOP.addEventListener("click", function(){
        SOUND_TWEET.play("none",0,0,0,1,0);
        window.open().location.href="https://twitter.com/t28_tatsuya"
    });

    BUTTON_TWITTER_GAMEOVER.addEventListener("click", function(){
        SOUND_TWEET.play("none",0,0,0,1,0);
        window.open().location.href="https://twitter.com/intent/tweet?hashtags=ほのCar!&text=ことりちゃーん！穂乃果、"+gameScore+"台も車を避けたのに、海未ちゃんちっとも褒めてくれないよー！&url=http://tatsuyayamamoto.github.io/honocar/";
    });
    TEXT_LINK_1.addEventListener("click", function(){
        window.open().location.href="http://soundeffect-lab.info/";
    });
    TEXT_LINK_2.addEventListener("click", function(){
        window.open().location.href="http://on-jin.com/";
    });

}
