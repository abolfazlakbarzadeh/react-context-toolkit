import packageJson from "./package.json" assert { type: "json" };
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import peerDependencies from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import jsonPlugin from "@rollup/plugin-json";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: packageJson.main,
        type: "cjs",
        sourcemap: true,
        name: "react-context-toolkit",
      },
      {
        file: packageJson.module,
        type: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      terser(),
      jsonPlugin(),
      commonjs(),
      postcss(),
      resolve(),
      peerDependencies(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "esm",
      },
    ],
    external: [/\.css$/],
    plugins: [dts()],
  },
];
