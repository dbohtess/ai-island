import { Container, Graphics, Text, useTick } from '@pixi/react';
import { useCallback, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Character } from './Character';
import { characters } from '../../data/characters';
import { buildTransferDemo } from '../island/demo';
import { JothaBuilding, KahfCave } from './IslandLandmarks';

type Props = { tileDim: number; mapWidth: number; mapHeight: number; transferActive?: boolean; bytesPerSecond?: number };
const WORKER_CHARACTER = 'f1';

function TransferWorker({ index, tileDim, startX, endX, y, speech, character, active, transferBytesPerSecond }: any) {
  const [progress, setProgress] = useState((index * 0.14) % 1);
  const direction = useRef<1 | -1>(1);

  useTick((delta) => {
    if (!active) return;
    const mbps = Math.max(0, Number(transferBytesPerSecond ?? 0)) / 1_000_000;
    const speedFactor = Math.min(3, Math.max(0.55, mbps > 0 ? 0.55 + Math.log10(mbps + 1) * 0.9 : 1));
    const stagger = (0.0015 + index * 0.00008) * speedFactor;
    setProgress((current) => {
      let next = current + stagger * delta * direction.current;
      if (next >= 1) { next = 1; direction.current = -1; }
      if (next <= 0) { next = 0; direction.current = 1; }
      return next;
    });
  });

  const goingToJotha = direction.current === 1;
  const x = (startX + (endX - startX) * progress) * tileDim;
  const routeY = y + (goingToJotha ? 0 : 0.18);

  return (
    <Container>
      {goingToJotha && (
        <Graphics
          x={x}
          y={routeY * tileDim}
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
        y={routeY * tileDim}
        orientation={goingToJotha ? 0 : 180}
        isMoving={active}
        speechText={speech}
        textureUrl={character.textureUrl}
        spritesheetData={character.spritesheetData}
        speed={character.speed}
        onClick={() => undefined}
      />
    </Container>
  );
}

export function IslandTransferDemo({ tileDim, mapWidth, mapHeight, transferActive = true, bytesPerSecond }: Props) {
  const character = characters.find((entry) => entry.name === WORKER_CHARACTER);
  const demo = buildTransferDemo(bytesPerSecond);
  // Place the first two real island landmarks on the main AI Island road.
  const start = {
    x: Math.max(2, Math.floor(mapWidth * 0.23)),
    y: Math.max(2, Math.floor(mapHeight * 0.58)),
  };
  const end = {
    x: Math.min(mapWidth - 2, Math.floor(mapWidth * 0.76)),
    y: Math.max(2, Math.floor(mapHeight * 0.43)),
  };

  if (!character) return null;

  return (
    <Container>
      <KahfCave x={start.x * tileDim} y={start.y * tileDim} tileDim={tileDim} />
      <JothaBuilding x={end.x * tileDim} y={end.y * tileDim} tileDim={tileDim} />
      {demo.workers.map((worker, index) => (
        <TransferWorker
          key={worker.id}
          index={index}
          tileDim={tileDim}
          startX={start.x}
          endX={end.x}
          y={start.y + (end.y - start.y) * ((index * 0.14) % 1) + (index - 2) * 0.16}
          speech={worker.speech}
          character={character}
          active={transferActive}
          transferBytesPerSecond={bytesPerSecond}
        />
      ))}
    </Container>
  );
}
