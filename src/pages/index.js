
import React, { useEffect, useState } from 'react'

// components
import Navbar from '../components/Navbar'
import Alert from '../components/Alert'
import ActionButton from '../components/ActionButton';
import Grid from '../components/Grid';
import ProductCard from '../components/ProductCard';
import Slider from '../components/Slider';
import Notif from '../components/Notif';
import NotifItems from '../components/NotifItems';
import ImagePreview from '../components/ImagePreview';
import { Swiper, SwiperSlide } from "swiper/react";
import ImageBanner from '../img-banner.png'
import LoadingSpinner from '../components/LoadingSpinner';

import { Link, useLocation, useNavigate } from 'react-router-dom';

// styles
import { Wrapper, Content } from '../pagesStyle/index.styles'
import { Pagination, Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// hooks
import { useFlashMessage } from '../hooks/useFlashMessage';

// redux
import { useDispatch, useSelector } from 'react-redux';

// actions
import { statusActions } from '../store/status';

// services
import { getAllCategories, getProducts } from '../services/product';

// pages
import { ADD_PRODUCT_ROUTE, LOGIN_ROUTE, PRODUCTS_ROUTE } from '../types/pages';
import { objectToQueryString } from '../helpers/converter/objectToQuery';

// TODO ALWAYS FECTH DATA WHEN STATE CHANGE
// TODO ALWAYS FETCH CATEGORY WHEN STATE CHANGE
const Home = () => {
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
            to: PRODUCTS_ROUTE,
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

    const [isNavbarOn, setIsNavbarOn] = useState(false)
    const [isSliderNotificationOn, setIsSliderNotificationOn] = useState(false)
    const [isSliderAccountOn, setIsSliderAccountOn] = useState(false)
    const [search, setSearch] = useState({
        name: "",
        category: "",
    })



    const navigate = useNavigate()
    const location = useLocation()
    
    const { isLoggedIn, currentUser } = useSelector(state => state.user)
    const { loading, error } = useSelector(state => state.status)
    
    const [flashMessage, setFlashMessage] = useFlashMessage("")

    const [availableCategories, setAvailableCategories] = useState([])
    const [products, setProducts] = useState([])

    const dispatch = useDispatch()

    const onSelectCategory = async(e) => {
        const { value } = e.currentTarget.dataset
        navigate(`/?${objectToQueryString({
            ...search,
            category: value
        })}`)
    }

    const onCloseAlertError = () => {
        dispatch(statusActions.setError({
            message: "",
        }))
    }

    const onClickAlert = () => {
        setFlashMessage("")
    }

    const onMarkAsRead = () => {

    }

    const onSearch = (value) => {
        navigate(`/?${objectToQueryString({
            ...search,
            name: value
        })}`)
    }
    
    useEffect(() => {
        const fetchData = async (queryParams) => {
            let responseGetAllCategories
            let responseGetProducts
            try{
                dispatch(statusActions.setLoading({
                    status: true,
                }))

                if (isLoggedIn){
                    [ responseGetAllCategories, responseGetProducts ] = await Promise.all([
                        dispatch(getAllCategories()).unwrap(),
                        dispatch(getProducts({
                            excludeStatusProduct: "sold",
                            excludeUserId: currentUser.user.id,
                            ...queryParams,
                        })).unwrap()
                    ])
                } else{
                    [ responseGetAllCategories, responseGetProducts ] = await Promise.all([
                        dispatch(getAllCategories()).unwrap(),
                        dispatch(getProducts({
                            excludeStatusProduct: "sold",
                            ...queryParams,
                        })).unwrap()
                    ])
                }
                dispatch(statusActions.setLoading({
                    status: false,
                }))
                
                setAvailableCategories(responseGetAllCategories)
                setProducts(responseGetProducts)
            } catch(err){
                dispatch(statusActions.setError({
                    message: err.message
                }))
            }
        }
        dispatch(statusActions.setError({
            message: ""
        }))

        const locationSearch = location.search.slice(1)
        const queryParams = Object.fromEntries(new URLSearchParams(locationSearch))
        const searchParams = {
            name: queryParams.name || "",
            category: queryParams.category || ""
        }

        setSearch(searchParams)
        navigate('/?' + objectToQueryString(searchParams), { replace: true })
        fetchData(searchParams)
        // fetchData()
        
    }, [dispatch, navigate, isLoggedIn, currentUser.user.id, location.search])
    
    // const updateProduct = useMemo((queryObject) => {
        
    // }, [second])

    // useEffect(() => {
    //     const fetchData = async (queryObject) => {
    //         try{
    //             dispatch(statusActions.setLoading({
    //                 status: true,
    //             }))
    //             console.log(queryObject)
    //             const response = await dispatch(getProducts({
    //                 excludeStatusProduct: "sold",
    //                 excludeUserId: currentUser.user.id,
    //                 ...queryObject
    //             })).unwrap()
                
    //             dispatch(statusActions.setLoading({
    //                 status: false,
    //             }))
    
    //             setProducts(response)
    //         } catch(err){
    //             console.log(err)
    //             dispatch(statusActions.setError({
    //                 message: err.message,
    //             }))
    //         }
    //     }
        
    // }, [dispatch, navigate, currentUser.user.id, location.search])

    return (
        <Wrapper>
            <Slider topic="Notifications" active={isSliderNotificationOn} slideFrom="left">
                <div className="title d-flex justify-content-between py-4">
                    <h4>Notifications</h4>
                    <button className="btn-close text-reset" onClick={() => onClickSlider(false, "Notifications")} aria-label="Close"></button>
                </div>
                {
                    datas.map((data, id) => (
                        <div key={id}>
                            <NotifItems redirectTo={`${PRODUCTS_ROUTE}/${id}`}
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
            <LoadingSpinner active={loading} />
            <Alert active={error.length > 0}
                    backgroundColor="red"
                    color="white" 
                    text={error}
                    onClick={onCloseAlertError}
                    />
            <Alert active={flashMessage.length > 0}
                    backgroundColor="green"
                    color="white" 
                    text={flashMessage}
                    onClick={onClickAlert}
                    />
            <Navbar navLinks={navLinks}
                    isOffcanvasOn={isNavbarOn}
                    onClick={onOpen}
                    onSearch={onSearch}
                    withSearchBar   
                    />
            <Content>
                <Swiper autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            scrollbar={{ draggable: true }}
                            modules={[Pagination, Navigation, Autoplay]}
                            className="mySwiper"
                            slidesPerView={"auto"}
                            centeredSlides
                            loop
                        >

                            <SwiperSlide>
                                <img src={ImageBanner} alt="promo" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={ImageBanner} alt="promo" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={ImageBanner} alt="promo" />
                            </SwiperSlide>
                </Swiper>

                <div className='main-content mx-auto'>
                    <div className='category-buttons d-flex py-2 my-4'>

                        <ActionButton icon={<i className="fa-solid fa-magnifying-glass me-3"></i>}
                                        text="Semua"
                                        color={!search.category ? "var(--primary-purple-04)" : "var(--primary-purple-01)"}
                                        textColor={!search.category ? "white" : "black"}
                                        style={{ margin: "0 1rem 0 0" }}
                                        data-value=""
                                        onClick={onSelectCategory}
                                        />
                        {
                            availableCategories?.map(({ id, name }) => (

                                <ActionButton key={id}
                                                icon={<i className="fa-solid fa-magnifying-glass me-3"></i>}
                                                text={name}
                                                color={search.category === name ? "var(--primary-purple-04)" : "var(--primary-purple-01)"}
                                                textColor={search.category === name ? "white" : "black"}
                                                style={{ margin: "0 1rem 0 0" }}
                                                data-value={name}
                                                onClick={onSelectCategory}
                                                />
                            ))
                        }
                    </div>
                    <Grid maxSize="175px" className='py-3'>
                        {
                            products.map(product => (
                                <ProductCard to={`${PRODUCTS_ROUTE}/${product.id}`} product={product} />
                            ))
                        }
                    </Grid>
                </div>

            </Content>

            <Link to={ADD_PRODUCT_ROUTE} style={{ borderRadius: "12px", position: "fixed", bottom: '2.5%', left: "50%", transform: "translateX(-50%)", boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)"}}>

                <ActionButton text="Jual" 
                                color="var(--primary-purple-04)"
                                icon={<i className="fa-solid fa-plus me-3"></i>}
                                textColor="white"
                                style={{ borderRadius: "12px" }}
                                />
            </Link>
        </Wrapper>
    )
}

export default Home