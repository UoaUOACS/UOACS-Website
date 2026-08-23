import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"

/**
 * Primitives are shared across UOACS apps and live in @uoacs/ui; the Generic and
 * Composite tiers stay app-local. Paths are relative to this plopfile.
 */
const TIERS = {
  Primitive: {
    root: "../../packages/ui/src/components",
    cnImport: "../../utils/cn",
  },
  Generic: {
    root: "src/components/Generic",
    cnImport: "@uoacs/ui",
  },
  Composite: {
    root: "src/components/Composite",
    cnImport: "@uoacs/ui",
  },
}

/** @param {import("plop").NodePlopAPI} plop */
export default function (plop) {
  plop.setGenerator("component", {
    description:
      "Scaffold a new component in @uoacs/ui (Primitive) or this app (Generic/Composite)",
    prompts: [
      {
        type: "list",
        name: "tier",
        message: "Which tier does this component belong to?",
        choices: Object.keys(TIERS),
      },
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase):",
        validate: (input, answers) => {
          if (!/^[A-Z][A-Za-z0-9]*$/.test(input)) {
            return "Name must be PascalCase (e.g. Badge, EventCard) with letters/numbers only"
          }
          const { root } = TIERS[answers.tier]
          if (fs.existsSync(path.join(process.cwd(), root, input))) {
            return `${root}/${input} already exists`
          }
          return true
        },
      },
    ],
    actions: (answers) => {
      const isPrimitive = answers?.tier === "Primitive"
      const { root, cnImport } = TIERS[answers.tier]
      const base = `${root}/{{pascalCase name}}`
      const actions = [
        {
          type: "add",
          path: `${base}/{{pascalCase name}}.tsx`,
          templateFile: "generators/component/Component.tsx.hbs",
          data: { isPrimitive, cnImport },
        },
      ]

      if (isPrimitive) {
        actions.push({
          type: "add",
          path: `${base}/{{pascalCase name}}.variants.ts`,
          templateFile: "generators/component/Component.variants.ts.hbs",
        })
      }

      actions.push(
        {
          type: "add",
          path: `${base}/{{pascalCase name}}.stories.tsx`,
          templateFile: "generators/component/Component.stories.tsx.hbs",
        },
        { type: "addBarrelExport" },
        { type: "format" },
      )

      return actions
    },
  })

  plop.setActionType("addBarrelExport", (answers) => {
    const pascalName = plop.getHelper("pascalCase")(answers.name)
    const { root } = TIERS[answers.tier]
    const barrelPath = path.join(process.cwd(), root, "index.ts")
    const exportLine = `export * from "./${pascalName}/${pascalName}"`

    const existing = fs.readFileSync(barrelPath, "utf-8")
    const lines = existing.split("\n").filter((line) => line.length > 0)
    lines.push(exportLine)
    lines.sort()
    fs.writeFileSync(barrelPath, `${lines.join("\n")}\n`)

    return `updated ${path.relative(process.cwd(), barrelPath)}`
  })

  plop.setActionType("format", (answers) => {
    const pascalName = plop.getHelper("pascalCase")(answers.name)
    const { root } = TIERS[answers.tier]
    const componentDir = path.join(root, pascalName)
    const barrelPath = path.join(root, "index.ts")

    execSync(`pnpm exec biome check --write "${componentDir}" "${barrelPath}"`, {
      stdio: "inherit",
    })

    return "formatted generated files with biome"
  })
}
