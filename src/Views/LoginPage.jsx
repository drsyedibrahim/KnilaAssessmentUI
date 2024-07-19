import React, { useState } from 'react';
import { handleLogin } from '../Controller/AuthController';
//import './Login.css'

const Login = ({ setToken }) => {
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(emailId, password, setError, setToken);
  };

  return (
    <section className="vh-100">
        <div className="container h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid" alt="Sample image"/>
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                        <p className="lead fw-normal mb-0 me-3">Sign In</p>
                    </div>

                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0"></p>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                        <input value={emailId} onChange={(e) => setEmail(e.target.value)} style={{ marginLeft: '10px' }}
                        id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3">
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginLeft: '10px' }}
                        id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
                    </div>

                    <div className="text-center text-lg-start mt-4 pt-2">
                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>  Login </button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!" className="link-danger">Register</a></p>
                    </div>

                </form>
            </div>
            </div>
        </div>
        <div
            className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
            <div className="text-white mb-3 mb-md-0">
            Copyright © 2024. All rights reserved.
            </div>
        </div>
    </section>
  );
};

export default Login;