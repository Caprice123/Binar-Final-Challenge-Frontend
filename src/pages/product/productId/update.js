import React, { useState, useCallback, useEffect } from 'react'

// components
import ActionButton from '../../../components/ActionButton'
import BorderOnlyButton from '../../../components/BorderOnlyButton'
import DragAndDrop from '../../../components/DragAndDrop'
import Dropdown from '../../../components/Dropdown'
import Grid from '../../../components/Grid'
import ImagePreview from '../../../components/ImagePreview'
import Input from '../../../components/Input'
import Textarea from '../../../components/Textarea'
import Preview from '../../../components/Preview'
import Navbar from '../../../components/Navbar'
import LoadingSpinner from '../../../components/LoadingSpinner'
import Alert from '../../../components/Alert'

import { useNavigate, useParams } from 'react-router-dom'

// helpers
import { validateNumber } from '../../../helpers/validator/validateNumber'
import { validateSizeFile } from '../../../helpers/validator/validateSizeFile'

// redux
import { useDispatch, useSelector } from 'react-redux'

// actions
import { statusActions } from '../../../store/status'

// services
import { getAllCategories, updateProduct } from '../../../services/product'
import { getProductOneByID } from '../../../services/product'

// styles
import { Wrapper, Content } from '../../../pagesStyle/product/productId/update.styles'

// pages
import { DAFTAR_JUAL_ROUTE, LOGIN_ROUTE, ERROR_404_ROUTE, ERROR_500_ROUTE } from '../../../types/pages'

