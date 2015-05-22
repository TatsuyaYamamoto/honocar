//ほのかちゃ------------------------------------------------
function Honoka(){

    //ほのかちゃ
    honokaSpriteSheet = new createjs.SpriteSheet({
        images: [ queue.getResult("HONOKA_SS") ],
        frames: {
            width:186,
            height:267
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
    HONOKA_IMG = new createjs.Sprite(honokaSpriteSheet,"kihon");
    HONOKA_IMG.x = (gameScrean.width/8)*3;
    HONOKA_IMG.y = gameScrean.height/2
    HONOKA_IMG.regX = 186/2;
    HONOKA_IMG.regY = 267/2;
    HONOKA_IMG.scaleY = HONOKA_IMG.scaleX = gameScreenScale;
    
    //position(HONOKA_IMG, (gameScrean.width/8)*3, (gameScrean.height/2));

    this.alive = true;
    this.lane = 2;

}


Honoka.prototype.moveRight = function(){
    rightButtonDisable();
    this.lane ++;
    createjs.Sound.play("KAIHI");

    HONOKA_IMG.gotoAndPlay("escapeR");

    var tmp_x = HONOKA_IMG.x;
    createjs.Tween.get(HONOKA_IMG)
        .to({x : tmp_x + (gameScrean.width/4)},100)
            .call(checkRightButton);

}
Honoka.prototype.moveLeft = function(){
    leftButtonDisable();
    this.lane --;
    playSound(SOUND_KAIHI);

    HONOKA_IMG.gotoAndPlay("escapeL");

    var tmp_x = HONOKA_IMG.x;
    createjs.Tween.get(HONOKA_IMG)
        .to({x : tmp_x - (gameScrean.width/4)},100)
            .call(checkLeftButton);
}


function Car(){

    CAR_IMG = new createjs.Bitmap();
    CAR1 = new createjs.Bitmap(queue.getResult("CAR1"));

    CAR_IMG.image = CAR1.image;

    this.alive = true;
    this.image = CAR_IMG;
    this.lane = new Lane(2);
}