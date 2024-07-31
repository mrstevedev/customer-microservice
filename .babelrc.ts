import path from "path";
import tsConfig from "./tsconfig.json";

export default {
  presets: ["@babel/preset-env"],
  plugins: [
    ["module-resolver"],
    { root: [path.resolve(tsConfig.compilerOptions.baseUrl)] },
  ],
};
