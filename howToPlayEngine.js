//ゲーム初期化-----------------------------------------
function howToPlayInit(){

	//要素をステージに追加
    gameStage.addChild(GAME_BACKGROUND);
    gameStage.addChild(BUTTON_BACK_TOP_FROM_HOW_TO);
    gameStage.addChild(TEXT_HOW_TO);

	gameStage.addChild(BUTTON_LEFT_HOW_TO);
	gameStage.addChild(BUTTON_RIGHT_HOW_TO);
    rightButtonEnable();
    leftButtonEnable();

	//ほのかちゃを作成
	honoka = new Honoka();
    gameStage.addChild(honoka.img);
    honoka.howToMove();

    //フレーム数リセット
	gameFrame = 0;


	//ゲーム内タイマーTickイベント

	tickListener = createjs.Ticker.addEventListener("tick", processHowToPlay);

}

//ゲーム処理-----------------------------------------
function processHowToPlay(){
	// gameFrame = Math.floor(createjs.Ticker.getTime());
	if(gameFrame == 100){
		gameFrame = 0;
	}

	gameFrame ++;
	gameStage.update();
}
