import React, { useEffect, useState } from 'react'

// external hooks
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'

// components
import Navbar from '../../../components/Navbar'
import Preview from '../../../components/Preview'
import Input from '../../../components/Input'
import ActionButton from '../../../components/ActionButton'
import AccountDropdown from '../../../components/AccountDropdown'
import BorderOnlyButton from '../../../components/BorderOnlyButton'
import Popup from '../../../components/Popup'
import Notif from '../../../components/Notif/index'
import SellerInfo from '../../../components/SellerInfo'
import Alert from '../../../components/Alert'
import NoImage from '../../../assets/images/no-image-found.jpg'
import Slider from '../../../components/Slider'
import NotifItems from '../../../components/NotifItems'
import ImagePreview from '../../../components/ImagePreview'
import LoadingSpinner from '../../../components/LoadingSpinner'

// styles
import { Wrapper, Content } from '../../../pagesStyle/product/productId/index.styles'

// helpers
import { validateNumber } from '../../../helpers/validator/validateNumber'
import { objectToQueryString } from '../../../helpers/converter/objectToQuery'
import { dateToString } from '../../../helpers/converter/dateToString'

// hooks
import { useNotifications } from '../../../hooks/useNotifications'
import { useFlashMessage } from '../../../hooks/useFlashMessage'

// redux
import { useDispatch, useSelector } from 'react-redux'

// actions
import { statusActions } from '../../../store/status'

// services
import { addBidPrice, deleteProduct, getProductOneByID } from '../../../services/product'
import { checkBid } from '../../../services/bids'
import { updateNotifications } from '../../../services/notifications'

// pages
import { LOGIN_ROUTE, DAFTAR_JUAL_ROUTE, PRODUCTS_ROUTE, USER_PROFILE_ROUTE, LOGOUT_ROUTE, UPDATE_PRODUCT_ROUTE, ERROR_404_ROUTE, ERROR_500_ROUTE } from '../../../types/pages'

