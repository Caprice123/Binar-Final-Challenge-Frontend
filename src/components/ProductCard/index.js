import React from 'react'

import { Wrapper, Content } from './ProductCard.styles'

const ProductCard = ({ to, product }) => {
    return (
        <Wrapper to={to}>
            <Content className='d-flex flex-column justify-content-around py-3 px-3'>
                <img src={product.images[0].name} alt="product" />
                <h5 className='mt-2'>{product.name}</h5>
                <p className='mt-2'>{product.category.name}</p>
                <h5 className='mt-2'>{product.price.toLocaleString()}</h5>
            </Content>
        </Wrapper>
    )
}

export default ProductCard