import { build, context } from 'esbuild';
import { cp, mkdir } from 'node:fs/promises';

const options = {
  entryPoints: ['src/about-logos.jsx'],
  outfile: 'assets/generated/about-logos.js',
  bundle: true,
  minify: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'linked',
  logLevel: 'info',
};

if (process.argv.includes('--watch')) {
  const builder = await context(options);
  await builder.watch();
  console.log('Watching the About logo component for changes.');
} else {
  await build(options);
  // Publish only the site and license notices, excluding build tools and sources.
  await mkdir('dist', { recursive: true });
  await cp('assets', 'dist/assets', { recursive: true });
  await cp('index.html', 'dist/index.html');
  await cp('THIRD_PARTY_NOTICES.md', 'dist/THIRD_PARTY_NOTICES.md');
}
