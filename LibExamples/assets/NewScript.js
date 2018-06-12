// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var LineChart = require("LineChart")

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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        let node = new cc.Node();
        this.node.addChild(node);
        let gp = node.addComponent(cc.Graphics);
        gp.fillColor = new cc.Color(255,100,100,255);
        gp.fillRect(0,0,30,30);

        let chartNode = new cc.Node();
        chartNode.setContentSize(500,500);
        chartNode.x = -200;
        this.node.addChild(chartNode);
        let chart = chartNode.addComponent(LineChart);
        this.tweenChart = chart;

        let fpsNpde = new cc.Node();
        fpsNpde.setContentSize(500,500);
        fpsNpde.x = -200;
        this.node.addChild(fpsNpde);
        this.chart = fpsNpde.addComponent(LineChart);
        this.chart.setYAxis(0,0.02);

        let endX = 300;
        chart.setAxis(0,2,node.x,endX);
        this.tween = lib.Tween.to(node,2,{x:endX},lib.Ease.CUBIC_EASE_IN_OUT);
    },

    update (dt) {
        this.time += dt;
        if(this.tween.isPlaying == false) return;
        this.tweenChart.addPoint(this.time,this.tween.target.x);

        let fps = 60*(1/60)/dt;
        this.chart.setXAxis(this.time - 2,this.time);
        console.log(this.time - 2, this.time);
        //console.log(this.time,fps);
        this.chart.addPoint(this.time,dt);
    },
});



