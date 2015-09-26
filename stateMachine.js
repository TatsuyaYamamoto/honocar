// ロード画面------------------------------------------
function loadState(){


    textObj.TEXT_LOADING_STATUS = new createjs.Text("", gameScrean.width*0.1+"20px Impact", "");
    textObj.TEXT_LOADING_STATUS.x = gameScrean.width/2;
    textObj.TEXT_LOADING_STATUS.y = gameScrean.height/2;
    textObj.TEXT_LOADING_STATUS.textAlign = "center";

    gameStage.addChild(textObj.TEXT_LOADING_STATUS);

    loadContent();
}

// TOP画面------------------------------------------
function topState(){

    gameStage.removeAllChildren();
    gameStage.addChild(imageObj.GAME_BACKGROUND);

    switch(playCharacter){
        case "honoka":
            gameStage.addChild(imageObj.TITLE_LOGO);
            break;
        case "erichi":
            gameStage.addChild(imageObj.TITLE_LOGO_E);
            break;
    }

    gameStage.addChild(textObj.TEXT_START);


    gameStage.update();

    if(soundObj.SOUND_ZENKAI.playState != createjs.Sound.PLAY_SUCCEEDED){
        soundObj.SOUND_ZENKAI.play("none",0,0,-1,0.4,0);
    }

    function gotoMenu(){
        soundObj.SOUND_OK.play("none",0,0,0,1,0);
        menuState();
        imageObj.GAME_BACKGROUND.removeEventListener("click", gotoMenu);
    }

    imageObj.GAME_BACKGROUND.addEventListener("click", gotoMenu);

}


// MENU画面------------------------------------------
function menuState(){

    gameStage.removeAllChildren();
    gameStage.addChild(imageObj.GAME_BACKGROUND);
    gameStage.addChild(imageObj.WHITE_SHEET);
        
    $.ajax({
        type: "GET",
        url: config.api.origin + "/api/users/me",
        xhrFields: {
            withCredentials: true
        }
    }).done(function(data, status, xhr){

        if (xhr.status === 200) {
            var url = data.profile_image_url.replace("_normal", "" );
            setTwitterIconToImageObj(url);

        }

    }).fail(function(){
        alert("?")
        gameStage.addChild(imageObj.BUTTON_TWITTER_LOGIN);
    }).always(function(){

        gameStage.addChild(imageObj.BUTTON_START);
        gameStage.addChild(imageObj.BUTTON_HOW_TO);
        gameStage.addChild(imageObj.BUTTON_RANKING);
        gameStage.addChild(imageObj.BUTTON_CREDIT);
        gameStage.addChild(imageObj.BUTTON_REGUSTRATION_RANKING);
        gameStage.addChild(imageObj.BUTTON_TWITTER_TOP);
        gameStage.addChild(ssObj.BUTTON_SOUND_SS);
        gameStage.addChild(imageObj.MENU_LOGO);

        ssObj.BUTTON_CHANGE_CHARA.gotoAndPlay(playCharacter);
        gameStage.addChild(ssObj.BUTTON_CHANGE_CHARA);

        gameStage.addChild(imageObj.BUTTON_TWITTER_LOGOUT);
        gameStage.addChild(imageObj.TWITTER_ICON);

        if(soundObj.SOUND_ZENKAI.playState != createjs.Sound.PLAY_SUCCEEDED){
            soundObj.SOUND_ZENKAI.play("none",0,0,-1,0.4,0);
        }

        tickListener = createjs.Ticker.addEventListener("tick", function(){
            gameStage.update();
        });
    })


    // if(!isLogin){
    //     gameStage.addChild(imageObj.BUTTON_TWITTER_LOGIN);
    // }else{

    //     var url = getTwitterIconURL();

    //     if(url === ""){

    //         setTwitterIconToImageObj(url);
    //         gameStage.addChild(imageObj.BUTTON_TWITTER_LOGOUT);
    //         gameStage.addChild(imageObj.TWITTER_ICON);

    //         // // Graphicsのインスタンスを作成します。
    //         // var graphics = new createjs.Graphics();

    //         // // 色の指定（線と塗りつぶしとそれぞれ色を指定する）
    //         // graphics.beginStroke("#55acee");
    //         // graphics.beginFill("#55acee");

    //         // // 図形の描画を行う（ここのバリエーションを後述します）

    //         // var height = gameScrean.height*0.1;
    //         // var width = gameScrean.width*0.5;

    //         // graphics
    //         //      .moveTo(0,0)
    //         //      .lineTo(width,0)
    //         //      .lineTo(width,height)
    //         //      .lineTo(0,height)
    //         //      .closePath();

    //         // // Shapeとして、Stageに追加します。
    //         // var shape = new createjs.Shape(graphics);
    //         // shape.x = 0;
    //         // shape.y = gameScrean.height-height;
    //         // gameStage.addChild(shape);

    //         // var name = new createjs.Text();
    //         // setTextProperties(name, gameScrean.width*0.3, gameScrean.height*0.92, gameScrean.width*0.04, "Courier", "center", gameScrean.width*0.04);
    //         // name.text = "@"+screen_name

    //         // gameStage.addChild(name);

    //     }

    // }

}
//操作説明画面------------------------------------------
function howToPlayState(){  

    gameStage.removeAllChildren();

    howToPlayInit();

}
//クレジット画面------------------------------------------
function creditState(){

    gameStage.removeAllChildren();
    gameStage.addChild(imageObj.GAME_BACKGROUND);
    gameStage.addChild(imageObj.BUTTON_BACK_TOP_FROM_CREDIT);
    gameStage.addChild(textObj.TEXT_LINK_ME);
    gameStage.addChild(textObj.TEXT_LINK_SAN);
    gameStage.addChild(textObj.TEXT_LINK_LOVELIVE);
    gameStage.addChild(textObj.TEXT_LINK_1);
    gameStage.addChild(textObj.TEXT_LINK_2);



    gameStage.update();
}
// ランキング画面------------------------------------------
function rankingState(){

    gameStage.removeAllChildren();
    gameStage.addChild(imageObj.GAME_BACKGROUND);
    gameStage.addChild(imageObj.BUTTON_BACK_TOP_FROM_RANKING);
    gameStage.addChild(textObj.TEXT_RANKING);

    //テキストボックスを表示する
    $("#rankingName").show();


    gameStage.update();
}

// ゲーム画面------------------------------------------
function gameState(){

    gameStage.removeAllChildren();

    gameInit();

}
// GAMEOVER画面------------------------------------------
function gameOverState(){

    player.img.gotoAndPlay("down");

    gameStage.removeAllChildren();

    switch(playCharacter){
        case "honoka":
            ssObj.BUTTON_TWITTER_GAMEOVER_SS.gotoAndPlay("honoka");
            break;
        case "erichi":
            ssObj.BUTTON_TWITTER_GAMEOVER_SS.gotoAndPlay("erichi");
            break;
    }

    gameStage.addChild(imageObj.GAME_BACKGROUND);
    gameStage.addChild(player.img);
    gameStage.addChild(imageObj.BUTTON_BACK_TOP);
    gameStage.addChild(imageObj.BUTTON_RESTART);
    gameStage.addChild(ssObj.BUTTON_TWITTER_GAMEOVER_SS);
    gameStage.addChild(textObj.TEXT_GAME_COUNT);
    gameStage.addChild(imageObj.GAMEOVER);

    // ランキング登録
    if(isLogin){
        registration();
    }

    tickListener = createjs.Ticker.addEventListener("tick", function(){
        gameStage.update();
    });


}

