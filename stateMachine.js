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
        url: config.api.origin + "/api/twitter/users/me",
        xhrFields: {
            withCredentials: true
        }
    }).done(function(data, status, xhr){

        var url = data.profile_image_url.replace("_normal", "" );
        setTwitterIconToImageObj(url);
        gameStage.addChild(imageObj.BUTTON_TWITTER_LOGOUT);
        gameStage.addChild(imageObj.TWITTER_ICON);

        $.ajax({
            type: "POST",
            url: config.api.origin + "/api/game/users/" + data.id,
            xhrFields: {
                withCredentials: true
            },
            contentType: 'application/json',
            data: JSON.stringify({
                user_id: data.screen_name
            })
        })


    }).fail(function(){
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

        if(soundObj.SOUND_ZENKAI.playState != createjs.Sound.PLAY_SUCCEEDED){
            soundObj.SOUND_ZENKAI.play("none",0,0,-1,0.4,0);
        }

        tickListener = createjs.Ticker.addEventListener("tick", function(){
            gameStage.update();
        });
    })

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
    registration();

    tickListener = createjs.Ticker.addEventListener("tick", function(){
        gameStage.update();
    });


}

