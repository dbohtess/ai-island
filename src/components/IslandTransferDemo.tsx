import { Container, Graphics, Text, useTick } from '@pixi/react';
import { useCallback, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Character } from './Character';
import { characters } from '../../data/characters';
import { buildTransferDemo } from '../island/demo';

type Props = { tileDim: number; mapWidth: number; mapHeight: number };
const WORKER_CHARACTER = 'f1';

function TransferWorker({ index, tileDim, startX, endX, y, speech, character }: any) {
  const [progress, setProgress] = useState((index * 0.14) % 1);
  const direction = useRef<1 | -1>(1);

  useTick((delta) => {
    const stagger = 0.0015 + index * 0.00008;
    setProgress((current) => {
      let next = current + stagger * delta * direction.current;
      if (next >= 1) { next = 1; direction.current = -1; }
      if (next <= 0) { next = 0; direction.current = 1; }
      return next;
    });
  });

  const goingToJotha = direction.current === 1;
  const x = (startX + (endX - startX) * progress) * tileDim;

  return (
    <Container>
      {goingToJotha && (
        <Graphics
          x={x}
          y={y * tileDim}
          draw={(g) => {
            g.clear();
            g.beginFill(0xb78955);
            g.lineStyle(1, 0x5b3b20);
            g.drawRect(-8, -3, 16, 11);
            g.endFill();
          }}
        />
      )}
      <Character
        x={x}
        y={y * tileDim}
        orientation={goingToJotha ? 0 : 180}
        isMoving
        speechText={speech}
        textureUrl={character.textureUrl}
        spritesheetData={character.spritesheetData}
        speed={character.speed}
        onClick={() => undefined}
      />
    </Container>
  );
}

export function IslandTransferDemo({ tileDim, mapWidth, mapHeight }: Props) {
  const character = characters.find((entry) => entry.name === WORKER_CHARACTER);
  const demo = buildTransferDemo();
  const start = { x: Math.max(2, Math.floor(mapWidth * 0.18)), y: Math.max(2, Math.floor(mapHeight * 0.35)) };
  const end = { x: Math.min(mapWidth - 2, Math.max(start.x + 6, Math.floor(mapWidth * 0.58))), y: start.y };

  const drawRoute = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.lineStyle(Math.max(2, tileDim / 8), 0x6b5b4b, 0.7);
    g.moveTo(start.x * tileDim, start.y * tileDim);
    g.lineTo(end.x * tileDim, end.y * tileDim);
  }, [tileDim, start.x, start.y, end.x, end.y]);

  if (!character) return null;

  return (
    <Container>
      <Graphics draw={drawRoute} />
      <Text x={start.x * tileDim} y={(start.y - 1) * tileDim} text="KAHF" anchor={0.5} />
      <Text x={end.x * tileDim} y={(end.y - 1) * tileDim} text="JOTHA" anchor={0.5} />
      {demo.workers.map((worker, index) => (
        <TransferWorker
          key={worker.id}
          index={index}
          tileDim={tileDim}
          startX={start.x}
          endX={end.x}
          y={start.y + (index % 2) * 0.65}
          speech={worker.speech}
          character={character}
        />
      ))}
    </Container>
  );
}
