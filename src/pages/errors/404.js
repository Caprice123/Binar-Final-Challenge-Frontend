import React from 'react'
import { Link } from 'react-router-dom'
import { HOME_ROUTE } from '../../types/pages'

const Error404 = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: "100vw", height: "100vh"}}>
            <h1>404</h1>
            <p>Data Not Found</p>
            <div>
                <span>Click </span> 
                <Link to={HOME_ROUTE}><span  style={{ color: "var(--primary-purple-04)"}}>here</span></Link>
                <span> to back to home page</span>
            </div>
        </div>
    )
}

export default Error404