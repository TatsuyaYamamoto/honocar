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

	if(/iPhone/.test(ua)) {
	    window.addEventListener("click", start);

	    function start(){
			loadState();
	        window.removeEventListener("click", start);
	    }
	}
	else{
		loadState();
	}
}