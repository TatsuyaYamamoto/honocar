//ゲーム初期化-----------------------------------------
function gameInit(){
	honoka = new Honoka();
	frameCount = 0;

	//ゲーム開発用
    fc = new createjs.Text("","20px Impact", "");
    fc.x = gameScrean.width/1.6;
    fc.y = gameScrean.height/1.05;

	//イベント登録
	BUTTON_LEFT.addEventListener("click", function(){    
		playSound(SOUND_KAIHI);
		honoka.moveLeft();
		if(honoka.lane.number == 1){
			leftButtonDisable();
		}
		if(honoka.lane.number == 3){
			rightButtonEnable();
		}
	});

	BUTTON_RIGHT.addEventListener("click", function(){
		playSound(SOUND_KAIHI);
		honoka.moveRight();
		if(honoka.lane.number == 4){
			rightButtonDisable();
		}
		if(honoka.lane.number == 2){
			leftButtonEnable();
		}
	});

	//ゲーム内タイマーTickイベント
	createjs.Ticker.addEventListener("tick",function(){});
	createjs.Ticker.setFPS(FPS);
}
//ゲーム処理-----------------------------------------
function processGame(){

	if(honoka.lane.number >= 4){
		rightButtonDisable();
	}else{
		//rightButtonEnable();
	}
	if(honoka.lane.number == 1){
		leftButtonDisable();
	}else{
		//leftButtonEnable();	
	}


	processHonoka();
}

//描画処理-----------------------------------------
function drawGameScrean(){
    gameStage.removeAllChildren();
	//1.背景
	drawBackGround();

	//2.くるま
	drawCar();

	//3.ほのかちゃ
	drawHonoka();

	//4.ゲームパーツ
	drawGameElement();

	//ゲーム開発用
    fc.text = "game timer:" + createjs.Ticker.getTime();
    gameStage.addChild(fc);

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
	gameStage.addChild(honoka.image);
}
function drawGameElement(){
	gameStage.addChild(BUTTON_LEFT);
	gameStage.addChild(BUTTON_RIGHT);
}

function rightButtonEnable(){
	BUTTON_RIGHT.mouseEnabled = true;
    BUTTON_RIGHT.alpha=0.5;
}
function rightButtonDisable(){
	BUTTON_RIGHT.mouseEnabled = false;
    BUTTON_RIGHT.alpha=0.2;
}
function leftButtonEnable(){
	BUTTON_LEFT.mouseEnabled = true;
    BUTTON_LEFT.alpha=0.5;
}
function leftButtonDisable(){
	BUTTON_LEFT.mouseEnabled = false;
    BUTTON_LEFT.alpha=0.2;
}
