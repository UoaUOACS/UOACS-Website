import type { StorybookConfig } from "@storybook/nextjs-vite"
import type { Plugin } from "vite"

/** Used only when the real environment leaves the variable unset or empty. */
const PLACEHOLDER_ENV = {
  NEXT_PUBLIC_AUTH_URL: "http://localhost:3002",
  NEXT_PUBLIC_WEBSITE_URL: "http://localhost:3000",
  NEXT_PUBLIC_PROJECTS_URL: "http://localhost:3001",
}

/**
 * Components call `authPageUrl()` and `websiteUrl()` during render, which throw if these
 * variables are missing (CI and fresh checkouts have no env file). Runs after the Next.js env
 * plugin, so values from the shell or env files win.
 */
const placeholderEnvPlugin: Plugin = {
  name: "uoacs:placeholder-env",
  enforce: "post",
  config(config) {
    const define = Object.fromEntries(
      Object.entries(PLACEHOLDER_ENV)
        .filter(([key]) => !JSON.parse(config.define?.[`process.env.${key}`] ?? '""'))
        .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)]),
    )
    return { define }
  },
}

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../../packages/ui/src/**/*.mdx",
    "../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  viteFinal: (config) => ({
    ...config,
    plugins: [...(config.plugins ?? []), placeholderEnvPlugin],
  }),
}
export default config
