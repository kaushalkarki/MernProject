import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';




const Login = () => {

    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = res.json();
        if (res.status === 400 || !data) {
            window.alert("Invalid Credential");
        }
        else {
            dispatch({ type: "USER", payload: true })
            window.alert("Login Successful");
            navigate('/');
        }
    }
    return (
        <section>
            <div className="container mt-5">
                <div className='sign-in-form col-lg-8 offset-lg-4 '>
                    <h2 className='ml-5'>Sign In</h2>
                    <form method='POST' className='sign-in-form ml-5 mt-5 '>

                        <div className='form-group'>
                            <label htmlFor='email'>
                                <i class="zmdi zmdi-email material-iconso-name" />
                            </label>

                            <input className="ml-3 i-field" type="text" name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your Email' autoComplete='off' />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'>
                                <i class="zmdi zmdi-lock material-iconso-name" />
                            </label>
                            <input className="ml-3 i-field" type="password" name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' autoComplete='off' />
                        </div>

                        <div className='form-group form button'>
                            <input type="submit" name='sign-in' id="sign-in" className='form-submit form-button' onClick={loginUser} value="Login" />

                        </div>
                    </form>
                    <h6 className='ml-5 mt-5'>
                        <NavLink className="nav-link active" aria-current="page" to="/signup">New Registration</NavLink>                            </h6>
                </div>

            </div>
        </section>
    )
}

export default Login
