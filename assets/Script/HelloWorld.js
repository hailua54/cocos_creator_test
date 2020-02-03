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
    debugLabel: cc.Label,
    fpsDur: 0,
    fpsCount: 0,
    debugStr: '',
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

        //cc.view.enableAntiAlias(false);
        this.debugLabel = this.node.getChildByName('label').getComponent(cc.Label);
        this.fpsDur = 0;
        this.fpsCount = 0;
        this.debugStr = '123456 ';
    },

    updateGameSize()
    {
        var canvas = this.node.parent;
        var canvasComp = canvas.getComponent('cc.Canvas');
        var designSize = canvasComp.designResolution;
        var frameSize = cc.view.getFrameSize();
        /*
        if (designSize.width / designSize.height > frameSize.width / frameSize.height)
        {
            canvasComp.fitWidth = false;
            canvasComp.fitHeight = true;
        }
        else {
            canvasComp.fitWidth = true;
            canvasComp.fitHeight = false;
        }
        */
        canvasComp.fitWidth = true;
    },

    onCocosClick(e)
    {
        cc.log('cocos click. ');
        if (cc.sys.isBrowser) cc.log('web --------------');
        else cc.log('native --------------');
        //var anim = this.coin.getComponent(cc.Animation);
        //var animState = anim.play('coin_anim');
        //var animState = anim.play('coin_anim_slow');
        //animState.wrapMode = cc.WrapMode.Loop;
        //var spine = this.coin.getComponent(sp.Skeleton);

        var view = this.node;
        var coin = view.getChildByName('coin');
        var fruitSpine = view.getChildByName('fruitSpine');
        var particleCoin = view.getChildByName('ParticleCoin');
        //particleCoin.active = !particleCoin.active;
        particleCoin.opacity = particleCoin.opacity ? 0 : 255;
        /*
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

        */
        var player = this.node.getComponent('SoundPlayer');
        cc.audioEngine.play(player.click);
        cc.audioEngine.playMusic(player.bgMusic, true);
        
    },

    onStopEffect()
    {
        cc.audioEngine.stopAllEffects();
    },

    onToggleMusic()
    {
        if (cc.audioEngine.isMusicPlaying()) cc.audioEngine.pauseMusic();
        else cc.audioEngine.resumeMusic();
    },

    onLoadSceneClick(e)
    {
        // IMPORTANCE NOTE: ----------------------------------------------------
        // remove a node from scene can cause : the node and all it accessor not be able to call onDestroy()
        // because the node is removed from tree graph call root_scope._deferredDestroy() -> accessor._destroyImmediate(){all childs + all components -> _destroyImmediate()}
        //this.node.parent.removeChild(this.node, true);
        //cc.loader.releaseAll();
        // ----------------------------------------------------------------------
        this.node.active = false;
        cc.director.loadScene('helloworld', ()=>{
            cc.log('load GameScene complete!');
        });
    },

    // called every frame
    update: function (dt) {
        this.fpsDur += dt;
        this.fpsCount++;
        if (this.fpsDur > 1)
        {
            this.fpsDur -= 1;
            this.debugLabel.string = this.debugStr + ' ' + this.fpsCount;
            this.fpsCount = 0;
        }
    },
});
