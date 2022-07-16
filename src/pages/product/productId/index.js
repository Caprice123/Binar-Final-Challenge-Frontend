// TODO: BLOM KELAR ACTION BUTTON NEGO

import React, { useEffect, useState } from 'react'

// external hooks
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'

// components
import Navbar from '../../../components/Navbar'
import Preview from '../../../components/Preview'
import Input from '../../../components/Input'
import ActionButton from '../../../components/ActionButton'
import Popup from '../../../components/Popup'
import Notif from '../../../components/Notif/index'
import SellerInfo from '../../../components/SellerInfo'
import Alert from '../../../components/Alert'
import Image from '../../../200774.jpg'
import NoContentImage from '../../../assets/images/no-image-found.jpg'
import Slider from '../../../components/Slider'
import NotifItems from '../../../components/NotifItems'
import ImagePreview from '../../../components/ImagePreview'
import LoadingSpinner from '../../../components/LoadingSpinner'

// styles
import { Wrapper, Content } from '../../../pagesStyle/product/productId/index.styles'

// helpers
import { validateNumber } from '../../../helpers/validateNumber'
import { objectToQueryString } from '../../../helpers/converter/objectToQuery'

// redux
import { useDispatch, useSelector } from 'react-redux'

// actions
import { userActions } from '../../../store/user'
import { statusActions } from '../../../store/status'

// services
import { addBidPrice, getProductOneByID } from '../../../services/product'
import { useFlashMessage } from '../../../hooks/useFlashMessage'

// pages
import { HOME_ROUTE, LOGIN_ROUTE, DAFTAR_JUAL_ROUTE, PRODUCTS_ROUTE, USER_PROFILE_ROUTE } from '../../../types/pages'

const InfoProduct = () => {
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
            to: DAFTAR_JUAL_ROUTE,
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
    const onSubmit = async () => {
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
            setFlashMessage("Successfully bid the project")
        } catch(err){
            console.log(err)
            dispatch(statusActions.setError({
                message: err.message,
            }))
        }
    }

    // onClose for for resetting flash message when close button flash message is clicked
    const onClose = () => {
        setFlashMessage("")
    }

    // onEdit for navigte to update product
    const onEdit = () => {
        // TODO: CHANGE TO ROUTE UPDATE
        navigate(HOME_ROUTE)
    }
    
    // onCloseAlert for resetting error when close button alert for errror message is clicked
    const onCloseAlert = () => {
        dispatch(statusActions.setError({
            message: "",
        }))
    }

    // onSearch for navigating to home page and search for specific name
    const onSearch = (value) => {
        navigate(`/?${objectToQueryString({ name: value, category: '' })}`)
    }
    
    // onMarkAsRead for calling api that will make specific notification is read
    const onMarkAsRead = () => {

    }

    // onClickLogout for logout user
    const onClickLogout = async () => {
        dispatch(userActions.logout())
        navigate(LOGIN_ROUTE, {
            state: {
                message: "Logout Successfully"
            }
        })
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

                dispatch(statusActions.setLoading({
                    status: false,
                }))

                setProduct(response)
            } catch(err){
                console.log(err)
                dispatch(statusActions.setError({
                    message: err.message,
                }))
            }
        }

        dispatch(statusActions.setError({
            message: "",
        }))
        
        navigate(location.pathname, { replace: true })
        fetchData()
    }, [dispatch, productId, setProduct, navigate, location.pathname])
    /**************************************************************/
    

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
                    <Link to={USER_PROFILE_ROUTE} className='d-flex align-items-center pt-5 pb-1'>
                        <i className="fa-solid fa-pen-to-square me-3"></i>
                        <span>Ubah Akun</span>
                    </Link>
                    <hr />
                    <Link to='' className='d-flex align-items-center pt-3 pb-1'>
                        <i className="fa-solid fa-gear me-3"></i>
                        <span>Pengaturan Akun</span>
                    </Link>
                    <hr />
                    <Link to={LOGIN_ROUTE} className='d-flex align-items-center pt-3 pb-1' onClick={onClickLogout}>
                        <i className="fa-solid fa-arrow-right-from-bracket me-3"></i>
                        <span>Logout Akun</span>
                    </Link>
                    <hr />

                    <p>Version 1.0.0</p>
                </div>
            </Slider>
            <LoadingSpinner active={loading} />
            <Alert active={error.length > 0} backgroundColor="var(--redalert-font)" color="var(--redalert-background)" text={error} onClick={onCloseAlert} />
       
            <Navbar navLinks={navLinks}
                    isOffcanvasOn={isNavbarOn}
                    onClick={onOpen}
                    withSearchBar  
                    onSearch={onSearch}
                    style={{ margin: "7.5px 12px" }}  
                    />

            <Alert active={flashMessage.length > 0} 
                    text={flashMessage} 
                    backgroundColor="var(--alert-success)" 
                    color="white" 
                    onClick={onClose}
                    />
            
            <Content>
                {
                    product ? (
                        <>
                            <Preview active={true}
                                    images={product.images}
                                    name={product.name}
                                    price={product.price}
                                    owner={product.owner}
                                    description={product.description}
                                    category={product.category.name}
                                    actionButtons={[
                                        <ActionButton text={isLoggedIn ? (currentUser.user.id === product.owner.id ? "Edit" : "Saya tertarik dan ingin nego") : "Saya tertarik dan ingin nego"}
                                                        width="90%"
                                                        color="#7126B5"
                                                        onClick={isLoggedIn ? (currentUser.user.id === product.owner.id ? onEdit : () => onClick(true)) : () => navigate(LOGIN_ROUTE)}
                                                        disabled={isDisabled || (product.status === "waiting_for_bid" && currentUser.user.id !== product.owner.id) ? true : false}
                                                    />
                                        ]
                                    }
                                    mobileButton={
                                        <ActionButton text={isLoggedIn ? (currentUser.user.id === product.owner.id ? "Edit" : "Saya tertarik dan ingin nego") : "Saya tertarik dan ingin nego"}
                                                    width="calc(90% + 5px)"
                                                    color="#7126B5"
                                                    onClick={isLoggedIn ? (currentUser.user.id === product.owner.id ? onEdit : () => onClick(true)) : () => navigate(LOGIN_ROUTE)}
                                                    disabled={isDisabled || (product.status === "waiting_for_bid" && currentUser.user.id !== product.owner.id) ? true : false}
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
                                        }
                                    />
                            {
                                isLoggedIn ? (
                                    currentUser.user.id !== product.user_id && (
                                        <Popup show={show}
                                            onClick={onClick}
                                            >
                                            <h4>Masukkan Harga Tawarmu</h4>
                                            <p className='mb-4'>
                                                Harga tawaranmu akan diketahui penjual, jike penjual cocok kamu akan segera dihubungi penjual.
                                            </p>
                                            <SellerInfo imageUrl={product.images[0]}
                                                        // TODO: change to user.name
                                                        sellerName={product.name}
                                                        sellerCity={`Rp. ${product.price.toLocaleString()}`}
                                                        width="100%"
                                                        additionalClass="my-3"
                                                        style={{ background: "#EEEEEE" }}
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
                                                            color="#7126B5"
                                                            onClick={onSubmit}
                                                            style={{ marginTop: "1rem", marginBottom: "1rem" }}
                                                            />
                                        </Popup>
                                    )
                                ) : (
                                <></>
                                )
                            }
                        </>
                    ) : (
                        <></>
                    )
                }
                
                
            </Content>
        </Wrapper>
    )
}

export default InfoProduct