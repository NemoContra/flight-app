import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
  test: {
    globals: true,
    server: {
      deps: {
        inline: ['@ngneat/spectator'],
      },
    },
  },
}));
