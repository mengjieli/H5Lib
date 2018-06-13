var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lib;
(function (lib) {
    var BasicPlugin = (function () {
        function BasicPlugin() {
        }
        BasicPlugin.prototype.init = function (tween, propertiesTo, propertiesFrom) {
            this.tween = tween;
            this._attributes = propertiesTo;
            this.keys = Object.keys(propertiesTo);
            var target = tween.target;
            var startAttributes = {};
            var keys = this.keys;
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var key = keys[i];
                if (propertiesFrom && key in propertiesFrom) {
                    startAttributes[key] = propertiesFrom[key];
                }
                else {
                    startAttributes[key] = target[key];
                }
            }
            this.startAttributes = startAttributes;
            return null;
        };
        BasicPlugin.prototype.update = function (value) {
            var target = this.tween.target;
            var keys = this.keys;
            var length = keys.length;
            var startAttributes = this.startAttributes;
            for (var i = 0; i < length; i++) {
                var key = keys[i];
                target[key] = (this._attributes[key] - startAttributes[key]) * value + startAttributes[key];
            }
        };
        return BasicPlugin;
    }());
    lib.BasicPlugin = BasicPlugin;
})(lib || (lib = {}));
var lib;
(function (lib) {
    var Ease = (function () {
        function Ease() {
        }
        Ease.registerEaseFunction = function (name, ease) {
            lib.EaseFunction[name] = ease;
        };
        Ease.NONE = "None";
        Ease.SINE_EASE_IN = "SineEaseIn";
        Ease.SINE_EASE_OUT = "SineEaseOut";
        Ease.SINE_EASE_IN_OUT = "SineEaseInOut";
        Ease.SINE_EASE_OUT_IN = "SineEaseOutIn";
        Ease.QUAD_EASE_IN = "QuadEaseIn";
        Ease.QUAD_EASE_OUT = "QuadEaseOut";
        Ease.QUAD_EASE_IN_OUT = "QuadEaseInOut";
        Ease.QUAD_EASE_OUT_IN = "QuadEaseOutIn";
        Ease.CUBIC_EASE_IN = "CubicEaseIn";
        Ease.CUBIC_EASE_OUT = "CubicEaseOut";
        Ease.CUBIC_EASE_IN_OUT = "CubicEaseInOut";
        Ease.CUBIC_EASE_OUT_IN = "CubicEaseOutIn";
        Ease.QUART_EASE_IN = "QuartEaseIn";
        Ease.QUART_EASE_OUT = "QuartEaseOut";
        Ease.QUART_EASE_IN_OUT = "QuartEaseInOut";
        Ease.QUART_EASE_OUT_IN = "QuartEaseOutIn";
        Ease.QUINT_EASE_IN = "QuintEaseIn";
        Ease.QUINT_EASE_OUT = "QuintEaseOut";
        Ease.QUINT_EASE_IN_OUT = "QuintEaseInOut";
        Ease.QUINT_EASE_OUT_IN = "QuintEaseOutIn";
        Ease.EXPO_EASE_IN = "ExpoEaseIn";
        Ease.EXPO_EASE_OUT = "ExpoEaseOut";
        Ease.EXPO_EASE_IN_OUT = "ExpoEaseInOut";
        Ease.EXPO_EASE_OUT_IN = "ExpoEaseOutIn";
        Ease.CIRC_EASE_IN = "CircEaseIn";
        Ease.CIRC_EASE_OUT = "CircEaseOut";
        Ease.CIRC_EASE_IN_OUT = "CircEaseInOut";
        Ease.CIRC_EASE_OUT_IN = "CircEaseOutIn";
        Ease.BACK_EASE_IN = "BackEaseIn";
        Ease.BACK_EASE_OUT = "BackEaseOut";
        Ease.BACK_EASE_IN_OUT = "BackEaseInOut";
        Ease.BACK_EASE_OUT_IN = "BackEaseOutIn";
        Ease.ELASTIC_EASE_IN = "ElasticEaseIn";
        Ease.ELASTIC_EASE_OUT = "ElasticEaseOut";
        Ease.ELASTIC_EASE_IN_OUT = "ElasticEaseInOut";
        Ease.ELASTIC_EASE_OUT_IN = "ElasticEaseOutIn";
        Ease.BOUNCE_EASE_IN = "BounceEaseIn";
        Ease.BOUNCE_EASE_OUT = "BounceEaseOut";
        Ease.BOUNCE_EASE_IN_OUT = "BounceEaseInOut";
        Ease.BOUNCE_EASE_OUT_IN = "BounceEaseOutIn";
        return Ease;
    }());
    lib.Ease = Ease;
})(lib || (lib = {}));
var lib;
(function (lib) {
    var EaseFunction = (function () {
        function EaseFunction() {
        }
        EaseFunction.None = function (t) {
            return t;
        };
        EaseFunction.SineEaseIn = function (t) {
            return Math.sin((t - 1) * Math.PI * .5) + 1;
        };
        EaseFunction.SineEaseOut = function (t) {
            return Math.sin(t * Math.PI * .5);
        };
        EaseFunction.SineEaseInOut = function (t) {
            return Math.sin((t - .5) * Math.PI) * .5 + .5;
        };
        EaseFunction.SineEaseOutIn = function (t) {
            if (t < 0.5) {
                return Math.sin(t * Math.PI) * .5;
            }
            return Math.sin((t - 1) * Math.PI) * .5 + 1;
        };
        EaseFunction.QuadEaseIn = function (t) {
            return t * t;
        };
        EaseFunction.QuadEaseOut = function (t) {
            return -(t - 1) * (t - 1) + 1;
        };
        EaseFunction.QuadEaseInOut = function (t) {
            if (t < .5) {
                return t * t * 2;
            }
            return -(t - 1) * (t - 1) * 2 + 1;
        };
        EaseFunction.QuadEaseOutIn = function (t) {
            var s = (t - .5) * (t - .5) * 2;
            if (t < .5) {
                return .5 - s;
            }
            return .5 + s;
        };
        EaseFunction.CubicEaseIn = function (t) {
            return t * t * t;
        };
        EaseFunction.CubicEaseOut = function (t) {
            return (t - 1) * (t - 1) * (t - 1) + 1;
        };
        EaseFunction.CubicEaseInOut = function (t) {
            if (t < .5) {
                return t * t * t * 4;
            }
            return (t - 1) * (t - 1) * (t - 1) * 4 + 1;
        };
        EaseFunction.CubicEaseOutIn = function (t) {
            return (t - .5) * (t - .5) * (t - .5) * 4 + .5;
        };
        EaseFunction.QuartEaseIn = function (t) {
            return t * t * t * t;
        };
        EaseFunction.QuartEaseOut = function (t) {
            var a = (t - 1);
            return -a * a * a * a + 1;
        };
        EaseFunction.QuartEaseInOut = function (t) {
            if (t < .5) {
                return t * t * t * t * 8;
            }
            var a = (t - 1);
            return -a * a * a * a * 8 + 1;
        };
        EaseFunction.QuartEaseOutIn = function (t) {
            var s = (t - .5) * (t - .5) * (t - .5) * (t - .5) * 8;
            if (t < .5) {
                return .5 - s;
            }
            return .5 + s;
        };
        EaseFunction.QuintEaseIn = function (t) {
            return t * t * t * t * t;
        };
        EaseFunction.QuintEaseOut = function (t) {
            var a = t - 1;
            return a * a * a * a * a + 1;
        };
        EaseFunction.QuintEaseInOut = function (t) {
            if (t < .5) {
                return t * t * t * t * t * 16;
            }
            var a = t - 1;
            return a * a * a * a * a * 16 + 1;
        };
        EaseFunction.QuintEaseOutIn = function (t) {
            var a = t - .5;
            return a * a * a * a * a * 16 + 0.5;
        };
        EaseFunction.ExpoEaseIn = function (t) {
            return Math.pow(2, 10 * (t - 1));
        };
        EaseFunction.ExpoEaseOut = function (t) {
            return -Math.pow(2, -10 * t) + 1;
        };
        EaseFunction.ExpoEaseInOut = function (t) {
            if (t < .5) {
                return Math.pow(2, 10 * (t * 2 - 1)) * .5;
            }
            return -Math.pow(2, -10 * (t - .5) * 2) * .5 + 1.00048828125;
        };
        EaseFunction.ExpoEaseOutIn = function (t) {
            if (t < .5) {
                return -Math.pow(2, -20 * t) * .5 + .5;
            }
            return Math.pow(2, 10 * ((t - .5) * 2 - 1)) * .5 + .5;
        };
        EaseFunction.CircEaseIn = function (t) {
            return 1 - Math.sqrt(1 - t * t);
        };
        EaseFunction.CircEaseOut = function (t) {
            return Math.sqrt(1 - (1 - t) * (1 - t));
        };
        EaseFunction.CircEaseInOut = function (t) {
            if (t < .5) {
                return .5 - Math.sqrt(.25 - t * t);
            }
            return Math.sqrt(.25 - (1 - t) * (1 - t)) + .5;
        };
        EaseFunction.CircEaseOutIn = function (t) {
            var s = Math.sqrt(.25 - (.5 - t) * (.5 - t));
            if (t < .5) {
                return s;
            }
            return 1 - s;
        };
        EaseFunction.BackEaseIn = function (t) {
            return 2.70158 * t * t * t - 1.70158 * t * t;
        };
        EaseFunction.BackEaseOut = function (t) {
            var a = t - 1;
            return 2.70158 * a * a * a + 1.70158 * a * a + 1;
        };
        EaseFunction.BackEaseInOut = function (t) {
            var a = t - 1;
            if (t < .5) {
                return 10.80632 * t * t * t - 3.40316 * t * t;
            }
            return 10.80632 * a * a * a + 3.40316 * a * a + 1;
        };
        EaseFunction.BackEaseOutIn = function (t) {
            var a = t - .5;
            if (t < .5) {
                return 10.80632 * a * a * a + 3.40316 * a * a + .5;
            }
            return 10.80632 * a * a * a - 3.40316 * a * a + .5;
        };
        EaseFunction.ElasticEaseIn = function (t) {
            if (t == 0 || t == 1)
                return t;
            return -(Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.075) * 2 * Math.PI / .3));
        };
        EaseFunction.ElasticEaseOut = function (t) {
            if (t == 0 || t == .5 || t == 1)
                return t;
            return (Math.pow(2, 10 * -t) * Math.sin((-t - .075) * 2 * Math.PI / .3)) + 1;
        };
        EaseFunction.ElasticEaseInOut = function (t) {
            if (t == 0 || t == .5 || t == 1)
                return t;
            if (t < .5) {
                return -(Math.pow(2, 10 * t - 10) * Math.sin((t * 2 - 2.15) * Math.PI / .3));
            }
            return (Math.pow(2, 10 - 20 * t) * Math.sin((-4 * t + 1.85) * Math.PI / .3)) * .5 + 1;
        };
        EaseFunction.ElasticEaseOutIn = function (t) {
            if (t == 0 || t == .5 || t == 1)
                return t;
            if (t < .5) {
                return (Math.pow(2, -20 * t) * Math.sin((-t * 4 - .15) * Math.PI / .3)) * .5 + .5;
            }
            return -(Math.pow(2, 20 * (t - 1)) * Math.sin((t * 4 - 4.15) * Math.PI / .3)) * .5 + .5;
        };
        EaseFunction.bounceEaseIn = function (t) {
            return 1 - EaseFunction.bounceEaseOut(1 - t);
        };
        EaseFunction.bounceEaseOut = function (t) {
            var s;
            var a = 7.5625;
            var b = 2.75;
            if (t < (1 / 2.75)) {
                s = a * t * t;
            }
            else if (t < (2 / b)) {
                s = (a * (t - (1.5 / b)) * (t - (1.5 / b)) + .75);
            }
            else if (t < (2.5 / b)) {
                s = (a * (t - (2.25 / b)) * (t - (2.25 / b)) + .9375);
            }
            else {
                s = (a * (t - (2.625 / b)) * (t - (2.625 / b)) + .984375);
            }
            return s;
        };
        EaseFunction.BounceEaseInOut = function (t) {
            if (t < .5)
                return EaseFunction.bounceEaseIn(t * 2) * .5;
            else
                return EaseFunction.bounceEaseOut(t * 2 - 1) * .5 + .5;
        };
        EaseFunction.BounceEaseOutIn = function (t) {
            if (t < .5)
                return EaseFunction.bounceEaseOut(t * 2) * .5;
            else
                return EaseFunction.bounceEaseIn(t * 2 - 1) * .5 + .5;
        };
        EaseFunction.BounceEaseIn = EaseFunction.bounceEaseIn;
        EaseFunction.BounceEaseOut = EaseFunction.bounceEaseOut;
        return EaseFunction;
    }());
    lib.EaseFunction = EaseFunction;
})(lib || (lib = {}));
var lib;
(function (lib) {
    var TimeLine = (function (_super) {
        __extends(TimeLine, _super);
        function TimeLine() {
            _super.apply(this, arguments);
            this.tweens = [];
            this._currentTime = 0;
            this._totalTime = 0;
            this.invalidTotalTime = true;
            this._loop = false;
            this._isPlaying = false;
            this.calls = [];
        }
        Object.defineProperty(TimeLine.prototype, "totalTime", {
            get: function () {
                return this.getTotalTime();
            },
            enumerable: true,
            configurable: true
        });
        TimeLine.prototype.getTotalTime = function () {
            if (this.invalidTotalTime == true) {
                return this._totalTime;
            }
            this.invalidTotalTime = true;
            var tweens = this.tweens;
            var endTime = 0;
            var time;
            for (var i = 0, len = tweens.length; i < len; i++) {
                time = tweens[i].startTime + tweens[i].time;
                if (time > endTime) {
                    endTime = time;
                }
            }
            this._totalTime = endTime * 1000;
            return this._totalTime;
        };
        TimeLine.prototype.$invalidateTotalTime = function () {
            if (this.invalidTotalTime == false) {
                return;
            }
            this.invalidTotalTime = false;
        };
        Object.defineProperty(TimeLine.prototype, "loop", {
            get: function () {
                return this._loop;
            },
            set: function (value) {
                this._loop = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeLine.prototype, "isPlaying", {
            get: function () {
                return this._isPlaying;
            },
            enumerable: true,
            configurable: true
        });
        TimeLine.prototype.update = function (dt) {
            dt *= 1000;
            var timeStamp = (new Date()).getTime();
            var totalTime = this.getTotalTime();
            var lastTime = this._currentTime;
            this._currentTime += dt;
            var currentTime = -1;
            var loopTime = 0;
            if (this._currentTime >= totalTime) {
                currentTime = this._currentTime % totalTime;
                loopTime = Math.floor(this._currentTime / totalTime);
                if (!this._loop) {
                    this.$setPlaying(false);
                }
            }
            while (loopTime > -1) {
                if (loopTime && currentTime != -1) {
                    this._currentTime = totalTime;
                }
                var calls = this.calls;
                var call;
                var len = calls.length;
                for (i = 0; i < len; i++) {
                    call = calls[i];
                    if (call.time > lastTime && call.time <= this._currentTime || (call.time == 0 && lastTime == 0 && this._currentTime)) {
                        call.callBack.apply(call.thisObj, call.args);
                    }
                }
                var tweens = this.tweens;
                var tween;
                len = tweens.length;
                for (var i = 0; i < len; i++) {
                    tween = tweens[i];
                    if (tween.$startTime + tween.$time > lastTime && tween.$startTime <= this._currentTime || (tween.$startTime == 0 && lastTime == 0 && this._currentTime)) {
                        tween.$update(this._currentTime);
                    }
                }
                loopTime--;
                if (loopTime == 0) {
                    if (currentTime != -1) {
                        lastTime = 0;
                        this._currentTime = currentTime;
                    }
                    this._isPlaying = false;
                    this.node.removeComponent(TimeLine);
                }
                else {
                    if (loopTime) {
                        lastTime = 0;
                    }
                }
                if (this._loop == false) {
                    break;
                }
            }
            return true;
        };
        TimeLine.prototype.play = function () {
            var now = (new Date()).getTime();
            this.$setPlaying(true, now);
        };
        TimeLine.prototype.stop = function () {
            this.$setPlaying(false);
        };
        TimeLine.prototype.$setPlaying = function (value, time) {
            if (time === void 0) { time = 0; }
            if (this._isPlaying == value) {
                return;
            }
            this._isPlaying = value;
            if (value) {
                this.update(0);
            }
            else {
            }
        };
        TimeLine.prototype.gotoAndPlay = function (time) {
            if (!this.tweens.length) {
                return;
            }
            time = +time | 0;
            time = time < 0 ? 0 : time;
            if (time > this.totalTime) {
                time = this.totalTime;
            }
            this._currentTime = time;
            var now = (new Date()).getTime();
            this.$setPlaying(true, now);
        };
        TimeLine.prototype.gotoAndStop = function (time) {
            if (!this.tweens.length) {
                return;
            }
            time = +time | 0;
            time = time < 0 ? 0 : time;
            if (time > this.totalTime) {
                time = this.totalTime;
            }
            this._currentTime = time;
            var now = (new Date()).getTime();
            this.$setPlaying(false);
        };
        TimeLine.prototype.addTween = function (tween) {
            this.tweens.push(tween);
            tween.$setTimeLine(this);
            this.$invalidateTotalTime();
            return tween;
        };
        TimeLine.prototype.removeTween = function (tween) {
            var tweens = this.tweens;
            for (var i = 0, len = tweens.length; i < len; i++) {
                if (tweens[i] == tween) {
                    tweens.splice(i, 1)[0].$setTimeLine(null);
                    this.$invalidateTotalTime();
                    break;
                }
            }
            if (tweens.length == 0) {
                this.$setPlaying(false);
            }
        };
        TimeLine.prototype.call = function (time, callBack, thisObj) {
            if (thisObj === void 0) { thisObj = null; }
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            this.calls.push({ "time": time, "callBack": callBack, "thisObj": thisObj, "args": args });
        };
        return TimeLine;
    }(cc.Component));
    lib.TimeLine = TimeLine;
})(lib || (lib = {}));
var lib;
(function (lib) {
    var Tween = (function () {
        function Tween(target, time, propertiesTo, propertiesFrom) {
            if (propertiesFrom === void 0) { propertiesFrom = null; }
            this.invalidProperty = false;
            this.$startTime = 0;
            this._currentTime = 0;
            this._startEvent = "";
            this.pugins = [];
            if (Tween.plugins == null) {
                Tween.registerPlugin("center", lib.TweenCenter);
                Tween.registerPlugin("path", lib.TweenPath);
                Tween.registerPlugin("physicMove", lib.TweenPhysicMove);
            }
            time = +time;
            if (time < 0) {
                time = 0;
            }
            this.$time = time * 1000;
            this._target = target;
            this._propertiesTo = propertiesTo;
            this._propertiesFrom = propertiesFrom;
            this.ease("None");
            var timeLine;
            if (target instanceof cc.Node) {
                timeLine = target.addComponent(lib.TimeLine);
            }
            else {
                timeLine = new lib.TimeLine();
            }
            timeLine.addTween(this);
        }
        Object.defineProperty(Tween.prototype, "propertiesTo", {
            set: function (value) {
                if (value == this._propertiesTo) {
                    return;
                }
                this._propertiesTo = value;
                this.invalidProperty = false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "propertiesFrom", {
            set: function (value) {
                if (value == this._propertiesFrom) {
                    return;
                }
                this._propertiesFrom = value;
                this.invalidProperty = false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "time", {
            get: function () {
                return this.$time / 1000;
            },
            set: function (value) {
                value = +value | 0;
                this.$time = (+value) * 1000;
                if (this._timeLine) {
                    this._timeLine.$invalidateTotalTime();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "startTime", {
            get: function () {
                return this.$startTime / 1000;
            },
            set: function (value) {
                value = +value | 0;
                if (value < 0) {
                    value = 0;
                }
                if (value == this.$startTime) {
                    return;
                }
                this.$startTime = value * 1000;
                if (this._timeLine) {
                    this._timeLine.$invalidateTotalTime();
                }
                this.invalidProperty = false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "target", {
            get: function () {
                return this._target;
            },
            set: function (value) {
                if (value == this.target) {
                    return;
                }
                this.removeTargetEvent();
                this._target = value;
                this.invalidProperty = false;
                this.addTargetEvent();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "currentTime", {
            get: function () {
                return this._currentTime / 1000;
            },
            enumerable: true,
            configurable: true
        });
        Tween.prototype.ease = function (val) {
            if (typeof val == "string") {
                if (!Tween.easeCache[val]) {
                    var func = lib.EaseFunction[val];
                    if (func == null) {
                        return;
                    }
                    var cache = [];
                    for (var i = 0; i <= 3000; i++) {
                        cache[i] = func(i / 3000);
                    }
                    Tween.easeCache[val] = cache;
                }
                this._ease = val;
                this._easeData = Tween.easeCache[val];
            }
            else {
                this._ease = "";
                this._easeData = null;
                this._easeExt = val;
            }
            return this;
        };
        Object.defineProperty(Tween.prototype, "startEvent", {
            get: function () {
                return this._startEvent;
            },
            set: function (type) {
                this.removeTargetEvent();
                this._startEvent = type;
                this.addTargetEvent();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "startTarget", {
            get: function () {
                return this._startTarget;
            },
            set: function (value) {
                this.removeTargetEvent();
                this._startTarget = value;
                this.addTargetEvent();
            },
            enumerable: true,
            configurable: true
        });
        Tween.prototype.removeTargetEvent = function () {
            var target;
            if (this._startTarget) {
                target = this._startTarget;
            }
            else {
                target = this._target;
            }
            if (target && this._startEvent && this._startEvent != "") {
                target.removeListener(this._startEvent, this.startByEvent, this);
            }
        };
        Tween.prototype.addTargetEvent = function () {
            var target;
            if (this._startTarget) {
                target = this._startTarget;
            }
            else {
                target = this._target;
            }
            if (target && this._startEvent && this._startEvent != "") {
                target.addListener(this._startEvent, this.startByEvent, this);
            }
        };
        Tween.prototype.play = function () {
            this.timeLine.play();
        };
        Tween.prototype.stop = function () {
            this.timeLine.stop();
        };
        Object.defineProperty(Tween.prototype, "isPlaying", {
            get: function () {
                return this.timeLine.isPlaying;
            },
            enumerable: true,
            configurable: true
        });
        Tween.prototype.startByEvent = function () {
            this._timeLine.gotoAndPlay(0);
        };
        Object.defineProperty(Tween.prototype, "timeLine", {
            get: function () {
                if (!this._timeLine) {
                    this._timeLine = new lib.TimeLine();
                    this._timeLine.addTween(this);
                }
                return this._timeLine;
            },
            enumerable: true,
            configurable: true
        });
        Tween.prototype.$setTimeLine = function (value) {
            if (this._timeLine) {
                this._timeLine.removeTween(this);
            }
            this._timeLine = value;
        };
        Tween.prototype.initParmas = function () {
            var controller;
            var params = this._propertiesTo;
            var allPlugins = Tween.plugins;
            if (params) {
                var keys = Object.keys(allPlugins);
                var deletes = [];
                for (var i = 0, len = keys.length; i < len; i++) {
                    if (keys[i] in params) {
                        var plugin = allPlugins[keys[i]];
                        controller = new plugin();
                        deletes = deletes.concat(controller.init(this, params, this._propertiesFrom));
                        this.pugins.push(controller);
                    }
                }
                for (i = 0; i < deletes.length; i++) {
                    delete params[deletes[i]];
                }
                keys = Object.keys(params);
                for (i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    if (!(typeof (key) == "string")) {
                        delete params[key];
                        keys.splice(i, 1);
                        i--;
                        continue;
                    }
                    var attribute = params[key];
                    if (!(typeof (attribute) == "number") || !(key in this._target)) {
                        delete params[key];
                        keys.splice(i, 1);
                        i--;
                        continue;
                    }
                }
                if (keys.length) {
                    controller = new lib.BasicPlugin();
                    controller.init(this, params, this._propertiesFrom);
                    this.pugins.push(controller);
                }
            }
            this.invalidProperty = true;
        };
        Tween.prototype.invalidate = function () {
            this.invalidProperty = false;
        };
        Tween.prototype.call = function (callBack, thisObj) {
            if (thisObj === void 0) { thisObj = null; }
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this._complete = callBack;
            this._completeThis = thisObj;
            this._completeParams = args;
            return this;
        };
        Tween.prototype.update = function (callBack, thisObj) {
            if (thisObj === void 0) { thisObj = null; }
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this._update = callBack;
            this._updateThis = thisObj;
            this._updateParams = args;
            return this;
        };
        Tween.prototype.$update = function (time) {
            if (!this.invalidProperty) {
                this.initParmas();
            }
            this._currentTime = time - this.$startTime;
            if (this._currentTime > this.$time) {
                this._currentTime = this.$time;
            }
            var length = this.pugins.length;
            var s = 0;
            if (this._easeData) {
                s = this._easeData[3000 * (this._currentTime / this.$time) | 0];
            }
            else {
                s = this._easeExt.getEase(this._currentTime / this.$time);
            }
            for (var i = 0; i < length; i++) {
                this.pugins[i].update(s);
            }
            if (this._update != null) {
                this._update.apply(this._updateThis, this._updateParams);
            }
            if (this._currentTime == this.$time) {
                if (this._complete != null) {
                    this._complete.apply(this._completeThis, this._completeParams);
                }
            }
            return true;
        };
        Tween.prototype.dispose = function () {
            if (this.timeLine) {
                this.timeLine.removeTween(this);
            }
        };
        Tween.to = function (target, time, propertiesTo, propertiesFrom) {
            if (propertiesFrom === void 0) { propertiesFrom = null; }
            var tween = new Tween(target, time, propertiesTo, propertiesFrom);
            tween.timeLine.play();
            return tween;
        };
        Tween.registerPlugin = function (paramName, plugin) {
            if (Tween.plugins == null) {
                Tween.plugins = {};
            }
            Tween.plugins[paramName] = plugin;
        };
        Tween.hasPlugin = function (paramName) {
            return Tween.plugins[paramName] ? true : false;
        };
        Tween.easeCache = {};
        return Tween;
    }());
    lib.Tween = Tween;
})(lib || (lib = {}));
window.lib = lib;
var lib;
(function (lib) {
    var TweenCenter = (function () {
        function TweenCenter() {
        }
        TweenCenter.prototype.init = function (tween, propertiesTo, propertiesFrom) {
            this.tween = tween;
            var target = tween.target;
            this.centerX = target.width / 2;
            this.centerY = target.height / 2;
            this.centerLength = Math.sqrt(target.width * target.width + target.height * target.height) * .5;
            this.rotationStart = Math.atan2(target.height, target.width) * 180 / Math.PI;
            if (target.rotation) {
                this.lastMoveX = this.centerX - this.centerLength * Math.cos((target.rotation + this.rotationStart) * Math.PI / 180);
                this.lastMoveY = this.centerY - this.centerLength * Math.sin((target.rotation + this.rotationStart) * Math.PI / 180);
            }
            else {
                this.lastMoveX = 0;
                this.lastMoveY = 0;
            }
            var useAttributes = [];
            useAttributes.push("center");
            if ("scaleX" in propertiesTo) {
                this.scaleXTo = +propertiesTo["scaleX"];
                useAttributes.push("scaleX");
                if (propertiesFrom && "scaleX" in propertiesFrom) {
                    this.scaleXFrom = +propertiesFrom["scaleX"];
                }
                else {
                    this.scaleXFrom = target["scaleX"];
                }
            }
            if ("scaleY" in propertiesTo) {
                this.scaleYTo = +propertiesTo["scaleY"];
                useAttributes.push("scaleY");
                if (propertiesFrom && "scaleY" in propertiesFrom) {
                    this.scaleYFrom = +propertiesFrom["scaleY"];
                }
                else {
                    this.scaleYFrom = target["scaleY"];
                }
            }
            if ("rotation" in propertiesTo) {
                this.rotationTo = +propertiesTo["rotation"];
                useAttributes.push("rotation");
                if (propertiesFrom && "rotation" in propertiesFrom) {
                    this.rotationFrom = +propertiesFrom["rotation"];
                }
                else {
                    this.rotationFrom = target["rotation"];
                }
            }
            return useAttributes;
        };
        TweenCenter.prototype.update = function (value) {
            var target = this.tween.target;
            var moveX = 0;
            var moveY = 0;
            if (this.scaleXTo) {
                target.scaleX = this.scaleXFrom + (this.scaleXTo - this.scaleXFrom) * value;
                target.x = this.centerX - target.width / 2;
            }
            if (this.scaleYTo) {
                target.scaleY = this.scaleYFrom + (this.scaleYTo - this.scaleYFrom) * value;
                target.y = this.centerY - target.height / 2;
            }
            if (this.rotationTo) {
                target.rotation = this.rotationFrom + (this.rotationTo - this.rotationFrom) * value;
                moveX += this.centerX - this.centerLength * Math.cos((target.rotation + this.rotationStart) * Math.PI / 180);
                moveY += this.centerY - this.centerLength * Math.sin((target.rotation + this.rotationStart) * Math.PI / 180);
                target.x += moveX - this.lastMoveX;
                target.y += moveY - this.lastMoveY;
            }
            this.lastMoveX = moveX;
            this.lastMoveY = moveY;
        };
        TweenCenter.scaleTo = function (target, time, scaleTo, scaleFrom, ease) {
            if (scaleFrom === void 0) { scaleFrom = null; }
            if (ease === void 0) { ease = "None"; }
            return lib.Tween.to(target, time, {
                "center": true,
                "scaleX": scaleTo,
                "scaleY": scaleTo
            }, ease, scaleFrom == null ? null : { "scaleX": scaleFrom, "scaleY": scaleFrom });
        };
        TweenCenter.rotationTo = function (target, time, rotationTo, rotationFrom, ease) {
            if (rotationFrom === void 0) { rotationFrom = null; }
            if (ease === void 0) { ease = "None"; }
            return lib.Tween.to(target, time, {
                "center": true,
                "rotation": rotationTo
            }, ease, rotationFrom == null ? null : { "rotation": rotationFrom });
        };
        return TweenCenter;
    }());
    lib.TweenCenter = TweenCenter;
})(lib || (lib = {}));
var lib;
(function (lib) {
    var TweenPath = (function () {
        function TweenPath() {
        }
        TweenPath.prototype.init = function (tween, propertiesTo, propertiesFrom) {
            this.tween = tween;
            var useAttributes = [];
            useAttributes.push("path");
            var path = propertiesTo["path"];
            var target = tween.target;
            var start = { x: target.x, y: target.y };
            path.splice(0, 0, start);
            if (propertiesFrom) {
                if ("x" in propertiesFrom) {
                    start.x = +propertiesFrom["x"];
                }
                if ("y" in propertiesFrom) {
                    start.y = +propertiesFrom["y"];
                }
            }
            if ("x" in propertiesTo && "y" in propertiesTo) {
                useAttributes.push("x");
                useAttributes.push("y");
                path.push({ x: +propertiesTo["x"], y: +propertiesTo["y"] });
            }
            this.path = path;
            this.pathSum = [];
            this.pathSum.push(0);
            for (var i = 1, len = path.length; i < len; i++) {
                this.pathSum[i] = this.pathSum[i - 1] + Math.sqrt((path[i].x - path[i - 1].x) * (path[i].x - path[i - 1].x) + (path[i].y - path[i - 1].y) * (path[i].y - path[i - 1].y));
            }
            var sum = this.pathSum[len - 1];
            for (i = 1; i < len; i++) {
                this.pathSum[i] = this.pathSum[i] / sum;
            }
            return useAttributes;
        };
        TweenPath.prototype.update = function (value) {
            var path = this.path;
            var target = this.tween.target;
            var pathSum = this.pathSum;
            var i, len = pathSum.length;
            for (i = 1; i < len; i++) {
                if (value > pathSum[i - 1] && value <= pathSum[i]) {
                    break;
                }
            }
            if (value <= 0) {
                i = 1;
            }
            else if (value >= 1) {
                i = len - 1;
            }
            value = (value - pathSum[i - 1]) / (pathSum[i] - pathSum[i - 1]);
            target.x = value * (path[i].x - path[i - 1].x) + path[i - 1].x;
            target.y = value * (path[i].y - path[i - 1].y) + path[i - 1].y;
        };
        TweenPath.to = function (target, time, path, ease) {
            if (ease === void 0) { ease = "None"; }
            return lib.Tween.to(target, time, { "path": path }, ease);
        };
        TweenPath.vto = function (target, v, path, ease) {
            if (ease === void 0) { ease = "None"; }
            var sum = 0;
            for (var i = 1, len = path.length; i < len; i++) {
                sum += Math.sqrt((path[i].x - path[i - 1].x) * (path[i].x - path[i - 1].x) + (path[i].y - path[i - 1].y) * (path[i].y - path[i - 1].y));
            }
            var time = sum / v;
            return lib.Tween.to(target, time, { "path": path }, ease);
        };
        return TweenPath;
    }());
    lib.TweenPath = TweenPath;
})(lib || (lib = {}));
var lib;
(function (lib) {
    var TweenPhysicMove = (function () {
        function TweenPhysicMove() {
            if (!lib.Tween.hasPlugin("physicMove")) {
                lib.Tween.registerPlugin("physicMove", TweenPhysicMove);
            }
        }
        TweenPhysicMove.prototype.init = function (tween, propertiesTo, propertiesFrom) {
            this.tween = tween;
            var useAttributes = [];
            useAttributes.push("physicMove");
            var target = tween.target;
            var startX = target.x;
            var startY = target.y;
            if (propertiesFrom) {
                if ("x" in propertiesFrom) {
                    startX = +propertiesFrom["x"];
                }
                if ("y" in propertiesFrom) {
                    startY = +propertiesFrom["y"];
                }
            }
            this.startX = startX;
            this.startY = startY;
            var endX = startX;
            var endY = startY;
            if ("x" in propertiesTo) {
                endX = +propertiesTo["x"];
                useAttributes.push("x");
            }
            if ("y" in propertiesTo) {
                endY = +propertiesTo["y"];
                useAttributes.push("y");
            }
            var vx = 0;
            var vy = 0;
            var t = tween.time;
            if ("vx" in propertiesTo) {
                vx = +propertiesTo["vx"];
                useAttributes.push("vx");
                if (!("x" in propertiesTo)) {
                    endX = startX + t * vx;
                }
            }
            if ("vy" in propertiesTo) {
                vy = +propertiesTo["vy"];
                useAttributes.push("vy");
                if (!("y" in propertiesTo)) {
                    endY = startY + t * vy;
                }
            }
            this.vx = vx;
            this.vy = vy;
            this.ax = (endX - startX - vx * t) * 2 / (t * t);
            this.ay = (endY - startY - vy * t) * 2 / (t * t);
            this.time = t;
            return useAttributes;
        };
        TweenPhysicMove.prototype.update = function (value) {
            var target = this.tween.target;
            var t = this.time * value;
            target.x = this.startX + this.vx * t + .5 * this.ax * t * t;
            target.y = this.startY + this.vy * t + .5 * this.ay * t * t;
        };
        TweenPhysicMove.freeFallTo = function (target, time, groundY) {
            return lib.Tween.to(target, time, { "y": groundY, "physicMove": true });
        };
        TweenPhysicMove.freeFallToWithG = function (target, g, groundY) {
            return lib.Tween.to(target, Math.sqrt(2 * (groundY - target.y) / g), { "y": groundY, "physicMove": true });
        };
        TweenPhysicMove.fallTo = function (target, time, groundY, vX, vY) {
            if (vX === void 0) { vX = null; }
            if (vY === void 0) { vY = null; }
            return lib.Tween.to(target, time, { "y": groundY, "physicMove": true, "vx": vX, "vy": vY });
        };
        TweenPhysicMove.fallToWithG = function (target, g, groundY, vX, vY) {
            if (vX === void 0) { vX = null; }
            if (vY === void 0) { vY = null; }
            vX = +vX;
            vY = +vY;
            return lib.Tween.to(target, Math.sqrt(2 * (groundY - target.y) / g + (vY * vY / (g * g))) - vY / g, {
                "y": groundY,
                "physicMove": true,
                "vx": vX,
                "vy": vY
            });
        };
        TweenPhysicMove.to = function (target, time, xTo, yTo, vX, vY) {
            if (vX === void 0) { vX = 0; }
            if (vY === void 0) { vY = 0; }
            return lib.Tween.to(target, time, { "x": xTo, "y": yTo, "vx": vX, "vy": vY, "physicMove": true });
        };
        return TweenPhysicMove;
    }());
    lib.TweenPhysicMove = TweenPhysicMove;
})(lib || (lib = {}));
var lib;
(function (lib) {
    var BezierEase = (function () {
        function BezierEase(points) {
            points.splice(0, 0, { x: 0, y: 0 });
            points.push({ x: 1, y: 1 });
            this.lines = lib.Bezier.getCubicBezierLines(points, 10, 1);
        }
        BezierEase.prototype.getEase = function (t) {
            var lines = this.lines;
            for (var i = 0, len = lines.length; i < len; i++) {
                if (t >= lines[i].x1 && t <= lines[i].x2) {
                    t = lines[i].y1 + (lines[i].y2 - lines[i].y1) * (t - lines[i].x1) / (lines[i].x2 - lines[i].x1);
                    break;
                }
            }
            return t;
        };
        return BezierEase;
    }());
    lib.BezierEase = BezierEase;
})(lib || (lib = {}));
var lib;
(function (lib) {
    var Bezier = (function () {
        function Bezier() {
        }
        Bezier.drawCubicBezier = function (graphics, points, devices, k) {
            if (devices === void 0) { devices = 20; }
            if (k === void 0) { k = 0.5; }
            var lines = Bezier.getCubicBezierLines(points, devices, k);
            for (var i = 0; i < lines.length; i++) {
                graphics.moveTo(lines[i].x1, lines[i].y1);
                graphics.lineTo(lines[i].x2, lines[i].y2);
                graphics.stroke();
            }
        };
        Bezier.getCubicBezierLines = function (points, devices, k) {
            if (devices === void 0) { devices = 20; }
            if (k === void 0) { k = 0.5; }
            var controls = this.getCubicBezierControlPoints(points, k);
            var lines = [];
            var lineLength = 0;
            for (var i = 0; i < points.length - 1; i++) {
                var p1x = points[i].x;
                var p1y = points[i].y;
                var p2x = controls[i * 2].x;
                var p2y = controls[i * 2].y;
                var p3x = controls[i * 2 + 1].x;
                var p3y = controls[i * 2 + 1].y;
                var p4x = points[i + 1].x;
                var p4y = points[i + 1].y;
                var lastX = p1x;
                var lastY = p1y;
                for (var d = 1; d <= devices; d++) {
                    var t = d / devices;
                    var x = p1x * (1 - t) * (1 - t) * (1 - t) + p2x * 3 * (1 - t) * (1 - t) * t + p3x * 3 * (1 - t) * t * t + p4x * t * t * t;
                    var y = p1y * (1 - t) * (1 - t) * (1 - t) + p2y * 3 * (1 - t) * (1 - t) * t + p3y * 3 * (1 - t) * t * t + p4y * t * t * t;
                    lines.push({
                        x1: lastX,
                        y1: lastY,
                        x2: x,
                        y2: y,
                        len: Math.sqrt((x - lastX) * (x - lastX) + (y - lastY) * (y - lastY))
                    });
                    lastX = x;
                    lastY = y;
                    lineLength += lines[lines.length - 1].len;
                }
            }
            return lines;
        };
        Bezier.getCubicBezierControlPoints = function (points, k) {
            points = points.concat();
            if (points.length > 2) {
                var r1 = Math.atan2(points[1].y - points[0].y, points[1].x - points[0].x);
                var r2 = Math.atan2(points[2].y - points[1].y, points[2].x - points[1].x);
                var r = r1 + (r1 - r2) * 0.67;
                r -= Math.PI;
                var l = Math.sqrt((points[2].y - points[1].y) * (points[2].y - points[1].y) + (points[2].x - points[1].x) * (points[2].x - points[1].x));
                points = [{
                        x: points[0].x + Math.cos(r) * l * 1,
                        y: points[0].y + Math.sin(r) * l * 1,
                    }].concat(points);
                var len = points.length;
                r1 = Math.atan2(points[len - 2].y - points[len - 1].y, points[len - 2].x - points[len - 1].x);
                r2 = Math.atan2(points[len - 3].y - points[len - 2].y, points[len - 3].x - points[len - 2].x);
                var r = r1 + (r1 - r2) * 0.67;
                r -= Math.PI;
                l = Math.sqrt((points[len - 3].y - points[len - 2].y) * (points[len - 3].y - points[len - 2].y) + (points[len - 3].x - points[len - 2].x) * (points[len - 3].x - points[len - 2].x));
                points.push({
                    x: points[len - 1].x + Math.cos(r) * l * 1,
                    y: points[len - 1].y + Math.sin(r) * l * 1,
                });
            }
            else {
                points = [{
                        x: points[0].x + (points[0].x - points[1].x),
                        y: points[0].y + points[0].y - points[1].y
                    }].concat(points);
                points.push({
                    x: points[points.length - 1].x + points[points.length - 1].x - points[points.length - 2].x,
                    y: points[points.length - 1].y + points[points.length - 1].y - points[points.length - 2].y
                });
            }
            var controls = [];
            for (var i = 1; i < points.length - 1; i++) {
                var point1 = points[i - 1];
                var point2 = points[i];
                var point3 = points[i + 1];
                var control1 = { x: (point1.x + point2.x) * .5, y: (point1.y + point2.y) * .5 };
                var control2 = { x: (point2.x + point3.x) * .5, y: (point2.y + point3.y) * .5 };
                var len1 = Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
                var len2 = Math.sqrt((point3.x - point2.x) * (point3.x - point2.x) + (point3.y - point2.y) * (point3.y - point2.y));
                var controlCenter = {
                    x: control1.x + (control2.x - control1.x) * len1 / (len1 + len2),
                    y: control1.y + (control2.y - control1.y) * len1 / (len1 + len2)
                };
                if (k != 1.0) {
                    control1.x = controlCenter.x + (control1.x - controlCenter.x) * k;
                    control1.y = controlCenter.y + (control1.y - controlCenter.y) * k;
                    control2.x = controlCenter.x + (control2.x - controlCenter.x) * k;
                    control2.y = controlCenter.y + (control2.y - controlCenter.y) * k;
                }
                control1.x += point2.x - controlCenter.x;
                control1.y += point2.y - controlCenter.y;
                control2.x += point2.x - controlCenter.x;
                control2.y += point2.y - controlCenter.y;
                controls.push(control1);
                controls.push(control2);
            }
            controls.shift();
            controls.pop();
            return controls;
        };
        return Bezier;
    }());
    lib.Bezier = Bezier;
})(lib || (lib = {}));
