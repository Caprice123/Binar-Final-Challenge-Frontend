import React from 'react';

import '../../assets/css/auth.style.css'
import imageCover from '../../assets/images/cover.png'

const Login = () => {
    return (
        <div>
            <div className="page-login vh-100">
                <div className="container-fluid h-100">
                    <div className="row align-items-center h-100">
                        <div className="col-md-6 d-none d-md-block login__left">
                            <div className="login-cover">
                                <div className="brand">
                                    <p>Second</p>
                                    <p>Hand.</p>
                                </div>
                                <img src={imageCover} alt="" />
                            </div>
                        </div>
                        <div className="col-md-6 col-12 login__right">
                            <div className="login__form-wrapper">
                                <h3 className="title fw-bold">Masuk</h3>
                                <form action="">
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Email </label>
                                        <input type="email" class="form-control rounded-pill" id="email" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="password" class="form-label">Password</label>
                                        <input type="password" class="form-control rounded-pill" id="password" />
                                    </div>
                                    <button className="btn btn-primary d-block w-100 rounded-pill">Masuk</button>
                                </form>
                                <div className="footer">
                                    <p className='text-center mt-3'>Belum punya akun? <a href=""class="text-purple">Daftar disini</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
