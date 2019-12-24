const vutils = require('vutils');
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        coin: cc.Node,
        fruitSpine: cc.Node,
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        cc.log('Hello World!!! =================');
        this.label.string = this.text;
        vutils.setupDebugClick(this.node);
    },

    onCocosClick(e)
    {
        cc.log('cocos click.');
        //var anim = this.coin.getComponent(cc.Animation);
        //var animState = anim.play('coin_anim');
        //var animState = anim.play('coin_anim_slow');
        //animState.wrapMode = cc.WrapMode.Loop;
        //var spine = this.coin.getComponent(sp.Skeleton);

        var view = this.node;
        var coin = view.getChildByName('coin');
        var way = 2;
        if (way == 1)
        {
            var sp = cc.instantiate(coin);
        }
        else { // 2
            var sp = new cc.Node();

            let spriteComponent = sp.addComponent('cc.Sprite');
            spriteComponent.spriteFrame = coin.getComponent('cc.Sprite').spriteFrame;
        }
        
        sp.x = Math.random()*300;
        sp.y = Math.random()*300;
        this.node.addChild(sp);
    },
    // called every frame
    update: function (dt) {

    },
});
