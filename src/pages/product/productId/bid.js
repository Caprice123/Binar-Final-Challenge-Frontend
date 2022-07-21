import React, { useCallback, useEffect, useState } from 'react'

// components
import Navbar from '../../../components/Navbar'
import SellerInfo from '../../../components/SellerInfo'
import BorderOnlyButton from '../../../components/BorderOnlyButton'
import ActionButton from '../../../components/ActionButton'
import InputRadio from '../../../components/InputRadio'
import NotifItems from '../../../components/NotifItems'
import Popup from '../../../components/Popup'
import LoadingSpinner from '../../../components/LoadingSpinner'
import Alert from '../../../components/Alert'

import { useNavigate, useParams } from 'react-router-dom'

// styles
import { Wrapper, Content } from '../../../pagesStyle/product/productId/bid.styles'

// helpers
import { dateToString } from '../../../helpers/converter/dateToString'

// hooks
import { useFlashMessage } from '../../../hooks/useFlashMessage'

// react redux
import { useDispatch, useSelector } from 'react-redux'

// actions
import { statusActions } from '../../../store/status'

// services
import { acceptBid, acceptTransaction, rejectBid } from '../../../services/bids'
import { getProductBidByProductID } from '../../../services/product'

const ProductBid = () => {
    
    /**************************************************************/
    // REDUX STATE
    const { currentUser } = useSelector(state => state.user)
    const { loading, error } = useSelector(state => state.status)
    /**************************************************************/
    
    
    /**************************************************************/
    // STATE
    // FLASH STATE
    const [flashMessage, setFlashMessage] = useFlashMessage("")
    
    // POPUP STATE
    const [isRejectApprove, setIsRejectApprove] = useState(false)
    const [isAcceptApprove, setIsAcceptApprove] = useState(false)
    const [isUpdateStatusApprove, setIsUpdateStatusApprove] = useState(false)
    
    // UPDATE STATUS
    const [updateStatus, setUpdateStatus] = useState("sold")
    
    // MAIN STATE
    const [product, setProduct] = useState({})
    const [selectedBids, setSelectedBids] = useState({})
    /**************************************************************/
    

    /**************************************************************/
    // REACT-ROUTER-DOM HOOKS
    // PAGE PARAMS STATE
    const { productId } = useParams()

    // NAVIGATION
    const navigate = useNavigate()
    /**************************************************************/

    /**************************************************************/
    // REDUX DISPATCH
    const dispatch = useDispatch()
    /**************************************************************/

    /**************************************************************/
    // ACTIONS
    // onRejectApproval for keep tracking the reject popup state
    const onRejectApproval = useCallback((value) => {
        setIsRejectApprove(value)
        if (!value){
            setSelectedBids({})
        }
    }, [])

    // onReject for calling rejectBid api when user click yes when confirming rejection action
    const onReject = async () => {
        try{
            setIsRejectApprove(false)

            dispatch(statusActions.setLoading({
                status: true,
            }))

            const response = await dispatch(rejectBid({
                bidsId: selectedBids.id,
            })).unwrap()

            const responseProduct = await dispatch(getProductBidByProductID({
                productId
            })).unwrap()

            dispatch(statusActions.setLoading({
                status: false,
            }))

            setFlashMessage(response)
            setProduct(responseProduct)
        } catch(err){
            console.log(err)
            const error = JSON.parse(err.message)
            dispatch(statusActions.setError({
                message: error.message,
            }))
        }
    }
    
    // onAcceptApproval for keep tracking the accept popup state
    const onAcceptApproval = useCallback((value) => {
        setIsAcceptApprove(value)
        if (!value){
            setSelectedBids({})
        }
    }, [])

    // onAccept for calling the acceptBid api when user click 'hubungi via WA' button
    const onAccept = async () => {
        try{
            setIsAcceptApprove(false)
            
            dispatch(statusActions.setLoading({
                status: true,
            }))

            const response = await dispatch(acceptBid({
                bidsId: selectedBids.id,
            })).unwrap()

            const responseProduct = await dispatch(getProductBidByProductID({
                productId
            })).unwrap()

            dispatch(statusActions.setLoading({
                status: false,
            }))

            onCallByWA(selectedBids.user.phone)
            setFlashMessage(response)
            setProduct(responseProduct)
        } catch(err){
            console.log(err)
            const error = JSON.parse(err.message)
            dispatch(statusActions.setError({
                message: error.message,
            }))
        }
    }
    
    // onUpdateStatusApproval for keep tracking of update popup state
    const onUpdateStatusApproval = useCallback((value) => {
        setIsUpdateStatusApprove(value)
        if (!value){
            setSelectedBids({})
        }
    }, [])

    // onUpdateStatus for calling updateStatusBid api when user click submit on update popup
    const onUpdateStatus = async () => {
        try{
            setIsUpdateStatusApprove(false)

            let response
            dispatch(statusActions.setLoading({
                status: true,
            }))

            if (updateStatus === "cancel"){
                response = await dispatch(rejectBid({
                    bidsId: selectedBids.id,
                })).unwrap()

            } else {
                response = await dispatch(acceptTransaction({
                    bidsId: selectedBids.id,
                })).unwrap()
            }
            const responseProduct = await dispatch(getProductBidByProductID({
                productId
            })).unwrap()
            
            
            dispatch(statusActions.setLoading({
                status: false,
            }))

            setFlashMessage(response)
            setProduct(responseProduct)
        } catch(err){
            console.log(err)
            const error = JSON.parse(err.message)
            dispatch(statusActions.setError({
                message: error.message,
            }))
        }
    }   
    
    // onCallByWA for open new tab for a buyer phone number
    const onCallByWA = (phone) => {
        console.log(phone)
        window.open(`https://wa.me/${phone}`, '_blank', 'noopener,noreferrer')
    }

    // onChange for changing the updateStatus state everytime user click one of radio buttons
    const onChange = (e) => {
        setUpdateStatus(e.currentTarget.value)
    }

    // onCloseAlert for resetting error when close button alert for errror message is clicked
    const onCloseAlert = () => {
        dispatch(statusActions.setError({
            message: ""
        }))
    }

    // onCloseFlash for resetting flash message when close button alert for errror message is
    const onCloseFlash = () => {
        setFlashMessage("")
    }

    const onClickGoBack = () => {
        navigate(-1)
    }
    /**************************************************************/


    /**************************************************************/
    // USEEFFECT
    // for getting the all bids for current product ID
    useEffect(() => {
        const fetchData = async () => {
            try{
                dispatch(statusActions.setLoading({
                    status: true,
                }))

                const response = await dispatch(getProductBidByProductID({
                    productId
                })).unwrap()
                
                dispatch(statusActions.setLoading({
                    status: false,
                }))
                setProduct(response)
            } catch(err){
                console.log(err)
                const error = JSON.parse(err.message)
                dispatch(statusActions.setError({
                    message: error.message,
                }))
            }
        }
        dispatch(statusActions.setError({
            message: ""
        }))

        fetchData()
	}, [dispatch, productId])
    /**************************************************************/


    return (
        <Wrapper>
            <LoadingSpinner active={loading} />
            <Alert active={error.length > 0} 
                    backgroundColor="var(--redalert-background)" 
                    color="var(--redalert-font)"
                    text={error} 
                    onClick={onCloseAlert} 
                    />
            <Alert active={flashMessage.length > 0} 
                    backgroundColor="var(--alert-success)" 
                    color="var(--white-color)" 
                    text={flashMessage} 
                    onClick={onCloseFlash} 
                    />
            
            <Navbar centeredText="Info Penawar" 
                    />
            <Content className="mx-auto position-relative">
                <i className="fa-solid fa-arrow-left-long back-icon py-3" onClick={onClickGoBack}></i>
                <SellerInfo width="100%"
                            imageUrl={product.images ? product?.images[0].name : ""}
                            sellerName={product.name ? product.name : ""}
                            sellerCity={product.category ? product.category.categoryName : ""}
                            style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)" }}
                            />
                <h4 className='my-4'>Daftar Produkmu yang Ditawar</h4>
                {
                    currentUser.user.id !== product?.user_id ? (
                        product?.bids ? (
                            product?.bids.map((bid) => (
                                <div key={bid.id} onClick={() => setSelectedBids(bid)}>
                                    <NotifItems imageUrl={bid.user.image}
                                                actionName="Penawaran Product"
                                                time={dateToString(bid.createdAt)}
                                                productName={bid.user.name}
                                                originalPrice={Number(product.price)}
                                                bidPrice={Number(bid.request_price)}
                                                />
            
                                    {
                                        <div className='d-flex buttons justify-content-end px-2' style={{ width: "90%", margin: "0 auto" }}>
                                            {
                                                bid.status === "pending" || bid.status === "waiting_for_negotiation" ? (
                                                    <>
                                                        <BorderOnlyButton text={bid.status === "pending" ? "Tolak" : "Status"}
                                                                            width="35%"
                                                                            color="var(--primary-purple-04)"
                                                                            style={{ padding: "5px 12px"}}
                                                                            onClick={bid.status === "pending" 
                                                                            ? () => onRejectApproval(true)        
                                                                            : () => onUpdateStatusApproval(true)}
                                                                            />
                                                        <ActionButton text={bid.status === "pending" ? "Terima" : "Hubungi di WA"}
                                                                            width="35%"
                                                                            color="var(--primary-purple-04)"
                                                                            style={{ padding: "5px 12px", marginLeft: "1rem" }} 
                                                                            onClick={bid.status === "pending" 
                                                                            ? () => onAcceptApproval(true) 
                                                                            : () => onCallByWA(bid.user.phone)}
                                                                            />
                                                    </>
                                                ) : (
                                                    <p>{ bid.status.toUpperCase() }</p>
                                                )
                                            }
                                        </div>
                                    }
                                    <hr className='my-3' />
                                </div>
                            ))
                        ) : (
                            // TODO: Change to skeleton loading
                            <></>
                        )
                    ) : (
                        <>
                            Unauthorized
                        </>
                    )
                   
                }
            </Content>
            
            <Popup topic="reject"
                    show={isRejectApprove}
                    onClick={onRejectApproval}>
                    <h4>Are you sure want to reject this offer?</h4>
                    <div className='d-flex justify-content-between w-100 py-3'>
                        <BorderOnlyButton text="No"
                                            color="var(--primary-purple-04)"
                                            width="45%"
                                            onClick={() => onRejectApproval(false)}
                                            style={{ padding: "5px 12px"}}
                                            />
                        <ActionButton text="Yes"
                                        color="var(--primary-purple-04)"
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
                                    imageUrl={selectedBids?.user?.image}
                                    sellerName={selectedBids?.user?.name}
                                    sellerCity={selectedBids?.user?.city}
                                    />
                        <NotifItems imageUrl={product.images ? product?.images[0].name : ""}
                                    productName={product.name}
                                    originalPrice={product.price}
                                    bidPrice={selectedBids?.request_price}
                                    />
                    </div>
                    <ActionButton text="Hubungi via WA"
                                    width="100%"
                                    color="var(--primary-purple-04)"
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
                                    color="var(--primary-purple-04)"
                                    onClick={onUpdateStatus}
                                    style={{ margin: "1.5rem 0", padding: "7.5px 12px"}}
                                    />
            </Popup>
        
            
        </Wrapper>
    )
}

export default ProductBid