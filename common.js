//変数宣言----------------------------------------
var gameStage;
var gameScrean;
var gameScreenScale;

var gameFrame;
var passCarCount;
var gameScore;
var tickListener;

var queue;
var loginCheckPromise;
var isSoundMute = false;

var playCharacter = "honoka";
//honoka or erichi
var player;
//キャラクターオブジェクトを格納する
var loopTween;
var car;

var imageObj = {};
var ssObj = {};
var soundObj = {};
var textObj = {};

//初期化----------------------------------------

var TWITTER_ICON_URL;
var screen_name;
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

// function Lane(num){
// 	this.number = num;
// }


//ゲームスクリーンサイズ初期化用-----------------------
function initGameScreenScale(){

	if(window.innerHeight/window.innerWidth < config.system.gamescrean.height　/　config.system.gamescrean.width){
		gameScreenScale = window.innerHeight/config.system.gamescrean.height;
	}else{
		gameScreenScale = window.innerWidth/config.system.gamescrean.width;
	}

	gameScrean.height = config.system.gamescrean.height * gameScreenScale;
	gameScrean.width = config.system.gamescrean.width * gameScreenScale;

}


// tweet文言----------------
function getTweetText(){
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
    return tweet_text;
}


// ランキング登録-------------
function setTwitterIconToImageObj(url){
    imageObj.TWITTER_ICON = new createjs.Bitmap(url);
    imageObj.TWITTER_ICON.x = gameScrean.width * properties.api.TWITTER_ICON.ratioX;
    imageObj.TWITTER_ICON.y = gameScrean.height * properties.api.TWITTER_ICON.ratioY;
    imageObj.TWITTER_ICON.regX = 0;
    imageObj.TWITTER_ICON.regY = 200;
    imageObj.TWITTER_ICON.scaleY = imageObj.TWITTER_ICON.scaleX = gameScreenScale * properties.api.TWITTER_ICON.scale;
    imageObj.TWITTER_ICON.alpha = properties.api.TWITTER_ICON.alpha;

}

// ランキング登録-------------
function registration(){

    $.ajax({
        type: "POST",
        url: config.api.origin + "/api/scores/honocar",
        xhrFields: {
            withCredentials: true
        },
        contentType: 'application/json',
        data: JSON.stringify({
            category: "",
            point: gameScore
        })
    }).done(function(data, status, xhr) {


        // Graphicsのインスタンスを作成します。
        var graphics = new createjs.Graphics();

        // 色の指定（線と塗りつぶしとそれぞれ色を指定する）
        graphics.beginStroke("#55acee");
        graphics.beginFill("#55acee");

        // 図形の描画を行う（ここのバリエーションを後述します）

        var height = textObj.TEXT_REGISTRATION.getMeasuredHeight();
        var width = textObj.TEXT_REGISTRATION.getMeasuredWidth();

        graphics
             .moveTo(0,0)
             .lineTo(width,0)
             .lineTo(width,height)
             .lineTo(0,height)
             .closePath();

        // Shapeとして、Stageに追加します。
        var shape = new createjs.Shape(graphics);
        alert(textObj.TEXT_REGISTRATION.regX)
        alert(textObj.TEXT_REGISTRATION.regY)
        alert(textObj.TEXT_REGISTRATION.x)
        alert(textObj.TEXT_REGISTRATION.y)
        shape.regX = textObj.TEXT_REGISTRATION.regX;
        shape.regY = textObj.TEXT_REGISTRATION.regY;

        shape.x = textObj.TEXT_REGISTRATION.x;
        shape.y = textObj.TEXT_REGISTRATION.y;

        gameStage.addChild(shape);
        gameStage.addChild(textObj.TEXT_REGISTRATION);
    });
}

// ログイン確認用-------------

function checkIsLogin(){

    $.ajax({
        type: "GET",
        url: config.api.origin + "/api/users/me",
        xhrFields: {
            withCredentials: true
        }
    });
}


// アイコン画像取得-------------

function getTwitterIconURL(){

    var url = "";


    $.when(
        $.ajax({
            type: "GET",
            url: config.api.origin + "/api/users/me",
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }).done(function(data, status, xhr) {
            if (xhr.status === 200) {

                url = data.profile_image_url.replace("_normal", "" );
            }
        })
    ).done(function(){
        return url;
    })
}

