# AI Island domain layer

This folder separates the living-dashboard rules from the inherited AI Town engine.

- `types.ts`: real-world event and worker state contracts.
- `config.ts`: island nodes and lightweight worker defaults.
- `workerLogic.ts`: converts technical events into worker assignments.
- `fakeSpeech.ts`: deterministic fictional ambient speech without LLM calls.

The first target event is KAHF -> JOTHA file transfer with five workers.
Rendering remains in the existing Pixi components. Real telemetry will enter through adapters later.
