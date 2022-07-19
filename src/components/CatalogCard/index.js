import React from 'react';
import { Link } from 'react-router-dom'

import imageClock from "../../assets/images/clock.png"

import styles from '../../assets/css/daftar-jual.module.css'
import { HOME_ROUTE } from '../../types/pages';

const Index = ({ data, link }) => {

    return (
        <>
            <div className="col-6 col-lg-4">
                <Link class={styles.catalogLink} to={HOME_ROUTE}>
                    <div class="card h-100">
                        <img src={imageClock} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class={`card-title ${styles.catalogTitle}`}>Jam Tangan Casio</h5>
                            <p class={`card-text ${styles.catalogCategory}`}><small class="text-muted">Aksesoris</small></p>
                            <h5 class={`card-text ${styles.catalogPrice}`}>Rp 250.00</h5>
                        </div>
                    </div>
                </Link>
            </div>   
        </>
    );
}

export default Index;
