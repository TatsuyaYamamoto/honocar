function loadAnimation(){
    

    var q = new createjs.LoadQueue();
    q.setMaxConnections(6);

    q.loadManifest([
        {
            id : "LOAD_KOTORI",
            src: "img/LOAD_KOTORI.png"
        }
    ]);

    q.addEventListener("complete", function(){
        var bitmap = new createjs.Bitmap(q.getResult("LOAD_KOTORI"));
        bitmap.scaleY = bitmap.scaleX = gameScreenScale;
        setCoordinates(bitmap, gameScrean.width*0.5, gameScrean.height*0.5);
     
        createjs.Tween.get(bitmap, {loop:true})
            .to({rotation:360}, 1000);

        gameStage.removeAllChildren();
        gameStage.addChild(bitmap);

        tickListener = createjs.Ticker.addEventListener("tick", function(){
            gameStage.update();
        });
    });

}

function loadContent(){

    //ロードアニメーション
    loadAnimation();

    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.setMaxConnections(6);

    // //ロードするコンテンツ数を数える----------
    // contentsCount = 0;

    // for(var j in imageManifest){
    //     contentsCount　++;
    // }
    // for(var j in soundManifest){
    //     contentsCount　++;
    // }

    //ロードイベント登録------------------------------------------
    // 読み込みの進行状況が変化した
    queue.addEventListener("progress", handleProgress);
    // 1つのファイルを読み込み終わったら
    queue.addEventListener("fileload", handleFileLoadComplete);
    // 全てのファイルを読み込み終わったら
    queue.addEventListener("complete", handleComplete);


    //画像、音声マニフェストファイルを読み込む----------     
    queue.loadManifest(imageManifest);
    queue.loadManifest(soundManifest);


}



//ロードイベント------------------------------------------
function handleProgress(event) {
// 読み込み率を0.0~1.0で取得
    var progress = event.progress;
}
function handleFileLoadComplete(event) {
    // 読み込んだファイル
    // loadStatusRatio ++;
    // TEXT_LOADING_STATUS.text = "loading..."+ (loadStatusRatio/contentsCount)*100 + "%";
    // gameStage.update();
}
function handleComplete() {

    setImageContent();
    setSoundContent();
    setTextContent();

    createjs.Ticker.removeEventListener("tick", tickListener);

    addAllEventListener();
    topState();

}

