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
        cc.log('Hello World! =================');
        this.label.string = this.text;
        vutils.setupDebugClick(this.node);
    },

    onCocosClick(e)
    {
        cc.log('cocos click.');
        var anim = this.coin.getComponent(cc.Animation);
        var animState = anim.play('coin_anim');
        //var animState = anim.play('coin_anim_slow');
        //animState.wrapMode = cc.WrapMode.Loop;
        var spine = this.coin.getComponent(sp.Skeleton);
    },
    // called every frame
    update: function (dt) {

    },
});
