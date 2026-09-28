import type { IslandNodeId } from './types';

export const ISLAND_NODES: Record<IslandNodeId, { label: string; kind: string }> = {
  kahf: { label: 'KAHF', kind: 'storage-cave' },
  jotha: { label: 'JOTHA', kind: 'server' },
  qalaa: { label: 'QALAA', kind: 'workstation' },
  n8n: { label: 'N8N', kind: 'automation' },
  cinema: { label: 'Cinema', kind: 'media' },
  harbor: { label: 'Harbor', kind: 'storage-port' },
  security: { label: 'Security', kind: 'cyber-security' },
};

export const WORKER_POOL_SIZE = 5;
export const TRANSFER_ACTIVITY = {
  slow: 2 * 1024 * 1024,
  fast: 40 * 1024 * 1024,
};
