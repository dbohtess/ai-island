import { Graphics } from '@pixi/react';
import { useCallback } from 'react';
import * as PIXI from 'pixi.js';

export function IslandBackground({ width, height }: { width: number; height: number }) {
  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    // Deep ocean: completely replaces the original AI Town map visually.
    g.beginFill(0x173f57); g.drawRect(0, 0, width, height); g.endFill();
    // Water bands.
    g.lineStyle(2, 0x2b6074, 0.35);
    for (let y = 18; y < height; y += 42) {
      for (let x = (y / 42) % 2 ? 12 : 32; x < width; x += 84) {
        g.moveTo(x, y); g.lineTo(Math.min(x + 28, width), y);
      }
    }
    // Main island: sand rim + green interior.
    const cx = width * 0.5, cy = height * 0.52;
    const iw = width * 0.78, ih = height * 0.72;
    g.beginFill(0xd8c58c); g.drawEllipse(cx, cy, iw, ih); g.endFill();
    g.beginFill(0x6f8f62); g.drawEllipse(cx, cy - 3, iw * 0.94, ih * 0.91); g.endFill();
    // Central road connecting KAHF and JOTHA.
    g.lineStyle(Math.max(8, Math.min(width, height) * 0.025), 0x4b5055, 1);
    g.moveTo(width * 0.23, height * 0.58); g.lineTo(width * 0.76, height * 0.43);
    g.lineStyle(Math.max(2, Math.min(width, height) * 0.004), 0xd8c96f, 0.85);
    g.moveTo(width * 0.23, height * 0.58); g.lineTo(width * 0.76, height * 0.43);
  }, [width, height]);
  return <Graphics draw={draw} />;
}
