import React, { useEffect, useState } from 'react'

// external hooks
import { useParams, useNavigate } from 'react-router-dom'

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

// styles
import { Wrapper, Content } from '../pagesStyle/InfoProduct.styles'

// helpers
import { validateNumber } from '../helpers/validateNumber'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { productActions, addBidPrice } from '../store/product'
import LoadingSpinner from '../components/LoadingSpinner'
import { userActions } from '../store/user'
import { bidActions } from '../store/bids'


const InfoProduct = () => {
    
    // state   
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
    
    // settings
    const navLinks = [
        {
            type: "text",
            to: "/products",
            additionalIcon: <i class="fa-solid fa-list"></i>,
            mobileComponent: <p>Daftar Jual</p>
        }, {
            type: "others",
            to: "/notifications",
            additionalIcon: <Notif datas={[
                {
                    seen: true,
                }, {
                    seen: false
                }, {
                    seen: true
                }
            ]} />,
            mobileComponent: <p>Notifications</p>
        }, {
            type: "text",
            to: "",
            additionalIcon: <i class="fa-solid fa-user"></i>,
            mobileComponent: <p>Akun Saya</p>
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

    const onClick = (value) => {
        setShow(value)
    }

    const onChange = (e) => {
        const { value } = e.currentTarget
        validateNumber(value, setBidPrice)
    }

    const onSubmit = () => {
        if (bidPrice === 0){
            alert("Please insert bid price")
            return
        }

        setShow(false)

        try{
            dispatch(addBidPrice({
                productId,
                bidPrice,
            }))
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

    useEffect(() => {
		dispatch(userActions.clearError())
		dispatch(productActions.clearError())
		dispatch(bidActions.clearError())
	}, [dispatch])

    return (
        <Wrapper>
            <LoadingSpinner active={loading} />
            <Alert active={error.length > 0} backgroundColor="var(--redalert-font)" color="var(--redalert-background)" text={error} onClick={onCloseAlert} />
            
            <Navbar navLinks={navLinks}
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