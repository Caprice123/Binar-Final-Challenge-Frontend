import React from 'react'


import { Wrapper, Content, Information } from './SellerInfo.styles'
const SellerInfo = ({ width, imageUrl, sellerName, sellerCity, withShadow, additionalClass, additionalComponent, ...additionalStyle }) => {
    return (
        <Wrapper className={`seller-info position-relative  ${additionalClass}`} withShadow={withShadow} {...additionalStyle}>
            <Content width={width} className="py-2 px-2 d-flex align-items-center">
                <img src={imageUrl} alt="profile" />
                <Information className="mx-3 d-flex flex-column justify-content-center">
                    <h5>{ sellerName }</h5>
                    <p>{ sellerCity }</p>
                    { additionalComponent }
                </Information>
            </Content>
        </Wrapper>
    )
}

export default SellerInfo