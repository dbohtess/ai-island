# AI Island — Build Plan

This branch is the working branch for Sultan's AI Island.

## V1 goal
Turn the AI Town starter into a lightweight 2D living dashboard for real home-lab activity.

### Visual direction
- Pixel-art / Japanese-town feel.
- Chibi workers in dark navy uniforms with white headbands.
- Worker states: idle, walk, carry box, carry large box, run, rest.
- Specialist roles later: transfer, cart/warehouse, maintenance, monitoring, security, harbor, downloader, cleaning.
- Ambient NPC speech uses fictional/gibberish symbols rather than emoji speech.

### First real scene
KAHF cave -> road -> Jotha building.
Five workers carry boxes between KAHF and Jotha while a transfer is active. Later their activity rate will reflect real transfer activity.

### Architecture rules
1. Keep PixiJS rendering, viewport, map system, movement/pathfinding, spritesheet animation framework and level editor.
2. Do not require every worker to be an LLM agent. Normal workers are lightweight rule/state driven.
3. AI agents are optional special characters only.
4. Technical events come from real telemetry; ambient town life may be simulated.
5. Integrations should be adapters/events, not hard-coded into rendering.
6. Preserve upstream MIT license/credits.

## Planned event model
Events will eventually include:
- device status / resource status
- file transfer start/progress/finish
- n8n workflow start/success/error
- downloader activity
- security scan/threat/quarantine
- removable storage connect/eject
- real time/weather

## Work checkpoints
- [x] Fork baseline preserved on main.
- [x] Create ai-island-dev working branch.
- [x] Audit movement/render/spritesheet architecture.
- [ ] Add island domain/event types.
- [ ] Add worker role/state model.
- [ ] Add worker visual state support to Character renderer.
- [ ] Add KAHF -> Jotha demo event/route.
- [ ] Replace placeholder worker art with final worker spritesheet.
- [ ] Connect real telemetry adapters.
