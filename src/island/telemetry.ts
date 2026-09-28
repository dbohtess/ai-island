import type { IslandEvent, IslandNodeId } from './types';

export type TelemetrySnapshot = {
  devices?: Partial<Record<IslandNodeId, { online: boolean; cpuPercent?: number; memoryPercent?: number }>>;
  transfer?: { source: IslandNodeId; destination: IslandNodeId; active: boolean; bytesPerSecond?: number; progress?: number };
};

export function snapshotToEvents(snapshot: TelemetrySnapshot): IslandEvent[] {
  const events: IslandEvent[] = [];
  for (const [node, status] of Object.entries(snapshot.devices ?? {})) {
    if (!status) continue;
    events.push({ kind: 'deviceStatus', node: node as IslandNodeId, ...status });
  }
  if (snapshot.transfer) events.push({ kind: 'transfer', ...snapshot.transfer });
  return events;
}
