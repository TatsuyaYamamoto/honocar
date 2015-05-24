//ほのかちゃ------------------------------------------------
function Honoka(){

    //ほのかちゃんスプライトシート読み込み
    var honokaSpriteSheet = new createjs.SpriteSheet({
        images: [ queue.getResult("HONOKA_SS") ],
        frames: {
            width:HONOKA_IMG_WIDTH,
            height:HONOKA_IMG_HEIGHT
        },
        animations: {
            kihon: {
                frames: [0,1],
                next: true,
                speed: 0.3
            },
            escapeR: {
                frames:[2,3,4],
                next: "kihon",
                speed:0.5
            },
            escapeL: {
                frames:[4,3,2],
                next: "kihon",
                speed:0.5
            }
        }
    });

    //画像初期化
    this.img = new createjs.Sprite(honokaSpriteSheet,"kihon");
    this.img.y = gameScrean.height/2
    this.img.regX = HONOKA_IMG_WIDTH/2;
    this.img.regY = HONOKA_IMG_HEIGHT/2;
    this.img.scaleY = this.img.scaleX = gameScreenScale;

    //レーンナンバー
    this.lane = 2;
    this.img.x = this.checkLane();

}
Honoka.prototype.checkLane = function(){

    switch(this.lane){
        case 1:
            return (gameScrean.width/8);
            break;
        case 2:
            return (gameScrean.width/8)*3;
            break;
        case 3:
            return (gameScrean.width/8)*5;
            break;
        case 4:
            return (gameScrean.width/8)*7;
            break;
    }
}

Honoka.prototype.moveRight = function(){
    this.lane ++;
    createjs.Sound.play("KAIHI");
    this.img.gotoAndPlay("escapeR");
    createjs.Tween.get(this.img)
        .to({x : this.checkLane()}, 100);
}
Honoka.prototype.moveLeft = function(){
    this.lane --;
    playSound(SOUND_KAIHI);
    this.img.gotoAndPlay("escapeL");
    createjs.Tween.get(this.img)
        .to({x : this.checkLane()}, 100);
}


function Car(number){
    this.init(number);
}

Car.prototype.init = function(number){


    switch(number){
        case 1:
            this.img = new createjs.Bitmap(queue.getResult("CAR1"));
            this.img.x = gameScrean.width/8;
            this.img.y = -CAR1_IMG_HEIGHT/2;
            this.img.regX = CAR1_IMG_WIDTH/2;
            this.img.regY = CAR1_IMG_HEIGHT/2;
            this.img.scaleY = this.img.scaleX = gameScreenScale;

            this.lane = 1;
            break;
        case 2:
            this.img = new createjs.Bitmap(queue.getResult("CAR1"));
            this.img.x = (gameScrean.width/8)*3;
            this.img.y = 0;
            this.lane = 1;
            break;
        case 3:
            this.img = new createjs.Bitmap(queue.getResult("CAR1"));
            this.img.x = (gameScrean.width/8)*5;
            this.img.y = 0;
            this.lane = 3;
            break;
        case 4:
            this.img = new createjs.Bitmap(queue.getResult("CAR1"));
            this.img.x = (gameScrean.width/8)*7;
            this.img.y = 0;
            this.lane = 4;
            break;
    }

    gameStage.addChild(this.img);
    this.move();
}
Car.prototype.move = function(){
    createjs.Tween.get(this.img)
        .to({y : gameScrean.height}, 2000);
}


