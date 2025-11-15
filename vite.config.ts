import { defineConfig } from "vite";

export default defineConfig({
  base: "/note-taker-app/",
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        notes: './saved-notes.html',
      },
    },
  },
});