//ロードしたコンテンツをセット------------------------------------------
function setImageContent(){

        //背景
        GAME_BACKGROUND = new createjs.Bitmap(queue.getResult("GAME_BACKGROUND"));
        GAME_BACKGROUND.scaleY = GAME_BACKGROUND.scaleX = gameScreenScale;

        //タイトルロゴ
        TITLE_LOGO = new createjs.Bitmap(queue.getResult("TITLE_LOGO"));
        setCoordinates(TITLE_LOGO, gameScrean.width*0.5, (gameScrean.height*0.5));
        TITLE_LOGO.scaleY = TITLE_LOGO.scaleX = gameScreenScale;

        //タイトルロゴ(エリチカバージョン)
        TITLE_LOGO_E = new createjs.Bitmap(queue.getResult("TITLE_LOGO_E"));
        setCoordinates(TITLE_LOGO_E, gameScrean.width*0.5, (gameScrean.height*0.5));
        TITLE_LOGO_E.scaleY = TITLE_LOGO_E.scaleX = gameScreenScale;

        //メニューロゴ
        MENU_LOGO = new createjs.Bitmap(queue.getResult("MENU_LOGO"));
        setCoordinates(MENU_LOGO, gameScrean.width*0.5, (gameScrean.height*0.25));
        MENU_LOGO.scaleY = MENU_LOGO.scaleX = gameScreenScale;

        //GAMEOVERロゴ
        GAMEOVER = new createjs.Bitmap(queue.getResult("GAMEOVER"));
        setCoordinates(GAMEOVER, gameScrean.width*0.5, gameScrean.height*0.35);
        GAMEOVER.scaleY = GAMEOVER.scaleX = gameScreenScale;

        //メニュー用ホワイトシート
        WHITE_SHEET = new createjs.Bitmap(queue.getResult("WHITE_SHEET"));
        WHITE_SHEET.scaleY = WHITE_SHEET.scaleX = gameScreenScale;

        //ボタン
        BUTTON_START = new createjs.Bitmap(queue.getResult("BUTTON_START"));
        setCoordinates(BUTTON_START, gameScrean.width*0.5, gameScrean.height*0.4);
        BUTTON_START.scaleY = BUTTON_START.scaleX = gameScreenScale*0.8;

        // ランキングボタン
        BUTTON_HOW_TO = new createjs.Bitmap(queue.getResult("BUTTON_HOW_TO"));
        setCoordinates(BUTTON_HOW_TO, gameScrean.width*0.5, gameScrean.height*0.54);
        BUTTON_HOW_TO.scaleY = BUTTON_HOW_TO.scaleX = gameScreenScale*0.8;

        BUTTON_RANKING = new createjs.Bitmap(queue.getResult("BUTTON_CREDIT"));
        setCoordinates(BUTTON_RANKING, gameScrean.width*0.5, gameScrean.height*0.68);
        BUTTON_RANKING.scaleY = BUTTON_RANKING.scaleX = gameScreenScale*0.8;


        BUTTON_CREDIT = new createjs.Bitmap(queue.getResult("BUTTON_CREDIT"));
        setCoordinates(BUTTON_CREDIT, gameScrean.width*0.5, gameScrean.height*0.82);
        BUTTON_CREDIT.scaleY = BUTTON_CREDIT.scaleX = gameScreenScale*0.8;

        BUTTON_BACK_TOP = new createjs.Bitmap(queue.getResult("BUTTON_BACK_MENU"));
        setCoordinates(BUTTON_BACK_TOP, gameScrean.width*0.7, (gameScrean.height*0.8));
        BUTTON_BACK_TOP.scaleY = BUTTON_BACK_TOP.scaleX = gameScreenScale;

        BUTTON_BACK_TOP_FROM_CREDIT = new createjs.Bitmap(queue.getResult("BUTTON_BACK_MENU"));
        setCoordinates(BUTTON_BACK_TOP_FROM_CREDIT, gameScrean.width*0.5, (gameScrean.height*0.9));
        BUTTON_BACK_TOP_FROM_CREDIT.scaleY = BUTTON_BACK_TOP_FROM_CREDIT.scaleX = gameScreenScale;

        BUTTON_BACK_TOP_FROM_HOW_TO = new createjs.Bitmap(queue.getResult("BUTTON_BACK_MENU"));
        setCoordinates(BUTTON_BACK_TOP_FROM_HOW_TO, gameScrean.width*0.5, (gameScrean.height*0.85));
        BUTTON_BACK_TOP_FROM_HOW_TO.scaleY = BUTTON_BACK_TOP_FROM_HOW_TO.scaleX = gameScreenScale;

        BUTTON_BACK_TOP_FROM_RANKING = new createjs.Bitmap(queue.getResult("BUTTON_BACK_MENU"));
        setCoordinates(BUTTON_BACK_TOP_FROM_RANKING, gameScrean.width*0.5, (gameScrean.height*0.85));
        BUTTON_BACK_TOP_FROM_RANKING.scaleY = BUTTON_BACK_TOP_FROM_RANKING.scaleX = gameScreenScale;


        BUTTON_RESTART = new createjs.Bitmap(queue.getResult("BUTTON_RESTART"));
        setCoordinates(BUTTON_RESTART, gameScrean.width*0.3, gameScrean.height*0.8);
        BUTTON_RESTART.scaleY = BUTTON_RESTART.scaleX = gameScreenScale;

        BUTTON_TWITTER_TOP = new createjs.Bitmap(queue.getResult("TWITTER_TOP"));
        setCoordinates(BUTTON_TWITTER_TOP, gameScrean.width*0.2, gameScrean.height*0.1);
        BUTTON_TWITTER_TOP.scaleY = BUTTON_TWITTER_TOP.scaleX = gameScreenScale;

        BUTTON_TWITTER_LOGIN = new createjs.Bitmap(queue.getResult("BUTTON_TWITTER_LOGIN"));
        setCoordinates(BUTTON_TWITTER_LOGIN, gameScrean.width*0.25, gameScrean.height*0.95);
        BUTTON_TWITTER_LOGIN.scaleY = BUTTON_TWITTER_LOGIN.scaleX = gameScreenScale*0.5;

        BUTTON_TWITTER_LOGOUT = new createjs.Bitmap(queue.getResult("BUTTON_TWITTER_LOGOUT"));
        setCoordinates(BUTTON_TWITTER_LOGOUT, gameScrean.width*0.75, gameScrean.height*0.95);
        BUTTON_TWITTER_LOGOUT.scaleY = BUTTON_TWITTER_LOGOUT.scaleX = gameScreenScale*0.5;



        BUTTON_LEFT = new createjs.Bitmap(queue.getResult("BUTTON_LEFT"));
        setCoordinates(BUTTON_LEFT, (gameScrean.width)*0.2, gameScrean.height*0.9);
        BUTTON_LEFT.scaleY = BUTTON_LEFT.scaleX = gameScreenScale;
        BUTTON_LEFT.alpha=0.5;

        BUTTON_RIGHT = new createjs.Bitmap(queue.getResult("BUTTON_RIGHT"));
        setCoordinates(BUTTON_RIGHT, (gameScrean.width)*0.8, gameScrean.height*0.9);
        BUTTON_RIGHT.scaleY = BUTTON_RIGHT.scaleX = gameScreenScale;
        BUTTON_RIGHT.alpha=0.5;

        BUTTON_LEFT_HOW_TO = new createjs.Bitmap(queue.getResult("BUTTON_LEFT"));
        setCoordinates(BUTTON_LEFT_HOW_TO, (gameScrean.width)*0.2, gameScrean.height*0.9);
        BUTTON_LEFT_HOW_TO.scaleY = BUTTON_LEFT_HOW_TO.scaleX = gameScreenScale;
        BUTTON_LEFT_HOW_TO.alpha=0.5;

        BUTTON_RIGHT_HOW_TO = new createjs.Bitmap(queue.getResult("BUTTON_RIGHT"));
        setCoordinates(BUTTON_RIGHT_HOW_TO, (gameScrean.width)*0.8, gameScrean.height*0.9);
        BUTTON_RIGHT_HOW_TO.scaleY = BUTTON_RIGHT_HOW_TO.scaleX = gameScreenScale;
        BUTTON_RIGHT_HOW_TO.alpha=0.5;


        var charaChangeSprite = new createjs.SpriteSheet({
            images:[queue.getResult("BUTTON_CHANGE_CHARA_SS")],
            frames:{
                width : 170,
                height : 242
            },
            animations: {
                honoka:{
                    frames: 0
                },
                erichi: {
                    frames: 1
                }
            }
        });


        BUTTON_CHANGE_CHARA = new createjs.Sprite(charaChangeSprite, "honoka");
        BUTTON_CHANGE_CHARA.x = gameScrean.width*0.99;
        BUTTON_CHANGE_CHARA.y = gameScrean.height*0.88;
        BUTTON_CHANGE_CHARA.regX = 178/2;
        BUTTON_CHANGE_CHARA.regY = 139/2;
        BUTTON_CHANGE_CHARA.scaleY = BUTTON_CHANGE_CHARA.scaleX = gameScreenScale;


        var tweetSprite = new createjs.SpriteSheet({
            images:[queue.getResult("TWITTER_GAMEOVER_SS")],
            frames:{
                width : 178,
                height : 139
            },
            animations: {
                honoka:{
                    frames: 0
                },
                erichi: {
                    frames: 1
                }
            }
        });

        BUTTON_TWITTER_GAMEOVER = new createjs.Sprite(tweetSprite, "honoka");
        BUTTON_TWITTER_GAMEOVER.x = gameScrean.width*0.25;
        BUTTON_TWITTER_GAMEOVER.y = gameScrean.height*0.15;
        BUTTON_TWITTER_GAMEOVER.regX = 178/2;
        BUTTON_TWITTER_GAMEOVER.regY = 139/2;
        BUTTON_TWITTER_GAMEOVER.scaleY = BUTTON_TWITTER_GAMEOVER.scaleX = gameScreenScale*1.3;

        var soundSprite = new createjs.SpriteSheet({
            images:[queue.getResult("BUTTON_SOUND_SS")],
            frames:{
                width : 126,
                height : 118
            },
            animations: {
                on:{
                    frames: [1,2,3],
                    next: true,
                    speed: 0.12
                },
                off: {
                    frames: 0
                }
            }
        });

        BUTTON_TURN_SWITCH = new createjs.Sprite(soundSprite, "on");
        BUTTON_TURN_SWITCH.x = gameScrean.width*0.9;
        BUTTON_TURN_SWITCH.y = gameScrean.height*0.12;
        BUTTON_TURN_SWITCH.regX = 177/2;
        BUTTON_TURN_SWITCH.regY = 139/2;
        BUTTON_TURN_SWITCH.scaleY = BUTTON_TURN_SWITCH.scaleX = gameScreenScale;

        if(isLogin){
            PROFILE_IMAGE = new createjs.Bitmap(profile_img_url);
            setCoordinates(PROFILE_IMAGE, gameScrean.width*0.03, gameScrean.height*0.9);
            PROFILE_IMAGE.scaleY = PROFILE_IMAGE.scaleX = gameScreenScale * 1.6;
        }


}
function setSoundContent(){

        SOUND_OK = createjs.Sound.createInstance("OK");
        SOUND_BACK = createjs.Sound.createInstance("BACK");        
        SOUND_KAIHI = createjs.Sound.createInstance("KAIHI");
        SOUND_CRASH = createjs.Sound.createInstance("CRASH");
        SOUND_PI1 = createjs.Sound.createInstance("PI1");
        SOUND_PI2 = createjs.Sound.createInstance("PI2");
        SOUND_SUSUME_LOOP = createjs.Sound.createInstance("SUSUME_LOOP");
        SOUND_SUSUME_END = createjs.Sound.createInstance("SUSUME_END");
        SOUND_ZENKAI = createjs.Sound.createInstance("ZENKAI");
        SOUND_TURN_SWITCH = createjs.Sound.createInstance("TURN_SWITCH");
}

