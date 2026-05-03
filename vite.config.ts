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
      { src: "src/templates", dest: "dist" }
     ],
     hook: "writeBundle",
   }),
 ],
});