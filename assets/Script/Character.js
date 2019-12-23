// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        speed: 2
    },
    character:null,
    isMovingLeft: 0,
    isMovingRight: 0,
    // LIFE-CYCLE CALLBACKS:
    onKeyDown(e)
    {
        switch(e.keyCode) {
            case cc.macro.KEY.left:
                this.isMovingLeft = true;
                break;
            case cc.macro.KEY.right:
                this.isMovingRight = true;
                break;
        }
    },

    onKeyUp(e)
    {
        switch(e.keyCode) {
            case cc.macro.KEY.left:
                this.isMovingLeft = false;
                break;
            case cc.macro.KEY.right:
                this.isMovingRight = false;
                break;
        }
    },

    onLoad () {
        let canvas = cc.game.canvas;
        cc.log(canvas.width + "  " + canvas.height);
        this.character = this.node;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    start () {

    },

    onDestroy () {
        // Cancel keyboard input monitoring
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    update (dt) {
        let canvas = cc.game.canvas;
        var posX = this.character.x;
        if (this.isMovingLeft) 
        {
            posX -= this.speed;
        }
        else if (this.isMovingRight) 
        {
            posX += this.speed;
        }
        if (posX > cc.winSize.width*0.5 - this.character.width*0.5) posX = cc.winSize.width*0.5 - this.character.width*0.5;
        if (posX < -cc.winSize.width*0.5 + this.character.width*0.5) posX = -cc.winSize.width*0.5 + this.character.width*0.5;
    
        this.character.x = posX;
    },
});
