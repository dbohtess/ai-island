export type WorkerRole =
  | 'transfer'
  | 'warehouse'
  | 'maintenance'
  | 'monitoring'
  | 'security'
  | 'harbor'
  | 'downloader'
  | 'cleaning';

export type WorkerState =
  | 'idle'
  | 'walking'
  | 'carrying'
  | 'carryingLarge'
  | 'running'
  | 'resting'
  | 'working';

export type IslandNodeId = 'kahf' | 'jotha' | 'qalaa' | 'n8n' | 'cinema' | 'harbor' | 'security';

export type IslandEvent =
  | {
      kind: 'transfer';
      source: IslandNodeId;
      destination: IslandNodeId;
      active: boolean;
      bytesPerSecond?: number;
      progress?: number;
    }
  | {
      kind: 'deviceStatus';
      node: IslandNodeId;
      online: boolean;
      cpuPercent?: number;
      memoryPercent?: number;
    }
  | {
      kind: 'workflow';
      workflowId: string;
      name: string;
      status: 'running' | 'success' | 'error';
    }
  | {
      kind: 'removableStorage';
      storageType: 'hdd' | 'ssd' | 'usb';
      connected: boolean;
      transferring?: boolean;
    }
  | {
      kind: 'security';
      status: 'idle' | 'scanning' | 'threat' | 'quarantined' | 'disabled';
      target?: IslandNodeId;
    };

export type WorkerAssignment = {
  id: string;
  role: WorkerRole;
  state: WorkerState;
  source?: IslandNodeId;
  destination?: IslandNodeId;
};
