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
var EaseEditor = require("EaseEditor");

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
        chart:null,
        time:0,
        tween:null,
        tweenChart:null,
        allTime : 0.1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let n = new cc.Node();
        n.x = 200;
        n.y = 100;
        this.node.addChild(n);
        n.addComponent(EaseEditor);

        this.allTime = 3;

        let node = new cc.Node();
        node.y = -200;
        this.node.addChild(node);
        let gp = node.addComponent(cc.Graphics);
        gp.fillColor = new cc.Color(255,100,100,255);
        gp.fillRect(0,0,30,30);

        let chartNode = new cc.Node();
        chartNode.anchorX = 0;
        chartNode.anchorY = 0;
        chartNode.setContentSize(500,500);
        chartNode.x = -400;
        chartNode.y = -250;
        this.node.addChild(chartNode);
        let chart = chartNode.addComponent(LineChart);
        chart.showCalibration = false;
        this.tweenChart = chart;

        let fpsNpde = new cc.Node();
        fpsNpde.setContentSize(500,500);
        fpsNpde.x = -400;
        fpsNpde.y = -250;
        fpsNpde.anchorX = 0;
        fpsNpde.anchorY = 0;
        //this.node.addChild(fpsNpde);
        this.chart = fpsNpde.addComponent(LineChart);
        this.chart.setYAxis(0,0.06);
        this.chart.showCalibration = false;

        let endX = 300;
        this.tweenChart.setAxis(0,this.allTime,node.x,endX);//new lib.BezierEase([{x:0.29,y:0.63},{x:0.64,y:0.92}])
        this.tween = lib.Tween.to(node,this.allTime,{x:endX}).ease(new lib.BezierEase([{x:0.236,y:0.22},{x:0.46,y:1},{x:0.62,y:0.62},{x:0.76,y:1},{x:0.9,y:0.76}])).update(function(){
            console.log(this.tween.currentTime,this.tween.target.x);
            this.tweenChart.addPoint(this.tween.currentTime,this.tween.target.x);
        },this);


        //let mnode = new cc.Node();
        //mnode.setContentSize(500,500);
        //mnode.x = -400;
        //mnode.y = -250;
        //mnode.anchorX = 0;
        //mnode.anchorY = 0;
        //this.node.addChild(mnode);
        //let mchart = mnode.addComponent(LineChart);
        //mchart.setAxis(0,1,0,300);
        //let max = 200;
        //for(let i = 0; i < max; i++) {
        //    mchart.addPoint(i / max,lib.EaseFunction.CubicEaseInOut(i/max) * 300);
        //    console.log(i/max,lib.EaseFunction.CubicEaseInOut(i/max) * 300);
        //}


        let bnode = new cc.Node();
        this.node.addChild(bnode);

        let tnode = new cc.Node();
        tnode.anchorX = 0;
        tnode.anchorY = 0;
        tnode.x = -200;
        tnode.y = -200;
        this.node.addChild(tnode);
        tnode.setContentSize(500,500);
        let pts = [{x:0,y:0},{x:300,y:300}];

        //let bgp = tnode.addComponent(cc.Graphics);
        //tnode.on(cc.Node.EventType.TOUCH_START,function(event){
        //    let p = event.getLocation();
        //    p.x -= cc.director.getWinSize().width/2 + tnode.x;
        //    p.y -= cc.director.getWinSize().height/2 + tnode.y;
        //    pts.push(p);
        //    pts.sort(function (a,b) {
        //        return a.x - b.x;
        //    }
        //    bgp.clear();
        //    lib.Bezier.drawCubicBezier(bgp,pts,10,1);
        //    console.log(pts);
        //})
        //bgp.lineWidth = 1;
        //bgp.strokeColor = new cc.Color(255,255,255,255);
        //lib.Bezier.drawCubicBezier(bgp,pts,10,1);
    },

    update (dt) {
        this.time += dt;
        if(this.tween.isPlaying == false) return;
        //this.tweenChart.addPoint(this.time,this.tween.target.x);

        let fps = 60*(1/60)/dt;
        this.chart.setXAxis(this.time - this.allTime,this.time);
        //console.log(this.time - 2, this.time);
        //console.log((~~(this.time*1000))/1000,(~~(dt*1000))/1000,this.tween.target.x);
        this.chart.addPoint(this.time,dt);
    },
});



