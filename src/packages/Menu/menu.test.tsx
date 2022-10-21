import React from "react"
import { render, RenderResult, screen, fireEvent, cleanup } from "@testing-library/react"
import Menu, { MenuProps } from "./Menu"
import MenuItem, { MenuItemProps } from "./MenuItem"

const testprops: MenuProps = {
    defaultIndex: 1,
    onSelect: jest.fn(),
    className: "test",
}

const testVerticalProps: MenuProps = {
    defaultIndex: 1,
    onSelect: jest.fn(),
    className: "test",
    mode: "vertical",
}

const generateMenuNode = (props: MenuProps): any => {
    return (
        <div>
            <Menu {...props}>
                <MenuItem index={1}>active</MenuItem>
                <MenuItem index={2} disabled>
                    disabled
                </MenuItem>
                <MenuItem index={3}>3</MenuItem>
                <MenuItem index={4}>4</MenuItem>
            </Menu>
        </div>
    )
}

describe("test Menu and MrnuItem component", () => {
    let wrapper: RenderResult,
        menuElement: HTMLElement,
        activeElement: HTMLElement,
        menuItemElement: HTMLElement,
        disabledElement: HTMLElement

    beforeEach(() => {
        render(generateMenuNode(testprops))
        menuElement = screen.getByTestId("test-menu")
        activeElement = screen.getByText("active")
        disabledElement = screen.getByText("disabled")
    })

    it("should render the correct Menu and MenuItem base on default props", () => {
        // expect(menuElement).toBeTruthy()
        expect(menuElement).toBeInTheDocument()
        expect(menuElement.tagName).toEqual("UL")
        expect(menuElement).toHaveClass("menu test")
        expect(menuElement.childNodes.length).toEqual(4)
        expect(activeElement).toHaveClass("menu-item is-active")
        expect(disabledElement).toHaveClass("menu-item is-disabled")
    })

    it("click items should change active and call right callback", () => {
        const needActiveElement: Element = menuElement.lastElementChild!
        fireEvent.click(needActiveElement)
        expect(needActiveElement).toHaveClass("menu-item is-active")
        expect(activeElement).not.toHaveClass("is-active")
        // expect(testprops.onSelect).toHaveBeenCalled()
        expect(testprops.onSelect).toHaveBeenCalledWith(4)

        // disabled menuElement
        fireEvent.click(disabledElement)
        // expect(testprops.onSelect).toHaveBeenCalledWith(2)
        // 第一次被调用过，这里使用回调参数最为准确
        expect(testprops.onSelect).not.toHaveBeenCalledWith(2)
    })
    it("should render vertical mode when the mode is seted vertical", () => {
        cleanup()
        render(generateMenuNode(testVerticalProps))
        const menuElement = screen.getByTestId("test-menu")

        expect(menuElement).toHaveClass("menu menu-vertical")
    })
})
