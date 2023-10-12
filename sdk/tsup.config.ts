import { defineConfig } from 'tsup';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig(({ watch = false }) => ({
  clean: true,
  dts: true,
  entry: {
    index: './index.ts',
  },
  external: [],
  format: ['cjs', 'esm'],
  minify: isProduction,
  sourcemap: isProduction,
  watch,
}));
