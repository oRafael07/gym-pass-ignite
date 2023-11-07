import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"
import swc from "unplugin-swc"

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    swc.vite({
      module: { type: "es6" },
    }),
  ],
  test: {
    reporters: ["verbose"],
    include: ["**/*.e2e-spec.ts"],
    globals: true,
    environmentMatchGlobs: [["src/http/controllers/**", "prisma"]],
  },
})
