module lib {
    export class Bezier {

        public static drawCubicBezier(graphics:cc.Graphics, points:Array<any>, devices:number = 20,k:number = 0.5):void {
            let lines = Bezier.getCubicBezierLines(points,devices,k);
            for(let i = 0; i < lines.length; i++) {
                graphics.moveTo(lines[i].x1,lines[i].y1);
                graphics.lineTo(lines[i].x2,lines[i].y2);
                graphics.stroke();
            }
        }


        /**
         * 根据已知点获取贝塞尔曲线的模拟线段
         * @param points 经过的点
         * @param devices 贝塞尔曲线的拆分个数，个数越多拆分的越精确
         * @param k 平滑系数，范围 0 ~ 1.0，越大就越平滑，越小就越尖锐
         */
        public static getCubicBezierLines(points:Array<any>, devices:number = 20, k:number = 0.5):Array<any> {
            var controls = this.getCubicBezierControlPoints(points, k);
            var lines:Array<any> = [];
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
                    var x = p1x * (1 - t) * ( 1 - t) * (1 - t) + p2x * 3 * (1 - t) * (1 - t) * t + p3x * 3 * (1 - t) * t * t + p4x * t * t * t;
                    var y = p1y * (1 - t) * ( 1 - t) * (1 - t) + p2y * 3 * (1 - t) * (1 - t) * t + p3y * 3 * (1 - t) * t * t + p4y * t * t * t;
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
        }

        /**
         * 根据已知点获取贝塞尔曲线的控制点
         * @param points 路径点
         * @param k 平滑系数，范围 0 ~ 1.0，越大就越平滑，越小就越尖锐
         */
        public static getCubicBezierControlPoints(points:Array<any>, k:number):Array<any> {
            points = [{
                x: points[0].x + points[0].x - points[1].x,
                y: points[0].y + points[0].y - points[1].y
            }].concat(points);
            points.push({
                x: points[points.length - 1].x + points[points.length - 1].x - points[points.length - 2].x,
                y: points[points.length - 1].y + points[points.length - 1].y - points[points.length - 2].y
            });
            var controls:Array<any> = [];
            for (var i = 1; i < points.length - 1; i++) {
                var point1 = points[i - 1];
                var point2 = points[i];
                var point3 = points[i + 1];
                var control1 = {x: (point1.x + point2.x) * .5, y: (point1.y + point2.y) * .5};
                var control2 = {x: (point2.x + point3.x) * .5, y: (point2.y + point3.y) * .5};
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
        }
    }
}