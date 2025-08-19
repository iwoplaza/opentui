import { spawnSync, type SpawnSyncReturns } from "node:child_process"
import { readFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

interface PackageJson {
  name: string
  version: string
  dependencies?: Record<string, string>
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = resolve(__dirname, "..")

const packageJson: PackageJson = JSON.parse(readFileSync(join(rootDir, "package.json"), "utf8"))

console.log(`Publishing @opentui/solid@${packageJson.version}...`)
console.log("Make sure you've run the pre-publish validation script first!")

const distDir = join(rootDir, "dist")

console.log(`\nPublishing ${packageJson.name}@${packageJson.version}...`)

const publish: SpawnSyncReturns<Buffer> = spawnSync("npm", ["publish", "--access=public"], {
  cwd: distDir,
  stdio: "inherit",
})

if (publish.status !== 0) {
  console.error(`Failed to publish '${packageJson.name}@${packageJson.version}'.`)
  process.exit(1)
}

console.log(`Successfully published '${packageJson.name}@${packageJson.version}'`)
