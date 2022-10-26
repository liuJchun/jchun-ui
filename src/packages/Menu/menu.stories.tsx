import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import Menu from "./index"

export default {
    title: "Examples/Menu",
    component: Menu,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Menu>

const Template: ComponentStory<typeof Menu> = args => (
    <Menu {...args}>
        <Menu.Item>213123</Menu.Item>
    </Menu>
)

export const PrimaryMenu = Template.bind({})
PrimaryMenu.args = {
    // btnType: "primary",
}
