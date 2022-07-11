import React, { useState, useEffect } from 'react';

// components
import ActiveButton from '../components/ActionButton';
import Input from '../components/Input';
import imageCover from '../assets/images/login-reg-banner.png'
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

import { Link, useLocation, useNavigate } from 'react-router-dom';

// styles
import styles from '../assets/css/auth.module.css'

// helpers
import { validateEmail } from '../helpers/validateEmail';

// react redux
import { useDispatch, useSelector } from 'react-redux';

// actions
import { userActions } from '../store/user';
import { productActions } from '../store/product';
import { bidActions } from '../store/bids';

// services
import { login } from '../services/user';

// hooks
import { useFlashMessage } from '../hooks/useFlashMessage';
import { HOME_ROUTE, REGISTER_ROUTE } from '../types/pages';

const Login = () => {
    // redux state
    const { loading, error } = useSelector(state => state.user)
    
    // state
    const [flashMessage, setFlashMessage] = useFlashMessage("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()
    const location = useLocation()

    // dispatch redux
    const dispatch = useDispatch()
    
    
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
            await dispatch(login({
                email,
                password
            })).unwrap()
            navigate(HOME_ROUTE, { 
                state: {
                    message: "Login Successful",
                },
            })
        } catch(err){
            console.log(err);
        }
    }

    const onCloseAlert = () => {
        dispatch(userActions.clearError())
    }
      
	const onCloseFlash = () => {
		setFlashMessage("")
	}

    useEffect(() => {
		dispatch(userActions.clearError())
		dispatch(productActions.clearError())
		dispatch(bidActions.clearError())
        navigate(location.pathname, { replace: true })
	}, [dispatch, navigate, location.pathname])

    return (
        <div>
            <Alert active={flashMessage.length > 0} 
					backgroundColor="green" 
					color="white" 
					text={flashMessage} 
					onClick={onCloseFlash} 
					/>
            <LoadingSpinner active={loading} />
            <Alert active={error.length > 0} 
                    backgroundColor="var(--redalert-font)" 
                    color="var(--redalert-background)" 
                    text={error} 
                    onClick={onCloseAlert} 
                    />
            
            <div className={styles.page_auth + " vh-100"}>
                <div className="container-fluid h-100">
                    <div className="row align-items-center h-100">
                        <div className={styles.auth_left + " col-md-6 d-none d-md-block"}>
                            <div className={styles.auth_cover}>
                                <img src={imageCover} alt="" />
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
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
                                                color="#7126B5"
                                                text="Masuk"
                                                style={{ margin: "1.5rem 0" }}
                                                onClick={onSubmit}
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
