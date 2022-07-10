import React, { useEffect, useState } from 'react'


import Image from '../../200774.jpg'
import Navbar from '../../components/Navbar'
import Notif from '../../components/Notif'
import NotifItems from '../../components/NotifItems'
import Slider from '../../components/Slider'
import ImagePreview from '../../components/ImagePreview'
import ImagePerson from '../../assets/images/belumadaminat.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'


import { Wrapper, Content } from '../../pagesStyle/products/wishlist.styles.js'
import SellerInfo from '../../components/SellerInfo'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../services/user'
import BorderOnlyButton from '../../components/BorderOnlyButton'
import Grid from '../../components/Grid'
import { getProducts } from '../../services/product'
import ProductCard from '../../components/ProductCard'
import ActionButton from '../../components/ActionButton'
import LoadingSpinner from '../../components/LoadingSpinner'

const Wishlist = () => {
    const datas = [
        {
            seen: true,
        }, {
            seen: false
        }, {
            seen: true
        }
    ]
    const navLinks = [
        {
            type: "text",
            to: "/products",
            additionalIcon: <i className="fa-solid fa-list"></i>,
            mobileComponent: <p>Daftar Jual</p>
        }, {
            type: "others",
            to: "",
            additionalIcon: <Notif datas={datas} />,
            mobileComponent: <p onClick={() => onClickSlider(true, "Notifications")}>Notifications</p>
        }, {
            type: "text",
            to: "",
            additionalIcon: <i className="fa-solid fa-user"></i>,
            mobileComponent: <p onClick={() => onClickSlider(true, "Account")}>Akun Saya</p>
        }, 
    ]

    const [isNavbarOn, setIsNavbarOn] = useState(false)
    const [isSliderNotificationOn, setIsSliderNotificationOn] = useState(false)
    const [isSliderAccountOn, setIsSliderAccountOn] = useState(false)

    const { currentUser, loading, error } = useSelector(state => state.user)

    const [isMobile, setIsMobile] = useState(false)
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const uri = pathname.split("/").pop()

    const dispatch = useDispatch()

    const onOpen = (value) => {
        setIsNavbarOn(value)
    }

    const onClickSlider = (value, target) => {
        setIsNavbarOn(false)
        switch(target){
            case "Notifications":
                setIsSliderNotificationOn(value)
                setIsSliderAccountOn(false)
                break
            case "Account":
                setIsSliderNotificationOn(false)
                setIsSliderAccountOn(value)
                break
            default:
                break
        }

    }

    const onMarkAsRead = () => {

    }

    const onClickEdit = () => {
        navigate('/user/profile')
    }

    useEffect(() => {
        const checkMobile = () => {
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            setIsMobile(vw <= 992)
        }
        window.addEventListener("resize", checkMobile)
        checkMobile()

        return () => window.removeEventListener("resive", checkMobile)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getCurrentUser()).unwrap()

            // TODO: change url or change redux
            const response = await dispatch(getProducts({
                user_id: -1
            })).unwrap()
            // setProducts(response)
        }

        fetchData()
    }, [dispatch, currentUser.user.id])
    
    console.log(isMobile)
    return (
        <Wrapper>
            <LoadingSpinner active={loading} />
            <Slider topic="Notifications" active={isSliderNotificationOn} slideFrom="left">
                <div className="title d-flex justify-content-between py-4">
                    <h4>Notifications</h4>
                    <button className="btn-close text-reset" onClick={() => onClickSlider(false, "Notifications")} aria-label="Close"></button>
                </div>
                {
                    datas.map((data, id) => (
                        <div key={id}>
                            <NotifItems redirectTo={`/product/${id}`}
                                        seen={data.seen}
                                        imageUrl={Image}
                                        actionName="Penawaran Produk"
                                        time={"20 Apr, 14:04"}
                                        productName={"Jam Tangan Casio"}
                                        originalPrice={250000}
                                        bidPrice={200000}
                                        onClick={onMarkAsRead}
                                        />
                        </div>
                    ))
                }
            </Slider>

            <Slider topic="Account" active={isSliderAccountOn} slideFrom="left">
                <div className="title d-flex justify-content-between py-4">
                    <h4>Akun Saya</h4>
                    <button className="btn-close text-reset" onClick={() => onClickSlider(false, "Account")} aria-label="Close"></button>
                </div>
                <div className="content d-flex flex-column">
                    <ImagePreview url={Image} />
                    <Link to='' className='d-flex align-items-center pt-5 pb-1'>
                        <i className="fa-solid fa-pen-to-square me-3"></i>
                        <span>Ubah Akun</span>
                    </Link>
                    <hr />
                    <Link to='' className='d-flex align-items-center pt-3 pb-1'>
                        <i className="fa-solid fa-gear me-3"></i>
                        <span>Pengaturan Akun</span>
                    </Link>
                    <hr />
                    <Link to='' className='d-flex align-items-center pt-3 pb-1'>
                        <i className="fa-solid fa-arrow-right-from-bracket me-3"></i>
                        <span>Ubah Akun</span>
                    </Link>
                    <hr />

                    <p>Version 1.0.0</p>
                </div>
            </Slider>
            <Navbar navLinks={navLinks}
                    isOffcanvasOn={isNavbarOn}
                    onClick={onOpen}
                    withSearchBar  
                    style={{ margin: "7.5px 12px" }}  
                    />

            <Content className="mx-auto"> 
                <SellerInfo imageUrl={Image}
                            sellerName={currentUser.user.name}
                            sellerCity={currentUser.user.city}
                            withShadow
                            additionalComponent={
                                <BorderOnlyButton color={"var(--primary-purple-04)"}
                                                    text="Edit"
                                                    onClick={onClickEdit}
                                                    />
                            }
                            />
                <div className="products py-5"> 
                    {
                        !error ? (
                            <>
                                {
                                    isMobile && (
                                        <div className='d-flex py-4' style={{ gap: "1rem", overflow: "auto" }}>
                                            <ActionButton color={`${uri === "daftar-jual" ? "var(--primary-purple-04)" : "var(--primary-purple-01)"}`} 
                                                        text="Product"
                                                        icon={<i className="fa-solid fa-cube pe-2"></i>}
                                                        onClick={() => navigate('/daftar-jual')}

                                                        />
                                            <ActionButton color={`${uri === "wishlist" ? "var(--primary-purple-04)" : "var(--primary-purple-01)"}`} 
                                                        text="Diminati"
                                                        icon={<i className="fa-solid fa-heart pe-2"></i>}
                                                        onClick={() => navigate('/daftar-jual/wishlist')}
                                                        />
                                            <ActionButton color={`${uri === "sold" ? "var(--primary-purple-04)" : "var(--primary-purple-01)"}`} 
                                                        text="Terjual"
                                                        icon={<i className="fa-solid fa-dollar-sign pe-2"></i>}
                                                        onClick={() => navigate('/daftar-jual/sold')}
                                                        />
                                        </div>
                                    )
                                }

                                {
                                    !isMobile && (
                                        <div className='category'>
                                            <h5>Kategori</h5>

                                            <Link to='/daftar-jual' className={`${uri === "daftar-jual" ? "active" : ""} d-flex justify-content-between align-items-center`}>
                                                <div className='d-flex align-items-center'>
                                                    <i className="fa-solid fa-cube"></i>
                                                    <p className='px-2'>Semua Product</p>
                                                </div>
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </Link>
                                            <hr />
                                            <Link to='/daftar-jual/wishlist' className={`${uri === "wishlist" ? "active" : ""} d-flex justify-content-between align-items-center`}>
                                                <div className='d-flex align-items-center'>
                                                    <i className="fa-solid fa-heart"></i>
                                                    <p className='px-2'>Diminati</p>
                                                </div>
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </Link>
                                            <hr />
                                            <Link to='/daftar-jual/sold' className={`${uri === "sold" ? "active" : ""} d-flex justify-content-between align-items-center`}>
                                                <div className='d-flex align-items-center'>
                                                    <i className="fa-solid fa-dollar-sign"></i>
                                                    <p className='px-2'>Terjual</p>
                                                </div>
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </Link>
                                        </div>
                                    )
                                }
                                {
                                    !loading && products.length === 0 ? (
                                        <div className="no-offer d-flex align-items-center justify-content-center flex-column">
                                            <img src={ImagePerson} alt="No one minat" />
                                            <p className='py-3'>Belum ada produkmu yang diminati nih, sabar ya rejeki nggak kemana kok</p>
                                        </div>
                                    ) : (
                                        <Grid maxSize="200px">
                                            {
                                                products.map(product => (
                                                    <ProductCard product={product} />

                                                ))
                                            }
                                        </Grid>
                                    )
                                }

                            </>
                        ) : (
                            <></>
                        )
                    }
                </div>
                
            </Content>
        </Wrapper>
    )
}

export default Wishlist