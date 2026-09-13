import type { Preview } from "@storybook/nextjs-vite"
import "@uoacs/ui/styles/fonts.css"
import "../src/app/globals.css"
import "./preview.css"

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
