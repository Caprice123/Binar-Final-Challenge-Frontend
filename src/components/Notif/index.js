import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dateToString } from '../../helpers/converter/dateToString'
import { updateNotifications } from '../../services/notifications'
import { statusActions } from '../../store/status'
import { PRODUCTS_ROUTE } from '../../types/pages'
import NotifItems from '../NotifItems'

import { Wrapper, Content } from './Notif.styles'

const Notif = ({ datas }) => {
    const notifRef = useRef(null)
    const containerRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onMarkAsRead = (e, notification) => {
        e.preventDefault()
        try{
            dispatch(statusActions.setLoading({
                status: true,
            }))

            dispatch(updateNotifications({
                notificationId: notification.id,
            })).unwrap()

            dispatch(statusActions.setLoading({
                status: false,
            }))

            navigate(helperRedirectUrl(notification), { replace: true })

        }catch(err){
            console.log(err)
            const error = JSON.parse(err.message)
            dispatch(statusActions.setError({
                message: error.message
            }))
        }
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

    const helperRedirectUrl = (notification) => {
        const productId = notification.products.product_id
        switch(notification.title){
            case "Penawaran terkirim":
            case "Penawaran anda dalam negosiasi":
            case "Penawaran anda ditolak":
            case "Penawaran anda diterima":
                return `${PRODUCTS_ROUTE}/${productId}`
                

            case "Produk ditawar":
            case "Melanjutkan penawaran":
            case "Menolak penawaran":
            case "Menyelesaikan penawaran":
                return `${PRODUCTS_ROUTE}/${productId}/bid`


            default:
                return `${PRODUCTS_ROUTE}/${productId}`
        }        
    }

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
                                        redirectTo={helperRedirectUrl(data)}
                                        seen={data.read}
                                        imageUrl={data.images?.name}
                                        actionName={data.title}
                                        time={dateToString(data.createdAt)}
                                        productName={data.products.name}
                                        originalPrice={data.products.price}
                                        bidPrice={data.bids?.request_price}
                                        onClick={(e) => onMarkAsRead(e, data)}
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