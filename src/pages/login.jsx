import React, { useState } from 'react';
import axios from 'axios'
import {useGoogleLogin } from '@react-oauth/google'

// components
import ActiveButton from '../components/ActionButton';
import Input from '../components/Input';
import imageCover from '../assets/images/cover.png'

import { Link } from 'react-router-dom';

// styles
import styles from '../assets/css/auth.module.css'

// helpers
import { validateEmail } from '../helpers/validateEmail';

// react redux
import { login } from '../store/user';
import { useDispatch } from 'react-redux';


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
          const userInfo = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            { headers: { Authorization: 'Bearer ' + tokenResponse.access_token } },
          );
    
          console.log(userInfo);
        },
        onError: errorResponse => console.log(errorResponse),
      });
    

    const onChange = (e) => {
        const { value, id } = e.currentTarget
        console.log(value, id);
        switch (id){
            case "Email":
                setEmail(value)
                break
            case "Password":
                setPassword(value)
                break
            default: 
                break
        }
    }

    const onSubmit = async () => {
        if (email.length === 0){
            alert("Tolong isi email")
            return
        }
        
        if (!validateEmail(email)){
            alert("Invalid email format")
            return
        }

        if (password.length === 0){
            alert("Tolong isi password")
            return
        }

        try{
            dispatch(login({
                email,
                password
            }))
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <div className={styles.page_auth + " vh-100"}>
                <div className="container-fluid h-100">
                    <div className="row align-items-center h-100">
                        <div className={styles.auth_left + " col-md-6 d-none d-md-block"}>
                            <div className={styles.auth_cover}>
                                <div className={styles.brand}>
                                    <p className={styles.text_brand}>Second</p>
                                    <p className={styles.text_brand}>Hand.</p>
                                </div>
                                <img src={imageCover} alt="" />
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className={styles.auth_form_wrapper + " mx-auto"} style={{ width: "50%" }}>
                                <h3 className="title fw-bold">Masuk</h3>
                                   
                                <Input type="email"
                                        text="Email"
                                        placeholder="handayani@gmail.com"
                                        value={email}
                                        onChange={onChange}
                                        required
                                        />
                                <Input type="password"
                                        text="Password"
                                        placeholder="Masukan password anda"
                                        value={password}
                                        onChange={onChange}
                                        required
                                        />
                                <ActiveButton width="100%"
                                                color="#7126B5"
                                                text="Masuk"
                                                style={{ margin: "1.5rem 0" }}
                                                onClick={onSubmit}
                                                />
                                <ActiveButton width="100%"
                                                color="#7126B5"
                                                text="Masuk Dengan Google"
                                                style={{ margin: "1.5rem 0" }}
                                                onClick={googleLogin}
                                                />
                                <div className={styles.footer}>
                                    <p className='text-center mt-3'>
                                        Belum punya akun? 
                                    
                                        <Link to="/register" className="text-purple">
                                            Daftar disini
                                        </Link>
                                    
                                    </p>
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
