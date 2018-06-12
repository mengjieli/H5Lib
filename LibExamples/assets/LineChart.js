// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Graphics,

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
        points : [],
        hasChange : false,
        xBegin:0,
        xEnd:0,
        yBegin:0,
        yEnd:0,
        currentLine:false,
        axisColor:0xaaaaaa,
        lineColor:0xffffff,
        autoRemoveSmaller:true
    },

    setAxis(xBegin = 0,xEnd = 1,yBegin = 0,yEnd = 1) {
        this.xBegin = xBegin;
        this.xEnd = xEnd;
        this.yBegin = yBegin;
        this.yEnd = yEnd;
        this.hasChange = true;
    },

    setXAxis(begin = 0,end = 1) {
        this.xBegin = begin;
        this.xEnd = end;
        this.hasChange = true;
    },

    setYAxis(begin = 0,end = 1) {
        this.yBegin = begin;
        this.yEnd = end;
        this.hasChange = true;
    },

    addPoint(x,y) {
        this.points.push([x,y]);
        this.hasChange = true;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.lineWidth = 1;
        this.strokeColor = new cc.Color(255,255,255,255);
    },

    update() {
        if(!this.hasChange) return;
        this.hasChange = false;
        this.clear();
        this.strokeColor = new cc.Color(this.axisColor>>16,(this.axisColor>>8)&0xFF,this.axisColor&0xFF);
        this.moveTo(0,0);
        this.lineTo(this.node.getContentSize().width,0);
        this.moveTo(0,0);
        this.lineTo(0,this.node.getContentSize().height);
        this.stroke();

        this.strokeColor = new cc.Color(this.lineColor>>16,(this.lineColor>>8)&0xFF,this.lineColor&0xFF);
        let findStart = false;
        for(let i = 0; i < this.points.length; i++) {
            if(this.points[i][0] < this.xBegin || this.points[i].x > this.xEnd) {
                continue;
            }
            if(!findStart) {
                this.points.splice(0,i);
                i = 0;
                findStart = true;
                this.moveTo((this.points[i][0] - this.xBegin) / (this.xEnd - this.xBegin) * this.node.getContentSize().width,(this.points[i][1] - this.yBegin) / (this.yEnd - this.yBegin) * this.node.getContentSize().height);
            } else {
                this.lineTo((this.points[i][0] - this.xBegin) / (this.xEnd - this.xBegin) * this.node.getContentSize().width,(this.points[i][1] - this.yBegin) / (this.yEnd - this.yBegin) * this.node.getContentSize().height);
            }
        }
        this.stroke();
        if(this.currentLine && this.points.length) {
            this.moveTo((this.points[this.points.length - 1][0] - this.xBegin) / (this.xEnd - this.xBegin) * this.node.getContentSize().width,0);
            this.lineTo((this.points[this.points.length - 1][0] - this.xBegin) / (this.xEnd - this.xBegin) * this.node.getContentSize().width,this.node.getContentSize().height);
        }
        this.stroke();
    },



    // update (dt) {},
});