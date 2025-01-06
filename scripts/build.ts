import Bun from "bun";
import dts from "bun-plugin-dts";

await Bun.build({
  entrypoints: ["./src/dotted.ts"],
  outdir: "./dist",
  target: "node",
  plugins: [dts()],
});
