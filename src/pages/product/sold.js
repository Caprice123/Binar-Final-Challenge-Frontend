import React, { useEffect, useState } from 'react'

// components
import Navbar from '../../components/Navbar'
import Notif from '../../components/Notif'
import NotifItems from '../../components/NotifItems'
import Slider from '../../components/Slider'
import NoImage from '../../assets/images/no-image-found.jpg'
import ImagePreview from '../../components/ImagePreview'
import ImagePerson from '../../assets/images/belumadaminat.png'
import SellerInfo from '../../components/SellerInfo'
import BorderOnlyButton from '../../components/BorderOnlyButton'
import Grid from '../../components/Grid'
import ProductCard from '../../components/ProductCard'
import ActionButton from '../../components/ActionButton'
import LoadingSpinner from '../../components/LoadingSpinner'
import AccountDropdown from '../../components/AccountDropdown'
import Alert from '../../components/Alert'

import { Link, useLocation, useNavigate } from 'react-router-dom'

// styles
import { Wrapper, Content } from '../../pagesStyle/product/sold.styles.js'

// helpers
import { objectToQueryString } from '../../helpers/converter/objectToQuery'
import { dateToString } from '../../helpers/converter/dateToString'

// hooks
import { useFlashMessage } from '../../hooks/useFlashMessage'
import { useNotifications } from '../../hooks/useNotifications'

// redux
import { useDispatch, useSelector } from 'react-redux'

// actions
import { statusActions } from '../../store/status'

// services
import { getProducts } from '../../services/product'
import { updateNotifications } from '../../services/notifications'

// pages
import { BID_ROUTE, DAFTAR_JUAL_ROUTE, ERROR_404_ROUTE, ERROR_500_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE, PRODUCTS_ROUTE, SOLD_PRODUCT_ROUTE, USER_PROFILE_ROUTE, WISHLIST_ROUTE } from '../../types/pages'

