window.onload = function() {
    cc.game.onStart = function() {
        var GameLayer = cc.Layer.extend({
            ctor: function() {
                this._super();
                var size = cc.winSize; //cc.director.getWinSize();
                //加载背景图
                var bg = new cc.Sprite('res/bgLayer.jpg');
                this.addChild(bg, 1);
                bg.x = size.width / 2;
                bg.y = size.height / 2;
                //加载5个小人，不断做旋转和放缩
                for (var i = 0; i < 5; i++) {
                    var man = new cc.Sprite('res/small_images/fly_0001.png');
                    man.runAction(cc.spawn(cc.rotateBy(1, 360, 360), cc.sequence(cc.scaleTo(1, 2), cc.scaleTo(1, 1))).repeatForever());
                    //this.addChild(man, 2);
                    man.x = size.width * Math.random();
                    man.y = size.height * Math.random();
                }

                //加载5个小人，不断做20帧的动画播放
                for (var j = 0; j < 5; j++) {
                    var man = new cc.Sprite();
                    var animation = new cc.Animation();
                    for (var i = 1; i <= 20; i++) {
                        animation.addSpriteFrameWithFile('res/small_images/fly_00' + (i < 10 ? ('0' + i) : i) + '.png');
                    }
                    animation.setDelayPerUnit(1 / 7); //控制动画播放频率
                    man.x = 0;
                    man.y = size.height / 2;
                    man.runAction(cc.animate(animation).repeatForever());
                    this.addChild(man, 3);
                }
                return true;
            }
        });

        var GameScene = cc.Scene.extend({
            onEnter: function() {
                this._super();
                var layer = new GameLayer();
                this.addChild(layer);
            }
        });

        cc.director.runScene(new GameScene());
    }

    cc.game.run("gameCanvas");
};