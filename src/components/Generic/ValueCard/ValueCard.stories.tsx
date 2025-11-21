import type { Meta, StoryObj } from "@storybook/react"
import { ValueCard } from "./ValueCard"

const meta: Meta<typeof ValueCard> = {
  title: "Generic Components/ValueCard",
  component: ValueCard,
  argTypes: {
    title: { control: "text" },
    colour: { control: "select", options: ["purple", "blue", "red", "yellow"] },
  },
  args: {
    title: "Collaborate",
    colour: "purple",
    children: (
      <div className="flex flex-col gap-4">
        <p>
          Most people in the industry would agree that the phrase{" "}
          <span className="bg-accent-yellow">"Your network is your net worth"</span>, rings true.
        </p>
        <p>
          We also align ourselves with this phrase and we hope to cultivate an environment where
          people can expand their network and create opportunities for their futures.
        </p>
        <p>Whether this is with the faculty, industry, or even just with one another.</p>
      </div>
    ),
  },
}
export default meta

type Story = StoryObj<typeof ValueCard>

export const Basic: Story = {}
