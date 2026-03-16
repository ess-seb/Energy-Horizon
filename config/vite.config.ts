import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: "src/index.ts",
      name: "EnergyHorizonCard",
      fileName: "energy-horizon-card",
      formats: ["es"]
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
});

