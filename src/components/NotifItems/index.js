import React from 'react'


import { Wrapper, Content, Title } from './NotifItems.styles'

const NotifItems = ({ redirectTo, seen, imageUrl, actionName, time, productName, originalPrice, bidPrice, onClick  }) => {
    return (
        <Wrapper to={redirectTo} 
                className={`d-flex py-3 px-2 justify-content-between align-items-center ${seen ? "seen" : "not-seen"}`} 
                onClick={onClick}
                >
            <img src={imageUrl} 
                    alt="test"
                    className='me-3'
                    />
            <Content className='description'>
                <Title className="upcard d-flex justify-content-between">
                    <p>{ actionName }</p>
                    <p>{ time }</p>
                </Title>
                <h5>{ productName }</h5>
                <h5>Rp. { originalPrice.toLocaleString() }</h5>
                <h5>Ditawar Rp. { bidPrice.toLocaleString() }</h5>
            </Content>
        </Wrapper>
    )
}

export default NotifItems