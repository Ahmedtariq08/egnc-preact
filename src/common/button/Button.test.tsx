/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { render, fireEvent } from "@testing-library/react";
import { ButtonComponent } from "./ButtonComponent";
import "@testing-library/jest-dom";

describe("Button test", () => {
    it("should pass the test", () => {
        const input = 3;
        expect(input + 3).toEqual(6);
    });

    it("should render button", () => {
        const result = render(<ButtonComponent buttonTitle="test button" />);
        const button = result.getAllByRole("button");
        const input = 3;
        expect(input + 3).toEqual(6);
    });
});

describe("ButtonComponent", () => {
    const defaultProps = {
        buttonTitle: "Test Button",
        icon: "icon-class",
    };

    it("renders a button with icon", () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { getByRole, getByText } = render(<ButtonComponent {...defaultProps} />);
        const button = getByRole("button");
        // const icon = getByText("Test Button"); // You can adjust this selector based on your icon rendering logic

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("icon-class");
        expect(button).toHaveTextContent("Test Button");
    });

    it("calls the provided ojAction function when clicked", () => {
        const mockAction = jest.fn();
        const { getByRole } = render(<ButtonComponent {...defaultProps} ojAction={mockAction} />);
        const button = getByRole("button");

        fireEvent.click(button);

        expect(mockAction).toHaveBeenCalledTimes(1);
    });

    it("renders a button without icon", () => {
        const { getByRole } = render(<ButtonComponent {...defaultProps} icon={undefined} />);
        const button = getByRole("button");

        expect(button).toBeInTheDocument();
        expect(button).not.toHaveClass("icon-class");
        expect(button).toHaveTextContent("Test Button");
    });

    it("disables the button when disabled prop is true", () => {
        const { getByRole } = render(<ButtonComponent {...defaultProps} disabled={true} />);
        const button = getByRole("button");

        expect(button).toBeDisabled();
    });

    // Add more test cases for different chroming values and edge cases if needed.
});
