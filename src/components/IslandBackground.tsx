import { Graphics } from '@pixi/react';
import { useCallback } from 'react';
import * as PIXI from 'pixi.js';

export function IslandBackground({ width, height }: { width: number; height: number }) {
  const draw = useCallback((g: PIXI.Graphics) => {
    const X=(n:number)=>width*n/1000, Y=(n:number)=>height*n/620;
    g.clear();
    // ocean
    g.beginFill(0x174f6a); g.drawRect(0,0,width,height); g.endFill();
    g.lineStyle(2,0x3b8298,.45);
    for(let y=22;y<620;y+=32) for(let x=(y%64?15:42);x<1000;x+=78){g.moveTo(X(x),Y(y));g.lineTo(X(x+20),Y(y));}

    // irregular coastline: no ellipse / no placeholder field
    const coast=[70,330,92,245,155,180,245,132,350,96,465,78,585,90,700,122,802,178,875,255,910,345,878,425,810,486,720,530,610,548,500,535,390,550,280,535,182,500,112,442,78,390].map((v,i)=>i%2?Y(v):X(v));
    g.lineStyle(10,0xe4d39b);g.beginFill(0xe4d39b);g.drawPolygon(coast);g.endFill();
    const land=[92,330,115,258,170,202,252,157,355,122,466,104,575,116,686,145,780,194,846,263,875,344,842,405,782,458,700,500,605,518,500,505,394,520,292,507,202,474,137,424,104,382].map((v,i)=>i%2?Y(v):X(v));
    g.lineStyle(5,0x2d5a3a);g.beginFill(0x76a95a);g.drawPolygon(land);g.endFill();

    // rocky KAHF highlands
    g.lineStyle(3,0x30382f);g.beginFill(0x697061);
    g.drawPolygon([X(105),Y(375),X(170),Y(245),X(218),Y(325),X(270),Y(220),X(330),Y(375)]);g.endFill();
    g.beginFill(0x343832);g.drawEllipse(X(220),Y(378),X(48),Y(34));g.endFill();
    g.beginFill(0x111512);g.drawEllipse(X(220),Y(385),X(28),Y(24));g.endFill();

    // river + bridge
    g.lineStyle(Math.max(12,X(18)),0x3e8aa4);g.moveTo(X(525),Y(108));g.bezierCurveTo(X(500),Y(190),X(555),Y(235),X(530),Y(315));g.bezierCurveTo(X(510),Y(385),X(565),Y(430),X(600),Y(510));
    g.lineStyle(7,0x8b714c);g.moveTo(X(495),Y(300));g.lineTo(X(562),Y(300));

    const road=(p:number[])=>{g.lineStyle(Math.max(10,X(18)),0x505960);g.moveTo(X(p[0]),Y(p[1]));for(let i=2;i<p.length;i+=2)g.lineTo(X(p[i]),Y(p[i+1]));g.lineStyle(2,0xd9c874);g.moveTo(X(p[0]),Y(p[1]));for(let i=2;i<p.length;i+=2)g.lineTo(X(p[i]),Y(p[i+1]));};
    road([220,390,350,365,485,350,625,330,750,305]);
    road([350,365,345,260,415,195]); road([625,330,700,235,795,220]);
    road([485,350,450,440,330,470]); road([625,330,680,430,760,465]);

    // Japanese town buildings
    const house=(x:number,y:number,s=1,roof=0x334b58)=>{
      g.lineStyle(2,0x243139);g.beginFill(0xe8dfc7);g.drawRect(X(x),Y(y),X(45*s),Y(30*s));g.endFill();
      g.beginFill(roof);g.drawPolygon([X(x-7*s),Y(y),X(x+22*s),Y(y-17*s),X(x+52*s),Y(y),X(x+44*s),Y(y+6*s),X(x+1*s),Y(y+6*s)]);g.endFill();
      g.beginFill(0x783d35);g.drawRect(X(x+18*s),Y(y+11*s),X(10*s),Y(19*s));g.endFill();
    };
    [[290,205],[355,220],[625,190],[690,170],[765,235],[395,420],[455,440],[600,430],[315,455]].forEach((a,i)=>house(a[0],a[1],i%3===0?1.12:.92,i%4===0?0x773b36:0x334b58));

    // torii + shrine district
    g.beginFill(0xa43d31);g.drawRect(X(392),Y(135),X(8),Y(46));g.drawRect(X(432),Y(135),X(8),Y(46));g.drawRect(X(380),Y(135),X(72),Y(8));g.drawRect(X(387),Y(148),X(58),Y(5));g.endFill();

    // JOTHA server building
    g.lineStyle(3,0x142434);g.beginFill(0x263c53);g.drawRect(X(715),Y(270),X(78),Y(66));g.endFill();
    g.beginFill(0x192b3e);g.drawPolygon([X(705),Y(270),X(754),Y(245),X(803),Y(270)]);g.endFill();
    g.beginFill(0x73c9e7);for(let yy=284;yy<320;yy+=18)for(let xx=728;xx<778;xx+=24)g.drawRect(X(xx),Y(yy),X(12),Y(9));g.endFill();
    g.lineStyle(3,0x263c53);g.moveTo(X(754),Y(245));g.lineTo(X(754),Y(220));g.drawCircle(X(754),Y(216),X(3));

    // harbor / pier / cargo boat
    g.lineStyle(3,0x584b36);g.beginFill(0xa68a5b);g.drawRect(X(650),Y(485),X(170),Y(18));g.drawRect(X(755),Y(465),X(18),Y(72));g.endFill();
    g.beginFill(0xb36b42);g.drawRect(X(675),Y(462),X(24),Y(18));g.beginFill(0x4c7590);g.drawRect(X(702),Y(462),X(24),Y(18));g.endFill();
    g.beginFill(0x33444e);g.drawPolygon([X(805),Y(520),X(885),Y(520),X(862),Y(544),X(822),Y(544)]);g.endFill();g.beginFill(0xe2ddca);g.drawRect(X(830),Y(500),X(24),Y(20));g.endFill();

    // forest + cherry trees
    const trees=[[255,220],[280,245],[565,165],[590,185],[820,350],[790,380],[345,420],[370,445],[620,455],[150,430],[665,145],[735,155],[470,160]];
    trees.forEach(([x,y],i)=>{g.beginFill(0x5a3b28);g.drawRect(X(x-2),Y(y),X(5),Y(14));g.endFill();g.beginFill(i%5===0?0xe7a1b0:0x397b47);g.drawCircle(X(x),Y(y-7),X(11));g.drawCircle(X(x-8),Y(y),X(8));g.drawCircle(X(x+8),Y(y),X(8));g.endFill();});

    // farm
    g.lineStyle(2,0x775f35);for(let yy=420;yy<=470;yy+=12){g.moveTo(X(215),Y(yy));g.lineTo(X(285),Y(yy));}
  },[width,height]);
  return <Graphics draw={draw}/>;
}
