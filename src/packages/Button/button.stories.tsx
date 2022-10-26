import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import Button from "./index"

export default {
    title: "Examples/Button",
    component: Button,
    argTypes: {
        // backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Button>

export const defaultButton = () => <Button onClick={action("clicked")}> default button </Button>

export const buttonWithSize = () => (
    <>
        <Button size="large"> large button </Button>
        <Button size="small"> small button </Button>
    </>
)

export const buttonWithType = () => (
    <>
        <Button btnType="primary"> primary button </Button>
        <Button danger> danger button </Button>
        <Button btnType="link" href="##">
            primary button link
        </Button>
        <Button danger btnType="link">
            danger button link
        </Button>
    </>
)
