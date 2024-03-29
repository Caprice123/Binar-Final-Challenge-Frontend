import React, { useEffect, useState } from 'react';

// components
import Input from '../components/Input';
import imageCover from '../assets/images/login-reg-banner.png'
import ActiveButton from '../components/ActionButton';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert'

import { Link, useNavigate } from 'react-router-dom'

// styles
import styles from '../assets/css/auth.module.css'

// helpers
import { validateString } from '../helpers/validator/validateString';
import { validateEmail } from '../helpers/validator/validateEmail';

// react redux
import { useDispatch, useSelector } from 'react-redux';

// actions
import { statusActions } from '../store/status';

// services
import { register } from '../services/user';

// pages
import { LOGIN_ROUTE, ERROR_500_ROUTE } from '../types/pages';
const Registrasi = () => {
    /**************************************************************/
    // REDUX STATE
    const { loading, error } = useSelector(state => state.status)
    /**************************************************************/
    

    /**************************************************************/
    // STATE
    // MAIN STATE
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    /**************************************************************/
    

    /**************************************************************/
    // REACT-ROUTER-DOM HOOKS
    // NAVIGATION
    const navigate = useNavigate()
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

        switch(id){
            case "Nama":
                validateString(value, setName)
                break
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

    // onSubmit for calling register api when user click register button
    const onSubmit = async (e) => {
        e.preventDefault()
        if (name.length === 0){
            alert("Tolong isi nama")
            return
        }

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

            await dispatch(register({
                name,
                email,
                password
            })).unwrap()
    
            dispatch(statusActions.setLoading({
                status: false,
            }))

            navigate(LOGIN_ROUTE, {
                state: {
                    message: "Successfully register"
                }
            })
        } catch(err){
            const error = JSON.parse(err.message)
            const statusCode = error.statusCode
            switch (statusCode){
                case 500:
                    navigate(ERROR_500_ROUTE)
                    break
                
                default:
                    dispatch(statusActions.setError({
                        message: error.message,
                    }))
            }
        }
    }

    // onCloseAlert for resetting error when close button alert for errror message is clicked
    const onCloseAlert = () => {
        dispatch(statusActions.setError({
            message: "",
        }))
    }
    /**************************************************************/
    
    
    /**************************************************************/
    // USEEFFECT
    // resetting error and resetting flash message so that when page load again doesn't include uselocation
    useEffect(() => {
        dispatch(statusActions.setError({
            message: "",
        }))
	}, [dispatch])
    /**************************************************************/

    return (
        <div>
            <LoadingSpinner active={loading} />
            <Alert active={error.length > 0} 
                    backgroundColor="var(--redalert-background)" 
                    color="var(--redalert-font)" 
                    text={error} 
                    onClick={onCloseAlert} 
                    id="error-message"
                    />
            
            <div className={styles.page_auth + " vh-100"}>
                <div className="container-fluid h-100">
                    <div className="row align-items-center h-100">
                        <div className={styles.auth_left + " col-lg-6 d-none d-lg-block"}>
                            <div className={styles.auth_cover}>
                                <img src={imageCover} alt="" />
                            </div>
                        </div>
                        <div className={styles.auth_right + " col-lg-6 col-12"}>
                            <div className={styles.auth_form_wrapper + " mx-auto"}>
                                <h3 className="title fw-bold">Daftar</h3>
                                <form onSubmit={onSubmit}>
                                    <Input type="text"
                                            text="Nama"
                                            placeholder="Masukan nama anda"
                                            value={name}
                                            onChange={onChange}
                                            required
                                            />
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
                                                    text="Register"
                                                    style={{ margin: "1.5rem 0" }}
                                                    onClick={onSubmit}
                                                    id="submit-btn"
                                                    />
                                </form>
                                <div className={styles.footer}>
                                    
                                    <p className='text-center mt-3'>
                                        Sudah punya akun? 
                                        <Link to={LOGIN_ROUTE} className={`${styles.text_purple} ms-3`}>
                                            Masuk disini
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

export default Registrasi;
