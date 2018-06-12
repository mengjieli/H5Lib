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
        xEnd:1,
        yBegin:0,
        yEnd:1,
        currentLine:false,
        axisColor:0xaaaaaa,
        lineColor:0xffffff,
        autoRemoveSmaller:true,
        smooth:false,
        showCalibration:true,
        calibrationChange:false,
        calibrationNode:cc.Node,
        radius:2
    },

    setAxis(xBegin = 0,xEnd = 1,yBegin = 0,yEnd = 1) {
        this.xBegin = xBegin;
        this.xEnd = xEnd;
        this.yBegin = yBegin;
        this.yEnd = yEnd;
        this.hasChange = true;
        this.calibrationChange = true;
    },

    setXAxis(begin = 0,end = 1) {
        this.xBegin = begin;
        this.xEnd = end;
        this.hasChange = true;
        this.calibrationChange = true;
    },

    setYAxis(begin = 0,end = 1) {
        this.yBegin = begin;
        this.yEnd = end;
        this.hasChange = true;
        this.calibrationChange = true;
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

        let w = this.node.getContentSize().width;
        let h = this.node.getContentSize().height;
        let nx = ~~(w/50) + 1;
        let ny = ~~(h/50) + 1;

        if(this.showCalibration) {

            for(let i = 0; i < nx; i++) {
                this.moveTo(i * 50, 0);
                this.lineTo(i * 50, 20);
                this.stroke();
            }

            for(let i = 1; i < ny; i++) {
                this.moveTo(0, i * 50);
                this.lineTo(20,i * 50);
                this.stroke();
            }

            if(this.calibrationChange) {
                this.calibrationChange = false;
                if(this.calibrationNode == null) {
                    this.calibrationNode = new cc.Node();
                    this.node.addChild(this.calibrationNode);
                }
                this.calibrationNode.removeAllChildren(true);

                for(let i = 0; i < nx; i++) {
                    let tnode = new cc.Node();
                    tnode.x = i * 50;
                    tnode.y = 0;
                    this.calibrationNode.addChild(tnode);
                    tnode.anchorX = 0;
                    tnode.anchorY = 1;
                    let tlabel = tnode.addComponent(cc.Label);
                    tlabel.fontSize = 18;
                    tlabel.string = ~~((this.xBegin + (this.xEnd - this.xBegin) * tnode.x / w) * Math.pow(10,this.radius))/Math.pow(10,this.radius);
                }

                for(let i = 0; i < ny; i++) {
                    let tnode = new cc.Node();
                    tnode.x = -5;
                    tnode.y = i * 50;
                    this.calibrationNode.addChild(tnode);
                    tnode.anchorX = 1;
                    tnode.anchorY = 0.5;
                    let tlabel = tnode.addComponent(cc.Label);
                    tlabel.fontSize = 18;
                    tlabel.string = ~~((this.yBegin + (this.yEnd - this.yBegin) * tnode.y / h)* Math.pow(10,this.radius)) /Math.pow(10,this.radius);
                }
            }
        }

        this.strokeColor = new cc.Color(this.lineColor>>16,(this.lineColor>>8)&0xFF,this.lineColor&0xFF);

        let lines = [];
        let findStart = false;
        for(let i = 0; i < this.points.length; i++) {
            if(this.points[i][0] < this.xBegin || this.points[i].x > this.xEnd) {
                continue;
            }
            if(!findStart) {
                this.points.splice(0,i);
                i = 0;
                findStart = true;
                lines.push({x:(this.points[i][0] - this.xBegin) / (this.xEnd - this.xBegin) * this.node.getContentSize().width,y:(this.points[i][1] - this.yBegin) / (this.yEnd - this.yBegin) * this.node.getContentSize().height});
            } else {
                lines.push({x:(this.points[i][0] - this.xBegin) / (this.xEnd - this.xBegin) * this.node.getContentSize().width,y:(this.points[i][1] - this.yBegin) / (this.yEnd - this.yBegin) * this.node.getContentSize().height});
            }
        }
        if(this.smooth) {
            lines = lib.Bezier.getCubicBezierLines(lines);
        }

        for(let i = 0; i < lines.length; i++) {
            if(i == 0) {
                this.moveTo(lines[i].x,lines[i].y);
            } else {
                this.lineTo(lines[i].x,lines[i].y);
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