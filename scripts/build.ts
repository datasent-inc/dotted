import Bun from "bun";

await Bun.build({
  entrypoints: ["./src/dotted.ts"],
  outdir: "./dist",
  target: "node",
});
