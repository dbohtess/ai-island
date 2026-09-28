import { demoKahfToJotha, workersForEvent } from './workerLogic';
import { fictionalSpeech } from './fakeSpeech';

export function buildTransferDemo(bytesPerSecond?: number) {
  const event = demoKahfToJotha(bytesPerSecond);
  return {
    event,
    workers: workersForEvent(event).map((worker, index) => ({
      ...worker,
      speech: index % 2 === 0 ? fictionalSpeech(index + 7, 2) : '',
    })),
  };
}
