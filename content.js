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
    queue.loadManifest(manifest.image);
    queue.loadManifest(manifest.sound);
    if(isLogin){
        queue.loadManifest(apiManifest);
    }

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


var imageObj = {};
//ロードしたコンテンツをセット------------------------------------------
function setImageContent(){
    for(key in properties.image){
        imageObj.key = new createjs.Bitmap(queue.getResult(key.id));
        imageObj.key.x = gameScrean.width * key.ratioX;
        imageObj.key.y = gameScrean.height * key.ratioY;
        imageObj.key.regX = imageObj.key.image.width/2;
        imageObj.key.regY = imageObj.key.image.height/2;
        imageObj.key.scaleY = imageObj.key.scaleX = gameScreenScale * key.scale;
        imageObj.key.alpha = key.alpha;
    }
}
var ssObj = {};
function setSpriteSheetContents(){

    for(key in properties.ss){
        var spriteSheet = new createjs.SpriteSheet({
            images:[queue.getResult(key.id)],
            frames: key.frames,
            animations: key.animations
        });

        ssObj = new createjs.Sprite(spriteSheet, key.firstAnimation);
        ssObj.x = gameScrean.width*key.ratioX;
        ssObj.y = gameScrean.height*key.ratioY;
        ssObj.regX = key.frames.width/2;
        ssObj.regY = key.frames.height/2;
        ssObj.scaleY = ssObj.scaleX = gameScreenScale;
    }
}

function setImageContent_old(){

        //背景
        GAME_BACKGROUND = new createjs.Bitmap(queue.getResult("GAME_BACKGROUND"));
        setImageProperties(GAME_BACKGROUND, properties.image.GAME_BACKGROUND)

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

        if(isLogin){
            PROFILE_IMAGE = new createjs.Bitmap("PROFILE_IMAGE");
            setCoordinates(PROFILE_IMAGE, gameScrean.width*0.03, gameScrean.height*0.9);
            PROFILE_IMAGE.scaleY = PROFILE_IMAGE.scaleX = gameScreenScale * 1.6;
        }

}


function setImageProperties(target, properties){
    target.x = gameScrean.width * properties.ratioX;
    target.y = gameScrean.height * properties.ratioY;
    target.regX = target.image.width/2;
    target.regY = target.image.height/2;
    target.scaleY = tartget.scaleX = gameScreenScale * properties.scale;
    target.alpha = properties.alpha;
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




//apiコンテンツリスト------------------------------------------
var apiManifest = [
    {
        id : "PROFILE_IMAGE",
        src: profile_img_url
    }
];


