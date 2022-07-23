import { render, screen } from '@testing-library/react'
import BorderOnlyButton from './'

test("Border Only Button Test", () => {
    render(<BorderOnlyButton
        text={"Hello Word!"}
    />)

    const button = screen.getByText(/Hello Word!/)
    expect(button).toBeInTheDocument()
})