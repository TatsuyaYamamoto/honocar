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

    // 全てのファイルを読み込み終わったら
    queue.addEventListener("complete", handleComplete);


    //画像、音声マニフェストファイルを読み込む----------     
    queue.loadManifest(manifest.image);
    queue.loadManifest(manifest.spriteImage);
    queue.loadManifest(manifest.sound);

    if(isLogin){
        queue.loadManifest(apiManifest);
    }

}



// ロードイベント -----------------------------------

function handleComplete() {

    setImageContent();
    setSpriteSheetContents();
    setSoundContent();
    setTextContent();
    if(isLogin){
        setAPIContents();
    }

    createjs.Ticker.removeEventListener("tick", tickListener);

    addAllEventListener();
    topState();
}


//ロードしたコンテンツをセット------------------------------------------
function setImageContent(){

    for(key in properties.image){

        imageObj[key] = new createjs.Bitmap(queue.getResult(properties.image[key].id));
        imageObj[key].x = gameScrean.width * properties.image[key].ratioX;
        imageObj[key].y = gameScrean.height * properties.image[key].ratioY;
        imageObj[key].regX = imageObj[key].image.width/2;
        imageObj[key].regY = imageObj[key].image.height/2;
        imageObj[key].scaleY = imageObj[key].scaleX = gameScreenScale * properties.image[key].scale;
        imageObj[key].alpha = properties.image[key].alpha;
    }
    if(isLogin){
        imageObj.TWITTER_ICON = new createjs.Bitmap("TWITTER_ICON");
        imageObj.TWITTER_ICON.x = gameScrean.width * properties.image.TWITTER_ICON.ratioX;
        imageObj.TWITTER_ICON.y = gameScrean.height * properties.image.TWITTER_ICON.ratioY;
        imageObj.TWITTER_ICON.regX = imageObj.TWITTER_ICON.image.width/2;
        imageObj.TWITTER_ICON.regY = imageObj.TWITTER_ICON.image.height/2;
        imageObj.TWITTER_ICON.scaleY = imageObj.TWITTER_ICON.scaleX = gameScreenScale * properties.image.TWITTER_ICON.scale;
        imageObj[key].alpha = properties.image.TWITTER_ICON.alpha;
    }
}

function setSpriteSheetContents(){

    for(key in properties.ss){

        var spriteSheet = new createjs.SpriteSheet({
            images:[queue.getResult(properties.ss[key].id)],
            frames: properties.ss[key].frames,
            animations: properties.ss[key].animations
        });

        ssObj[key] = new createjs.Sprite(spriteSheet, properties.ss[key].firstAnimation);
        ssObj[key].x = gameScrean.width * properties.ss[key].ratioX;
        ssObj[key].y = gameScrean.height * properties.ss[key].ratioY;
        ssObj[key].regX = properties.ss[key].frames.width/2;
        ssObj[key].regY = properties.ss[key].frames.height/2;
        ssObj[key].scaleY = ssObj.scaleX = gameScreenScale;
    }
}

function setImageContent_old(){


}


function setSoundContent(){

    for(key in properties.sound){
        soundObj[key] = createjs.Sound.createInstance(properties.sound[key].id);
    }
}

function soundTurnOff(){
    isSoundMute = true;

    for(key in properties.sound){
        soundObj[key].muted = true;
    }
}

function soundTurnOn(){

    isSoundMute = false;

    for(key in properties.sound){
        soundObj[key].muted = false;
    }

}


function setTextProperties(target, x, y, size, family, align, height){
    target.x = x;
    target.y = y;
    target.font = size + "px " + family;
    target.textAlign = align;
    target.lineHeight = height;
}


function setTextContent(){

    for(key in properties.text){
        textObj[key] = new createjs.Text();
        textObj[key].x = gameScrean.width * properties.text[key].ratioX;
        textObj[key].y = gameScrean.height * properties.text[key].ratioY;
        textObj[key].font = gameScrean.width * properties.text[key].size + "px " + properties.text[key].family;
        textObj[key].textAlign = properties.text[key].align;
        textObj[key].lineHeight = gameScrean.width * properties.text[key].lineHeight;
    }


    textObj.TEXT_START.text = "-Please tap on the display!-"

    textObj.TEXT_RANKING.text = "ランキング機能(仮画面)\rだよー";

    textObj.TEXT_LINK_ME.text = "プログラム、音楽、思いつき：T28\rhttp://sokontokoro-factory.net";

    textObj.TEXT_LINK_SAN.text = "イラスト：さんざし\rhttps://twitter.com/xxsanzashixx";

    textObj.TEXT_LINK_1.text = "効果音：効果音ラボ 樣\rhttp://soundeffect-lab.info/";

    textObj.TEXT_LINK_2.text = "効果音：On-Jin ～音人～ 樣\rhttp://on-jin.com/";

    textObj.TEXT_LINK_LOVELIVE.text = "プロジェクトラブライブ！\rhttp://www.lovelive-anime.jp";

}


//apiコンテンツリスト------------------------------------------
var apiManifest = [
    {
        id : "TWITTER_ICON",
        src: TWITTER_ICON_URL
    }
];


function setAPIContents(){
    PROFILE_IMAGE = new createjs.Bitmap("PROFILE_IMAGE");
    setCoordinates(PROFILE_IMAGE, gameScrean.width*0.03, gameScrean.height*0.9);
    PROFILE_IMAGE.scaleY = PROFILE_IMAGE.scaleX = gameScreenScale * 1.6;
}

