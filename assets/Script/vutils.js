module.exports = 
{
    isDebugClickSet: false,
    isCtrlKey: false,

    trace: function(str)
    {
        cc.log(str);
    },

    debugClickRecursive: function(node, precessors, wpos)
    {
        if (!node.active || node.opacity == 0) return false;
        precessors.push(node.name);
        var isChildHit = false;
        for (var i = 0; i < node.childrenCount; i++)
        {
            var hit = this.debugClickRecursive(node.children[i], precessors, wpos);
            if (hit) isChildHit = true;
        }
        var isSelfHit = isChildHit;
        if (!isSelfHit)
        {
            var lpos = node.parent.convertToNodeSpaceAR(wpos);
            var bd = node.getBoundingBox();
            isSelfHit = bd.contains(lpos);

            if (isSelfHit)
            {
                var str = node.name;
                var p = node.parent;
                while (p)
                {
                    str = p.name + " >> " + str;
                    p = p.parent;
                }

                this.trace('debug click: ' + str);
            }
        }

        precessors.pop();
        return isSelfHit;
    },

    setupDebugClick: function(node)
    {
        if (this.isDebugClickSet) return;
        this.isDebugClickSet = true;
        node.on(cc.Node.EventType.TOUCH_START, (e) => {
            if (!this.isCtrlKey) return;
            var currentTarget = e.currentTarget;
            var pos = e.getStartLocation();
            this.debugClickRecursive(currentTarget, [], pos);
        }, this, true);

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