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

	//コンテンツのロードステートに移行
	loadState();

}