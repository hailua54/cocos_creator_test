module.exports = 
{
    isDebugClickSet: false,
    isCtrlKey: false,

    trace: function(str)
    {
        cc.log(str);
    },

    debugClickRecursive: function(node)
    {
        if (!node.active || node.opacity == 0) return false;

        for (var i = 0; i < node.childrenCount; i++)
        {
            this.debugClickRecursive(node.children[i]);
        }

        node.on(cc.Node.EventType.TOUCH_START, (e) => {
            if (!this.isCtrlKey) return;
            var currentTarget = e.currentTarget;
            //e.stopPropagation();

            var str = currentTarget.name;
            var p = currentTarget.parent;
            while (p) {
                str = p.name + " >> " + str;
                p = p.parent;
            }

            this.trace('debug click: ' + str);

        }, this);
    },

    setupDebugClick: function(node)
    {
        if (this.isDebugClickSet) return;
        this.isDebugClickSet = true;

        this.debugClickRecursive(node);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (e)=>{
            switch(e.keyCode) {
                case cc.macro.KEY.ctrl:
                    this.isCtrlKey = true;
                    break;
            }
        }, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (e)=>{
            switch(e.keyCode) {
                case cc.macro.KEY.ctrl:
                    this.isCtrlKey = false;
                    break;
            }
        }, this);
    }
}