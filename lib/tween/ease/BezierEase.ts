module lib {
    export class BezierEase implements IEaseExt {

        private lines:Array<any>;

        constructor(points:Array<any>) {
            points.splice(0,0,{x:0,y:0});
            points.push({x:1,y:1});
            this.lines = lib.Bezier.getCubicBezierLines(points,10,1);
        }

        getEase(t:number):number {
            let lines = this.lines;
            for(let i = 0,len = lines.length; i < len; i++) {
                if(t >= lines[i].x1 && t <= lines[i].x2) {
                    t = lines[i].y1 + (lines[i].y2 - lines[i].y1) * (t - lines[i].x1) / (lines[i].x2 - lines[i].x1);
                    break;
                }
            }
            return t;
        }
    }
}