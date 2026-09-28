import type { IslandEvent, WorkerAssignment, WorkerState } from './types';
import { WORKER_POOL_SIZE, TRANSFER_ACTIVITY } from './config';

export function transferWorkerState(bytesPerSecond = 0): WorkerState {
  if (bytesPerSecond >= TRANSFER_ACTIVITY.fast) return 'running';
  return 'carrying';
}

export function workersForEvent(event: IslandEvent): WorkerAssignment[] {
  if (event.kind !== 'transfer' || !event.active) return [];
  const state = transferWorkerState(event.bytesPerSecond);
  return Array.from({ length: WORKER_POOL_SIZE }, (_, index) => ({
    id: `transfer-${index + 1}`,
    role: 'transfer' as const,
    state,
    source: event.source,
    destination: event.destination,
  }));
}

export function demoKahfToJotha(bytesPerSecond = 8 * 1024 * 1024): IslandEvent {
  return {
    kind: 'transfer',
    source: 'kahf',
    destination: 'jotha',
    active: true,
    bytesPerSecond,
    progress: 0,
  };
}
