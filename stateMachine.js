//ロード画面------------------------------------------
function loadState(){
    screanState = "loadState";


    TEXT_LOADING_STATUS = new createjs.Text("","20px Impact", "");
    TEXT_LOADING_STATUS.x = gameScrean.width/2;
    TEXT_LOADING_STATUS.y = gameScrean.height/2;
    TEXT_LOADING_STATUS.textAlign = "center";

    gameStage.addChild(TEXT_LOADING_STATUS);

    loadContent();
}


//TOP画面------------------------------------------
function topState(){
    screanState = "topState";
    gameStage.removeAllChildren();

    gameStage.addChild(GAME_BACKGROUND);
    gameStage.addChild(TITLE_LOGO);
    gameStage.addChild(BUTTON_TMP_1);
    gameStage.addChild(BUTTON_TMP_2);

    gameStage.update();

    BUTTON_TMP_1.addEventListener("click", function() {
        playSound(SOUND_OK);
        gameState();
    } );
    BUTTON_TMP_2.addEventListener("click", function() {
        playSound(SOUND_OK);
        howToPlayState();
    } );
}
//操作説明画面------------------------------------------
function howToPlayState(){  
	screanState = "howToPlayState";
    gameStage.removeAllChildren();

    gameStage.addChild(GAME_BACKGROUND);
    gameStage.addChild(BUTTON_TMP_3);
    gameStage.addChild(TEXT_HOW_TO);


    //ほのかちゃ
    honokaSpriteSheet = new createjs.SpriteSheet({
        images: [ queue.getResult("HONOKA_KIHON") ],
        frames: { width:186, height:267 },
        animations:
            {
                kihon: { // animationsをより細かく指定します
                    frames: [0,1], // 0から3ではなく、フレーム番号を指定出来ます
                    //next: 'walk', // アニメーション完了後の動きを指定します、未設定、またはtrueの場合はループします
                    frequency : 2 // 5フレームに1度画像を変更する
                }
            }
        }
    );

    HONOKA_IMG = new createjs.Sprite(honokaSpriteSheet);
    HONOKA_IMG.gotoAndPlay("kihon");

    gameStage.addChild(HONOKA_IMG);

    gameStage.update();
    BUTTON_TMP_3.addEventListener( 'click', function() {
        playSound(SOUND_BACK);
        topState();
    } );

}
//クレジット画面------------------------------------------
function creditState(){
	screanState = "creditState";

}
//ゲーム画面------------------------------------------
function gameState(){
	screanState = "gameState";
    gameStage.removeAllChildren();

    gameInit();

    //アニメーションMachine
    (function(){

        if(true){
        	//内側・ゲーム処理
        	processGame();
        	//外側・描画処理
        	drawGameScrean();

            gameStage.update();

        	//繰り返し 
            //setTimeout(arguments.callee, FPS);
            //フレーム数増加
            frameCount++;            
        }else{
            gameOverState();
        }

    })();

}
//GAMEOVER画面------------------------------------------
function gameOverState(){
	screanState = "gameOverState";
}

