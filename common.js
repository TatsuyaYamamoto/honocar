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


var DIFFICULTY_LENGTH = 0.3;

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
var keybordEvent;

var isSoundMute;

var playCharacter = "honoka";//honoka or erichi
var player;//キャラクターオブジェクトを格納する

var car;

var frameCount;

var ctStatus = false;
var ctCount = 0;
var ctAnchor;



var isLogin = false;
//初期化----------------------------------------
//ゲームプレイヤーの操作座標(これいらんな)
//player = new setCoordinates();


//画像系--------------
//背景
var TITLE_LOGO;
var TITLE_LOGO_E;
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
var BUTTON_RANKING;
var BUTTON_CREDIT;
var BUTTON_BACK_TOP;
var BUTTON_BACK_TOP_FROM_CREDIT;
var BUTTON_BACK_TOP_FROM_HOW_TO;
var BUTTON_BACK_TOP_FROM_RANKING;
var BUTTON_RESTART;
var BUTTON_TURN_SWITCH;
var BUTTON_CHANGE_CHARA;

var BUTTON_LEFT;
var BUTTON_RIGHT;
var BUTTON_LEFT_HOW_TO;
var BUTTON_RIGHT_HOW_TO;

var BUTTON_TWITTER_TOP;
var BUTTON_TWITTER_GAMEOVER_SS;
var BUTTON_TWITTER_LOGIN;


//テキスト

var TEXT_HOW_TO;
var TEXT_GAME_COUNT;
var TEXT_START;

var TEXT_RANKING;

var TEXT_LINK_LOVELIVE;
var TEXT_LINK_ME;
var TEXT_LINK_SAN;
var TEXT_LINK_1;
var TEXT_LINK_2;

var text_how_to = "車道ど真ん中の穂乃果ちゃんを車が容赦なく襲う！\r \rなかなか始まらないススメ→トゥモロウを尻目に\r穂乃果ちゃんを助けてあげなくちゃ！\r \r \r \r \r \r \r \r \r \r \r \r \r \r \rLEFT, RIGHTボタン(キーボードの←→でも可！)\rで、かわせ！ホノカチャン！\r \r「私、やっぱりやる！やるったらやる！」"
var text_how_to_E = "車道ど真ん中の生徒会長を車が容赦なく襲う！\r \rなかなか始まらないススメ→トゥモロウを尻目に\rエリチカを助けてあげなくちゃ！\r \r \r \r \r \r \r \r \r \r \r \r \r \r \rLEFT, RIGHTボタン(キーボードの←→でも可！)\rで、かしこく！かわせ！エリーチカ！！(KKE)\r \r「生徒会の許可ぁ？認められないチカ！」"
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

// ログイン確認用-------------

function checkLogin(){

 var isLogin = false;

 $.ajax({
     type: "GET",
     url: "https://lit-taiga-3631.herokuapp.com/oauth/check",
     dataType: 'json',
     headers: {
         'Origin': 'http://localhost'
     },
     xhrFields: {
         withCredentials: true
     }
 }).done(function(data){
     isLogin = true;
 }).fail(function(){
     isLogin = false;
     alert(isLogin);
 });

 return isLogin;
}