function setTextProperties(target, x, y, size, family, align, height){
    target.x = x;
    target.y = y;
    target.font = size + "px " + family;
    target.textAlign = align;
    target.lineHeight = height;
}


function setTextContent(){


    TEXT_START = new createjs.Text();
    setTextProperties(TEXT_START, gameScrean.width*0.5, gameScrean.height*0.93, gameScrean.width*0.05, "Courier", "center", gameScrean.width*0.04);
    TEXT_START.text = "-Please tap on the display!-"


    TEXT_HOW_TO = new createjs.Text();
    setTextProperties(TEXT_HOW_TO, gameScrean.width*0.05, gameScrean.height*0.12, gameScrean.width*0.04, "Courier", "left", gameScrean.width*0.04);



    TEXT_GAME_COUNT = new createjs.Text();
    setTextProperties(TEXT_GAME_COUNT, gameScrean.width*0.5, gameScrean.height*0.05, gameScrean.width*0.06, "Impact", "left", gameScrean.width*0.04);


    TETX_GAMESTART_COUNT = new createjs.Text();
    setTextProperties(TETX_GAMESTART_COUNT, gameScrean.width*0.5, gameScrean.height*0.7, gameScrean.width*0.08, "Impact", "center", gameScrean.width*0.04);

    TEXT_RANKING = new createjs.Text();
    setTextProperties(TEXT_RANKING, gameScrean.width*0.5, gameScrean.height*0.15, gameScrean.width*0.05, "Arial", "center", gameScrean.width*0.07);
    TEXT_RANKING.text = "ランキング機能(仮画面)\rだよー";




    TEXT_LINK_ME = new createjs.Text();
    setTextProperties(TEXT_LINK_ME, gameScrean.width*0.5, gameScrean.height*0.15, gameScrean.width*0.05, "Arial", "center", gameScrean.width*0.07);
    TEXT_LINK_ME.text = "プログラム、音楽、思いつき：T28\rhttp://sokontokoro-factory.net";



    TEXT_LINK_SAN = new createjs.Text();
    setTextProperties(TEXT_LINK_SAN, gameScrean.width*0.5, gameScrean.height*0.3, gameScrean.width*0.05, "Verdana", "center", gameScrean.width*0.07);
    TEXT_LINK_SAN.text = "イラスト：さんざし\rhttps://twitter.com/xxsanzashixx";


    TEXT_LINK_1 = new createjs.Text();
    setTextProperties(TEXT_LINK_1, gameScrean.width*0.5, gameScrean.height*0.5, gameScrean.width*0.04, "Courier", "center", gameScrean.width*0.05);
    TEXT_LINK_1.text = "効果音：効果音ラボ 樣\rhttp://soundeffect-lab.info/";

    TEXT_LINK_2 = new createjs.Text();
    setTextProperties(TEXT_LINK_2, gameScrean.width*0.5, gameScrean.height*0.6, gameScrean.width*0.04, "Courier", "center", gameScrean.width*0.05);
    TEXT_LINK_2.text = "効果音：On-Jin ～音人～ 樣\rhttp://on-jin.com/";



    TEXT_LINK_LOVELIVE = new createjs.Text();
    setTextProperties(TEXT_LINK_LOVELIVE, gameScrean.width*0.5, gameScrean.height*0.7, gameScrean.width*0.04, "Courier", "center", gameScrean.width*0.05);
    TEXT_LINK_LOVELIVE.text = "プロジェクトラブライブ！\rhttp://www.lovelive-anime.jp";

}

