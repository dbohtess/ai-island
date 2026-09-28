import { Container, Graphics, Stage, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { IslandBackground } from './components/IslandBackground';
import { KahfCave, JothaBuilding } from './components/IslandLandmarks';

export default function IslandPreview() {
  const width = 960, height = 540, tileDim = 32;
  const kahf = { x: width * .23, y: height * .58 };
  const jotha = { x: width * .76, y: height * .43 };
  return <main className="min-h-screen game-background flex flex-col items-center p-4">
    <h1 className="text-5xl sm:text-7xl font-display game-title mb-2">AI Island</h1>
    <p className="text-white mb-4">GitHub Preview • KAHF → JOTHA</p>
    <div style={{width:'min(960px,100%)'}}>
      <Stage width={width} height={height} options={{backgroundAlpha:0}}>
        <IslandBackground width={width} height={height}/>
        <Container>
          <KahfCave x={kahf.x} y={kahf.y} tileDim={tileDim}/>
          <JothaBuilding x={jotha.x} y={jotha.y} tileDim={tileDim}/>
          <Text x={width/2} y={28} anchor={0.5} text="AI ISLAND • PREVIEW"
            style={new PIXI.TextStyle({fontSize:18,fill:0xffffff,fontWeight:'bold'})}/>
        </Container>
      </Stage>
    </div>
  </main>;
}
