import React, { useEffect, useState } from 'react'

// components
import Navbar from '../components/Navbar'
import Notif from '../components/Notif'
import SellerInfo from '../components/SellerInfo'
import BorderOnlyButton from '../components/BorderOnlyButton'
import ActionButton from '../components/ActionButton'
import InputRadio from '../components/InputRadio'
import Image from '../200774.jpg'
import NotifItems from '../components/NotifItems'
import Popup from '../components/Popup'
import LoadingSpinner from '../components/LoadingSpinner'
import Alert from '../components/Alert'

import { Link, useNavigate } from 'react-router-dom'

// styles
import { Wrapper, Content } from '../pagesStyle/ProductBid.styles'

// react redux
import { acceptBid, bidActions, rejectBid, updateStatusBid } from '../store/bids'
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../store/product'
import { userActions } from '../store/user'

// TODO: update the id of transaction id
const bids = [
    {
        seen: true,
        status: "pending"
    }, {
        seen: false,
        status: "pending"
    }, {
        seen: true,
        status: "pending"
    }
]

const product = {
    userId: 1,
    status: "sent_to_seller"
    // status: "pending"
}


const navLinks = [
    {
        type: "text",
        to: "/",
        additionalIcon: <i className="fa-solid fa-list"></i>,
        mobileComponent: <p>Daftar Jual</p>
    }, {
        type: "others",
        to: "/notifications",
        additionalIcon: <Notif datas={bids} />,
        mobileComponent: <p>Notifications</p>
    }, {
        type: "text",
        to: "",
        additionalIcon: <i className="fa-solid fa-user"></i>,
        mobileComponent: <p>Akun Saya</p>
    }, 
]

const user = {
    userId: 2,
}

