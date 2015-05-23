//ゲーム初期化-----------------------------------------
function gameInit(){
	honoka = new Honoka();


	//イベント登録
	BUTTON_RIGHT.addEventListener("click", function(){
		rightButtonDisable();
		leftButtonDisable();
		honoka.moveRight();
		rightButtonEnable();
		leftButtonEnable();
		checkButton();
	});
	BUTTON_LEFT.addEventListener("click", function(){
		honoka.moveLeft();
		checkButton();
	});

	//ゲーム内タイマーTickイベント
    createjs.Ticker.setFPS(FPS);
    createjs.Ticker.addEventListener("tick", processGame);
}

//ゲーム処理-----------------------------------------
function processGame(){
    gameStage.update();

    if(1800 < createjs.Ticker.getTime() && createjs.Ticker.getTime() < 2000){
    	car.push(new Car(1));
    }

    for (i = 0; i < car.length; i++){
	    if(checkDistance(car[i]) < 100){
	    	honoka.alive = false;
		    createjs.Sound.play("CRASH");
	    	createjs.Ticker.removeEventListener("tick", processGame);
	    }
    }
}

//描画処理-----------------------------------------
function drawGameScrean(){

	drawBackGround();
	drawHonoka();
	drawGameElement();

}
//process用関数-----------------------------------------
function processHonoka(){

}

function makeCar(){

}
//draw用関数-----------------------------------------
function drawBackGround(){
	gameStage.addChild(GAME_BACKGROUND);

}
function drawCar(){

}
function drawHonoka(){
    gameStage.addChild(honoka.img);

}
function drawGameElement(){
	gameStage.addChild(BUTTON_LEFT);
	gameStage.addChild(BUTTON_RIGHT);
}


//操作ボタンの状態操作系---------------------------

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


//ボタン状態の確認
function checkButton(){
    if(honoka.lane == 1){
        leftButtonDisable();
    };
	if(honoka.lane == 2){
        leftButtonEnable();
    }
    if(honoka.lane == 3){
        rightButtonEnable();
    }
    if(honoka.lane == 4){
        rightButtonDisable();
    }
}

//オブジェクト間の距離計算---------------------
function checkDistance(target){
	var x = honoka.img.x - target.img.x;
	var y = honoka.img.y - target.img.y;

	var length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	return length;
}


