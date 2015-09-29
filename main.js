window.onload = function(){


	// ログインチェック
	// 完了後にコンテンツオブジェクトのセットアップを開始する
	deferredCheckLogin = $.Deferred();
	setUserInfo().done(function(){
		isLogin = true;
		deferredCcheckLogin.resolve();
	}).fail(function(){
		isLogin = false;
		deferredCcheckLogin.reject();
	});
	deferredCheckLogin.promise();


	//ゲーム画面の初期
	gameStage = new createjs.Stage("gameScrean");

	gameScrean = document.getElementById("gameScrean");

	//拡大縮小率の計算
	initGameScreenScale();

	var loading = new createjs.Text();
    setTextProperties(loading, gameScrean.width*0.5, gameScrean.height*0.5, gameScrean.width*0.04, "Courier", "center", gameScrean.width*0.04);
    loading.text = "loading..."
    gameStage.addChild(loading);
    gameStage.update();

	//canvas要素内でのスマホでのスライドスクロール禁止
	$(gameScrean).on('touchmove.noScroll', function(e) {
	e.preventDefault();
	});

	//canvasステージ内でのタッチイベントの有効化
	if (createjs.Touch.isSupported()) {
	  createjs.Touch.enable(gameStage);
	}


	//ゲーム用タイマーの設定
    createjs.Ticker.setFPS(config.system.FPS);
	createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;

	// TODO createjsにcross originの画像を読み込まない
	createjs.DisplayObject.suppressCrossDomainErrors = true;


	//コンテンツのロードステートに移行
	var ua = navigator.userAgent;

	if(/iPhone/.test(ua)) {
	    gameStage.removeAllChildren();
	    var text = new createjs.Text();
	    setTextProperties(text, gameScrean.width*0.5, gameScrean.height*0.5, gameScrean.width*0.05, "Courier", "center", gameScrean.width*0.04);
	    text.text = "-Please tap on the display!-"

	    gameStage.addChild(text);
	    gameStage.update();

	    window.addEventListener("touchstart", start);

	}
	else{
		// ログイン確認後ロード画面へ遷移
		loadState();
	}



}


function start(){
    window.removeEventListener("touchstart", start);
	loadState();
}

