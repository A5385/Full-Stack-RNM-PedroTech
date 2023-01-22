import React from 'react'
import { Link } from 'react-router-dom';
// import Home from './pages/Home';

const PageNotFound = () => {
    return (
        <div>
            <h1>Page Not Found</h1>
            <h3>Go to the home page:
                <Link
                    style={{ color: "black",textDecoration:"underline" }} to="/"> Home Page</Link>
            </h3>
        </div>
    )
}

export default PageNotFound