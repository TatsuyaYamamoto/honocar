//変数宣言----------------------------------------
var gameStage;
var gameScrean;
var gameScreenScale;


var screanState;
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

var isLogin = false;
//初期化----------------------------------------
//ゲームプレイヤーの操作座標(これいらんな)
//player = new setCoordinates();



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

function Lane(num){
	this.number = num;
}


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


// ログイン確認用-------------

function checkLogin(){
    var d = new $.Deferred;
    isLogin = false;
    $.ajax({
        type: "GET",
        url: config.api.origin + config.api.path.check,
        dataType: 'json',
        headers: {
            'Origin': config.clientOrigin
        },
        xhrFields: {
            withCredentials: true
        }
    }).done(function(data, status, xhr) {
        if (data.errors !== undefined) {
            alert("you're not loging");
        }else{
            isLogin = true;
            screen_name = data.screen_name;
            manifest.api[0].src = data.profile_image_url.replace("_normal", "" );
        }
    }).always(function(){
        d.resolve();
    });
    return d.promise();
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
        createjs.Ticker.removeEventListener("tick", tickListener);
        soundObj.SOUND_OK.play("none",0,0,0,1,0);
        rankingState();      
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
            window.location.href = config.api.origin + config.api.path.login + "?game=honocar";
        }
    });

    imageObj.BUTTON_TWITTER_LOGOUT.addEventListener("mousedown", function(){
        if(confirm("ログアウトします。ランキング登録はログイン中のみ有効です。")){
            window.location.href = config.api.origin + config.api.path.logout;
        }
    });

    imageObj.BUTTON_TWITTER_TOP.addEventListener("mousedown", function(){

        window.location.href=config.link.t28_twitter;
    });

    ssObj.BUTTON_TWITTER_GAMEOVER_SS.addEventListener("mousedown", function(){

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


    // ランキング登録
    imageObj.BUTTON_REGISTRATION_RANKING.addEventListener("mousedown", function(){      

        // if(!isLogin){
        //     alert("ランキング登録はTwitterアカウントでの認証済みの方のみとなっています。");
        // }else{
            alert("ランキング登録します！");

            $.ajax({
                type: "POST",
                url: config.api.origin + config.api.path.registration_post,
                xhrFields: {
                    withCredentials: true
                },
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    game_name: "honocar",
                    category: "hogehoge",
                    user_id: 112233,
                    point: 123
                })
            }).done(function(data, status, xhr) {
                if (xhr.status === 200) {

                }
            });
        // }
    });
}

