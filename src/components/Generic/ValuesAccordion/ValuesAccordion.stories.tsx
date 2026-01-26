import type { Meta, StoryObj } from "@storybook/react"
import { VALUES } from "@/components/Composite/ValuesSection/ValuesSection.constants"
import { ValuesAccordion, type ValuesAccordionProps } from "./ValuesAccordion"

const meta: Meta<ValuesAccordionProps> = {
  title: "Generic Components/ValuesAccordion",
  component: ValuesAccordion,
  args: {
    values: VALUES,
  },
  argTypes: {
    values: { control: "object" },
  },
}

export default meta
type Story = StoryObj<ValuesAccordionProps>

export const Default: Story = {}
