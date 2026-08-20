import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"

const TIERS = ["Primitive", "Generic", "Composite"]

/** @param {import("plop").NodePlopAPI} plop */
export default function (plop) {
  plop.setGenerator("component", {
    description: "Scaffold a new component under src/components/{Primitive,Generic,Composite}",
    prompts: [
      {
        type: "list",
        name: "tier",
        message: "Which tier does this component belong to?",
        choices: TIERS,
      },
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase):",
        validate: (input, answers) => {
          if (!/^[A-Z][A-Za-z0-9]*$/.test(input)) {
            return "Name must be PascalCase (e.g. Badge, EventCard) with letters/numbers only"
          }
          const dir = path.join(process.cwd(), "src/components", answers.tier, input)
          if (fs.existsSync(dir)) {
            return `src/components/${answers.tier}/${input} already exists`
          }
          return true
        },
      },
    ],
    actions: (answers) => {
      const isPrimitive = answers?.tier === "Primitive"
      const base = "src/components/{{tier}}/{{pascalCase name}}"
      const actions = [
        {
          type: "add",
          path: `${base}/{{pascalCase name}}.tsx`,
          templateFile: "generators/component/Component.tsx.hbs",
          data: { isPrimitive },
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
    const barrelPath = path.join(process.cwd(), "src/components", answers.tier, "index.ts")
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
    const componentDir = path.join("src/components", answers.tier, pascalName)
    const barrelPath = path.join("src/components", answers.tier, "index.ts")

    execSync(`pnpm exec biome check --write "${componentDir}" "${barrelPath}"`, {
      stdio: "inherit",
    })

    return "formatted generated files with biome"
  })
}
