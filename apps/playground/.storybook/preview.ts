import type { Preview } from "@storybook/nextjs-vite"
import { sb } from "storybook/test"
import "../src/app/globals.css"
import "@uoacs/ui/styles/fonts.css"

// The real action imports Payload, which cannot run in the browser
sb.mock(import("../src/features/project/actions/toggleLike.ts"))

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
