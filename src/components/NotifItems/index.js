import React from 'react'

import NoImage from '../../assets/images/no-image-found.jpg'
import { WrapperLink, WrapperDiv, Content, Title } from './NotifItems.styles'

const NotifItems = ({ redirectTo, seen, imageUrl, actionName, time, productName, originalPrice, bidPrice, onClick  }) => {
    return (
        <>
        {
            redirectTo ? (
                <WrapperLink to={redirectTo} 
                        className={`notif-items d-flex py-3 px-2 align-items-center ${seen ? "seen" : "not-seen"}`} 
                        onClick={onClick}
                        >
                    <img src={imageUrl ? imageUrl : NoImage} 
                            alt="test"
                            className='me-3'
                            />
                    <Content className='description'>
                        <Title className="upcard d-flex justify-content-between">
                            <p>{ actionName }</p>
                            <p>{ time }</p>
                        </Title>
                        <h5>{ productName }</h5>
                        <h5 className='original-price'>Rp. { originalPrice.toLocaleString() }</h5>
                        <h5>Ditawar Rp. { bidPrice.toLocaleString() }</h5>
                    </Content>
                </WrapperLink>
            ) : (
                <WrapperDiv to={redirectTo} 
                        className={`notif-items d-flex py-3 px-2 align-items-center ${seen ? "seen" : "not-seen"}`} 
                        onClick={onClick}
                        >
                    <img src={imageUrl ? imageUrl : NoImage} 
                            alt="test"
                            className='me-3'
                            />
                    <Content className='description'>
                        <Title className="upcard d-flex justify-content-between">
                            <p>{ actionName }</p>
                            <p>{ time }</p>
                        </Title>
                        <h5>{ productName }</h5>
                        <h5  className='original-price'>Rp. { originalPrice.toLocaleString() }</h5>
                        <h5>Ditawar Rp. { bidPrice.toLocaleString() }</h5>
                    </Content>
                </WrapperDiv>
            )
        }
        </>
    )
}

export default NotifItems