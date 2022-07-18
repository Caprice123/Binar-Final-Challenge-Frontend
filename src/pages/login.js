import React, { useState, useEffect } from 'react';

// components
import ActiveButton from '../components/ActionButton';
import Input from '../components/Input';
import imageCover from '../assets/images/login-reg-banner.png'
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import { FcGoogle } from "react-icons/fc";

import { Link, useLocation, useNavigate } from 'react-router-dom';

// styles
import styles from '../assets/css/auth.module.css'

// helpers
import { validateEmail } from '../helpers/validateEmail';

// react redux
import { useDispatch, useSelector } from 'react-redux';

// actions
import { statusActions } from '../store/status'

// services
import { login } from '../services/user';

// hooks
import {useGoogleLogin } from '@react-oauth/google'

import { useFlashMessage } from '../hooks/useFlashMessage';

// pages
import { HOME_ROUTE, REGISTER_ROUTE } from '../types/pages';

// others
import axios from 'axios'

const Login = () => {
    /**************************************************************/
    // REDUX STATE
    const { loading, error } = useSelector(state => state.status)
    /**************************************************************/


    /**************************************************************/
    // STATE
    // FLASH STATE
    const [flashMessage, setFlashMessage] = useFlashMessage("")

    // MAIN STATE
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    /**************************************************************/


    /**************************************************************/
    // REACT-ROUTER-DOM HOOKS
    // NAVIGATION
    const navigate = useNavigate()

    // LOCATION
    const location = useLocation()
    /**************************************************************/
    

    /**************************************************************/
    // REDUX DISPATCH
    const dispatch = useDispatch()
    /**************************************************************/


    /**************************************************************/
    // ACTIONS
    // onChange for changing the state eveytime user input something in input tag
    const onChange = (e) => {
        const { value, id } = e.currentTarget
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

    // onSubmit for calling api when user click login button
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
            dispatch(statusActions.setLoading({
                status: true,
            }))
            
            await dispatch(login({
                email,
                password
            })).unwrap()

            dispatch(statusActions.setLoading({
                status: false,
            }))

            navigate(HOME_ROUTE, { 
                state: {
                    message: "Login Successful",
                },
            })
        } catch(err){
            console.log(err);
            dispatch(statusActions.setError({
                message: err.message,
            }))
        }
    }

    // onCloseAlert for resetting error when close button alert for errror message is clicked
    const onCloseAlert = () => {
        dispatch(statusActions.setError({
            message: ""
        }))
    }

    // onCloseFlash for resetting flash message when close button flash message is clicked
	const onCloseFlash = () => {
		setFlashMessage("")
	}

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
    /**************************************************************/


    /**************************************************************/
    // USEEFFECT
    // resetting error and resetting flash message so that when page load again doesn't include uselocation
    useEffect(() => {
        dispatch(statusActions.setError({
            message: ""
        }))
        
        navigate(location.pathname + location.search, { replace: true })
	}, [dispatch, navigate, location.pathname, location.search])
    /**************************************************************/

    return (
        <div>
            <LoadingSpinner active={loading} />
            <Alert active={flashMessage.length > 0} 
					backgroundColor="var(--alert-success)" 
					color="var(--white-color)" 
					text={flashMessage} 
					onClick={onCloseFlash} 
					/>
            <Alert active={error.length > 0} 
                    backgroundColor="var(--redalert-background)" 
                    color="var(--redalert-font)" 
                    text={error} 
                    onClick={onCloseAlert} 
                    />
            
            <div className={styles.page_auth + " vh-100"}>
                <div className="container-fluid h-100">
                    <div className="row align-items-center h-100">
                        <div className={styles.auth_left + " col-lg-6 d-none d-lg-block"}>
                            <div className={styles.auth_cover}>
                                <img src={imageCover} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className={styles.auth_form_wrapper + " mx-auto"}>
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
                                                color="var(--primary-purple-04)"
                                                text="Masuk"
                                                style={{ margin: "1.5rem 0" }}
                                                onClick={onSubmit}
                                                />
                                 <ActiveButton width="100%"
                                                color="var(--primary-purple-04)"
                                                text="Masuk dengan Google"
                                                icon={<FcGoogle className="me-3"/>}
                                                style={{ margin: "1.5rem 0" }}
                                                onClick={googleLogin}
                                                />
                                <div className={styles.footer}>
                                    <p className='text-center mt-3'>
                                        Belum punya akun? 
                                    
                                        <Link to={REGISTER_ROUTE} className={`${styles.text_purple} ms-3`}>
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
