import React, { useEffect, useState } from 'react'

// external hooks
import { useParams, useNavigate, Link } from 'react-router-dom'

// components
import Navbar from '../components/Navbar'
import Preview from '../components/Preview'
import Input from '../components/Input'
import ActionButton from '../components/ActionButton'
import Popup from '../components/Popup'
import Notif from '../components/Notif/index'
import SellerInfo from '../components/SellerInfo'
import Alert from '../components/Alert'
import Image from '../200774.jpg'
import Slider from '../components/Slider'
import NotifItems from '../components/NotifItems'
import ImagePreview from '../components/ImagePreview'
import LoadingSpinner from '../components/LoadingSpinner'

// styles
import { Wrapper, Content } from '../pagesStyle/InfoProduct.styles'

// helpers
import { validateNumber } from '../helpers/validateNumber'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { productActions, addBidPrice } from '../store/product'
import { userActions } from '../store/user'
import { bidActions } from '../store/bids'


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
    
    const images = [
        {
            imageUrl: Image,
        }, {
            imageUrl: Image,
        },
    ]
    
    
    const user = {
        ID: 1
    }
    const product = {
        ownerID: 2
    }
    
    // state
    const [isNavbarOn, setIsNavbarOn] = useState(false)
    const [isSliderNotificationOn, setIsSliderNotificationOn] = useState(false)
    const [isSliderAccountOn, setIsSliderAccountOn] = useState(false)

    const [show, setShow] = useState(false)
    const [bidPrice, setBidPrice] = useState(0)
    const [alertOn, setAlertOn] = useState(true)
    
    // params
    const { productId } = useParams()
    
    // navigation
    const navigate = useNavigate()
   
    // dispatch redux
    const dispatch = useDispatch()
    
    // redux state
    const { loading, error } = useSelector(state => state.product)
    
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

    const onClick = (value) => {
        setShow(value)
    }

    const onChange = (e) => {
        const { value } = e.currentTarget
        validateNumber(value, setBidPrice)
    }

    const onSubmit = async () => {
        if (bidPrice === 0){
            alert("Please insert bid price")
            return
        }

        setShow(false)

        try{
            await dispatch(addBidPrice({
                productId,
                bidPrice,
            }))
            navigate('/', {
                state: {
                    message: "Successfully bid the product"
                } 
            })
        } catch(err){
            console.log(err)
        }
    }

    const onClose = () => {
        setAlertOn(false)
    }

    const onEdit = () => {
        navigate('/')
    }
    
    const onCloseAlert = () => {
        dispatch(productActions.clearError())
    }
    
    const onMarkAsRead = () => {

    }

    useEffect(() => {
        dispatch(userActions.clearError())
        dispatch(productActions.clearError())
        dispatch(bidActions.clearError())
	  }, [dispatch])


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
            <LoadingSpinner active={loading} />
            <Alert active={error.length > 0} backgroundColor="var(--redalert-font)" color="var(--redalert-background)" text={error} onClick={onCloseAlert} />
       
            <Navbar navLinks={navLinks}
                    isOffcanvasOn={isNavbarOn}
                    onClick={onOpen}
                    withSearchBar  
                    style={{ margin: "7.5px 12px" }}  
                    />

            <Alert active={alertOn} 
                    text="test" 
                    backgroundColor="var(--alert-success)" 
                    color="white" 
                    onClick={onClose}
                    />
            
            <Content>
                {
                    user.ID === product.ownerID 
                    ? (
                        <Preview active={true}
                            images={images}
                            name={"testing"}
                            price={123500}
                            category={"accessory"}
                            actionButtons={[
                                <ActionButton text="Edit"
                                                width="90%"
                                                color="#7126B5"
                                                onClick={onEdit}
                                            />
                                ]
                            }
                            mobileButton={
                                <ActionButton text="Edit"
                                            width="calc(90% + 5px)"
                                            color="#7126B5"
                                            onClick={onEdit}
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
                    )
                    : (
                        <>
                            <Preview active={true}
                                images={images}
                                name={"testing"}
                                price={123500}
                                category={"accessory"}
                                actionButtons={[
                                    <ActionButton text="Saya tertarik dan ingin nego"
                                                    width="90%"
                                                    color="#7126B5"
                                                    onClick={() => onClick(true)}
                                                />
                                    ]
                                }
                                mobileButton={
                                    <ActionButton text="Saya tertarik dan ingin nego"
                                                width="calc(90% + 5px)"
                                                color="#7126B5"
                                                onClick={() => onClick(true)}
                                                style={
                                                        { 
                                                            position: "fixed", 
                                                            bottom: "10px", 
                                                            display: "initial",
                                                            left: "50%",  
                                                            zIndex: "1000", 
                                                            transform: "translateX(calc(-50% + 2.5px))",
                                                            transition: "0.5s" 
                                                        }
                                                    }
                                                />
                                    }
                                />
                            <Popup show={show}
                                    onClick={onClick}
                                    >
                                    <h4>Masukkan Harga Tawarmu</h4>
                                    <p className='mb-4'>
                                        Harga tawaranmu akan diketahui penjual, jike penjual cocok kamu akan segera dihubungi penjual.
                                    </p>
                                    {/* move into one component */}
                                    <SellerInfo imageUrl={Image}
                                                sellerName="Jam Tangan Casio"
                                                sellerCity="Rp. 250,000"
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
                        </>
                    )
                }
                
            </Content>
        </Wrapper>
    )
}

export default InfoProduct