import type { Preview } from "@storybook/nextjs-vite"
import "../src/app/globals.css"
import "@uoacs/ui/styles/fonts.css"

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
