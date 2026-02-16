import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts';
import './env-config.js';

const config = defineConfig({
  input: process.env.OPENAPI_URL!,
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './app/client',
  },
  plugins: [
    ...defaultPlugins,
    '@hey-api/client-fetch',
    '@tanstack/react-query',
  ],
});

export default config;