function addAllEventListener(){
   //イベントリスナー登録--------------------------------

    BUTTON_RIGHT.addEventListener("mousedown", clickButtonRight);

    BUTTON_LEFT.addEventListener("mousedown", clickButtonLeft);

    BUTTON_START.addEventListener("mousedown", function() {
        createjs.Ticker.removeEventListener("tick", tickListener);
        SOUND_ZENKAI.stop();
        SOUND_OK.play("none",0,0,0,1,0);
        gameState();
    } );
    BUTTON_HOW_TO.addEventListener("mousedown", function() {
        createjs.Ticker.removeEventListener("tick", tickListener);
        SOUND_OK.play("none",0,0,0,1,0);
        howToPlayState();
    } );
    BUTTON_RANKING.addEventListener("mousedown",function(){
        createjs.Ticker.removeEventListener("tick", tickListener);
        SOUND_OK.play("none",0,0,0,1,0);
        rankingState();      
    })

	BUTTON_CREDIT.addEventListener("mousedown",function(){
        createjs.Ticker.removeEventListener("tick", tickListener);
        SOUND_OK.play("none",0,0,0,1,0);
        creditState();		
	})

    BUTTON_BACK_TOP.addEventListener( 'mousedown', function() {
        createjs.Ticker.removeEventListener("tick", tickListener);
        SOUND_BACK.play("none",0,0,0,1,0);
        menuState();
    });

    BUTTON_BACK_TOP_FROM_HOW_TO.addEventListener( 'mousedown', function() {
        SOUND_BACK.play("none",0,0,0,1,0);
        createjs.Ticker.removeEventListener("tick", tickListener);
        menuState();

    } );

	BUTTON_BACK_TOP_FROM_CREDIT.addEventListener( 'mousedown', function() {
        SOUND_BACK.play("none",0,0,0,1,0);
        menuState();
    });

    BUTTON_BACK_TOP_FROM_RANKING.addEventListener( 'mousedown', function() {
        SOUND_BACK.play("none",0,0,0,1,0);
        $("#rankingName").hide();
        menuState();
    });

    BUTTON_RESTART.addEventListener( 'mousedown', function() {
        createjs.Ticker.removeEventListener("tick", tickListener);
        SOUND_BACK.play("none",0,0,0,1,0);
        gameState();
    });

    BUTTON_TURN_SWITCH.addEventListener("mousedown", function(){
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

    BUTTON_TWITTER_LOGIN.addEventListener("mousedown", function(){
        window.location.href=config.api.login;
    });

    BUTTON_TWITTER_TOP.addEventListener("mousedown", function(){

        window.location.href=config.link.t28_twitter;
    });

    BUTTON_TWITTER_GAMEOVER.addEventListener("mousedown", function(){

        var tweet_text;
 
        switch(playCharacter){
            case "honoka":
                if(gameScore == 0){
                    tweet_text = "穂乃果「いやー、今日もパンがうまいっ！」海未「また運動もせずにそんなものを食べて！」";
                }else if(gameScore < 100){
                    tweet_text = "穂乃果「ことりちゃーん！穂乃果、"+gameScore+"台も車を避けたのに、海未ちゃんちっとも褒めてくれないよー！」";
                }else if(gameScore >= 100){
                    tweet_text = "海未「なにやっていたんですか！！どれだけ避けたと思っているんですか...」穂乃果「"+gameScore+"台！」";
                }
                break;
            case "erichi":
                if(gameScore == 0){
                    tweet_text = "(車なんて避けてないで)エリチカ、おうちにかえる!!!";
                }else if(gameScore < 100){
                    tweet_text = gameScore+"台よ...なんとか避けなくちゃいけないんだから、しょうがないじゃないチカ！";
                }else if(gameScore >= 100){
                    tweet_text = gameScore+"台！ハラショー！";
                }
                break;
        }       


        window.location.href="https://twitter.com/intent/tweet?hashtags=ほのCar!&text="+tweet_text+"&url=http://games.sokontokoro-factory.net/honocar/";

    });
    BUTTON_CHANGE_CHARA.addEventListener("mousedown", function(){
        SOUND_OK.play("none",0,0,0,1,0);

        switch(playCharacter){
            case "honoka":
                playCharacter = "erichi";
                break;
            case "erichi":
                playCharacter = "honoka";
                break;
        }

        createjs.Ticker.removeEventListener("tick", tickListener);
        topState();
    });
    TEXT_LINK_1.addEventListener("mousedown", function(){
        window.location.href = config.link.soundeffect;
    });
    TEXT_LINK_2.addEventListener("mousedown", function(){
        window.location.href = config.link.on_jin;
    });
    TEXT_LINK_ME.addEventListener("mousedown", function(){
        window.location.href = config.link.sokontokoro;
    });
    TEXT_LINK_SAN.addEventListener("mousedown", function(){
        window.location.href = config.link.sanzashi;
    });
    window.addEventListener("blur", function(){
        soundTurnOff();
        createjs.Ticker.setPaused(true);
    });
    window.addEventListener("focus", function(){      
        soundTurnOn();
        createjs.Ticker.setPaused(false);
    });
}