function addAllEventListener(){

    //イベントリスナー登録--------------------------------

    imageObj.BUTTON_RIGHT.addEventListener("mousedown", clickButtonRight);

    imageObj.BUTTON_LEFT.addEventListener("mousedown", clickButtonLeft);

    imageObj.BUTTON_START.addEventListener("mousedown", function() {
        createjs.Ticker.removeEventListener("tick", tickListener);
        soundObj.SOUND_ZENKAI.stop();
        soundObj.SOUND_OK.play("none",0,0,0,1,0);
        gameState();
    } );
    imageObj.BUTTON_HOW_TO.addEventListener("mousedown", function() {
        createjs.Ticker.removeEventListener("tick", tickListener);
        soundObj.SOUND_OK.play("none",0,0,0,1,0);
        howToPlayState();
    } );
    imageObj.BUTTON_RANKING.addEventListener("mousedown",function(){
        window.location.href = "http://games.sokontokoro-factory.net/ranking/?game_name=honocar"
    })

	imageObj.BUTTON_CREDIT.addEventListener("mousedown",function(){
        createjs.Ticker.removeEventListener("tick", tickListener);
        soundObj.SOUND_OK.play("none",0,0,0,1,0);
        creditState();		
	})

    imageObj.BUTTON_BACK_TOP.addEventListener( 'mousedown', function() {
        createjs.Ticker.removeEventListener("tick", tickListener);
        soundObj.SOUND_BACK.play("none",0,0,0,1,0);
        menuState();
    });

    imageObj.BUTTON_BACK_TOP_FROM_HOW_TO.addEventListener( 'mousedown', function() {
        createjs.Tween.removeTweens(player.img);
        soundObj.SOUND_BACK.play("none",0,0,0,1,0);
        createjs.Ticker.removeEventListener("tick", tickListener);
        menuState();

    } );

	imageObj.BUTTON_BACK_TOP_FROM_CREDIT.addEventListener( 'mousedown', function() {
        soundObj.SOUND_BACK.play("none",0,0,0,1,0);
        menuState();
    });

    imageObj.BUTTON_BACK_TOP_FROM_RANKING.addEventListener( 'mousedown', function() {
        soundObj.SOUND_BACK.play("none",0,0,0,1,0);
        $("#rankingName").hide();
        menuState();
    });

    imageObj.BUTTON_RESTART.addEventListener( 'mousedown', function() {
        createjs.Ticker.removeEventListener("tick", tickListener);
        soundObj.SOUND_BACK.play("none",0,0,0,1,0);
        gameState();
    });

    ssObj.BUTTON_SOUND_SS.addEventListener("mousedown", function(){
		soundObj.SOUND_TURN_SWITCH.play("none",0,0,0,1,0);
        if(isSoundMute){
            ssObj.BUTTON_SOUND_SS.gotoAndPlay("on");
            soundTurnOn();
        }else{
            ssObj.BUTTON_SOUND_SS.gotoAndPlay("off");
            soundTurnOff(); 
        }
    });

    imageObj.BUTTON_TWITTER_LOGIN.addEventListener("mousedown", function(){
        if(confirm("ログイン認証のためにTwitterページへ移動します。認証後ゲームページへ再アクセスします。")){
            window.location.href = config.api.origin + config.api.path.login + "?game_name=honocar";
        }
    });

    imageObj.BUTTON_TWITTER_LOGOUT.addEventListener("mousedown", function(){
        if(confirm("ログアウトします。ランキング登録はログイン中のみ有効です。")){
            window.location.href = config.api.origin + config.api.path.logout + "?game_name=honocar";
        }
    });

    imageObj.BUTTON_TWITTER_TOP.addEventListener("mousedown", function(){

        window.location.href=config.link.t28_twitter;
    });

    ssObj.BUTTON_TWITTER_GAMEOVER_SS.addEventListener("mousedown", function(){

        window.location.href="https://twitter.com/intent/tweet?hashtags=ほのCar!&text="+getTweetText()+"&url=http://games.sokontokoro-factory.net/honocar/";

    });
    ssObj.BUTTON_CHANGE_CHARA.addEventListener("mousedown", function(){
        soundObj.SOUND_OK.play("none",0,0,0,1,0);

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
    textObj.TEXT_LINK_1.addEventListener("mousedown", function(){
        window.location.href = config.link.soundeffect;
    });
    textObj.TEXT_LINK_2.addEventListener("mousedown", function(){
        window.location.href = config.link.on_jin;
    });
    textObj.TEXT_LINK_ME.addEventListener("mousedown", function(){
        window.location.href = config.link.sokontokoro;
    });
    textObj.TEXT_LINK_SAN.addEventListener("mousedown", function(){
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

