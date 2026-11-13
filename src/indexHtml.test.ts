/// <reference types="node" />
// @vitest-environment node
/**
 * Guards the static page shell. Without a declared icon the browser requests /favicon.ico,
 * which 404s on first load and logs a console error (live check row L1).
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

describe('index.html', () => {
  it('declares an icon so the browser does not request /favicon.ico', () => {
    expect(html).toMatch(/<link\s[^>]*rel="icon"/);
  });

  it('references no external http(s) resource', () => {
    expect(html).not.toMatch(/https?:\/\//);
  });
});
