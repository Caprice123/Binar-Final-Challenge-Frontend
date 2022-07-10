import React, { useState } from 'react';

import ListCatalogCard from '../../components/ListCatalogCard'

const Catalog = ({ products }) => {

    return (
        <>
            <ListCatalogCard data={products} action={true} />
        </>
    );
}

export default Catalog;
