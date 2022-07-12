import React, { useState, useCallback, useEffect } from 'react'

// components
import ActionButton from '../../components/ActionButton'
import BorderOnlyButton from '../../components/BorderOnlyButton'
import DragAndDrop from '../../components/DragAndDrop'
import Dropdown from '../../components/Dropdown'
import Grid from '../../components/Grid'
import ImagePreview from '../../components/ImagePreview'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Preview from '../../components/Preview'
import Navbar from '../../components/Navbar'
import LoadingSpinner from '../../components/LoadingSpinner'
import Alert from '../../components/Alert'

import { Link, useNavigate } from 'react-router-dom'

// helpers
import { validateNumber } from '../../helpers/validateNumber'
import { validateSizeFile } from '../../helpers/validateSizeFile'

// redux
import { useDispatch, useSelector } from 'react-redux'

// actions
import { statusActions } from '../../store/status'

// services
import { addProduct, getAllCategories } from '../../services/product'

// styles
import { Wrapper, Content } from '../../pagesStyle/product/add.styles'

// pages
import { DAFTAR_JUAL_ROUTE, HOME_ROUTE } from '../../types/pages'

const AddProduct = () => {
	// redux state
	// const { loading, error } = useSelector(state => state.product)
	const { loading, error } = useSelector(state => state.status)
	
	// state
	const [availableCategories, setAvailableCategories] = useState([])
	const [flashMessage, setFlashMessage] = useState("")
	const [name, setName] = useState("")
	const [price, setPrice] = useState(0)
	const [category, setCategory] = useState("")
	const [description, setDescription] = useState("")
	const [productImages, setProductImages] = useState([])
	const [preview, setPreview] = useState(false)
	// const [product, setProduct] = useState({
	// 	name: "",
	// 	price: "",
	// 	category: "",
	// 	description: "",
	// 	productImages: []
	// })

	
	// navigation
	const navigate = useNavigate()

	// dispatch redux
	const dispatch = useDispatch()

	const onChange = (e) => {
		const { id, value } = e.currentTarget
		// const oldProduct = product

		switch (id){
			case "Nama-Product":
				// oldProduct.name = value
				setName(value)
				break
			case "Harga-Product":
				validateNumber(value, setPrice)
				break
			case "Deskripsi":
				setDescription(value)
				break
			default:
				break
		}
		// setProduct({
		// 	...oldProduct,
		// })
	}

	const onSelect = (e) => {
		const { dataset } = e.currentTarget
		setCategory(dataset.value)
	}

	const onPreview = () => {
		if (name.length === 0){
			alert("Tolong isi nama product")
			return
		}

		if (price === 0){
			alert("Tolong isi harga product")
			return
		}

		if (category.length === 0){
			alert("Tolong isi kategori product")
			return
		}

		if (productImages.length === 0){
			alert("Tolong masukkan 1 foto product")
			return
		}

		setPreview(true)
	}

	const onClosePreview = () => {
		setPreview(false)
	}

	const onSubmit = async () => {
		if (name.length === 0){
			alert("Tolong isi nama product")
			return
		}

		if (price === 0){
			alert("Tolong isi harga product")
			return
		}

		if (category.length === 0){
			alert("Tolong isi kategori product")
			return
		}
		
		if (productImages.length === 0) {
			alert("Tolong masukkan 1 foto product")
			return
		}
		try{
			dispatch(statusActions.setLoading({
				status: true,
			}))

			const categoryId = availableCategories.find(cat => cat.name === category).id
			const product = await dispatch(addProduct({
				name,
				price,
				categoryId,
				description,
				productImages
			})).unwrap()

			dispatch(statusActions.setLoading({
				status: false,
			}))

			console.log(product)

			navigate(DAFTAR_JUAL_ROUTE, {
				state: {
					message: "Successfully created product"
				}
			})
		} catch(err){
			console.log(err)
			dispatch(statusActions.setError({
				message: err.message,
			}))
		}
	}

	const onDelete = (e) => {
		const deletedIndex = Number(e.currentTarget.dataset.imageindex)
		setProductImages([...productImages.slice(0, deletedIndex), ...productImages.slice(deletedIndex + 1)])
	}

	const onDrop = useCallback((acceptedFiles) => {
		const additionalImages = acceptedFiles.map((file) => {
			if (validateSizeFile(file)){
				return URL.createObjectURL(file)
			}
			return null
		})
		const productImagesUpdated = [ ...productImages, ...additionalImages.filter(image => image)]
		if (productImagesUpdated.length > 4){
			alert("Maximum image yang dapat diupload berjumlah 4. Image yang berlebih tidak akan ditampilkan")
		}

		setProductImages(productImagesUpdated.slice(0, 4))
	}, [productImages])

	const onClickGoBack = () => {
		navigate(-1)
	}

	const onCloseAlert = () => {
		dispatch(statusActions.setError({
			message: "",
		}))
	}
	  
	const onCloseFlash = () => {
		setFlashMessage("")
	}

	useEffect(() => {
		const fetchCategories = async () => {
			try{
				dispatch(statusActions.setLoading({
					status: true,
				}))

				const response = await dispatch(
					getAllCategories()
				).unwrap()

				dispatch(statusActions.setLoading({
					status: false,
				}))
				setAvailableCategories(response)
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

		fetchCategories()
	}, [dispatch])


	return (
		<Wrapper>
			<Alert active={flashMessage.length > 0} 
					backgroundColor="green" 
					color="white" 
					text={flashMessage} 
					onClick={onCloseFlash} 
					/>
			<LoadingSpinner active={loading} />
			<Alert active={error.length > 0} 
					backgroundColor="var(--redalert-font)" 
					color="var(--redalert-background)" 
					text={error} 
					onClick={onCloseAlert} 
					/>
            
			<Navbar	centeredText="Lengkapi Detail Product"/>
			<Content className="mx-auto position-relative">
				<Link to={HOME_ROUTE} className="back-icon py-3" onClick={onClickGoBack}>
					<i className="fa-solid fa-arrow-left-long"></i>
				</Link>
				<Input type="text" 
						text="Nama Product" 
						placeholder="Nama Product" 
						value={name} 
						onChange={onChange}
						required
						/>

				<Input type="text" 
						text="Harga Product" 
						placeholder="Rp 0,00" 
						value={`Rp. ${price.toLocaleString()}`} 
						onChange={onChange}
						required
						/>

				<Dropdown text="Kategory" 
							placeholder="Select Kategory"
							options={availableCategories}
							value={category}
							onSelect={onSelect}
							required
							/>

				<Textarea text="Deskripsi"
							value={description}
							placeholder="Contoh jalan hiu no 33"
							onChange={onChange}
							/>

				<label className='py-2'>Foto Produk (max 4 gambar)</label>
				<Grid maxSize="100px">
					{
						productImages?.map((productImage, id) => (
							<ImagePreview key={id} 
											url={productImage.imageUrl}
											imageIndex={id}
											onDelete={onDelete} 
											/> 
						))
					}
					<DragAndDrop onDrop={onDrop} />
				</Grid>

				<div className='d-flex justify-content-between py-5'>
					<BorderOnlyButton text="Preview"
									width="40%" 
									color="#7126B5"
									onClick={onPreview}
									/>
					<ActionButton text="Terbitkan"
									width="40%"
									color="#7126B5"
									onClick={onSubmit}
									/>
				</div>
			</Content>
			<Preview active={preview}
						images={productImages}
						name={name}
						price={price}
						owner={{ name: "Seller Info", city: "City"}}
						category={category}
						description={description}
						onClose={onClosePreview}
						actionButtons={[
							<ActionButton text="Terbitakan"
                                            width="90%"
                                            color="#7126B5"
                                            onClick={onSubmit}
                                            />,

                            <BorderOnlyButton text="Edit"
                                            width="90%" 
                                            color="#7126B5"
                                            onClick={onClosePreview}
                                            />
						]}
						mobileButton={
							<ActionButton text="Terbitakan"
                                        width="calc(90% + 5px)"
                                        color="#7126B5"
                                        onClick={onSubmit}
                                        style={
                                                { 
                                                    position: "fixed", 
                                                    bottom: "10px", 
													display: `${preview ? 'initial' : 'none'}`,
                                                    left: `${preview ? '50%' : '100%'}`, 
                                                    transform: `${preview ? 'translateX(calc(-50% + 2.5px))' : 'translateX(0)'}`, 
                                                    zIndex: "1000", 
                                                    transition: "0.5s" 
                                                }
                                            }
                                        />
						}
						/>
		</Wrapper>
	)
}

export default AddProduct