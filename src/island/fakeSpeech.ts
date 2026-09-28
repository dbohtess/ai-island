const GLYPHS = ['ka', 'ri', 'no', 'ta', 'mi', 'zu', 'se', 'yo', 'na', 'ki'];

export function fictionalSpeech(seed: number, words = 3) {
  const parts: string[] = [];
  for (let i = 0; i < words; i += 1) {
    const a = GLYPHS[(seed + i * 3) % GLYPHS.length];
    const b = GLYPHS[(seed * 2 + i + 1) % GLYPHS.length];
    parts.push(`${a}${b}`);
  }
  return parts.join(' · ');
}
