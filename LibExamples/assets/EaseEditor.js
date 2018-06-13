// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var LineChart = require("LineChart");

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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.node.anchorX = this.node.anchorY = 0.5;

        this.pointTouchRadius = 15 * 15;

        this.bezierWidth = 200;
        this.bezierHeight = 200;

        this.node.setContentSize(this.bezierWidth,this.bezierHeight * 2);

        let bg = new cc.Node();
        bg.setContentSize(this.bezierWidth,this.bezierHeight * 2);
        //this.node.addChild(bg);
        let bgGraphics = bg.addComponent(cc.Graphics);
        bgGraphics.fillColor = new cc.Color(0xaa,0xaa,0xaa,100);
        bgGraphics.fillRect(0,0,this.bezierWidth,this.bezierHeight * 2);

        this.bezierNode = new cc.Node();
        this.bezierNode.x = -this.bezierWidth / 2;
        this.bezierNode.y = -this.bezierHeight / 2;
        this.bezierNode.setContentSize(this.bezierWidth,this.bezierHeight);
        this.node.addChild(this.bezierNode);
        this.bezier = this.bezierNode.addComponent(LineChart);
        this.bezier.setAxis(0,1,0,1);

        this.bezierLineNode = new cc.Node();
        this.bezierLineNode.x = this.bezierNode.x;
        this.bezierLineNode.y = this.bezierNode.y;
        this.node.addChild(this.bezierLineNode);
        this.bezierLine = this.bezierLineNode.addComponent(cc.Graphics);
        this.bezierLine.lineWidth = 1;
        this.bezierLine.strokeColor = new cc.Color(0xff,0xff,0xff,0xff);

        this.pointContainer = new cc.Node();
        this.bezierNode.addChild(this.pointContainer);
        this.points = [];
        this.pointId = 1;
        this.addPoint(0,0);
        this.addPoint(1,1);

        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove,this);
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向速度
            onKeyPressed: this.onKeyDown.bind(this)
        },this.node);
    },

    addPoint(x,y) {
        let node = new cc.Node();
        this.pointContainer.addChild(node);
        let graphics = node.addComponent(cc.Graphics);
        graphics.circle(0,0,5);
        graphics.lineWidth = 2;
        graphics.strokeColor = new cc.Color(0xff,0x66,0x66,0xff);
        graphics.stroke();
        node.x = x * this.bezierWidth;
        node.y = y * this.bezierHeight;
        let point = {id:this.pointId++,x:x * this.bezierWidth,y:y * this.bezierHeight,coordx:x,coordy:y,node:node};
        this.points.push(point);
        this.points.sort(function (a,b) {
            return a.x - b.x;
        });
        this.drawBezierLine();
        return point;
    },

    drawBezierLine() {
        this.bezierLine.clear();
        if(this.points.length > 1) lib.Bezier.drawCubicBezier(this.bezierLine,this.points,100,1);
        console.log(this.points);
    },

    touchStart(event) {
        let p = event.getLocationInView();
        p = this.changeTouchPoint(p);
        let positionX = p.x * this.bezierWidth;
        let positionY = p.y * this.bezierHeight;
        for(let i = 1; i < this.points.length - 1; i++) {
            if((this.points[i].x - positionX) * (this.points[i].x - positionX) + (this.points[i].y - positionY) * (this.points[i].y - positionY) < this.pointTouchRadius) {
                this.touchPoint(this.points[i]);
                return;
            }
        }
        this.selectPoint(this.addPoint(p.x,p.y));
    },

    selectPoint(point) {
        if(this.selectedPoint) {
            this.selectedPoint.node.scale = 1;
        }
        this.selectedPoint = point;
        this.selectedPoint.node.scale = 1.5;
    },

    touchPoint(point) {
        this.selectPoint(point);
    },

    touchMove(event) {
        if(this.selectedPoint) {
            let p = event.getLocationInView();
            p = this.changeTouchPoint(p);
            if(p.x < 0) {
                p.x = 0;
            }
            if(p.x > 1) {
                p.x = 1;
            }
            let positionX = p.x * this.bezierWidth;
            let positionY = p.y * this.bezierHeight;
            this.selectedPoint.x = positionX;
            this.selectedPoint.y = positionY;
            this.selectedPoint.coordx = p.x;
            this.selectedPoint.coordy = p.y;
            this.selectedPoint.node.x = positionX;
            this.selectedPoint.node.y = positionY;
            this.points.sort(function (a,b) {
                return a.x - b.x;
            });
            this.drawBezierLine();
        }
    },

    onKeyDown(keyCode,event) {
        console.log(keyCode);
        if(this.selectedPoint) {
            if(keyCode == 46) {
                console.log("delete point");
                this.points.splice(this.points.indexOf(this.selectedPoint),1);
                this.selectedPoint.node.destroy();
                this.selectedPoint = null;
                this.drawBezierLine();
            }
        }
    },

    changeTouchPoint(p) {
        p = this.node.convertToNodeSpace(p);
        p.x /= this.bezierWidth;
        p.y = -p.y;
        p.y += this.bezierHeight/2;
        p.y /= this.bezierHeight;
        return {x:p.x,y:p.y};
    },

    start () {
    },

    // update (dt) {},
});