const InfoProduct = () => {
    /**************************************************************/
    // REDUX STATE
    const { currentUser, isLoggedIn } = useSelector(state => state.user)
    const { loading, error } = useSelector(state => state.status)
    /**************************************************************/

    /**************************************************************/
    // STATE
    // NAVIGATION STATE
    const [isNavbarOn, setIsNavbarOn] = useState(false)
    const [isSliderNotificationOn, setIsSliderNotificationOn] = useState(false)
    const [isSliderAccountOn, setIsSliderAccountOn] = useState(false)

    // POPUP SATTE
    const [show, setShow] = useState(false)
    const [bidPrice, setBidPrice] = useState(0)
    
    // FLASH STATE
    const [flashMessage, setFlashMessage] = useFlashMessage("")

    // NOTIFICATION STATE
    const notifications = useNotifications([])
    
    // MAIN STATE 
    const [product, setProduct] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)
    /**************************************************************/
    

    /**************************************************************/
    // REACT-ROUTER-DOM HOOKS
    // LOCATION STATE
    const { productId } = useParams()
    
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

    // onClick for keep track of the popup components
    const onClick = (value) => {
        setShow(value)
    }

    // onChange for keep track the bid price input tag
    const onChange = (e) => {
        const { value } = e.currentTarget
        validateNumber(value, setBidPrice)
    }

    // onSubmit for calling addBidPrice api when user click add bid price
    const onSubmit = async (e) => {
        e.preventDefault()
        if (bidPrice === 0){
            alert("Please insert bid price")
            return
        }

        setShow(false)

        try{
            dispatch(statusActions.setLoading({
                status: true,
            }))

            await dispatch(addBidPrice({
                productId,
                bidPrice,
            })).unwrap()

            dispatch(statusActions.setLoading({
                status: false,
            }))
            
            setIsDisabled(true)
            setFlashMessage("Successfully bid the product")
        } catch(err){
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
                        message: error.message
                    }))
                    break
            }
        }
    }

    // onClose for for resetting flash message when close button flash message is clicked
    const onClose = () => {
        setFlashMessage("")
    }

    // onEdit for navigte to update product
    const onEdit = () => {
        navigate(PRODUCTS_ROUTE + "/" + productId + UPDATE_PRODUCT_ROUTE)
    }
    
    // onCloseAlert for resetting error when close button alert for errror message is clicked
    const onCloseAlert = () => {
        dispatch(statusActions.setError({
            message: "",
        }))
    }

    // onSearch for navigating to home page and search for specific name
    const onSearch = (value) => {
        navigate(`/?${objectToQueryString({ search: value, category: '' })}`)
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
                        message: error.message
                    }))
                    break
            }
        }
    }

    const onDeleteProduct = async () => {
        try{
            dispatch(statusActions.setLoading({
                status: true,
            }))

            await dispatch(deleteProduct({
                productId: productId,
            })).unwrap()
    
            dispatch(statusActions.setLoading({
                status: false,
            }))

            navigate(DAFTAR_JUAL_ROUTE, {
                state: {
                    message: "Successfully deleting product",
                }
            })
        } catch(err){
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
                        message: error.message
                    }))
                    break
            }
        }
    }
    /**************************************************************/


    /**************************************************************/
    // for getting the current product details
    useEffect(() => {
        const fetchData = async () => {
            try{
                dispatch(statusActions.setLoading({
                    status: true,
                }))

                const response = await dispatch(getProductOneByID({
                    productId: productId
                })).unwrap()

                let bidsCount

                // user alr login
                if (isLoggedIn){

                    // if user is the owner of the product
                    if (currentUser.user.id === response.owner.id){
                        bidsCount = 0

                    // if user is not the owner of the product, then getBids count
                    } else {
                        bidsCount = await dispatch(checkBid({
                            productId: productId,
                        })).unwrap()  
                    }
                // user not yet login
                } else {
                    bidsCount = 0 
                }

                dispatch(statusActions.setLoading({
                    status: false,
                }))

                setProduct(response)
                if (response.status === "sold"){
                    setIsDisabled(true)
                } else {
                    setIsDisabled(Number(bidsCount) > 0)
                }
            } catch(err){
                const error = JSON.parse(err.message)
                const statusCode = error.statusCode
                switch (statusCode){
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

        dispatch(statusActions.setError({
            message: "",
        }))
        
        navigate(location.pathname + location.search, { replace: true })
        fetchData()
    }, [dispatch, productId, currentUser.user.id, isLoggedIn, setProduct, navigate, location.pathname, location.search])
    /**************************************************************/
    
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
    
    const helperText = () => {
        if (product.status === "sold"){
            return "Product Sudah Terjual"
        }
        if (isLoggedIn){
            if (currentUser.user.id === product.owner.id){
                return "Edit"
            }
            if(isDisabled){
                return "Menunggu respons penjual"
            }
        }
        return "Saya tertarik dan ingin nego"
    }

    const helperOnClick = () => {
        if (isLoggedIn){
            if (currentUser.user.id === product.owner.id){
                return () => onEdit()
            }
            return () => onClick(true)
        }
        return () => navigate(LOGIN_ROUTE)
    }

    const helperRedirectUrl = (notification) => {
        const productId = notification.products.product_id
        switch(notification.message){
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
            <LoadingSpinner active={loading} />
            <Alert active={flashMessage.length > 0} 
                    text={flashMessage} 
                    backgroundColor="var(--alert-success)" 
                    color="var(--white-color)" 
                    onClick={onClose}
                    id="flash-message"
                    />
            <Alert active={error.length > 0} 
                    backgroundColor="var(--redalert-background)" 
                    color="var(--redalert-font)" 
                    text={error} 
                    onClick={onCloseAlert}
                    id="error-message" 
                    />
       
            <Navbar navLinks={navLinks}
                    isOffcanvasOn={isNavbarOn}
                    onClick={onOpen}
                    withSearchBar  
                    onSearch={onSearch}
                    style={{ margin: "7.5px 12px" }}  
                    />
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
            <Content>
                {
                    product && (
                        <>
                            <Preview active={true}
                                    images={product.images}
                                    name={product.name}
                                    price={product.price}
                                    owner={product.owner}
                                    description={product.description}
                                    category={product.category.name}
                                    actionButtons={[
                                            <ActionButton   text={helperText()}
                                                            width="100%"
                                                            color="var(--primary-purple-04)"
                                                            onClick={helperOnClick()}
                                                            disabled={isDisabled}
                                                            id="Action-button"
                                                        />,
                                            currentUser.user.id === product.owner.id && (
                                                <BorderOnlyButton   text="Delete Product"
                                                                    width="100%"
                                                                    color="var(--primary-purple-04)"
                                                                    onClick={onDeleteProduct}
                                                                    id="delete-button"
                                                                    />
                                            )
                                        ]
                                    }
                                    mobileButton={
                                        <>
                                            <ActionButton text={helperText()}
                                                        width="calc(90% + 5px)"
                                                        color="var(--primary-purple-04)"
                                                        onClick={helperOnClick()}
                                                        disabled={isDisabled}
                                                        style={
                                                                { 
                                                                    position: "fixed", 
                                                                    bottom: currentUser.user.id === product.owner.id ? "75px": "10px",
                                                                    left: "50%", 
                                                                    display: "initial",
                                                                    zIndex: "1000", 
                                                                    transform: "translateX(calc(-50% + 2.5px))",
                                                                    transition: "0.5s" 
                                                                }
                                                            }
                                                        />
                                            {
                                                currentUser.user.id === product.owner.id && ( 
                                                    <BorderOnlyButton text="Delete Product"
                                                            width="calc(90% + 5px)"
                                                            color="var(--primary-purple-04)"
                                                            onClick={onDeleteProduct}
                                                            style={
                                                                    { 
                                                                        position: "fixed", 
                                                                        bottom: "10px",
                                                                        left: "50%", 
                                                                        display: "initial",
                                                                        zIndex: "1000", 
                                                                        transform: "translateX(calc(-50% + 2.5px))",
                                                                        transition: "0.5s" 
                                                                    }
                                                                }
                                                            />
                                                )
                                            }
                                        </>
                                    }
                                    />
                            {
                                isLoggedIn && currentUser.user.id !== product.user_id && (
                                    <Popup show={show}
                                        onClick={onClick}
                                        >
                                        <form onSubmit={onSubmit}>
                                            <h4>Masukkan Harga Tawarmu</h4>
                                            <p className='mb-4'>
                                                Harga tawaranmu akan diketahui penjual, jike penjual cocok kamu akan segera dihubungi penjual.
                                            </p>
                                            <SellerInfo imageUrl={product.images[0]}
                                                        sellerName={product.name}
                                                        sellerCity={`Rp. ${product.price.toLocaleString()}`}
                                                        width="100%"
                                                        additionalClass="my-3"
                                                        style={{ background: "var(--grey-color)" }}
                                                        withShadow
                                                        />

                                            <Input type="text"
                                                    text="Harga Tawar"
                                                    placeholder="Rp 0,00"
                                                    value={`Rp. ${bidPrice.toLocaleString()}`}
                                                    onChange={onChange}
                                                    required
                                                    />
                                            <ActionButton text="Kirim"
                                                            width="100%"
                                                            color="var(--primary-purple-04)"
                                                            onClick={onSubmit}
                                                            style={{ marginTop: "1rem", marginBottom: "1rem" }}
                                                            />
                                        </form>
                                    </Popup>
                                )
                            }
                        </>
                    )
                }
                
                
            </Content>
        </Wrapper>
    )
}

export default InfoProduct