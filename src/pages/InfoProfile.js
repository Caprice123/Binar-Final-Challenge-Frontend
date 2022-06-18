
import React, { useEffect, useState } from 'react'

// components
import ActionButton from '../components/ActionButton'
import Dropdown from '../components/Dropdown'
import ImagePreview from '../components/ImagePreview'
import Input from '../components/Input'
import InputFile from '../components/InputFile'
import Navbar from '../components/Navbar'
import Textarea from '../components/Textarea'
import { Link } from 'react-router-dom'

// helpers
import { validatePhoneNumber } from '../helpers/validatePhoneNumber'

// styles
import { Wrapper, Content } from '../pagesStyle/InfoProfile.styles'

// react redux
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, userActions } from '../store/user'

const InfoProfile = () => {
    const dispatch = useDispatch()
    const { availableCities } = useSelector(state => state.user)

    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [optionCity, setOptionCity] = useState([])
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [image, setImage] = useState(null)

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
                validatePhoneNumber(value, "0", setPhoneNumber)
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

    const onDeleteImage = (e) => {
        setImage(null)
    }

    const onSubmit = () => {
        if(name.length === 0){
            alert("Tolong isi nama anda")
            return
        }

        if (!availableCities.find(availableCity => availableCity.name === city)){
            alert("Tolong pilih kota")
            return
        }

        if (phoneNumber.length === 0 || phoneNumber.length === 1){
            alert("Tolong isi nomor telepon anda")
            return
        }

        const payload = {
            name,
            city,
            image, 
            address,
            phoneNumber
        }

        dispatch(updateUser(payload))
    }

    useEffect(() => {
        dispatch(userActions.getCities())
    }, [dispatch])

    useEffect(() => {
        if (city){
            setOptionCity(availableCities.filter(availableCity => availableCity.name.toLowerCase().includes(city.trim().toLowerCase())))
        } else{
            setOptionCity(availableCities)
        }
    }, [city, availableCities])
    

    return (
        <Wrapper>
            <Navbar centeredText="Lengkapi Info Akun"
                    />
                
            <Content className='mx-auto position-relative'>
                <Link to='/' className="back-icon py-3">
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
						value={`${phoneNumber}`} 
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