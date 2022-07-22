import { render, screen } from '@testing-library/react'
import ActionButton from './'

test("Action Button Test", () => {
    render(<ActionButton 
        text={"Hello Word!"}
    />)

    const button = screen.getByText(/Hello Word!/)
    expect(button).toBeInTheDocument()
})