import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import Button from "./index"

const defaultProps = {
    onClick: jest.fn(),
}

describe("test button component", () => {
    it("should render the correct default", () => {
        render(<Button {...defaultProps}>button test</Button>)
        const element = screen.getByText("button test")
        expect(element).toBeTruthy()
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual("BUTTON")
        expect(element).toHaveClass("btn btn-default")
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })

    it("should render the button with different props", () => {
        render(
            <Button btnType="primary" className="custom-class">
                Button Primary
            </Button>
        )
        const element = screen.getByText("Button Primary")
        expect(element).toBeTruthy()
        expect(element).toHaveClass("btn btn-primary custom-class btn-middle")
    })

    it("should render the correct button with a tag link", () => {
        render(
            <Button btnType="link" href="https://github.com/" {...defaultProps} disabled>
                Button Link
            </Button>
        )
        const element = screen.getByText("Button Link")
        expect(element.tagName).toEqual("A")
        expect(element).toHaveClass("btn btn-link disabled")
        // fireEvent.click(element)
        // expect(defaultProps.onClick).not.toHaveBeenCalled()
    })

    it("should render the correct button with disabled", () => {
        render(
            <Button disabled {...defaultProps}>
                Button Disabled
            </Button>
        )
        const element = screen.getByText("Button Disabled") as HTMLButtonElement
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(defaultProps.onClick).not.toHaveBeenCalled()
    })
})
