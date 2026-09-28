import { useCallback, useMemo } from 'react';
import { Graphics, Stage, Text, useTick } from '@pixi/react';
import { IslandBackground } from './components/IslandBackground.tsx';
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
  const step=Math.floor(t*80)%2;
 
 const labelStyle=useMemo(()=>new PIXI.TextStyle({fontSize:13,fill:0xffffff,fontWeight:'bold',stroke:0x10202a,strokeThickness:4}),[]);
 return <main style={{minHeight:'100vh',background:'#08141d',color:'white',padding:18,boxSizing:'border-box',fontFamily:'sans-serif'}}>
  <h1 style={{margin:'0 0 4px',fontSize:36}}>AI Island</h1>
  <div style={{marginBottom:10}}>Live island prototype • KAHF → JOTHA</div>
  <div style={{maxWidth:W,overflow:'auto',border:'1px solid #31556a'}}>
   <Stage width={W} height={H} options={{backgroundColor:0x164f69,antialias:false}}>
    <IslandBackground width={W} height={H}/>
    <Text x={205} y={385} anchor={.5} text="KAHF" style={labelStyle}/>
    <Text x={711} y={310} anchor={.5} text="JOTHA" style={labelStyle}/>
    <Text x={730} y={476} anchor={.5} text="HARBOR" style={labelStyle}/>
    {[0,1,2,3].map(i=><Citizen key={'c'+i} i={i}/>)}
    {workers.map(i=><Worker key={i} i={i}/>)}
   </Stage>
  </div>
 </main>;
}
