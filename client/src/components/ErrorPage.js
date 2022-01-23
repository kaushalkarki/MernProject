import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <>
            <div id='notfound'>
                <div className='notfound'>
                    <h1>404</h1>

                </div>
                <h1>We are Sorry Page Not Found</h1>
                <p>The page you are looking for might have been removed. </p>
                <NavLink to={"/"}>Homepage</NavLink>
            </div>
        </>
    )
        ;
};

export default ErrorPage;
