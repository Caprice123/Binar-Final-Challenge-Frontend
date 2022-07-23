import React from 'react'
import { Link } from 'react-router-dom'
import { HOME_ROUTE } from '../../types/pages'

const Error500 = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: "100vw", height: "100vh"}}>
            <h1>500</h1>
            <p>Internal Server Error</p>
            <div>
                <span>Click </span> 
                <Link to={HOME_ROUTE}><span  style={{ color: "var(--primary-purple-04)"}}>here</span></Link>
                <span> to back to home page</span>
            </div>
        </div>
    )
}

export default Error500