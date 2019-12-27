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
    isMouseMoving: false,
    startTouchPos: null,
    // use this for initialization
    onLoad: function () {
        cc.sys.dump();
        this.startTouchPos =  new cc.Vec2();
        this.updateGameSize();
        cc.log('Hello World!!! =================');
        this.label.string = this.text;
        
        this.node.android = this.node.getChildByName('android');
        
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (e) => {
            if (!this.isMouseMoving) return;
            var p = e.touch.getLocation();
            p = this.node.convertToNodeSpaceAR(p);
            this.node.android.x = p.x - this.startTouchPos.x;
            this.node.android.y = p.y - this.startTouchPos.y;
        }, this, true);
        
        this.node.android.on(cc.Node.EventType.TOUCH_START, (e) => {
            this.isMouseMoving = true;
            var p = e.touch.getLocation();
            p = this.node.android.convertToNodeSpaceAR(p);
            this.startTouchPos = p;
        }, this);

        this.node.android.on(cc.Node.EventType.TOUCH_END, (e) => {
            this.isMouseMoving = false;
        }, this);

        this.node.android.on(cc.Node.EventType.TOUCH_CANCEL, (e) => {
            this.isMouseMoving = false;
        }, this);

        var fruitSpine = this.node.getChildByName('fruitSpine');
        var freeSpineSpine = this.node.getChildByName('freeSpineSpine');

        var t = 1;
    },

    updateGameSize()
    {
        var canvas = this.node.parent;
        var canvasComp = canvas.getComponent('cc.Canvas');
        var designSize = canvasComp.designResolution;
        var frameSize = cc.view.getFrameSize();
        if (designSize.width / designSize.height > frameSize.width / frameSize.height)
        {
            canvasComp.fitWidth = false;
            canvasComp.fitHeight = true;
        }
        else {
            canvasComp.fitWidth = true;
            canvasComp.fitHeight = false;
        }
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
        var fruitSpine = view.getChildByName('fruitSpine');
        var way = 1;
        if (way == 1)
        {
            var sp = cc.instantiate(fruitSpine);
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

    onLoadSceneClick(e)
    {
        this.node.parent.removeChild(this.node);
        //cc.loader.release('29b52a20-83e9-4c69-ac7b-56d657db64ad');
        cc.loader.releaseAll();
        /*
        cc.director.loadScene('GameScene', ()=>{
            cc.log('load GameScene complete!');
        });
        */
    },

    // called every frame
    update: function (dt) {

    },
});
