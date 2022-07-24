
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
import NoImage from '../assets/images/no-image-found.jpg'
import ImagePreview from '../components/ImagePreview';
import { Swiper, SwiperSlide } from "swiper/react";
import ImageBanner from '../img-banner.png'
import LoadingSpinner from '../components/LoadingSpinner';
import AccountDropdown from '../components/AccountDropdown';

import { Link, useLocation, useNavigate } from 'react-router-dom';

// styles
import { Wrapper, Content } from '../pagesStyle/index.styles'
import { Pagination, Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// helpers
import { objectToQueryString } from '../helpers/converter/objectToQuery';
import { dateToString } from '../helpers/converter/dateToString';

// hooks
import { useFlashMessage } from '../hooks/useFlashMessage';
import { useNotifications } from '../hooks/useNotifications';

// redux
import { useDispatch, useSelector } from 'react-redux';

// actions
import { statusActions } from '../store/status';

// services
import { getAllCategories, getProducts } from '../services/product';
import { updateNotifications } from '../services/notifications';

// pages
import { ADD_PRODUCT_ROUTE, DAFTAR_JUAL_ROUTE, ERROR_404_ROUTE, ERROR_500_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE, PRODUCTS_ROUTE, USER_PROFILE_ROUTE } from '../types/pages';

const Home = () => {
    /**************************************************************/
    // REDUX STATE
    const { isLoggedIn, currentUser } = useSelector(state => state.user)
    const { loading, error } = useSelector(state => state.status)
    /**************************************************************/


    /**************************************************************/
    // STATE
    // NAVBAR STATE
    const [isNavbarOn, setIsNavbarOn] = useState(false)
    const [isSliderNotificationOn, setIsSliderNotificationOn] = useState(false)
    const [isSliderAccountOn, setIsSliderAccountOn] = useState(false)

    // SEARCH STATE
    const [search, setSearch] = useState({
        name: "",
        category: "",
    })

    // FLASH MESSAGE STATE
    const [flashMessage, setFlashMessage] = useFlashMessage("")

    // NOTIFICATION STATE
    const notifications = useNotifications([])

    // MAIN STATE
    const [availableCategories, setAvailableCategories] = useState([])
    const [products, setProducts] = useState([])
    /**************************************************************/


    /**************************************************************/
    // REACT-ROUTER-DOM HOOKS
    // NAVIGATION
    const navigate = useNavigate()

    // LOCATION
    const location = useLocation()
    /**************************************************************/
    
    
    /**************************************************************/
    // REDUX DISPATCH
    const dispatch = useDispatch()
    /**************************************************************/


    /**************************************************************/
    // ACTIONS
    // onSelectCategory for updating uri when category is selected
    const onSelectCategory = async(e) => {
        const { value } = e.currentTarget.dataset
        navigate(`/?${objectToQueryString({
            ...search,
            category: value
        })}`)
    }

    // onCloseAlertError for resetting error when close button alert for errror message is clicked
    const onCloseAlertError = () => {
        dispatch(statusActions.setError({
            message: "",
        }))
    }

    // onClickAlert for resetting flash message when close button flash message is clicked
    const onClickAlert = () => {
        setFlashMessage("")
    }

    // onMarkAsRead for calling api that will make specific notification is read
    const onMarkAsRead = (e, notification) => {
        e.preventDefault()
        try{
            dispatch(statusActions.setLoading({
                status: true,
            }))

            dispatch(updateNotifications({
                notificationId: notification.id,
            })).unwrap()

            dispatch(statusActions.setLoading({
                status: false,
            }))

            navigate(helperRedirectUrl(notification), { replace: true })

        }catch(err){
            console.log(err)
            const error = JSON.parse(err.message)
            const statusCode = error.statusCode
            switch (statusCode){
                case 401:
                    navigate(LOGIN_ROUTE, {
                        state: {
                            message: "Unauthorized"
                        }
                    })
                    break
                    
                case 404:
                    navigate(ERROR_404_ROUTE)
                    break
            
                case 500:
                    navigate(ERROR_500_ROUTE)
                    break
                
                default:
                    dispatch(statusActions.setError({
                        message: error.message
                    }))
                    break
            }
        }
    }

    // onOpen for keep track the state of navbar
    const onOpen = (value) => {
        setIsNavbarOn(value)
    }

    // onClickSlider for keep track the state of all slider components
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

    // onSearch for navigating to new page everytime search in navbar is clicked
    const onSearch = (value) => {
        navigate(`/?${objectToQueryString({
            ...search,
            search: value
        })}`)
    }
    /**************************************************************/


    /**************************************************************/
    // USEEFFECT
    // useEffect for getting category and update categories everytime page is changed
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
                console.log(err)
                const error = JSON.parse(err.message)
                const statusCode = error.statusCode
                switch (statusCode){
                    case 500:
                        navigate(ERROR_500_ROUTE)
                        break
                    
                    default:
                        dispatch(statusActions.setError({
                            message: error.message
                        }))
                        break
                }
            }
        }
        dispatch(statusActions.setError({
            message: ""
        }))

        const queryParams = Object.fromEntries(new URLSearchParams(location.search))
        const searchParams = {
            search: queryParams.search || "",
            category: queryParams.category || ""
        }

        setSearch(searchParams)
        navigate(`/?${objectToQueryString(searchParams)}`, { replace: true })
        fetchData(searchParams)
    }, [dispatch, navigate, isLoggedIn, currentUser.user.id, location.search])
    /**************************************************************/

    /**************************************************************/
    // SETTTINGS
    const navLinks = [
        {
            type: "text",
            to: DAFTAR_JUAL_ROUTE,
            additionalIcon: <i className="fa-solid fa-list"></i>,
            mobileComponent: <Link to={DAFTAR_JUAL_ROUTE} id="daftar-jual-navbar">Daftar Jual</Link>
        }, {
            type: "others",
            to: "",
            additionalIcon: <Notif datas={notifications} />,
            mobileComponent: <p onClick={() => onClickSlider(true, "Notifications")} style={{ cursor: "pointer" }} id="notification-navbar">Notifications</p>
        }, {
            type: "others",
            to: "",
            additionalIcon: <AccountDropdown />,
            mobileComponent: <p onClick={() => onClickSlider(true, "Account")} style={{ cursor: "pointer" }} id="user-profile-navbar">Akun Saya</p>
        }, 
    ]
    /**************************************************************/

    const helperRedirectUrl = (notification) => {
        const productId = notification.products.product_id
        switch(notification.title){
            case "Penawaran terkirim":
            case "Penawaran anda dalam negosiasi":
            case "Penawaran anda ditolak":
            case "Penawaran anda diterima":
                return `${PRODUCTS_ROUTE}/${productId}`
                

            case "Produk ditawar":
            case "Melanjutkan penawaran":
            case "Menolak penawaran":
            case "Menyelesaikan penawaran":
                return `${PRODUCTS_ROUTE}/${productId}/bid`


            default:
                return `${PRODUCTS_ROUTE}/${productId}`
        }        
    }

    return (
        <Wrapper>
            <Slider topic="Notifications" active={isSliderNotificationOn} slideFrom="left">
                <div className="title d-flex justify-content-between py-4">
                    <h4>Notifications</h4>
                    <button className="btn-close text-reset" onClick={() => onClickSlider(false, "Notifications")} aria-label="Close" id="close-button-notification-navbar"></button>
                </div>
                {
                    notifications.map((data) => (
                        <div key={data.id}>
                            <NotifItems redirectTo={helperRedirectUrl(data)}
                                        seen={data.read}
                                        imageUrl={data.images?.name}
                                        actionName={data.title}
                                        time={dateToString(data.createdAt)}
                                        productName={data.products.name}
                                        originalPrice={data.products.price}
                                        bidPrice={data.bids?.request_price}
                                        onClick={(e) => onMarkAsRead(e, data)}
                                        />
                        </div>
                    ))
                }
            </Slider>

            <Slider topic="Account" active={isSliderAccountOn} slideFrom="left">
                <div className="title d-flex justify-content-between py-4">
                    <h4>Akun Saya</h4>
                    <button className="btn-close text-reset" onClick={() => onClickSlider(false, "Account")} aria-label="Close" id="close-button-user-profile-navbar"></button>
                </div>
                <div className="content d-flex flex-column">
                    <ImagePreview url={currentUser.user.image_url ? currentUser.user.image_url : NoImage} />
                    <Link to={USER_PROFILE_ROUTE} className='d-flex align-items-center pt-5 pb-1'>
                        <i className="fa-solid fa-pen-to-square me-3"></i>
                        <span>Ubah Akun</span>
                    </Link>
                    <hr />
                    <Link to={USER_PROFILE_ROUTE} className='d-flex align-items-center pt-3 pb-1'>
                        <i className="fa-solid fa-gear me-3"></i>
                        <span>Pengaturan Akun</span>
                    </Link>
                    <hr />
                    <Link to={LOGOUT_ROUTE} className='d-flex align-items-center pt-3 pb-1'>
                        <i className="fa-solid fa-arrow-right-from-bracket me-3"></i>
                        <span>Logout Akun</span>
                    </Link>
                    <hr />

                    <p>version 1.0.1</p>
                </div>
            </Slider>
            <LoadingSpinner active={loading} />
            <Alert active={error.length > 0}
                    backgroundColor="var(--redalert-background)"
                    color="var(--redalert-font)" 
                    text={error}
                    onClick={onCloseAlertError}
                    />
            <Alert active={flashMessage.length > 0}
                    backgroundColor="var(--alert-success)"
                    color="var(--white-color)" 
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
                                        textColor={!search.category ? "var(--white-color)" : "black"}
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
                                                textColor={search.category === name ? "var(--white-color)" : "black"}
                                                style={{ margin: "0 1rem 0 0" }}
                                                data-value={name}
                                                onClick={onSelectCategory}
                                                id={name}
                                                />
                            ))
                        }
                    </div>
                    <Grid maxSize="175px" className='py-3'>
                        {
                            products.map((product, id) => (
                                <ProductCard key={id} to={`${PRODUCTS_ROUTE}/${product.id}`} product={product} />
                            ))
                        }
                    </Grid>
                </div>

            </Content>

            {
                isLoggedIn && (
                    <Link to={ADD_PRODUCT_ROUTE} style={{ borderRadius: "12px", position: "fixed", bottom: '2.5%', left: "50%", transform: "translateX(-50%)", boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)"}}>
                        <ActionButton text="Jual" 
                                        color="var(--primary-purple-04)"
                                        icon={<i className="fa-solid fa-plus me-3"></i>}
                                        textColor="var(--white-color)"
                                        style={{ borderRadius: "12px" }}
                                        />
                    </Link>
                )
            }
        </Wrapper>
    )
}

export default Home