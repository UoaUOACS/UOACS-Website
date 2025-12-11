import type { Meta, StoryFn, StoryObj } from "@storybook/react"
import { ValuesFingerprint } from "./ValuesFingerprint"

const meta: Meta<typeof ValuesFingerprint> = {
  title: "Generic Components/ValuesFingerprint",
  component: ValuesFingerprint,
  argTypes: {
    label: { control: "text" },
    variant: { control: "object" },
    className: { control: "text" },
  },
  args: {
    label: "Collaborate",
    variant: { colour: "purple", size: "md" },
  },
}

export default meta

export const Default: StoryObj<typeof ValuesFingerprint> = {
  args: {},
}

export const Sizes: StoryFn<typeof ValuesFingerprint> = (args) => {
  return (
    <div className="flex flex-col gap-8">
      <ValuesFingerprint {...args} label="Collaborate" variant={{ colour: "purple", size: "sm" }} />
      <ValuesFingerprint {...args} label="Develop" variant={{ colour: "blue", size: "md" }} />
      <ValuesFingerprint {...args} label="Network" variant={{ colour: "red", size: "lg" }} />
    </div>
  )
}
