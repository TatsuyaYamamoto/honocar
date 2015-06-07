//ゲーム初期化-----------------------------------------
function howToPlayInit(){

	//要素をステージに追加
    gameStage.addChild(GAME_BACKGROUND);
    gameStage.addChild(BUTTON_TMP_4);
    gameStage.addChild(TEXT_HOW_TO);


	//ほのかちゃを作成
	honoka = new Honoka();
    gameStage.addChild(honoka.img);
    honoka.howToMove();

    //フレーム数リセット
	gameFrame = 0;


	//イベント登録
    BUTTON_TMP_4.addEventListener( 'click', function() {
        playSound(SOUND_BACK);
		gameTick.removeEventListener("tick", processHowToPlay);
        topState();
    } );
	//ゲーム内タイマーTickイベント

	gameTick = createjs.Ticker;
    gameTick.setFPS(FPS);
	gameTick.timingMode = createjs.Ticker.RAF_SYNCHED;
    gameTick.addEventListener("tick", processHowToPlay);

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
