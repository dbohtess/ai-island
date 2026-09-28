import { useCallback } from 'react';
import { Graphics, Stage, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';

export default function IslandPreview() {
  const width = 960;
  const height = 540;

  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(0x173f57); g.drawRect(0, 0, width, height); g.endFill();
    g.beginFill(0xd8c58c); g.drawEllipse(width*.5, height*.52, width*.78, height*.72); g.endFill();
    g.beginFill(0x6f8f62); g.drawEllipse(width*.5, height*.51, width*.73, height*.65); g.endFill();
    g.lineStyle(18, 0x4b5055); g.moveTo(width*.23,height*.58); g.lineTo(width*.76,height*.43);
    g.lineStyle(3, 0xd8c96f); g.moveTo(width*.23,height*.58); g.lineTo(width*.76,height*.43);
    g.beginFill(0x3d3a36); g.drawEllipse(width*.23,height*.58,82,58); g.endFill();
    g.beginFill(0x11100f); g.drawEllipse(width*.23,height*.59,42,38); g.endFill();
    g.beginFill(0x253247); g.drawRoundedRect(width*.72,height*.34,82,72,6); g.endFill();
    g.beginFill(0x79c7ff); g.drawRect(width*.735,height*.37,18,15); g.drawRect(width*.775,height*.37,18,15); g.endFill();
  }, []);

  return <main style={{minHeight:'100vh',background:'#08141d',color:'white',padding:'18px',boxSizing:'border-box',fontFamily:'sans-serif'}}>
    <h1 style={{margin:'0 0 4px',fontSize:'42px'}}>AI Island</h1>
    <div style={{marginBottom:'12px'}}>GitHub Preview • KAHF → JOTHA</div>
    <div style={{maxWidth:960,overflow:'auto',border:'1px solid #31556a'}}>
      <Stage width={width} height={height} options={{backgroundColor:0x173f57}}>
        <Graphics draw={draw}/>
        <Text x={width*.23} y={height*.48} anchor={0.5} text="KAHF" style={new PIXI.TextStyle({fontSize:16,fill:0xffffff,fontWeight:'bold'})}/>
        <Text x={width*.76} y={height*.30} anchor={0.5} text="JOTHA" style={new PIXI.TextStyle({fontSize:16,fill:0xffffff,fontWeight:'bold'})}/>
      </Stage>
    </div>
  </main>;
}
