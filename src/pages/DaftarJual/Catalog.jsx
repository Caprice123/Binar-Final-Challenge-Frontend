import React, { useState } from 'react';

import ListCatalogCard from '../../components/ListCatalogCard'

const Catalog = () => {
    const [products, setProducts] = useState([]);

    return (
        <>
            <ListCatalogCard data={products} action={true} />
        </>
    );
}

export default Catalog;