const ProductBid = () => {
    // state
    const [isRejectApprove, setIsRejectApprove] = useState(false)
    const [isAcceptApprove, setIsAcceptApprove] = useState(false)
    const [isUpdateStatusApprove, setIsUpdateStatusApprove] = useState(false)
    const [updateStatus, setUpdateStatus] = useState("sold")
    
    // navigation
    const navigate = useNavigate()

    // dispatch redux
    const dispatch = useDispatch()

    // redux state
    const { loading, error } = useSelector(state => state.bids)

    const onRejectApproval = (value) => {
        setIsRejectApprove(value)
    }

    const onReject = async () => {
        try{
            setIsRejectApprove(false)
            await dispatch(rejectBid({
                transactionId: 1,
            }))

            navigate('/', {
                state: {
                    message: "Successfully reject transaction"
                }
            })
        } catch(err){
            console.log(err)
        }
    }
    
    const onAcceptApproval = (value) => {
        setIsAcceptApprove(value)
    }

    const onAccept = async () => {
        try{
            setIsAcceptApprove(false)
            
            await dispatch(acceptBid({
                transactionId: 1,
            }))

            navigate('/', {
                state: {
                    message: "Successfully accept product bid"
                }
            })
        } catch(err){
            console.log(err)
        }
    }
    
    const onUpdateStatusApproval = (value) => {
        setIsUpdateStatusApprove(value)
    }   

    const onUpdateStatus = async () => {
        try{
            setIsUpdateStatusApprove(false)
            await dispatch(updateStatusBid({
                transactionId: 1,
                updateStatus,
            }))
            navigate('/', {
                state: {
                    message: "Successfully update transaction"
                }
            })
        } catch(err){
            console.log(err)
        }
    }   
    
    const onCallByWA = () => {
        window.open("https://stackoverflow.com", '_blank', 'noopener,noreferrer').focus();
    }

    const onChange = (e) => {
        setUpdateStatus(e.currentTarget.value)
    }

    const onCloseAlert = () => {
        dispatch(bidActions.clearError())
    }

    useEffect(() => {
		dispatch(userActions.clearError())
		dispatch(productActions.clearError())
		dispatch(bidActions.clearError())
	}, [dispatch])

    return (
        <Wrapper>
            <LoadingSpinner active={loading} />
            <Alert active={error.length > 0} 
                    backgroundColor="var(--redalert-font)" 
                    color="var(--redalert-background)" 
                    text={error} 
                    onClick={onCloseAlert} 
                    />
            
            <Navbar centeredText="Info Penawar" 
                    />
            <Content className="mx-auto position-relative"> 
                <Link to='/' className="back-icon py-3">
					<i className="fa-solid fa-arrow-left-long"></i>
				</Link>
                <SellerInfo width="100%"
                            imageUrl={Image}
                            sellerName="seller name"
                            sellerCity="seller city"
                            style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)" }}
                            />
                <h4 className='my-4'>Daftar Produkmu yang Ditawar</h4>
                {
                    user.userId !== product.userId ? (
                        bids.map((bid, id) => (
                            <div key={id}>
                            <NotifItems imageUrl={Image}
                                        actionName="Penawaran Product"
                                        time="20 Apr 14:04"
                                        productName="Jam Tangan Casio"
                                        originalPrice={Number("250000")}
                                        bidPrice={Number("200000")}
                                        />
    
                            {
                                <div className='d-flex buttons justify-content-end px-2' style={{ width: "90%", margin: "0 auto" }}>
                                    <BorderOnlyButton text={product.status === "sent_to_seller" ? "Tolak" : "Status"}
                                                        width="30%"
                                                        color="#7126B5"
                                                        style={{ padding: "5px 12px"}}
                                                        onClick={product.status === "sent_to_seller" ? () => onRejectApproval(true) : () => onUpdateStatusApproval(true)}
                                                        />
                                    <ActionButton text={product.status === "sent_to_seller" ? "Terima" : "Hubungi di WA"}
                                                        width="30%"
                                                        color="#7126B5"
                                                        style={{ padding: "5px 12px", marginLeft: "1rem" }} 
                                                        onClick={product.status === "sent_to_seller" ? () => onAcceptApproval(true) : onCallByWA}
                                                        />
                                </div>
                            }
                                <hr className='my-3' />
                            </div>
                        ))
                    ) : (
                        <></>
                    )
                   
                }
            </Content>
            
            <Popup topic="reject"
                    show={isRejectApprove}
                    onClick={onRejectApproval}>
                    <h4>Are you sure want to reject this offer?</h4>
                    <div className='d-flex justify-content-between w-100 py-3'>
                        <BorderOnlyButton text="No"
                                            color="#7126B5"
                                            width="45%"
                                            onClick={() => onRejectApproval(false)}
                                            style={{ padding: "5px 12px"}}
                                            />
                        <ActionButton text="Yes"
                                        color="#7126B5"
                                        width="45%"
                                        onClick={onReject}
                                        style={{ padding: "5px 12px"}}
                                        />
                    </div>
            </Popup>
               
            
            <Popup topic="accept"
                    show={isAcceptApprove}
                    onClick={onAcceptApproval}>
                    <h4>Yeay kamu berhasil mendapat harga yang sesuai</h4>
                    <p>Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya</p>
                    <div className='product-match my-3 py-3'>
                        <h4 className='text-center'>Product Match</h4>
                        <SellerInfo width="100%"
                                    imageUrl={Image}
                                    sellerName="Nama Pembeli"
                                    sellerCity="Kota"
                                    />
                        <NotifItems imageUrl={Image}
                                    productName="Jam Tangan Casio"
                                    originalPrice={Number("250000")}
                                    bidPrice={Number("200000")}
                                    />
                    </div>
                    <ActionButton text="Hubungi via WA"
                                    width="100%"
                                    color="#7126B5"
                                    onClick={onAccept}
                                    style={{ margin: "1.5rem 0", padding: "7.5px 12px"}}
                                    />
            </Popup>
             
            <Popup topic="update"
                    show={isUpdateStatusApprove}
                    onClick={onUpdateStatusApproval}>
                    <h4>Perbarui status penjualan produkmu</h4>
                    <div className="status-bid">
                        <InputRadio value="sold"
                                    labelText="Berhasil terjual"
                                    additionalLabelText="Kamu telah sepakat menjual produk ini kepada pembeli"
                                    onChange={onChange}
                                    id={1}
                                    defaultValue
                                    />
                        <InputRadio value="cancel"
                                    labelText="Batalkan transaksi"
                                    additionalLabelText="Kamu membatalkan transaksi produk ini dengan pembeli"
                                    onChange={onChange}
                                    id={2}
                                    />
                    </div>
                    <ActionButton text="Kirim"
                                    width="100%"
                                    color="#7126B5"
                                    onClick={onUpdateStatus}
                                    style={{ margin: "1.5rem 0", padding: "7.5px 12px"}}
                                    />
            </Popup>
        
            
        </Wrapper>
    )
}

export default ProductBid