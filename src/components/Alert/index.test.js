import { render, screen } from '@testing-library/react'
import Alert from './'

test("Alert Test", () => {
    render(<Alert 
        active
        text={"Hello Word!"}
    />)

    const alert = screen.getByText(/Hello Word!/)
    expect(alert).toBeInTheDocument()
})

test("Alert Test", () => {
    render(<Alert 
        text={"Hello Word!"}
    />)

    const alert = screen.getByText(/Hello Word!/)
    expect(alert).toBeInTheDocument()
})
