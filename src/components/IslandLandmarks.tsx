import { Container, Graphics, Text } from '@pixi/react';
import { useCallback } from 'react';
import * as PIXI from 'pixi.js';

export function KahfCave({ x, y, tileDim }: { x: number; y: number; tileDim: number }) {
  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(0x3d3a36); g.drawEllipse(0, 0, tileDim * 1.35, tileDim); g.endFill();
    g.beginFill(0x11100f); g.drawEllipse(0, tileDim * 0.1, tileDim * 0.65, tileDim * 0.65); g.endFill();
  }, [tileDim]);
  return <Container x={x} y={y}><Graphics draw={draw}/><Text y={-tileDim * 0.85} text="KAHF" anchor={0.5} style={new PIXI.TextStyle({fontSize: Math.max(10,tileDim/3),fill:0xffffff})}/></Container>;
}

export function JothaBuilding({ x, y, tileDim }: { x: number; y: number; tileDim: number }) {
  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(0x253247); g.lineStyle(2,0x111827); g.drawRoundedRect(-tileDim, -tileDim * 1.1, tileDim * 2, tileDim * 1.6, 5); g.endFill();
    g.beginFill(0x79c7ff); g.drawRect(-tileDim*.65,-tileDim*.72,tileDim*.38,tileDim*.3); g.drawRect(tileDim*.27,-tileDim*.72,tileDim*.38,tileDim*.3); g.endFill();
    g.beginFill(0x171717); g.drawRect(-tileDim*.22,-tileDim*.2,tileDim*.44,tileDim*.7); g.endFill();
  }, [tileDim]);
  return <Container x={x} y={y}><Graphics draw={draw}/><Text y={-tileDim * 1.4} text="JOTHA" anchor={0.5} style={new PIXI.TextStyle({fontSize: Math.max(10,tileDim/3),fill:0xffffff})}/></Container>;
}
