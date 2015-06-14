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
    SOUND_ZENKAI.play("late",0,0,-1,0.4,0);
    screanState = "topState";
    gameStage.removeAllChildren();

    gameStage.addChild(GAME_BACKGROUND);
    gameStage.addChild(TITLE_LOGO);
    gameStage.addChild(BUTTON_TMP_1);
    gameStage.addChild(BUTTON_TMP_2);
    gameStage.addChild(BUTTON_TMP_6);
    gameStage.addChild(BUTTON_TWITTER_TOP);
    gameStage.update();

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


}

