//ゲーム初期化-----------------------------------------
function gameInit(){

	//ゲーム画面要素をステージに追加
	drawGameScrean();

	//ほのかちゃを作成
	honoka = new Honoka();
    gameStage.addChild(honoka.img);

    //フレーム数リセット
	gameFrame = 0;
	passCarCount = 0;
	car = [];

	//ボタン有効化
    rightButtonEnable();
    leftButtonEnable();


	//イベント登録
	BUTTON_RIGHT.addEventListener("click", clickButtonRight);
	BUTTON_LEFT.addEventListener("click", clickButtonLeft);

	//ゲーム内タイマーTickイベント

	gameTick = createjs.Ticker;
    gameTick.setFPS(FPS);
	gameTick.timingMode = createjs.Ticker.RAF_SYNCHED;
    gameTick.addEventListener("tick", processGame);

}

//ゲーム処理-----------------------------------------
function processGame(){

	gameFrame ++;

	TEXT_GAME_TIME.text = "よけったー : " + passCarCount + "台";
	gameStage.update();


	if (gameFrame % 20 ==0){
		enemyAppeare();
	}


    for (i = 0; i < car.length; i++){

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
	gameStage.addChild(TEXT_GAME_TIME);

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
    createjs.Sound.play("CRASH");
    BUTTON_RIGHT.removeEventListener("click", clickButtonRight);
	BUTTON_LEFT.removeEventListener("click", clickButtonLeft);
	// gameTick.reset();
    gameTick.removeEventListener("tick", processGame);
	honoka.img.gotoAndPlay("escapeR");

	//stateマシン内、ゲームオーバー状態に遷移
	gameOverState();
}
