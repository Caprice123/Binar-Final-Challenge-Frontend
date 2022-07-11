import React from 'react'

import { useSelector } from 'react-redux'

const ListProduct = () => {
    const { currentUser, loading, error } = useSelector(state => state.auth)
    return (
        <div>
            <Navbar />
            <div className="page-product mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12">
                                    <h4 className="product-title mt-5">Daftar Jual Saya</h4>
                                </div>
                                <div className="col-12">
                                    <div className="card shadow rounded-4">
                                        <div className="card-body">
                                            <div className="row align-items-center">
                                                <div className="col-9 col-md-4">
                                                    <div className="row">
                                                        <div className="col-3 col-md-2">
                                                            <div className="product-profile">
                                                                <img src={ImagePerson} className="profile-img" alt="Image Person" />
                                                            </div>
                                                        </div>
                                                        <div className="col-9 col-md-10">
                                                            <div className="product-profile_user">
                                                                <h4 className={styles.profileName}>Nama Penjual</h4>
                                                                <p className={`${styles.profileCity} text-muted`}>Kota</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-3 col-md-8">
                                                    <div className="d-flex w-100 justify-content-end">
                                                        <a href="" className="btn btn-outline-primary rounded-pill px-3">Edit</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row mt-5">
                                <div className="col-12 col-md-3">
                                    <div className="card shadow rounded-4">
                                        <div className="card-body">
                                            <div className="product-filter-title ms-3 fw-bold">
                                                Kategori
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">
                                                    <a href="#catalog" class={styles.btnCategory}>
                                                        <div class="d-flex justify-content-between">
                                                            <div class="btnIconLeft">
                                                                <FiBox /> Semua Product
                                                            </div>
                                                            <div class="btnIconRight">
                                                                <FiChevronRight />
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li class="list-group-item">
                                                    <a href="#wishlist" class={styles.btnCategory}>
                                                        <div class="d-flex justify-content-between">
                                                            <div class="btnIconLeft">
                                                                <FiHeart /> Diminati
                                                            </div>
                                                            <div class="btnIconRight">
                                                                <FiChevronRight />
                                                            </div>
                                                        </div>

                                                    </a>
                                                </li>
                                                <li class="list-group-item">
                                                    <a href="#sold" class={styles.btnCategory}>
                                                        <div class="d-flex justify-content-between">
                                                            <div class="btnIconLeft">
                                                                <FiDollarSign /> Terjual
                                                            </div>
                                                            <div class="btnIconRight">
                                                                <FiChevronRight />
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-9 mt-4 mt-md-0">
                                    
                                    {hash === "#catalog" ? <Catalog /> : <></>}
                                    {hash === "#wishlist" ? <Wishlist /> : <></>}
                                    {hash === "#sold" ? <ProductSold /> : <></>}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListProduct