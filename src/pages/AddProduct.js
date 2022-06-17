import React, { useState, useCallback } from 'react'

// components
import ActionButton from '../components/ActionButton'
import BorderOnlyButton from '../components/BorderOnlyButton'
import DragAndDrop from '../components/DragAndDrop'
import Dropdown from '../components/Dropdown'
import Grid from '../components/Grid'
import ImagePreview from '../components/ImagePreview'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Preview from '../components/Preview'
import Navbar from '../components/Navbar'

import { Link, useNavigate } from 'react-router-dom'

// helpers
import { validateNumber } from '../helpers/validateNumber'
import { validateSizeFile } from '../helpers/validateSizeFile'

// redux
import { useDispatch } from 'react-redux'
import { addProduct } from '../store/product'

import { Wrapper, Content } from '../pagesStyle/AddProduct.styles'
const options = [ 
	{
		id: 1,
		name: "Hobi"
	}, {
		id: 2,
		name: "Kendaraan"
	}, {
		id: 3,
		name: "Baju",
	}, {
		id: 4,
		name: "Elektronik",
	}, {
		id: 5,
		name: "Kesehatan",
	}, 
]

const AddProduct = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [name, setName] = useState("")
	const [price, setPrice] = useState(0)
	const [category, setCategory] = useState("")
	const [description, setDescription] = useState("")
	const [productImages, setProductImages] = useState([])
	const [preview, setPreview] = useState(false)

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

	const onSubmit = () => {
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
		dispatch(addProduct({
			name,
			price,
			category,
			productImages
		}))
		navigate("/")
	}

	const onDelete = (e) => {
		const deletedIndex = Number(e.currentTarget.dataset.imageindex)
		setProductImages([...productImages.slice(0, deletedIndex), ...productImages.slice(deletedIndex + 1)])
	}

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

	return (
		<Wrapper>
			<Navbar	centeredText="Lengkapi Detail Product"/>
			<Content className="mx-auto position-relative">
				<Link to='/' className="back-icon py-3">
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
							options={options}
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
				<Grid>
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
						category={category}
						description={description}
						onSubmit={onSubmit}
						onClick={onClosePreview}
						/>
		</Wrapper>
	)
}

export default AddProduct