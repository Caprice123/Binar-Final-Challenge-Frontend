import React, { useEffect, useRef } from 'react'
import Image from '../../200774.jpg'
import { PRODUCTS_ROUTE } from '../../types/pages'
import NotifItems from '../NotifItems'

import { Wrapper, Content } from './Notif.styles'

const Notif = ({ datas }) => {
    const notifRef = useRef(null)
    const containerRef = useRef(null)

    const onMarkAsRead = () => {

    }

    const onClick = () => {
        notifRef.current.classList.toggle("show")
    }


    useEffect(() => {
        window.addEventListener("click", e => {
            if (containerRef.current){
                if (!containerRef.current.contains(e.target)){
                    notifRef.current.classList.remove("show")
                }
            }
        })
    }, [])

    return (
        <Wrapper ref={containerRef} className='position-relative'>
            <button className="position-relative" onClick={onClick}>
                <i className="fa-solid fa-bell"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    { 
                        datas.filter(data => data.seen).length > 99 
                        ? "99+" 
                        : datas.filter(data => data.seen).length 
                    }
                </span>
            </button>
            <Content ref={notifRef} className="pb-3">
                <div className='actions py-3'>
                    <div className='d-flex justify-content-between'>
                        <h6>Notif</h6>
                        <h6>Mark as Read</h6>
                    </div>
                </div>
                {
                    datas.map((data, id) => (
                        <>
                            <NotifItems key={id}
                                        redirectTo={`${PRODUCTS_ROUTE}/${id}`}
                                        seen={data.seen}
                                        imageUrl={Image}
                                        actionName="Penawaran Produk"
                                        time={"20 Apr, 14:04"}
                                        productName={"Jam Tangan Casio"}
                                        originalPrice={250000}
                                        bidPrice={200000}
                                        onClick={onMarkAsRead}
                                        />                            
                            { 
                                id < datas.length - 1 && (
                                    <hr />
                                )
                            }
                        </>
                    ))
                }
            </Content>
        </Wrapper>
    )
}

export default Notif