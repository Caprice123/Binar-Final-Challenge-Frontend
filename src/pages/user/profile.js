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

import { Link, useLocation, useNavigate } from 'react-router-dom'

// helpers
import { validatePhoneNumber } from '../../helpers/validatePhoneNumber'

// styles
import { Wrapper, Content } from '../../pagesStyle/user/profile.styles'

// react redux
import { useDispatch, useSelector } from 'react-redux'

import { getCurrentUser, updateUser } from '../../services/user'
import { userActions } from '../../store/user'
import { productActions } from '../../store/product'
import { bidActions } from '../../store/bids'
import { HOME_ROUTE } from '../../types/pages'

const InfoProfile = () => {
    // redux state
    const { loading, error, availableCities } = useSelector(state => state.user)
    // state
    const [flashMessage, setFlashMessage] = useState("")
    
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [image, setImage] = useState(null)
    
    const [optionCity, setOptionCity] = useState([])
    
    // navigation 
    const navigate = useNavigate()
    const location = useLocation()

    // dispatch redux
    const dispatch = useDispatch()
    
    
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

    const onSelect = (e) => {
        const { dataset } = e.currentTarget
		setCity(dataset.value)
    }
    
    const onInputImage = (e) => {
        const file = e.currentTarget.files[0]
        setImage(file)
    }

    const onDeleteImage = () => {
        setImage(null)
    }

    const onSubmit =async () => {
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
            await dispatch(
                updateUser(payload)
            ).unwrap()

            setFlashMessage("Successfully updated profile")
            // navigate(location.pathname, {
            //     state: {
            //         message: "Successfully updated profile"
            //     },
            //     replace: true
            // })
        } catch(err){
            console.log(err)
        }
    }
    
    const onClickGoBack = () => {
		navigate(-1)
	} 

    const onCloseAlert = () => {
        dispatch(userActions.clearError())
    }
    
    const onCloseFlash = () => {
		setFlashMessage("")
	}

    useEffect(() => {
        const fetchImage = async (image_url) => {
            const response = await fetch(image_url);
            // here image is url/location of image
            const blob = await response.blob();
            const file = new File([blob], image_url.split("/").pop(), {type: blob.type});
            setImage(file)
        }

        const getUser = async () => {
            const response = await dispatch(
                getCurrentUser()
            ).unwrap()

            setName(response.name)
            setCity(response.city)
            setAddress(response.address)
            setPhone(response.phone)
            await fetchImage(response.image_url)
        }
        
        dispatch(userActions.clearError())
        dispatch(productActions.clearError())
        dispatch(bidActions.clearError())
        dispatch(userActions.getCities())
        getUser()
    }, [dispatch, navigate, location.pathname])

    useEffect(() => {
        if (city){
            setOptionCity(availableCities.filter(({ name }) => 
                name.toLowerCase().includes(city.trim().toLowerCase())
            ))
        } else{
            setOptionCity(availableCities)
        }
    }, [city, availableCities])

    return (
        <Wrapper>
            <LoadingSpinner active={loading} />
            <Alert active={error.length > 0} 
                    backgroundColor="var(--redalert-font)" 
                    color="var(--redalert-background)" 
                    text={error} 
                    onClick={onCloseAlert} 
                    />
            <Alert active={flashMessage.length > 0} 
					backgroundColor="green" 
					color="white" 
					text={flashMessage} 
					onClick={onCloseFlash} 
					/>
            
            <Navbar centeredText="Lengkapi Info Akun"
                    />
                
            <Content className='mx-auto position-relative'>
                <Link to={HOME_ROUTE} className="back-icon py-3" onClick={onClickGoBack}>
					<i className="fa-solid fa-arrow-left-long"></i>
				</Link>
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
						value={`${phone}`} 
						onChange={onChange}
						required
						/>

                <div className='my-4'>
                    <ActionButton text="Simpan"
                                    width="100%"
                                    color="#7126B5"
                                    onClick={onSubmit}
                                    />
                </div>
            </Content>
        </Wrapper>
    )
}

export default InfoProfile