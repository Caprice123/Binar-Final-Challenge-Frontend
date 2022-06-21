import React from 'react';

import styles from '../assets/css/auth.module.css'
import imageCover from '../assets/images/cover.png'
import ActiveButton from '../components/ActionButton';
import Input from '../components/Input';

const Registrasi = () => {
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
                        <div className={styles.auth_right + " col-md-6 col-12"}>
                            <div className={styles.auth_form_wrapper}>
                                <h3 className="title fw-bold">Daftar</h3>
                                <form action="">
                                    <Input 
                                        type="text"
                                        text="Nama"
                                        placeholder="Masukan nama anda"
                                    />
                                    <Input 
                                        type="email"
                                        text="Email"
                                        placeholder="handayani@gmail.com"
                                    />
                                    <Input 
                                        type="password"
                                        text="Password"
                                        placeholder="Masukan password anda"
                                    />
                                    <ActiveButton 
                                        width="100%"
                                        color="#7126B5"
                                        text="Masuk"
                                    />
                                </form>
                                <div className={styles.footer}>
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

export default Registrasi;