const UpdateProduct = () => {
	/**************************************************************/
	// REDUX STATE
	const { currentUser } = useSelector(state => state.user)
	const { loading, error } = useSelector(state => state.status)
	/**************************************************************/

	
	/**************************************************************/
	// STATE
	// FLASH STATE
	const [flashMessage, setFlashMessage] = useState("")

	// CATEGORY STATE
	const [availableCategories, setAvailableCategories] = useState([])
	
	// PREVIEW STATE
	const [preview, setPreview] = useState(false)
	
	// MAIN STATE
	const [name, setName] = useState("")
	const [price, setPrice] = useState(0)
	const [category, setCategory] = useState("")
	const [description, setDescription] = useState("")
	const [productImages, setProductImages] = useState([])
	/**************************************************************/
	

	/**************************************************************/
	// REACT-ROUTER-DOM HOOKS
	// NAVIGATION
	const navigate = useNavigate()

    // PARAMS
    const { productId } = useParams()
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
			case "Nama-Product":
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
	}

	// onSelect for keep tracking the category when user click on dropdown category
	const onSelect = (e) => {
		const { dataset } = e.currentTarget
		setCategory(dataset.value)
	}

	// onPreview for open the preview page
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

		window.scrollTo(0, 0);
		setPreview(true)
	}

	// onClosePreview for closing the preview page
	const onClosePreview = () => {
		window.scrollTo(0, 0);
		setPreview(false)
	}

	// onSubmit for calling addProduc api when user click 'terbitkan' button 
	const onSubmit = async (e) => {
		e.preventDefault()
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
			await dispatch(updateProduct({
                productId,
				name,
				price,
				categoryId,
				description,
				productImages
			})).unwrap()

			dispatch(statusActions.setLoading({
				status: false,
			}))

			navigate(DAFTAR_JUAL_ROUTE, {
				state: {
					message: "Successfully updated product"
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

	// onDelete for deleting specific image from image preview
	const onDelete = (e) => {
		const deletedIndex = Number(e.currentTarget.dataset.imageindex)
		setProductImages([...productImages.slice(0, deletedIndex), ...productImages.slice(deletedIndex + 1)])
	}

	// onDrop for saving the image when user drop them on dropdown images
	const onDrop = useCallback((acceptedFiles) => {
		const additionalImages = acceptedFiles.map((file) => {
			if (validateSizeFile(file)){
				return {
					file,
					imageUrl: URL.createObjectURL(file)
				}
			}
			return null
		})
		const productImagesUpdated = [ ...productImages, ...additionalImages.filter(image => image)]
		if (productImagesUpdated.length > 4){
			alert("Maximum image yang dapat diupload berjumlah 4. Image yang berlebih tidak akan ditampilkan")
		}

		setProductImages(productImagesUpdated.slice(0, 4))
	}, [productImages])

	// onClickGoBack for go back history
	const onClickGoBack = () => {
		navigate(-1)
	}

	// onCloseAlert for resetting error when close button alert for errror message is clicked
	const onCloseAlert = () => {
		dispatch(statusActions.setError({
			message: "",
		}))
	}
	
	// onCloseFlash for resetting error when close button alert for errror message is clicked
	const onCloseFlash = () => {
		setFlashMessage("")
	}
	/**************************************************************/


    /**************************************************************/
    // USEEFFECT
	// for getting all categories
	useEffect(() => {
        const fetchImage = async (image_url) => {
			try{
				if (image_url){
					const response = await fetch(image_url);
					// here image is url/location of image
					const blob = await response.blob();
					const file = new File([blob], image_url.split("/").pop(), {type: blob.type});
					return {
						file,
						imageUrl: URL.createObjectURL(file)
					}
				}
			} catch(err){
				navigate(ERROR_500_ROUTE)
			}
        }

		const fetchCategories = async () => {
			try{
				dispatch(statusActions.setLoading({
					status: true,
				}))

				const [ response, initialProduct ] = await Promise.all([
                    dispatch(getAllCategories())
                    .unwrap(),

                    dispatch(getProductOneByID({
                        productId: productId,      
                    })).unwrap()
                ])

				dispatch(statusActions.setLoading({
					status: false,
				}))
				setAvailableCategories(response)
                setName(initialProduct.name)
                validateNumber(String(initialProduct.price), setPrice)
                setDescription(initialProduct.description)
                setCategory(initialProduct.category.name)
                const files = await Promise.all(initialProduct.images.map(image => fetchImage(image)))
                setProductImages(files)
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

		dispatch(statusActions.setError({
			message: "",
		}))
		
		fetchCategories()
	}, [dispatch, navigate, productId])
	/**************************************************************/

	return (
		<Wrapper>
			<LoadingSpinner active={loading} />
			<Alert active={flashMessage.length > 0} 
					backgroundColor="var(--alert-success)" 
					color="var(--white-color)" 
					text={flashMessage} 
					onClick={onCloseFlash} 
					/>
			<Alert active={error.length > 0} 
					backgroundColor="var(--redalert-background)" 
					color="var(--redalert-font)" 
					text={error} 
					onClick={onCloseAlert} 
					/>
            
			<Navbar	centeredText="Lengkapi Detail Product"/>
			<Content className="mx-auto position-relative" onSubmit={onSubmit}>
				<i className="back-icon fa-solid fa-arrow-left-long py-3" onClick={onClickGoBack} style={{ cursor: "pointer" }}></i>
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
									color="var(--primary-purple-04)"
									onClick={onPreview}
									id="preview-button"
									/>
					<ActionButton text="Terbitkan"
									width="40%"
									color="var(--primary-purple-04)"
									onClick={onSubmit}
									id="submit-button"
									/>
				</div>
			</Content>
			<Preview active={preview}
						images={productImages.map(productImage => productImage.imageUrl)}
						name={name}
						price={price}
						owner={currentUser.user}
						category={category}
						description={description}
						onClose={onClosePreview}
						actionButtons={[
							<ActionButton text="Terbitkan"
                                            width="90%"
                                            color="var(--primary-purple-04)"
                                            onClick={onSubmit}
                                            />,

                            <BorderOnlyButton text="Edit"
                                            width="90%" 
                                            color="var(--primary-purple-04)"
                                            onClick={onClosePreview}
                                            />
						]}
						mobileButton={
							<ActionButton text="Terbitkan"
                                        width="calc(90% + 5px)"
                                        color="var(--primary-purple-04)"
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

export default UpdateProduct