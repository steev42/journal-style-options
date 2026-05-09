import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";

export default defineConfig({
 build: {
   sourcemap: true,
   rollupOptions: {
     input: {
       module: "src/ts/module.ts",
       style: "src/styles/style.scss"
     },
     output: {
       dir: "dist",
       entryFileNames: "scripts/[name].js",
       assetFileNames: "styles/[name].css",
       format: "es",
     },
   },
 },
 plugins: [
   copy({
     targets: [
      { src: "src/module.json", dest: "dist" },
      { src: "src/templates", dest: "dist" },
      { src: "src/styles/assets", dest: "dist/styles"},
      { src: "src/styles/fonts", dest: "dist/styles"},
      { src: "src/styles/pf2e-av.css", dest: "dist/styles"},
      { src: "src/styles/kingmaker/*", dest: "dist/styles"}
     ],
     hook: "writeBundle",
   }),
 ],
});