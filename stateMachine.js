//ロード画面------------------------------------------
function loadState(){
    screanState = "loadState";


    TEXT_LOADING_STATUS = new createjs.Text("", gameScrean.width*0.1+"20px Impact", "");
    TEXT_LOADING_STATUS.x = gameScrean.width/2;
    TEXT_LOADING_STATUS.y = gameScrean.height/2;
    TEXT_LOADING_STATUS.textAlign = "center";

    gameStage.addChild(TEXT_LOADING_STATUS);

    loadContent();
}

//TOP画面------------------------------------------
function topState(){
    screanState = "topState";
    gameStage.removeAllChildren();
    gameStage.addChild(GAME_BACKGROUND);

    switch(playCharacter){
        case "honoka":
            gameStage.addChild(TITLE_LOGO);
            break;
        case "erichi":
            gameStage.addChild(TITLE_LOGO_E);
            break;
    }

    gameStage.addChild(TEXT_START);
    gameStage.update();

    if(SOUND_ZENKAI.playState != createjs.Sound.PLAY_SUCCEEDED){
        SOUND_ZENKAI.play("none",0,0,-1,0.4,0);
    }

    function gotoMenu(){
        SOUND_OK.play("none",0,0,0,1,0);
        menuState()
        GAME_BACKGROUND.removeEventListener("click", gotoMenu);
    }

    GAME_BACKGROUND.addEventListener("click", gotoMenu);

}


//MENU画面------------------------------------------
function menuState(){
    screanState = "menuState";
    gameStage.removeAllChildren();
    gameStage.addChild(GAME_BACKGROUND);
    gameStage.addChild(WHITE_SHEET);



    gameStage.addChild(BUTTON_START);
    gameStage.addChild(BUTTON_HOW_TO);
    gameStage.addChild(BUTTON_RANKING);
    gameStage.addChild(BUTTON_CREDIT);
    gameStage.addChild(BUTTON_TWITTER_TOP);
    gameStage.addChild(BUTTON_TURN_SWITCH);
    gameStage.addChild(MENU_LOGO);


    // Graphicsのインスタンスを作成します。
    var graphics = new createjs.Graphics();

    // 色の指定（線と塗りつぶしとそれぞれ色を指定する）
    graphics.beginStroke("#55acee");
    graphics.beginFill("#55acee");

    // 図形の描画を行う（ここのバリエーションを後述します）

    var height = gameScrean.height*0.1;
    var width = gameScrean.width*0.5;



    graphics
         .moveTo(0,0)
         .lineTo(width,0)
         .lineTo(width,height)
         .lineTo(0,height)
         .closePath();

    // Shapeとして、Stageに追加します。
    var shape = new createjs.Shape(graphics);
    shape.x = 0;
    shape.y = gameScrean.height-height;
    gameStage.addChild(shape);


    if(!isLogin){
        gameStage.addChild(BUTTON_TWITTER_LOGIN);
    }else{

        $.ajax({
            type: "GET",
            url: config.api.check,
            dataType: 'json',
            headers: {
                'Origin': config.api.origin
            },
            xhrFields: {
                withCredentials: true
            }
        }).done(function(data){

            var pic = new createjs.Bitmap(data.profile_image_url);
            setCoordinates(pic, gameScrean.width*0.03, gameScrean.height*0.9);
            pic.scaleY = pic.scaleX = gameScreenScale * 1.6;
            pic.addEventListener("mousedown", function(){
                SOUND_OK.play("none",0,0,0,1,0);
                $.ajax({
                    type: "GET",
                    url: config.api.logout,
                    dataType: 'json',
                    headers: {
                        'Origin': config.api.origin
                    },
                    xhrFields: {
                        withCredentials: true
                    }
                }).done(function(){
                    alert("ログアウトしました。リロードします。");                 
                    window.location.href=config.api.origin;
                }).fail(function(){
                    alert("アクセスに失敗しました");
                });
            });

            var screen_name = new createjs.Text();
            setTextProperties(screen_name, gameScrean.width*0.3, gameScrean.height*0.92, gameScrean.width*0.04, "Courier", "center", gameScrean.width*0.04);
            screen_name.text = "@"+data.screen_name

            gameStage.addChild(screen_name);
            gameStage.addChild(pic);

        }).fail(function(){
            alert("アクセスに失敗しました");
        });
    }


    switch(playCharacter){
        case "honoka":
            BUTTON_CHANGE_CHARA.gotoAndPlay("honoka");
            break;
        case "erichi":
            BUTTON_CHANGE_CHARA.gotoAndPlay("erichi");
            break;
    }

    gameStage.addChild(BUTTON_CHANGE_CHARA);



    if(SOUND_ZENKAI.playState != createjs.Sound.PLAY_SUCCEEDED){
        SOUND_ZENKAI.play("none",0,0,-1,0.4,0);
    }

    tickListener = createjs.Ticker.addEventListener("tick", function(){
        gameStage.update();
    });


}
//操作説明画面------------------------------------------
function howToPlayState(){  
	screanState = "howToPlayState";
    gameStage.removeAllChildren();

    howToPlayInit();

}
//クレジット画面------------------------------------------
function creditState(){
	screanState = "creditState";
    gameStage.removeAllChildren();
    gameStage.addChild(GAME_BACKGROUND);
    gameStage.addChild(BUTTON_BACK_TOP_FROM_CREDIT);
    gameStage.addChild(TEXT_LINK_ME);
    gameStage.addChild(TEXT_LINK_SAN);
    gameStage.addChild(TEXT_LINK_LOVELIVE);
    gameStage.addChild(TEXT_LINK_1);
    gameStage.addChild(TEXT_LINK_2);



    gameStage.update();
}
//ランキング画面------------------------------------------
function rankingState(){
    screanState = "creditState";
    gameStage.removeAllChildren();
    gameStage.addChild(GAME_BACKGROUND);
    gameStage.addChild(BUTTON_BACK_TOP_FROM_RANKING);
    gameStage.addChild(TEXT_RANKING);

    //テキストボックスを表示する
    $("#rankingName").show();


    gameStage.update();
}

//ゲーム画面------------------------------------------
function gameState(){
	screanState = "gameState";
    gameStage.removeAllChildren();

    gameInit();

}
//GAMEOVER画面------------------------------------------
function gameOverState(){

	screanState = "gameOverState";

    player.img.gotoAndPlay("down");

    gameStage.removeAllChildren();

    gameStage.addChild(GAME_BACKGROUND);
    gameStage.addChild(player.img);
    gameStage.addChild(BUTTON_BACK_TOP);
    gameStage.addChild(BUTTON_RESTART);


    switch(playCharacter){
        case "honoka":
            BUTTON_TWITTER_GAMEOVER.gotoAndPlay("honoka");
            break;
        case "erichi":
            BUTTON_TWITTER_GAMEOVER.gotoAndPlay("erichi");
            break;
    }


    gameStage.addChild(BUTTON_TWITTER_GAMEOVER);
    gameStage.addChild(TEXT_GAME_COUNT);
    gameStage.addChild(GAMEOVER);


    tickListener = createjs.Ticker.addEventListener("tick", function(){
        gameStage.update();
    });


}

