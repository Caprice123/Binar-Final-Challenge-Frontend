import React, { useEffect, useRef } from 'react'
import Image from '../../200774.jpg'
import { PRODUCTS_ROUTE } from '../../types/pages'
import NotifItems from '../NotifItems'

import { Wrapper, Content } from './Notif.styles'

const Notif = ({ datas }) => {
    const notifRef = useRef(null)
    const containerRef = useRef(null)

    const onMarkAsRead = (notificationId) => {

    }

    const onClick = () => {
        notifRef.current.classList.toggle("show")
    }


    useEffect(() => {
        const onResize = (e) => {
            if (containerRef.current){
                if (!containerRef.current.contains(e.target)){
                    notifRef.current.classList.remove("show")
                }
            }
        }
        window.addEventListener("click", onResize)

        return () => window.removeEventListener("resize", onResize)
    }, [])

    return (
        <Wrapper ref={containerRef} className='position-relative'>
            <button className="position-relative" onClick={onClick}>
                <i className="fa-solid fa-bell"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    { 
                        datas.filter(data => !data.read).length > 99 
                        ? "99+" 
                        : datas.filter(data => !data.read).length 
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
                            <NotifItems key={data.id}
                                        redirectTo={`${PRODUCTS_ROUTE}/${data.products.id}`}
                                        seen={data.read}
                                        imageUrl={Image}
                                        actionName={data.title}
                                        time={data.createdAt}
                                        productName={data.products.name}
                                        originalPrice={data.products.price}
                                        bidPrice={data.bids.request_price}
                                        onClick={() => onMarkAsRead(data.id)}
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