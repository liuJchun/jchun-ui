import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import Icon from "./index"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Examples/Icon",
    component: Icon,
    argTypes: {
        // backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = args => <Icon {...args} />

export const PrimaryType = Template.bind({})
PrimaryType.args = {
    theme: "primary",
    icon: "coffee",
}

export const IconSize = Template.bind({})
IconSize.args = {
    size: "2x",
    icon: "coffee",
}
