import { readFileSync } from 'fs';

// Loads src/testdata/<name>.json. "${VAR}" placeholders are replaced from process.env, so
// credentials stay in .env: {"password": "${APP_PASSWORD}"}.
export function loadTestData<T = Record<string, any>>(name: string): T {
  const raw = readFileSync(new URL(`../testdata/${name}.json`, import.meta.url), 'utf8');
  const resolved = raw.replace(/\$\{(\w+)\}/g, (_, key) => JSON.stringify(process.env[key] ?? '').slice(1, -1));
  return JSON.parse(resolved);
}
