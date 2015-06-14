function loadContent(){

    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.setMaxConnections(6);

    //画像------------------------------------------
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
            id : "BUTTON_BACK_TOP_FROM_HOW_TO",
            src: "img/BUTTON_BACK_TOP_FROM_HOW_TO.png"
        },
        {
            id : "BUTTON_BACK_TOP",
            src: "img/BUTTON_BACK_TOP.png"
        },
        {
            id : "BUTTON_TURN_SWITCH",
            src: "img/BUTTON_TURN_SWITCH.png"
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
            id : "HONOKA_SS",
            src: "img/HONOKA_SS.png"
        },
        {
            id : "CAR1",
            src: "img/CAR1.png"
        },
        {
            id : "CHUN",
            src: "img/CHUN.png"
        },
        {
            id : "TWITTER_TOP",
            src: "img/TWITTER_TOP.png"
        },
        {
            id : "TWITTER_GAMEOVER",
            src: "img/TWITTER_GAMEOVER.png"
        }
    ];
    //音声------------------------------------------
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
            id : "DOWN",
            src: "sound/DOWN.mp3"
        },
        {
            id : "TWEET",
            src: "sound/TWEET.mp3"
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

    queue.loadManifest(imageManifest);
    queue.loadManifest(soundManifest);

    //ロードイベント------------------------------------------
    // 読み込みの進行状況が変化した
    queue.addEventListener("progress", handleProgress);
    // 1つのファイルを読み込み終わったら
    queue.addEventListener("fileload", handleFileLoadComplete);
    // 全てのファイルを読み込み終わったら
    queue.addEventListener("complete", handleComplete);


    function handleProgress(event) {
    // 読み込み率を0.0~1.0で取得
        var progress = event.progress;
    }
    function handleFileLoadComplete(event) {
        // 読み込んだファイル
        var result = event.result;
        loadStatusRatio ++;
        TEXT_LOADING_STATUS.text = "loading..."+ loadStatusRatio + "files";
        gameStage.update();
    }
    function handleComplete() {
        setImageContent();
        setSoundContent();
        setTextContent();
        addAllEventListener();
        topState();
    }
}
//ロードしたコンテンツをセット------------------------------------------
function setImageContent(){

        //背景
        GAME_BACKGROUND = new createjs.Bitmap(queue.getResult("GAME_BACKGROUND"));
        GAME_BACKGROUND.scaleY = GAME_BACKGROUND.scaleX = gameScreenScale;

        //タイトルロゴ
        TITLE_LOGO = new createjs.Bitmap(queue.getResult("TITLE_LOGO"));
        setCoordinates(TITLE_LOGO, gameScrean.width*0.5, (gameScrean.height*0.4));
        TITLE_LOGO.scaleY = TITLE_LOGO.scaleX = gameScreenScale;

        //GAMEOVERロゴ
        GAMEOVER = new createjs.Bitmap(queue.getResult("GAMEOVER"));
        setCoordinates(GAMEOVER, gameScrean.width*0.5, gameScrean.height*0.3);
        GAMEOVER.scaleY = GAMEOVER.scaleX = gameScreenScale;


        //ボタン
        BUTTON_START = new createjs.Bitmap(queue.getResult("BUTTON_START"));
        setCoordinates(BUTTON_START, gameScrean.width*0.5, gameScrean.height*0.6);
        BUTTON_START.scaleY = BUTTON_START.scaleX = gameScreenScale;

        BUTTON_HOW_TO = new createjs.Bitmap(queue.getResult("BUTTON_HOW_TO"));
        setCoordinates(BUTTON_HOW_TO, gameScrean.width*0.5, gameScrean.height*0.75);
        BUTTON_HOW_TO.scaleY = BUTTON_HOW_TO.scaleX = gameScreenScale;

        BUTTON_CREDIT = new createjs.Bitmap(queue.getResult("BUTTON_CREDIT"));
        setCoordinates(BUTTON_CREDIT, gameScrean.width*0.5, gameScrean.height*0.9);
        BUTTON_CREDIT.scaleY = BUTTON_CREDIT.scaleX = gameScreenScale;

        BUTTON_BACK_TOP = new createjs.Bitmap(queue.getResult("BUTTON_BACK_TOP"));
        setCoordinates(BUTTON_BACK_TOP, gameScrean.width*0.3, (gameScrean.height*0.8));
        BUTTON_BACK_TOP.scaleY = BUTTON_BACK_TOP.scaleX = gameScreenScale;

        BUTTON_BACK_TOP_FROM_HOW_TO = new createjs.Bitmap(queue.getResult("BUTTON_BACK_TOP_FROM_HOW_TO"));
        setCoordinates(BUTTON_BACK_TOP_FROM_HOW_TO, gameScrean.width*0.2, (gameScrean.height*0.1));
        BUTTON_BACK_TOP_FROM_HOW_TO.scaleY = BUTTON_BACK_TOP_FROM_HOW_TO.scaleX = gameScreenScale;

        BUTTON_RESTART = new createjs.Bitmap(queue.getResult("BUTTON_RESTART"));
        setCoordinates(BUTTON_RESTART, gameScrean.width*0.7, (gameScrean.height*0.8));
        BUTTON_RESTART.scaleY = BUTTON_RESTART.scaleX = gameScreenScale;

        BUTTON_TURN_SWITCH = new createjs.Bitmap(queue.getResult("BUTTON_TURN_SWITCH"));
        setCoordinates(BUTTON_TURN_SWITCH, gameScrean.width*0.9, gameScrean.height*0.1);
        BUTTON_TURN_SWITCH.scaleY = BUTTON_TURN_SWITCH.scaleX = gameScreenScale;


        BUTTON_TWITTER_TOP = new createjs.Bitmap(queue.getResult("TWITTER_TOP"));
        setCoordinates(BUTTON_TWITTER_TOP, gameScrean.width*0.1, gameScrean.height*0.1);
        BUTTON_TWITTER_TOP.scaleY = BUTTON_TWITTER_TOP.scaleX = gameScreenScale;


        BUTTON_TWITTER_GAMEOVER = new createjs.Bitmap(queue.getResult("TWITTER_GAMEOVER"));
        setCoordinates(BUTTON_TWITTER_GAMEOVER, gameScrean.width*0.1, gameScrean.height*0.1);
        BUTTON_TWITTER_GAMEOVER.scaleY = BUTTON_TWITTER_GAMEOVER.scaleX = gameScreenScale;


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


}
function setSoundContent(){

        SOUND_OK = createjs.Sound.createInstance("OK");
        SOUND_BACK = createjs.Sound.createInstance("BACK");        
        SOUND_KAIHI = createjs.Sound.createInstance("KAIHI");
        SOUND_CRASH = createjs.Sound.createInstance("CRASH");
        SOUND_DOWN = createjs.Sound.createInstance("DOWN");
        SOUND_TWEET = createjs.Sound.createInstance("TWEET");
        SOUND_PI1 = createjs.Sound.createInstance("PI1");
        SOUND_PI2 = createjs.Sound.createInstance("PI2");
        SOUND_SUSUME_LOOP = createjs.Sound.createInstance("SUSUME_LOOP");
        SOUND_SUSUME_END = createjs.Sound.createInstance("SUSUME_END");
        SOUND_ZENKAI = createjs.Sound.createInstance("ZENKAI");
        SOUND_TURN_SWITCH = createjs.Sound.createInstance("TURN_SWITCH");
}


