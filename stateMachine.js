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
    drawGameScrean();

}
//GAMEOVER画面------------------------------------------
function gameOverState(){

	screanState = "gameOverState";
    gameStage.removeAllChildren();


    gameStage.addChild(GAME_BACKGROUND);
    gameStage.addChild(GAMEOVER);
    gameStage.addChild(BUTTON_TMP_3);

    gameStage.update();

    BUTTON_TMP_3.addEventListener( 'click', function() {
        playSound(SOUND_BACK);
        topState();
    } );
}

