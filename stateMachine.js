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
    gameStage.addChild(BUTTON_TWITTER_TOP);
    gameStage.update();


    BUTTON_TMP_1.addEventListener("click", function() {
        SOUND_ZENKAI.stop();
        SOUND_OK.play();
        gameState();
    } );
    BUTTON_TMP_2.addEventListener("click", function() {
        SOUND_OK.play();
        howToPlayState();
    } );
}
//操作説明画面------------------------------------------
function howToPlayState(){  
	screanState = "howToPlayState";
    gameStage.removeAllChildren();

    howToPlayInit();

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

}
//GAMEOVER画面------------------------------------------
function gameOverState(){

	screanState = "gameOverState";
    gameStage.removeAllChildren();


    gameStage.addChild(GAME_BACKGROUND);
    gameStage.addChild(honoka.img);
    gameStage.addChild(BUTTON_TMP_3);
    gameStage.addChild(BUTTON_TMP_5);
    gameStage.addChild(BUTTON_TWITTER_GAMEOVER);
    gameStage.addChild(TEXT_GAME_COUNT);
    gameStage.addChild(GAMEOVER);

    gameStage.update();

    BUTTON_TMP_3.addEventListener( 'click', function() {
        SOUND_BACK.play();
        topState();
    });
    BUTTON_TMP_5.addEventListener( 'click', function() {
        SOUND_BACK.play();
        gameState();
    });


}