function setTextContent(){
    TEXT_HOW_TO = new createjs.Text("", gameScrean.width*0.04+"20px Impact", "");
    TEXT_HOW_TO.x = gameScrean.width*0.05;
    TEXT_HOW_TO.y = gameScrean.height*0.6;
    TEXT_HOW_TO.textAlign = "left";
    TEXT_HOW_TO.text = text_how_to;

    TEXT_GAME_COUNT = new createjs.Text("",gameScrean.width*0.06+"1000px Impact", "");
    TEXT_GAME_COUNT.x = gameScrean.width*0.5;
    TEXT_GAME_COUNT.y = gameScrean.height*0.05;
    TEXT_GAME_COUNT.textAlign = "left";

    TETX_GAMESTART_COUNT = new createjs.Text("", gameScrean.width*0.08+"100px Impact", "");
    TETX_GAMESTART_COUNT.x = gameScrean.width*0.5;
    TETX_GAMESTART_COUNT.y = gameScrean.height*0.7;
    TETX_GAMESTART_COUNT.textAlign = "center";

    TEXT_LINK_1 = new createjs.Text("","20px Impact", "");
    TEXT_LINK_1.x = gameScrean.width*0.5;
    TEXT_LINK_1.y = gameScrean.height*0.5;
    TEXT_LINK_1.textAlign = "center";
    TEXT_LINK_1.text = "効果音ラボ 樣\rhttp://soundeffect-lab.info/";

    TEXT_LINK_2 = new createjs.Text("","20px Impact", "");
    TEXT_LINK_2.x = gameScrean.width*0.5;
    TEXT_LINK_2.y = gameScrean.height*0.7;
    TEXT_LINK_2.textAlign = "center";
    TEXT_LINK_2.text = "On-Jin ～音人～ 樣\rhttp://on-jin.com/";


}

function soundTurnOff(){
    isSoundMute = true;

    SOUND_OK.muted = true;
    SOUND_BACK.muted = true;
    SOUND_KAIHI.muted = true;
    SOUND_CRASH.muted = true;
    SOUND_DOWN.muted = true;
    SOUND_TWEET.muted = true;
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
    SOUND_DOWN.muted = false;
    SOUND_TWEET.muted = false;
    SOUND_PI1.muted = false;
    SOUND_PI2.muted = false;
    SOUND_SUSUME_LOOP.muted = false;
    SOUND_SUSUME_END.muted = false;
    SOUND_ZENKAI.muted = false;

}
