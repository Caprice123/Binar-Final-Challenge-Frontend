import React, { useState } from 'react';

import ListCatalogCard from '../../components/ListCatalogCard'
import EmptyState from '../../components/EmptyState'

const Wishlist = () => {
    const [products, setProducts] = useState([]);
    
    return (
        <>
            {products.length > 0 ?
                <ListCatalogCard data={products} />
            :
                <EmptyState />
            }
        </>
    );
}

export default Wishlist;