const SoldProducts = () => {
    /**************************************************************/
    // REDUX STATE
    const { currentUser } = useSelector(state => state.user)
    const { loading, error } = useSelector(state => state.status)
    /**************************************************************/
    

    /**************************************************************/
    // STATE
    // NAVBAR STATE
    const [isNavbarOn, setIsNavbarOn] = useState(false)
    const [isSliderNotificationOn, setIsSliderNotificationOn] = useState(false)
    const [isSliderAccountOn, setIsSliderAccountOn] = useState(false)

    // FLASH MESSAGE STATE
    const [flashMessage, setFlashMessage] = useFlashMessage("")

    // NOTIFICATION STATE
    const notifications = useNotifications([])

    // MAIN STATE
    const [isMobile, setIsMobile] = useState(false)
    const [products, setProducts] = useState([])
    /**************************************************************/
    

    /**************************************************************/
    // REACT-ROUTER-DOM HOOKS
    // NAVIGATION
    const navigate = useNavigate()
    
    // LOCATION
    const { pathname } = useLocation()
    const uri = pathname.split("/").pop()
    /**************************************************************/
    
    
    /**************************************************************/
    // REDUX DISPATCH
    const dispatch = useDispatch()
    /**************************************************************/
    
    
    /**************************************************************/
    // ACTIONS
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
                    navigate(LOGIN_ROUTE)
                    break
                    
                case 404:
                    navigate(ERROR_404_ROUTE)
                    break
            
                case 500:
                    navigate(ERROR_500_ROUTE)
                    break
                
                default:
                    dispatch(statusActions.setError({
                        message: error.message,
                    }))
                    break
            }
        }
    }
    
    // onClickEdit for navigating to edit user profile page
    const onClickEdit = () => {
        navigate(USER_PROFILE_ROUTE)
    }

    // onSearch for navigating to home page everytime search in navbar is clicked
    const onSearch = (value) => {
        navigate(`/?${objectToQueryString({ search: value, category: '' })}`)
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
    /**************************************************************/
    

    /**************************************************************/
    // USEEFFECT
    // for getting whether user is in mobile mode
    useEffect(() => {
        const checkMobile = () => {
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            setIsMobile(vw <= 992)
        }
        window.addEventListener("resize", checkMobile)
        checkMobile()

        return () => window.removeEventListener("resive", checkMobile)
    }, [])


    // get the sold product data
    useEffect(() => {
        const fetchData = async () => {
            try{
                dispatch(statusActions.setLoading({
                    status: true,
                }))
    
                const response = await dispatch(getProducts({
                    user_id: currentUser.user.id,
                    statusProduct: "sold",
                })).unwrap()

                dispatch(statusActions.setLoading({
                    status: false,
                }))

                setProducts(response)
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
                            message: error.message,
                        }))
                        break
                }
            }
        }

        dispatch(statusActions.setError({
            message: "",
        }))
        fetchData()
    }, [dispatch, navigate, currentUser.user.id])
    /**************************************************************/
    
    const navLinks = [
        {
            type: "text",
            to: DAFTAR_JUAL_ROUTE,
            additionalIcon: <i className="fa-solid fa-list"></i>,
            mobileComponent: <Link to={DAFTAR_JUAL_ROUTE}>Daftar Jual</Link>
        }, {
            type: "others",
            to: "",
            additionalIcon: <Notif datas={notifications} />,
            mobileComponent: <p onClick={() => onClickSlider(true, "Notifications")} style={{ cursor: "pointer" }}>Notifications</p>
        }, {
            type: "others",
            to: "",
            additionalIcon: <AccountDropdown />,
            mobileComponent: <p onClick={() => onClickSlider(true, "Account")} style={{ cursor: "pointer" }}>Akun Saya</p>
        }, 
    ]

    const helperRedirectUrl = (notification) => {
        const productId = notification.products.product_id
        switch(notification.message){
            case "Penawaran terkirim":
                return `${PRODUCTS_ROUTE}/${productId}`
            case "Penawaran anda dalam negosiasi":
                return `${PRODUCTS_ROUTE}/${productId}`
            case "Penawaran anda ditolak":
                return `${PRODUCTS_ROUTE}/${productId}`
            case "Penawaran anda diterima":
                return `${PRODUCTS_ROUTE}/${productId}`
                

            case "Produk ditawar":
                return `${PRODUCTS_ROUTE}/${productId}/bid`
            case "Melanjutkan penawaran":
                return `${PRODUCTS_ROUTE}/${productId}/bid`
            case "Menolak penawaran":
                return `${PRODUCTS_ROUTE}/${productId}/bid`
            case "Menyelesaikan penawaran":
                return `${PRODUCTS_ROUTE}/${productId}/bid`


            default:
                return `${PRODUCTS_ROUTE}/${productId}`
        }        
    }
    
    
    return (
        <Wrapper>
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
            <Slider topic="Notifications" active={isSliderNotificationOn} slideFrom="left">
                <div className="title d-flex justify-content-between py-4">
                    <h4>Notifications</h4>
                    <button className="btn-close text-reset" onClick={() => onClickSlider(false, "Notifications")} aria-label="Close"></button>
                </div>
                {
                    notifications.map((data) => (
                        <div key={data.id}>
                            <NotifItems redirectTo={helperRedirectUrl(data)}
                                        seen={data.read}
                                        imageUrl={data.images.name}
                                        actionName={data.title}
                                        time={dateToString(data.createdAt)}
                                        productName={data.products.name}
                                        originalPrice={data.products.price}
                                        bidPrice={data.bids.request_price}
                                        onClick={(e) => onMarkAsRead(data)}
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

                    <p>Version 1.0.0</p>
                </div>
            </Slider>
            <Navbar navLinks={navLinks}
                    isOffcanvasOn={isNavbarOn}
                    onClick={onOpen}
                    withSearchBar  
                    onSearch={onSearch}
                    style={{ margin: "7.5px 12px" }}  
                    />

            <Content className="mx-auto"> 
                <SellerInfo imageUrl={currentUser.user.image_url}
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
                                                        onClick={() => navigate(DAFTAR_JUAL_ROUTE)}

                                                        />
                                            <ActionButton color={`${uri === "wishlist" ? "var(--primary-purple-04)" : "var(--primary-purple-01)"}`} 
                                                        text="Diminati"
                                                        icon={<i className="fa-solid fa-heart pe-2"></i>}
                                                        onClick={() => navigate(WISHLIST_ROUTE)}
                                                        />
                                            <ActionButton color={`${uri === "sold" ? "var(--primary-purple-04)" : "var(--primary-purple-01)"}`} 
                                                        text="Terjual"
                                                        icon={<i className="fa-solid fa-dollar-sign pe-2"></i>}
                                                        onClick={() => navigate(SOLD_PRODUCT_ROUTE)}
                                                        />
                                        </div>
                                    )
                                }

                                {
                                    !isMobile && (
                                        <div className='category'>
                                            <h5>Kategori</h5>

                                            <Link to={DAFTAR_JUAL_ROUTE} className={`${uri === "daftar-jual" ? "active" : ""} d-flex justify-content-between align-items-center`}>
                                                <div className='d-flex align-items-center'>
                                                    <i className="fa-solid fa-cube"></i>
                                                    <p className='px-2'>Semua Product</p>
                                                </div>
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </Link>
                                            <hr />
                                            <Link to={WISHLIST_ROUTE} className={`${uri === "wishlist" ? "active" : ""} d-flex justify-content-between align-items-center`}>
                                                <div className='d-flex align-items-center'>
                                                    <i className="fa-solid fa-heart"></i>
                                                    <p className='px-2'>Diminati</p>
                                                </div>
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </Link>
                                            <hr />
                                            <Link to={SOLD_PRODUCT_ROUTE} className={`${uri === "sold" ? "active" : ""} d-flex justify-content-between align-items-center`}>
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
                                            <p className='py-3'>Belum ada produkmu yang terjual nih, sabar ya rejeki nggak kemana kok</p>
                                        </div>
                                    ) : (
                                        <Grid maxSize="200px">
                                            {
                                                products.map((product, id) => (
                                                    <ProductCard key={id} to={`${PRODUCTS_ROUTE}/${product.id}${BID_ROUTE}`} product={product} />

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

export default SoldProducts