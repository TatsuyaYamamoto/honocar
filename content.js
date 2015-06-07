function loadContent(){

    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.setMaxConnections(6);

    //画像------------------------------------------
    var imageManifest = [
        {
            id : "BUTTON_TMP",
            src: "img/BUTTON_TMP.png"
        },
        {
            id : "BUTTON_TMP2",
            src: "img/BUTTON_TMP2.png"
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
            id : "TWITTER",
            src: "img/TWITTER.png"
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
        position(TITLE_LOGO, gameScrean.width/2, (gameScrean.height/5));
        TITLE_LOGO.scaleY = TITLE_LOGO.scaleX = gameScreenScale;

        //GAMEOVERロゴ
        GAMEOVER = new createjs.Bitmap(queue.getResult("GAMEOVER"));
        position(GAMEOVER, gameScrean.width*0.5, gameScrean.height*0.3);
        GAMEOVER.scaleY = GAMEOVER.scaleX = gameScreenScale;


        //ボタン
        BUTTON_TMP_1 = new createjs.Bitmap(queue.getResult("BUTTON_TMP"));
        position(BUTTON_TMP_1, gameScrean.width/2, (gameScrean.height/2));
        BUTTON_TMP_1.scaleY = BUTTON_TMP_1.scaleX = gameScreenScale;

        BUTTON_TMP_2 = new createjs.Bitmap(queue.getResult("BUTTON_TMP"));
        position(BUTTON_TMP_2, gameScrean.width/2, (gameScrean.height/1.5));
        BUTTON_TMP_2.scaleY = BUTTON_TMP_2.scaleX = gameScreenScale;

        BUTTON_TMP_3 = new createjs.Bitmap(queue.getResult("BUTTON_TMP2"));
        position(BUTTON_TMP_3, gameScrean.width*0.3, (gameScrean.height*0.8));
        BUTTON_TMP_3.scaleY = BUTTON_TMP_3.scaleX = gameScreenScale;

        BUTTON_TMP_4 = new createjs.Bitmap(queue.getResult("BUTTON_TMP2"));
        position(BUTTON_TMP_4, gameScrean.width*0.2, (gameScrean.height*0.1));
        BUTTON_TMP_4.scaleY = BUTTON_TMP_4.scaleX = gameScreenScale;

        BUTTON_TMP_5 = new createjs.Bitmap(queue.getResult("BUTTON_TMP2"));
        position(BUTTON_TMP_5, gameScrean.width*0.7, (gameScrean.height*0.8));
        BUTTON_TMP_5.scaleY = BUTTON_TMP_5.scaleX = gameScreenScale;

        BUTTON_TWITTER = new createjs.Bitmap(queue.getResult("TWITTER"));
        position(BUTTON_TWITTER, gameScrean.width*0.1, (gameScrean.height*0.1));
        BUTTON_TWITTER.scaleY = BUTTON_TWITTER.scaleX = gameScreenScale;

        BUTTON_LEFT = new createjs.Bitmap(queue.getResult("BUTTON_LEFT"));
        position(BUTTON_LEFT, (gameScrean.width)*0.2, (gameScrean.height/1.2));
        BUTTON_LEFT.scaleY = BUTTON_LEFT.scaleX = gameScreenScale;
        BUTTON_LEFT.alpha=0.5;

        BUTTON_RIGHT = new createjs.Bitmap(queue.getResult("BUTTON_RIGHT"));
        position(BUTTON_RIGHT, (gameScrean.width)*0.8, (gameScrean.height/1.2));
        BUTTON_RIGHT.scaleY = BUTTON_RIGHT.scaleX = gameScreenScale;
        BUTTON_RIGHT.alpha=0.5;

}
function setSoundContent(){

        SOUND_OK = createjs.Sound.createInstance("OK");
        SOUND_BACK = createjs.Sound.createInstance("BACK");        
        SOUND_KAIHI = createjs.Sound.createInstance("KAIHI");
        SOUND_CRASH = createjs.Sound.createInstance("CRASH");
        SOUND_DOWN = createjs.Sound.createInstance("DOWN");
}

function setTextContent(){
    TEXT_HOW_TO = new createjs.Text("", gameScrean.width*0.04+"20px Impact", "");
    TEXT_HOW_TO.x = gameScrean.width*0.05;
    TEXT_HOW_TO.y = gameScrean.height*0.2;
    TEXT_HOW_TO.textAlign = "left";
    TEXT_HOW_TO.text = "車道ど真ん中の穂乃果ちゃんを車が襲う！\rなかなか始まらないススメ→トゥモロウを尻目に\r左右のボタンで穂乃果ちゃんを操作して\r車からひたすら逃げよう！";

    TEXT_GAME_TIME = new createjs.Text("",gameScrean.width*0.06+"1000px Impact", "");
    TEXT_GAME_TIME.x = gameScrean.width*0.75;
    TEXT_GAME_TIME.y = gameScrean.height*0.05;
    TEXT_GAME_TIME.textAlign = "center";
}


function playSound(target){
    target.play();
}
