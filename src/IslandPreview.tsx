import { useCallback, useMemo, useState } from 'react';
import { Graphics, Stage, Text, useTick } from '@pixi/react';
import { IslandBackground } from './components/IslandBackground.tsx';
import * as PIXI from 'pixi.js';

const W = 960;
const H = 540;
const workers = [0, 1, 2, 3, 4];

function Worker({ i }: { i: number }) {
  const [t, setT] = useState(i / 5);
  useTick((d) => setT((v) => (v + d * 0.0018) % 1));

  const outbound = t < 0.5;
  const p = outbound ? t * 2 : (t - 0.5) * 2;
  const ax = 205;
  const ay = 350 + i * 4;
  const bx = 705;
  const by = 286 + i * 3;
  const x = outbound ? ax + (bx - ax) * p : bx + (ax - bx) * p;
  const y = outbound ? ay + (by - ay) * p : by + (ay - by) * p;
  const step = Math.floor(t * 80) % 2;

  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.lineStyle(2, 0x101923);

    g.beginFill(0xf0c7a5);
    g.drawCircle(0, -10, 5);
    g.endFill();

    g.beginFill(0x16283f);
    g.drawRect(-6, -13, 12, 3);
    g.drawRect(-5, -5, 10, 12);
    g.endFill();

    g.beginFill(0x0c1827);
    g.drawRect(-5, 7, 4, step ? 7 : 5);
    g.drawRect(1, 7, 4, step ? 5 : 7);
    g.endFill();

    if (outbound) {
      g.beginFill(0xc99b52);
      g.lineStyle(2, 0x6f512b);
      g.drawRect(7, -5, 12, 11);
      g.endFill();
    }
  }, [outbound, step]);

  return <Graphics x={x} y={y} draw={draw} />;
}

function Citizen({ i }: { i: number }) {
  const [t, setT] = useState(i * 0.21);
  useTick((d) => setT((v) => (v + d * 0.0011) % 1));

  const routes = [
    [[315, 205], [400, 175]],
    [[420, 370], [600, 375]],
    [[625, 180], [755, 205]],
    [[350, 330], [330, 230]],
  ];
  const r = routes[i % routes.length];
  const p = t < 0.5 ? t * 2 : (1 - t) * 2;
  const x = r[0][0] + (r[1][0] - r[0][0]) * p;
  const y = r[0][1] + (r[1][1] - r[0][1]) * p;
  const step = Math.floor(t * 70) % 2;

  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.lineStyle(2, 0x17202a);

    g.beginFill(0xf0c7a5);
    g.drawCircle(0, -8, 4);
    g.endFill();

    g.beginFill(0x243a56);
    g.drawRect(-4, -4, 8, 10);
    g.endFill();

    g.beginFill(0x101a28);
    g.drawRect(-4, 6, 3, step ? 6 : 4);
    g.drawRect(1, 6, 3, step ? 4 : 6);
    g.endFill();
  }, [step]);

  return <Graphics x={x} y={y} draw={draw} />;
}

export default function IslandPreview() {
  const labelStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontSize: 13,
        fill: 0xffffff,
        fontWeight: 'bold',
        stroke: 0x10202a,
        strokeThickness: 4,
      }),
    [],
  );

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#08141d',
        color: 'white',
        padding: 18,
        boxSizing: 'border-box',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ margin: '0 0 4px', fontSize: 36 }}>AI Island</h1>
      <div style={{ marginBottom: 10 }}>Live island prototype • KAHF → JOTHA</div>
      <div style={{ maxWidth: W, overflow: 'auto', border: '1px solid #31556a' }}>
        <Stage width={W} height={H} options={{ backgroundColor: 0x164f69, antialias: false }}>
          <IslandBackground width={W} height={H} />
          <Text x={205} y={385} anchor={0.5} text="KAHF" style={labelStyle} />
          <Text x={711} y={310} anchor={0.5} text="JOTHA" style={labelStyle} />
          <Text x={730} y={476} anchor={0.5} text="HARBOR" style={labelStyle} />
          {[0, 1, 2, 3].map((i) => (
            <Citizen key={'c' + i} i={i} />
          ))}
          {workers.map((i) => (
            <Worker key={i} i={i} />
          ))}
        </Stage>
      </div>
    </main>
  );
}
