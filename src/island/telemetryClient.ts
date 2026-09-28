import { TelemetrySnapshot } from './telemetry';

export type TelemetryEnvelope = {
  updatedAt: number;
  snapshot: TelemetrySnapshot;
};

const DEFAULT_POLL_MS = 2000;

export class IslandTelemetryClient {
  constructor(
    private endpoint = '/api/island/telemetry',
    private pollMs = DEFAULT_POLL_MS,
  ) {}

  async read(): Promise<TelemetryEnvelope> {
    const response = await fetch(this.endpoint, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Telemetry HTTP ${response.status}`);
    const payload = (await response.json()) as TelemetryEnvelope;
    if (!payload?.snapshot || typeof payload.updatedAt !== 'number') {
      throw new Error('Invalid island telemetry payload');
    }
    return payload;
  }

  subscribe(onData: (data: TelemetryEnvelope) => void, onError?: (error: unknown) => void) {
    let stopped = false;
    const tick = async () => {
      try {
        const data = await this.read();
        if (!stopped) onData(data);
      } catch (error) {
        if (!stopped) onError?.(error);
      }
    };
    void tick();
    const timer = window.setInterval(() => void tick(), this.pollMs);
    return () => { stopped = true; window.clearInterval(timer); };
  }
}
