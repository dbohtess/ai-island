import { useCallback, useMemo } from 'react';
import { AnimatedSprite, Graphics, Stage, Text, useTick } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useState } from 'react';

const W=960,H=540;
const workers=[0,1,2,3,4];

function Worker({i}:{i:number}) {
  const [t,setT]=useState(i/5);
  useTick((d)=>setT(v=>(v+d*0.0018)%1));
  const outbound=t<.5, p=outbound?t*2:(t-.5)*2;
  const ax=205, ay=350+i*4, bx=705, by=286+i*3;
  const x=outbound?ax+(bx-ax)*p:bx+(ax-bx)*p;
  const y=outbound?ay+(by-ay)*p:by+(ay-by)*p;
  const draw=useCallback((g:PIXI.Graphics)=>{
    g.clear();
    g.lineStyle(2,0x14202b);
    g.beginFill(0xf0c7a5); g.drawCircle(0,-8,5); g.endFill();
    g.beginFill(0x172b45); g.drawRect(-5,-3,10,12); g.endFill();
    g.beginFill(0x0d1a2a); g.drawRect(-5,9,4,6); g.drawRect(1,9,4,6); g.endFill();
    g.beginFill(0xc9a35d); g.drawRect(outbound?6:-15,-4,9,9); g.endFill();
  },[outbound]);
  return <Graphics x={x} y={y} draw={draw}/>;
}

export default function IslandPreview(){
 const draw=useCallback((g:PIXI.Graphics)=>{
  g.clear();
  g.beginFill(0x164f69); g.drawRect(0,0,W,H); g.endFill();
  g.lineStyle(2,0x3a7890,.65);
  for(let y=24;y<H;y+=28) for(let x=(y%56?12:30);x<W;x+=62){g.moveTo(x,y);g.lineTo(x+18,y);}

  const coast=[95,300,125,210,210,145,330,105,465,86,610,102,740,142,835,220,875,315,835,395,735,452,595,478,440,466,310,486,190,445,110,385];
  g.lineStyle(10,0xd8c88d); g.beginFill(0xe3d39b); g.drawPolygon(coast); g.endFill();
  const land=[120,298,150,220,225,165,340,128,465,108,600,122,720,158,810,226,846,310,806,374,710,425,590,450,445,440,315,458,205,420,140,370];
  g.lineStyle(4,0x315d3c); g.beginFill(0x79a85b); g.drawPolygon(land); g.endFill();

  // river
  g.lineStyle(18,0x3b86a0); g.moveTo(515,118);g.bezierCurveTo(500,190,548,225,525,300);g.bezierCurveTo(510,355,550,395,575,446);
  g.lineStyle(4,0xc5b07a); g.moveTo(495,266);g.lineTo(553,266);

  // roads
  const road=(pts:number[])=>{g.lineStyle(20,0x566168);g.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)g.lineTo(pts[i],pts[i+1]);g.lineStyle(2,0xdacb78);g.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)g.lineTo(pts[i],pts[i+1]);};
  road([205,350,335,330,470,315,610,300,705,286]);
  road([340,330,330,230,400,175]);
  road([610,300,680,220,755,205]);

  // mountain + cave KAHF
  g.lineStyle(3,0x30362e);g.beginFill(0x68705d);g.drawPolygon([125,350,175,255,220,315,258,250,310,350]);g.endFill();
  g.beginFill(0x242722);g.drawEllipse(205,350,38,28);g.endFill();
  g.beginFill(0x101412);g.drawEllipse(205,356,22,20);g.endFill();

  // town blocks / Japanese roofs
  const house=(x:number,y:number,s=1)=>{
   g.lineStyle(2,0x26333a);g.beginFill(0xe8dfc7);g.drawRect(x,y,42*s,28*s);g.endFill();
   g.beginFill(0x334b58);g.drawPolygon([x-5*s,y,x+21*s,y-14*s,x+47*s,y,x+40*s,y+5*s,x+2*s,y+5*s]);g.endFill();
   g.beginFill(0x7b3d34);g.drawRect(x+17*s,y+10*s,9*s,18*s);g.endFill();
  };
  [[285,190],[350,205],[625,180],[690,165],[735,235],[410,365],[465,375],[600,375]].forEach(([x,y],i)=>house(x,y,i%3===0?1.1:.9));

  // JOTHA
  g.lineStyle(3,0x152332);g.beginFill(0x263b52);g.drawRect(675,245,72,58);g.endFill();
  g.beginFill(0x192b3e);g.drawPolygon([668,245,711,224,754,245]);g.endFill();
  g.beginFill(0x71c9e8);for(let yy=256;yy<284;yy+=17)for(let xx=686;xx<731;xx+=22)g.drawRect(xx,yy,11,8);g.endFill();
  g.lineStyle(3,0x263b52);g.moveTo(711,224);g.lineTo(711,207);g.drawCircle(711,203,3);

  // harbor
  g.lineStyle(3,0x574a36);g.beginFill(0xa78b5d);g.drawRect(650,420,155,18);g.drawRect(735,405,18,60);g.endFill();
  g.beginFill(0x33434c);g.drawPolygon([780,450,850,450,832,470,795,470]);g.endFill();
  g.beginFill(0xd7d4c5);g.drawRect(805,432,20,18);g.endFill();
  g.beginFill(0xb06a42);g.drawRect(675,397,22,16);g.beginFill(0x4d7590);g.drawRect(699,397,22,16);g.endFill();

  // torii
  g.beginFill(0xa43d31);g.drawRect(380,135,8,42);g.drawRect(420,135,8,42);g.drawRect(370,135,68,7);g.drawRect(376,146,56,5);g.endFill();

  // trees
  [[250,225],[270,245],[570,175],[590,195],[770,330],[790,350],[350,400],[380,420],[620,410]].forEach(([x,y],i)=>{
   g.beginFill(0x5a3b28);g.drawRect(x-2,y,4,12);g.endFill();g.beginFill(i%4===0?0xe7a1b0:0x3e7b48);g.drawCircle(x,y-5,10);g.drawCircle(x-7,y,7);g.drawCircle(x+7,y,7);g.endFill();
  });
 },[]);

 const labelStyle=useMemo(()=>new PIXI.TextStyle({fontSize:13,fill:0xffffff,fontWeight:'bold',stroke:0x10202a,strokeThickness:4}),[]);
 return <main style={{minHeight:'100vh',background:'#08141d',color:'white',padding:18,boxSizing:'border-box',fontFamily:'sans-serif'}}>
  <h1 style={{margin:'0 0 4px',fontSize:36}}>AI Island</h1>
  <div style={{marginBottom:10}}>Live island prototype • KAHF → JOTHA</div>
  <div style={{maxWidth:W,overflow:'auto',border:'1px solid #31556a'}}>
   <Stage width={W} height={H} options={{backgroundColor:0x164f69,antialias:false}}>
    <Graphics draw={draw}/>
    <Text x={205} y={385} anchor={.5} text="KAHF" style={labelStyle}/>
    <Text x={711} y={310} anchor={.5} text="JOTHA" style={labelStyle}/>
    <Text x={730} y={476} anchor={.5} text="HARBOR" style={labelStyle}/>
    {workers.map(i=><Worker key={i} i={i}/>)}
   </Stage>
  </div>
 </main>;
}
