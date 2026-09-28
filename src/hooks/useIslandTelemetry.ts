import { useEffect, useState } from 'react';
import { IslandTelemetryClient, TelemetryEnvelope } from '../island/telemetryClient';

export function useIslandTelemetry() {
  const [data, setData] = useState<TelemetryEnvelope>();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const client = new IslandTelemetryClient();
    return client.subscribe(
      (next) => { setData(next); setConnected(true); },
      () => setConnected(false),
    );
  }, []);

  return { data, connected };
}
