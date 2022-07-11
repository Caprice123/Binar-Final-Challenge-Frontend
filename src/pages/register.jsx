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
import { validateString } from '../helpers/validateString';
import { validateEmail } from '../helpers/validateEmail';

// react redux
import { useDispatch, useSelector } from 'react-redux';

// actions
import { userActions } from '../store/user';
import { productActions } from '../store/product';
import { bidActions } from '../store/bids';

// services
import { register } from '../services/user';
import { LOGIN_ROUTE } from '../types/pages';

const Registrasi = () => {
    // redux state
    const { loading, error } = useSelector(state => state.user)
    
    // state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    // navigation
    const navigate = useNavigate()
    
    // dispatch redux
    const dispatch = useDispatch()

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

    const onSubmit = async () => {
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
            await dispatch(register({
                name,
                email,
                password
            })).unwrap()
    
            navigate(LOGIN_ROUTE, {
                state: {
                    message: "Successfully register"
                }
            })
        } catch(err){
            console.log(err);
        }
    }

    const onCloseAlert = () => {
        dispatch(userActions.clearError())
    }

    useEffect(() => {
		dispatch(userActions.clearError())
		dispatch(productActions.clearError())
		dispatch(bidActions.clearError())
	}, [dispatch])

    return (
        <div>
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
                        <div className={styles.auth_right + " col-md-6 col-12"}>
                            <div className={styles.auth_form_wrapper + " mx-auto"}>
                                <h3 className="title fw-bold">Daftar</h3>
                                <form action="">
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
                                                    color="#7126B5"
                                                    text="Masuk"
                                                    style={{ margin: "1.5rem 0" }}
                                                    onClick={onSubmit}
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