function soundTurnOff(){
    isSoundMute = true;

    SOUND_OK.muted = true;
    SOUND_BACK.muted = true;
    SOUND_KAIHI.muted = true;
    SOUND_CRASH.muted = true;
    SOUND_PI1.muted = true;
    SOUND_PI2.muted = true;
    SOUND_SUSUME_LOOP.muted = true;
    SOUND_SUSUME_END.muted = true;
    SOUND_ZENKAI.muted = true;
}

function soundTurnOn(){
    isSoundMute = false;

    SOUND_OK.muted = false;
    SOUND_BACK.muted = false;
    SOUND_KAIHI.muted = false;
    SOUND_CRASH.muted = false;
    SOUND_PI1.muted = false;
    SOUND_PI2.muted = false;
    SOUND_SUSUME_LOOP.muted = false;
    SOUND_SUSUME_END.muted = false;
    SOUND_ZENKAI.muted = false;

}
//画像リスト------------------------------------------

var imageManifest = [
    {
        id : "BUTTON_START",
        src: "img/BUTTON_START.png"
    },
    {
        id : "BUTTON_RESTART",
        src: "img/BUTTON_RESTART.png"
    },
    {
        id : "BUTTON_HOW_TO",
        src: "img/BUTTON_HOW_TO.png"
    },
    {
        id : "BUTTON_CREDIT",
        src: "img/BUTTON_CREDIT.png"
    },
    {
        id : "BUTTON_BACK_MENU",
        src: "img/BUTTON_BACK_MENU.png"
    },
    {
        id : "GAME_BACKGROUND",
        src: "img/GAME_BACKGROUND.png"
    },
    {
        id : "TITLE_LOGO",
        src: "img/TITLE_LOGO.png"
    },
    {
        id : "TITLE_LOGO_E",
        src: "img/TITLE_LOGO_E.png"
    },
    {
        id : "MENU_LOGO",
        src: "img/MENU_LOGO.png"
    },
    {
        id : "GAMEOVER",
        src: "img/GAMEOVER.png"
    },
    {
        id : "BUTTON_LEFT",
        src: "img/BUTTON_LEFT.png"
    },
    {
        id : "BUTTON_RIGHT",
        src: "img/BUTTON_RIGHT.png"
    },
    {
        id : "BUTTON_SOUND_SS",
        src: "img/BUTTON_SOUND_SS.png"
    },
    {
        id : "HONOKA_SS",
        src: "img/HONOKA_SS.png"
    },
    {
        id : "ERICHI_SS",
        src: "img/ERICHI_SS.png"
    },
    {
        id : "CAR1_FRONT",
        src: "img/CAR1_FRONT.png"
    },
    {
        id : "CAR1_BACK",
        src: "img/CAR1_BACK.png"
    },
    {
        id : "TWITTER_TOP",
        src: "img/TWITTER_TOP.png"
    },
    {
        id : "TWITTER_GAMEOVER_SS",
        src: "img/TWITTER_GAMEOVER_SS.png"
    },
    {
        id : "BUTTON_TWITTER_LOGIN",
        src: "img/BUTTON_TWITTER_LOGIN.png"
    },
    {
        id : "BUTTON_TWITTER_LOGOUT",
        src: "img/BUTTON_TWITTER_LOGOUT.png"
    },
    {
        id : "WHITE_SHEET",
        src: "img/WHITE_SHEET.png"
    },
    {
        id : "BUTTON_CHANGE_CHARA_SS",
        src: "img/BUTTON_CHANGE_CHARA_SS.png"
    }
];
//音声リスト------------------------------------------
var soundManifest = [
    {
        id : "OK",
        src: "sound/OK.mp3"
    },
    {
        id : "BACK",
        src: "sound/BACK.mp3"
    },
    {
        id : "KAIHI",
        src: "sound/moto_KAIHI.mp3"
    },
    {
        id : "CRASH",
        src: "sound/CRASH.mp3"
    },
    {
        id : "PI1",
        src: "sound/PI1.mp3"
    },
    {
        id : "PI2",
        src: "sound/PI2.mp3"
    },
    {
        id : "SUSUME_LOOP",
        src: "sound/SUSUME_LOOP.mp3"
    },
    {
        id : "SUSUME_END",
        src: "sound/SUSUME_END.mp3"
    },
    {
        id : "ZENKAI",
        src: "sound/ZENKAI.mp3"
    },
    {
        id : "TURN_SWITCH",
        src: "sound/TURN_SWITCH.mp3"
    }
];

