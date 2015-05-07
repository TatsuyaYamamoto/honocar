//ほのかちゃ------------------------------------------------
function Honoka(){

    //ほのかちゃ
    HONOKA_IMG = new createjs.Bitmap();

    HONOKA_KIHON = new createjs.Bitmap(queue.getResult("HONOKA_KIHON"));
    HONOKA_KAIHI1_1 = new createjs.Bitmap(queue.getResult("HONOKA_KAIHI1_1"));
    HONOKA_KAIHI1_2 = new createjs.Bitmap(queue.getResult("HONOKA_KAIHI1_2"));
    HONOKA_KAIHI1_3 = new createjs.Bitmap(queue.getResult("HONOKA_KAIHI1_3"));

    HONOKA_IMG.image = HONOKA_KIHON.image;

    HONOKA_IMG.scaleY = HONOKA_IMG.scaleX = gameScreenScale;
    position(HONOKA_IMG, (gameScrean.width/8)*3, (gameScrean.height/2));

    this.alive = true;
    this.image = HONOKA_IMG;
    this.lane = new Lane(2);

}


Honoka.prototype.moveRight = function(){
    rightButtonDisable();

    changeImageToKaihi1_1();
    var tem_x = this.image.x;
    createjs.Tween.get(this.image)
        .to({x : tem_x+(gameScrean.width/8)},70)
            .call(changeImageToKaihi1_2)
                .to({x : tem_x+(gameScrean.width/6)},70)
                    .call(changeImageToKaihi1_3)
                        .to({x : tem_x+(gameScrean.width/4)},70)
                            .call(changeImageToKihon)
                                .call(rightButtonEnable);
    this.lane.number ++;
}
Honoka.prototype.moveLeft = function(){
    leftButtonDisable();
    changeImageToKaihi1_3();

    var tem_x = this.image.x;
    createjs.Tween.get(this.image)
        .to({x : tem_x-(gameScrean.width/8)},70)
            .call(changeImageToKaihi1_2)
                .to({x : tem_x-(gameScrean.width/6)},70)
                    .call(changeImageToKaihi1_1)
                        .to({x : tem_x-(gameScrean.width/4)},70)
                            .call(changeImageToKihon)
                                .call(leftButtonEnable);
    this.lane.number --;
}

function changeImageToKihon(){
    HONOKA_IMG.image = HONOKA_KIHON.image
}
function changeImageToKaihi1_1(){
    HONOKA_IMG.image = HONOKA_KAIHI1_1.image;
}
function changeImageToKaihi1_2(){
    HONOKA_IMG.image = HONOKA_KAIHI1_2.image;
}
function changeImageToKaihi1_3(){
    HONOKA_IMG.image = HONOKA_KAIHI1_3.image;
}



function Car(){

    CAR_IMG = new createjs.Bitmap();
    CAR1 = new createjs.Bitmap(queue.getResult("CAR1"));

    CAR_IMG.image = CAR1.image;

    this.alive = true;
    this.image = CAR_IMG;
    this.lane = new Lane(2);
}