//ゲーム初期化-----------------------------------------
function gameInit(){

	//ほのかちゃを作成
	honoka = new Honoka();

    //フレーム数リセット
	gameStatusReset();

	//ボタン有効化
    rightButtonEnable();
    leftButtonEnable();

	//イベント登録
	BUTTON_RIGHT.addEventListener("click", clickButtonRight);
	BUTTON_LEFT.addEventListener("click", clickButtonLeft);

	//ゲーム内タイマーTickイベント
    createjs.Ticker.setFPS(FPS);
	createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.addEventListener("tick", gameReady);

	//ゲーム画面要素をステージに追加
}

function gameStatusReset(){
	gameFrame = 0;
	passCarCount = 0;
	car = [];
}

//ゲームスタートカウント-----------------------------------------
function gameReady(){
	gameFrame ++;

	switch(gameFrame){
		case 1:
		    gameStage.addChild(GAME_BACKGROUND);
		    gameStage.addChild(honoka.img);
			gameStage.update();
			break;	
		case 10:
		    createjs.Sound.play("PI1");
	        TETX_GAMESTART_COUNT.text = "-1-";
		    gameStage.addChild(GAME_BACKGROUND);
		    gameStage.addChild(TETX_GAMESTART_COUNT);
		    gameStage.addChild(honoka.img);
			gameStage.update();
			break;
		case 30:
		    createjs.Sound.play("PI1");
	        TETX_GAMESTART_COUNT.text = "-2-";
		    gameStage.addChild(GAME_BACKGROUND);
		    gameStage.addChild(TETX_GAMESTART_COUNT);
		    gameStage.addChild(honoka.img);
			gameStage.update();
			break;
		case 50:
		    createjs.Sound.play("PI1");
		    gameStage.removeAllChildren();
	    	gameStatusReset();
			drawGameScrean();
		    createjs.Ticker.removeEventListener("tick", gameReady);
			createjs.Ticker.addEventListener("tick", processGame);
		    createjs.Sound.play("SUSUME_LOOP", {loop:-1});
			break;
	}
}


//ゲーム処理-----------------------------------------
function processGame(){

	gameFrame ++;

	TEXT_GAME_COUNT.text = text_game_count_L + passCarCount + text_game_count_R;
	gameStage.update();


	if (gameFrame % 20 ==0){
		enemyAppeare();
	}


    for (i = 0; i < car.length; i++){

    	if(car[i].passed){
            passCarCount ++;
    	}

	    if(checkDistance(car[i]) < 100){
	    	crash();
	    }
    }
}

//描画処理-----------------------------------------
function drawGameScrean(){

	gameStage.addChild(GAME_BACKGROUND);
	gameStage.addChild(BUTTON_LEFT);
	gameStage.addChild(BUTTON_RIGHT);
	gameStage.addChild(TEXT_GAME_COUNT);
    gameStage.addChild(honoka.img);

}
//process用関数-----------------------------------------
function processHonoka(){

}

function makeCar(){

}


//敵出現---------------------------------------
function enemyAppeare(){

	var enemyNumber = Math.floor(Math.random() * 5);

	switch(enemyNumber){
		case 0:
			car.push(new Car(0));
			break;
		case 1:
			car.push(new Car(1));
			break;
		case 2:
			car.push(new Car(2));
			break;
		case 3:
			car.push(new Car(3));
			break;
		case 4:
			car.push(new Car(honoka.lane));
			break;
		case 5:
			//なにもおきない
			break;
	}
}




//操作ボタンの状態操作系---------------------------

//ボタン状態の確認
function checkButton(){
    if(honoka.lane == 0){
        leftButtonDisable();
    };
	if(honoka.lane == 1){
        leftButtonEnable();
    }
    if(honoka.lane == 2){
        rightButtonEnable();
    }
    if(honoka.lane == 3){
        rightButtonDisable();
    }
}


//有効化
function rightButtonEnable(){
	BUTTON_RIGHT.mouseEnabled = true;
    BUTTON_RIGHT.alpha=0.5;
}
function leftButtonEnable(){
	BUTTON_LEFT.mouseEnabled = true;
    BUTTON_LEFT.alpha=0.5;
}

//無効化
function rightButtonDisable(){
	BUTTON_RIGHT.mouseEnabled = false;
    BUTTON_RIGHT.alpha=0.2;
}
function leftButtonDisable(){
	BUTTON_LEFT.mouseEnabled = false;
    BUTTON_LEFT.alpha=0.2;
}



//オブジェクト間の距離計算---------------------
function checkDistance(target){
	var x = honoka.img.x - target.img.x;
	var y = honoka.img.y - target.img.y;

	var length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	return length;
}
//イベント処理-------------------------------------

function clickButtonRight(){
	honoka.moveRight();
	checkButton();
}

function clickButtonLeft(){
	honoka.moveLeft();
	checkButton();
}
//クラッシュ関数-------------------------------------
function crash(){
	gameScore = passCarCount;
    createjs.Sound.stop();
    createjs.Sound.play("CRASH");
    createjs.Sound.play("SUSUME_END");
    BUTTON_RIGHT.removeEventListener("click", clickButtonRight);
	BUTTON_LEFT.removeEventListener("click", clickButtonLeft);
	// createjs.Ticker.reset();
    createjs.Ticker.removeEventListener("tick", processGame);
	honoka.img.gotoAndPlay("escapeR");

	//stateマシン内、ゲームオーバー状態に遷移
	gameOverState();
}
