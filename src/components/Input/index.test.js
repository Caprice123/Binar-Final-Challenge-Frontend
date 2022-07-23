import { render, screen } from '@testing-library/react'
import Input from './'

test("Input Test", () => {
    render(<Input
        type={"password"} 
        value={"Hello Word!"}
    />)

    const button = screen.getByDisplayValue (/Hello Word!/)
    expect(button).toBeInTheDocument()
})

test("Input Test", () => {
    render(<Input
        type={"text"} 
        value={"Hello Word!"}
    />)

    const button = screen.getByDisplayValue (/Hello Word!/)
    expect(button).toBeInTheDocument()
})