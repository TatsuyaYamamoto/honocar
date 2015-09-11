//ほのかちゃ------------------------------------------------
function Player(playCharacter){


    switch(playCharacter){
        case "honoka":
            this.img = ssObj.PLAYER_HONOKA_SS;
            break;
        case "erichi":
            this.img = ssObj.PLAYER_ERICHI_SS;
            break;
    }

    this.img = ssObj.PLAYER_HONOKA_SS;

    //レーンナンバー
    this.lane = 1;
    this.img.x = this.checkLane();

}
Player.prototype.checkLane = function(){

    switch(this.lane){
        case 0:
            return (gameScrean.width/8);
            break;
        case 1:
            return (gameScrean.width/8)*3;
            break;
        case 2:
            return (gameScrean.width/8)*5;
            break;
        case 3:
            return (gameScrean.width/8)*7;
            break;
    }
}

Player.prototype.moveRight = function(){
    this.lane ++;
    SOUND_KAIHI.play("none",0,0,0,1,0);
    createjs.Tween.get(this.img)
        .call(this.img.gotoAndPlay, ["escapeR"])
            .to({x : this.checkLane()}, 100);
}
Player.prototype.moveLeft = function(){
    this.lane --;
    SOUND_KAIHI.play("none",0,0,0,1,0);
    createjs.Tween.get(this.img)
        .call(this.img.gotoAndPlay, ["escapeL"])
            .to({x : this.checkLane()}, 100);
}

Player.prototype.howToMove =function(){

    createjs.Tween.get(this.img, {loop:true})
        .call(this.img.gotoAndPlay, ["escapeR"])
            .to({x : (gameScrean.width/8)*5}, 100)
                .wait(500)
                    .call(this.img.gotoAndPlay, ["escapeL"])
                        .to({x : (gameScrean.width/8)*3}, 100)
                            .wait(500);
}

function Car(number){
    this.init(number);
}

Car.prototype.init = function(number){


    switch(number){
        case 0:
            this.img = new createjs.Bitmap(queue.getResult("CAR1_BACK"));
            this.img.x = gameScrean.width/8;
            this.img.y = gameScrean.height + CAR1_IMG_HEIGHT/2;
            this.img.regX = CAR1_IMG_WIDTH/2;
            this.img.regY = CAR1_IMG_HEIGHT/2;
            this.img.scaleY = this.img.scaleX = gameScreenScale;
            this.lane = 0;
            this.passed = false;
            break;
        case 1:
            this.img = new createjs.Bitmap(queue.getResult("CAR1_BACK"));
            this.img.x = (gameScrean.width/8)*3;
            this.img.y = gameScrean.height + CAR1_IMG_HEIGHT/2;
            this.img.regX = CAR1_IMG_WIDTH/2;
            this.img.regY = CAR1_IMG_HEIGHT/2;
            this.img.scaleY = this.img.scaleX = gameScreenScale;
            this.lane = 1;
            this.passed = false;
            break;
        case 2:
            this.img = new createjs.Bitmap(queue.getResult("CAR1_FRONT"));
            this.img.x = (gameScrean.width/8)*5;
            this.img.y = -CAR1_IMG_HEIGHT/2;
            this.img.regX = CAR1_IMG_WIDTH/2;
            this.img.regY = CAR1_IMG_HEIGHT/2;
            this.img.scaleY = this.img.scaleX = gameScreenScale;
            this.lane = 2;
            this.passed = false;
            break;
        case 3:
            this.img = new createjs.Bitmap(queue.getResult("CAR1_FRONT"));
            this.img.x = (gameScrean.width/8)*7;
            this.img.y = -CAR1_IMG_HEIGHT/2;
            this.img.regX = CAR1_IMG_WIDTH/2;
            this.img.regY = CAR1_IMG_HEIGHT/2;
            this.img.scaleY = this.img.scaleX = gameScreenScale;
            this.lane = 3;
            this.passed = false;
            break;
    }

    gameStage.addChild(this.img);

    this.move();
}
Car.prototype.move = function(){

    var target = this;


    switch(target.lane){
        case 0:
            createjs.Tween.get(target.img)
                .to({y : -CAR1_IMG_HEIGHT}, CAR_SPEED_SLOW)
                    .call(function(){
                        target.passed = true;
                    });
            break;
        case 1:
            createjs.Tween.get(target.img)
                .to({y : -CAR1_IMG_HEIGHT}, CAR_SPEED_FAST)
                    .call(function(){
                        target.passed = true;
                    });
            break;
        case 2:
            createjs.Tween.get(target.img)
                .to({y : gameScrean.height + CAR1_IMG_HEIGHT}, CAR_SPEED_FAST)
                    .call(function(){
                        target.passed = true;
                    });
            break;
        case 3:
            createjs.Tween.get(target.img)
                .to({y : gameScrean.height + CAR1_IMG_HEIGHT}, CAR_SPEED_SLOW)
                    .call(function(){
                        target.passed = true;
                    });
            break;


    }

}


