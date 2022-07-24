// IMAGE BLOM BERFUNGSI DAN ADA DELAY BENTAR 
import React, { useEffect, useState } from 'react'

// components
import ActionButton from '../../components/ActionButton'
import Dropdown from '../../components/Dropdown'
import ImagePreview from '../../components/ImagePreview'
import Input from '../../components/Input'
import InputFile from '../../components/InputFile'
import Navbar from '../../components/Navbar'
import Textarea from '../../components/Textarea'
import LoadingSpinner from '../../components/LoadingSpinner'
import Alert from '../../components/Alert'

import { useLocation, useNavigate } from 'react-router-dom'

// helpers
import { validatePhoneNumber } from '../../helpers/validator/validatePhoneNumber'

// styles
import { Wrapper, Content } from '../../pagesStyle/user/profile.styles'

// react redux
import { useDispatch, useSelector } from 'react-redux'

// actions
import { userActions } from '../../store/user'
import { statusActions } from '../../store/status'

// services
import { getCurrentUser, updateUser } from '../../services/user'

// pages
import { ERROR_404_ROUTE, ERROR_500_ROUTE, LOGIN_ROUTE } from '../../types/pages'

const InfoProfile = () => {
    /**************************************************************/
    // REDUX STATE
    const { availableCities } = useSelector(state => state.user)
    const { loading, error } = useSelector(state => state.status)
    /**************************************************************/
    

    /**************************************************************/
    // STATE
    // FLASH STATE
    const [flashMessage, setFlashMessage] = useState("")
    
    // MAIN STATE
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [image, setImage] = useState(null)
    
    // OPTIONS CITY STATE
    const [optionCity, setOptionCity] = useState([])
    /**************************************************************/


    /**************************************************************/
    // REACT-ROUTER-DOM STATE
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
    // onChange for changing the state eveytime user input something in input tag
    const onChange = (e) => {
        const { id, value } = e.currentTarget
        switch (id){
            case "Nama":
                setName(value)
                break
            case "Alamat":
                setAddress(value)
                break
            case "Kota":
                setCity(value)
                break
            case "No-Handphone":
                validatePhoneNumber(value, "0", setPhone)
                break
            default:
                break
        }
    }

    // onSelect for selecting the city everytime user click the dropdown
    const onSelect = (e) => {
        const { dataset } = e.currentTarget
		setCity(dataset.value)
    }
    
    // onInputImage for setting image when user insert image
    const onInputImage = (e) => {
        const file = e.currentTarget.files[0]
        setImage(file)
    }

    // onDelete for resetting the image state when user click remove button image
    const onDeleteImage = () => {
        setImage(null)
    }

    // onSubmit for calling updateUserProfile api when user click save button
    const onSubmit =async (e) => {
        e.preventDefault()
        if(name.length === 0){
            alert("Tolong isi nama anda")
            return
        }

        if (!availableCities.find(availableCity => availableCity.name === city)){
            alert("Tolong pilih kota")
            return
        }

        if (phone.length === 0 || phone.length === 1){
            alert("Tolong isi nomor telepon anda")
            return
        }

        const payload = {
            name,
            city,
            image, 
            address,
            phone
        }

        try{
            dispatch(statusActions.setLoading({
                status: true,
            }))

            await dispatch(
                updateUser(payload)
            ).unwrap()

            await dispatch(
                getCurrentUser()
            ).unwrap()

            dispatch(statusActions.setLoading({
                status: false,
            }))

            if (location.search){
                const queryParams = Object.fromEntries(new URLSearchParams(location.search))
                if (queryParams.next){
                    return navigate(queryParams.next)
                }
            }
            setFlashMessage("Successfully updated profile")
        } catch(err){
            console.log(err)
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
    
    // onClickGoBack for backing one history route
    const onClickGoBack = () => {
		navigate(-1)
	} 

    // onCloseAlert for resetting error when close button alert for errror message is clicked
    const onCloseAlert = () => {
        dispatch(statusActions.setError({
            message: ""
        }))
    }
    
    // onCloseFlash for resetting flash message when close button flash message is clicked
    const onCloseFlash = () => {
		setFlashMessage("")
	}
    /**************************************************************/


    /**************************************************************/
    // USEEFFECT
    // for setting default value on input field tag
    useEffect(() => {
        const fetchImage = async (image_url) => {
            try{
                if (image_url){
                    const response = await fetch(image_url);
                    // here image is url/location of image
                    const blob = await response.blob();
                    const file = new File([blob], image_url.split("/").pop(), {type: blob.type});
                    setImage(file)
                }
            } catch (err){
                navigate(ERROR_500_ROUTE)
            }
        }

        const getUser = async () => {
            try{
                dispatch(statusActions.setLoading({
                    status: true,
                }))

                const user = await dispatch(
                    getCurrentUser()
                ).unwrap()

                dispatch(statusActions.setLoading({
                    status: false,
                }))

                setName(user.name ? user.name : "")
                setCity(user.city ? user.city : "")
                setAddress(user.address ? user.address : "")
                validatePhoneNumber(user.phone ? user.phone : "", "0", setPhone)
                await fetchImage(user.image_url)
            } catch(err){
                console.log(err)
                const error = JSON.parse(err.message)
                const statusCode = error.statusCode
                switch (statusCode){
                    case 401:
                        navigate(LOGIN_ROUTE, {
                            state: {
                                message: "You are not authorized"
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
        
        dispatch(statusActions.setError({
            message: ""
        }))
        dispatch(userActions.getCities())
        navigate(location.pathname + location.search, { replace: true })
        getUser()
    }, [dispatch, navigate, location.pathname, location.search])

    // for updating availableCities when user input something
    useEffect(() => {
        if (city){
            setOptionCity(availableCities.filter(({ name }) => 
                name.toLowerCase().includes(city.trim().toLowerCase())
            ))
        } else{
            setOptionCity(availableCities)
        }
    }, [city, availableCities])
    /**************************************************************/


    return (
        <Wrapper>
            <LoadingSpinner active={loading} />
            <Alert active={error.length > 0} 
                    backgroundColor="var(--redalert-background)" 
                    color="var(--redalert-font)" 
                    text={error} 
                    onClick={onCloseAlert} 
                    id="error-message"
                    />
            <Alert active={flashMessage.length > 0} 
					backgroundColor="var(--alert-success)" 
					color="var(--white-color)" 
					text={flashMessage} 
					onClick={onCloseFlash}
                    id="flash-message" 
					/>
            
            <Navbar centeredText="Lengkapi Info Akun" />
            <Content className='mx-auto position-relative' onSubmit={onSubmit}>
                <i className="back-icon fa-solid fa-arrow-left-long py-3" onClick={onClickGoBack} style={{ cursor: "pointer" }}></i>
                <div className='py-3 d-flex justify-content-center align-items-center'>
                    {
                        image ? (
                            <ImagePreview url={URL.createObjectURL(image)}
                                            onDelete={onDeleteImage}
                                            />

                        ) : (
                            <InputFile onChange={onInputImage}/>
                        )

                    }
                </div>
                <Input type="text" 
						text="Nama" 
						placeholder="Nama" 
						value={name} 
						onChange={onChange}
                        required
						/>
                <Dropdown text="Kota"
                            placeholder="Pilih Kota"
                            value={city}
                            options={optionCity}
                            onSelect={onSelect}
                            onInput={onChange}
                            elasticSearch
                            required
                            />
                <Textarea text="Alamat"
							value={address}
							placeholder="Contoh jalan hiu no 33"
							onChange={onChange}
                            required
							/>
                <Input type="text" 
						text="No Handphone" 
						placeholder="contoh: +628123456789" 
						value={phone} 
						onChange={onChange}
						required
						/>
                <ActionButton text="Simpan"
                                width="100%"
                                color="var(--primary-purple-04)"
                                textColor="var(--white-color)"
                                onClick={onSubmit}
                                className='my-4'
                                id="Simpan"
                                />
            </Content>
        </Wrapper>
    )
}

export default InfoProfile