import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import CatalogCard from '../CatalogCard'

import styles from '../../assets/css/daftar-jual.module.css'

const Wrapper = styled.div`
    .card-border{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed #000000;
        min-height: 275px;
        height: 100%;
        color: #000000;
        font-size: 2.5rem;
    }
`

const Index = ({data, action, link}) => {
    return (
        <>
            <div class="row">
                {action === true ?
                    <div className="col-6 col-md-4">
                        <Wrapper>
                            <Link  to={'/'} class={styles.catalogLink}>
                                <div class="card">
                                    <div class="card-body card-border">
                                        +
                                    </div>
                                </div>
                            </Link>
                        </Wrapper>
                    </div>
                :
                    <></>
                }

                {data?.map((item, index) => {
                    return(
                        <CatalogCard data={item} action={action} link={link}/>
                    )
                })}
            </div>
        </>
    );
}

export default Index;
