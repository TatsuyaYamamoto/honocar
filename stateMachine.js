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
    gameStage.addChild(BUTTON_START);
    gameStage.addChild(BUTTON_HOW_TO);
    gameStage.addChild(BUTTON_CREDIT);
    gameStage.addChild(BUTTON_TURN_SWITCH);
    gameStage.addChild(BUTTON_TWITTER_TOP);
    gameStage.update();

    if(SOUND_ZENKAI.playState != createjs.Sound.PLAY_SUCCEEDED){
        SOUND_ZENKAI.play("none",0,0,-1,0.4,0);
    }



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
    gameStage.removeAllChildren();
    gameStage.addChild(GAME_BACKGROUND);
    gameStage.addChild(BUTTON_BACK_TOP_FROM_CREDIT);
    gameStage.addChild(TEXT_LINK_ME);
    gameStage.addChild(TEXT_LINK_SAN);
    gameStage.addChild(TEXT_LINK_LOVELIVE);
    gameStage.addChild(TEXT_LINK_1);
    gameStage.addChild(TEXT_LINK_2);



    gameStage.update();
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
    gameStage.addChild(BUTTON_BACK_TOP);
    gameStage.addChild(BUTTON_RESTART);
    gameStage.addChild(BUTTON_TWITTER_GAMEOVER);
    gameStage.addChild(TEXT_GAME_COUNT);
    gameStage.addChild(GAMEOVER);

    gameStage.update();


}

