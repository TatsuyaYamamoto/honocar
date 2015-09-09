window.onload = function(){


	//ゲーム画面の初期
	gameStage = new createjs.Stage("gameScrean");

	gameScrean = document.getElementById("gameScrean");

	//拡大縮小率の計算
	initGameScreenScale();

	//canvas要素内でのスマホでのスライドスクロール禁止
	$(gameScrean).on('touchmove.noScroll', function(e) {
	e.preventDefault();
	});

	//canvasステージ内でのタッチイベントの有効化
	if (createjs.Touch.isSupported()) {
	  createjs.Touch.enable(gameStage);
	}


	//ゲーム用タイマーの設定
    createjs.Ticker.setFPS(FPS);
	createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;





	//コンテンツのロードステートに移行

	var ua = navigator.userAgent;
	var start = function(){
		loadState();
	    window.removeEventListener("touchstart", start);
    }


	if(/iPhone/.test(ua)) {
	    gameStage.removeAllChildren();

	    TEXT = new createjs.Text();
	    setTextProperties(TEXT, gameScrean.width*0.5, gameScrean.height*0.5, gameScrean.width*0.05, "Courier", "center", gameScrean.width*0.04);
	    TEXT.text = "-Please tap on the display!-"

	    gameStage.addChild(TEXT);
	    gameStage.update();

	    window.addEventListener("touchstart", start);

	}
	else{
		loadState();
	}

}

