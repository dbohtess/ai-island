import { Container, Graphics, Text } from '@pixi/react';
import { useCallback } from 'react';
import * as PIXI from 'pixi.js';
import { Character } from './Character';
import { characters } from '../../data/characters';
import { buildTransferDemo } from '../island/demo';

type Props = {
  tileDim: number;
  mapWidth: number;
  mapHeight: number;
};

const WORKER_CHARACTER = 'f1';

export function IslandTransferDemo({ tileDim, mapWidth, mapHeight }: Props) {
  const character = characters.find((entry) => entry.name === WORKER_CHARACTER);
  const demo = buildTransferDemo();

  // Temporary safe overlay coordinates. Real KAHF/JOTHA coordinates replace these
  // after the custom island map is imported.
  const start = { x: Math.max(2, Math.floor(mapWidth * 0.18)), y: Math.max(2, Math.floor(mapHeight * 0.35)) };
  const end = { x: Math.max(start.x + 6, Math.floor(mapWidth * 0.58)), y: start.y };

  const drawRoute = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.lineStyle(Math.max(2, tileDim / 8), 0x6b5b4b, 0.7);
      g.moveTo(start.x * tileDim, start.y * tileDim);
      g.lineTo(end.x * tileDim, end.y * tileDim);
    },
    [tileDim, start.x, start.y, end.x, end.y],
  );

  if (!character) return null;

  return (
    <Container>
      <Graphics draw={drawRoute} />
      <Text x={start.x * tileDim} y={(start.y - 1) * tileDim} text="KAHF" anchor={0.5} />
      <Text x={end.x * tileDim} y={(end.y - 1) * tileDim} text="JOTHA" anchor={0.5} />
      {demo.workers.map((worker, index) => {
        const spread = index * 0.75;
        return (
          <Character
            key={worker.id}
            x={(start.x + spread) * tileDim}
            y={(start.y + (index % 2) * 0.65) * tileDim}
            orientation={0}
            isMoving={worker.state === 'running' || worker.state === 'walking'}
            speechText={worker.speech}
            textureUrl={character.textureUrl}
            spritesheetData={character.spritesheetData}
            speed={character.speed}
            onClick={() => undefined}
          />
        );
      })}
    </Container>
  );
}
