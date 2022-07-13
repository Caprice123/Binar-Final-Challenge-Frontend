
import React, { useEffect, useState } from 'react'

// components
import Navbar from '../components/Navbar'
import Alert from '../components/Alert'
import ActionButton from '../components/ActionButton';
import Grid from '../components/Grid';
import ProductCard from '../components/ProductCard';
import { Swiper, SwiperSlide } from "swiper/react";
import ImageBanner from '../img-banner.png'
import LoadingSpinner from '../components/LoadingSpinner';

import { Link, useLocation, useNavigate } from 'react-router-dom';

// styles
import { Wrapper, Content } from '../pagesStyle/index.styles'
import { Pagination, Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// hooks
import { useFlashMessage } from '../hooks/useFlashMessage';

// redux
import { useDispatch, useSelector } from 'react-redux';

// actions
import { statusActions } from '../store/status';

// services
import { getAllCategories, getProducts } from '../services/product';

// pages
import { ADD_PRODUCT_ROUTE, LOGIN_ROUTE, PRODUCTS_ROUTE } from '../types/pages';


const Home = () => {
    const navLinks = [
        {
            type: "button",
            to: LOGIN_ROUTE,
            text: "Masuk",
            additionalIcon: <i className="fa-solid fa-arrow-right-to-bracket me-3" style={{ color: "white" }}></i>,
        }
    ]

    const navigate = useNavigate()
    const location = useLocation()
    
    const { isLoggedIn, currentUser } = useSelector(state => state.user)
    const { loading, error } = useSelector(state => state.status)
    
    const [flashMessage, setFlashMessage] = useFlashMessage("")
    const [isNavbarOn, setIsNavbarOn] = useState(false)

    console.log(flashMessage)

    const [availableCategories, setAvailableCategories] = useState([])
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    const dispatch = useDispatch()

    const onOpen = (value) => {
        setIsNavbarOn(value)
    }

    useEffect(() => {
        const fetchData = async () => {
            let responseGetAllCategories
            let responseGetProducts
            try{
                dispatch(statusActions.setLoading({
                    status: true,
                }))

                if (isLoggedIn){
                    [ responseGetAllCategories, responseGetProducts ] = await Promise.all([
                        dispatch(getAllCategories()).unwrap(),
                        dispatch(getProducts({
                            excludeStatusProduct: "sold",
                            excludeUserId: currentUser.user.id
                        })).unwrap()
                    ])
                } else{
                    [ responseGetAllCategories, responseGetProducts ] = await Promise.all([
                        dispatch(getAllCategories()).unwrap(),
                        dispatch(getProducts({
                            excludeStatusProduct: "sold",
                        })).unwrap()
                    ])
                }
                dispatch(statusActions.setLoading({
                    status: false,
                }))

                setAvailableCategories(responseGetAllCategories)
                setProducts(responseGetProducts)
            } catch(err){
                dispatch(statusActions.setError({
                    message: err.message
                }))
            }
        }
        dispatch(statusActions.setError({
            message: ""
        }))
        navigate(location.pathname, { replace: true })
        fetchData()

    }, [dispatch, navigate, isLoggedIn, currentUser.user, location.pathname])

    const onSelectCategory = async(e) => {
        const { value } = e.currentTarget.dataset

        try{
            setSelectedCategory(value)

            dispatch(statusActions.setLoading({
                status: true,
            }))

            const response = await dispatch(getProducts({
                excludeStatusProduct: "sold",
                excludeUserId: currentUser.user.id,
                category: value
            })).unwrap()
            
            dispatch(statusActions.setLoading({
                status: false,
            }))

            setProducts(response)
        } catch(err){
            console.log(err)
            dispatch(statusActions.setError({
                message: err.message,
            }))
        }
    }
    const onCloseAlertError = () => {
        dispatch(statusActions.setError({
            message: "",
        }))
    }

    const onClickAlert = () => {
        setFlashMessage("")
    }

    return (
        <Wrapper>
            <LoadingSpinner active={loading} />
            <Alert active={error.length > 0}
                    backgroundColor="red"
                    color="white" 
                    text={error}
                    onClick={onCloseAlertError}
                    />
            <Alert active={flashMessage.length > 0}
                    backgroundColor="green"
                    color="white" 
                    text={flashMessage}
                    onClick={onClickAlert}
                    />
            <Navbar navLinks={navLinks}
                    isOffcanvasOn={isNavbarOn}
                    onClick={onOpen}
                    withSearchBar   
                    />
            <Content>
                <Swiper autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            scrollbar={{ draggable: true }}
                            modules={[Pagination, Navigation, Autoplay]}
                            className="mySwiper"
                            slidesPerView={"auto"}
                            centeredSlides
                            loop
                        >

                            <SwiperSlide>
                                <img src={ImageBanner} alt="promo" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={ImageBanner} alt="promo" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={ImageBanner} alt="promo" />
                            </SwiperSlide>
                </Swiper>

                <div className='main-content mx-auto'>
                    <div className='category-buttons d-flex py-2 my-4'>

                        <ActionButton icon={<i className="fa-solid fa-magnifying-glass me-3"></i>}
                                        text="Semua"
                                        color={!selectedCategory ? "var(--primary-purple-04)" : "var(--primary-purple-01)"}
                                        textColor={!selectedCategory ? "white" : "black"}
                                        style={{ margin: "0 1rem 0 0" }}
                                        data-value=""
                                        onClick={onSelectCategory}
                                        />
                        {
                            availableCategories?.map(({ id, name }) => (

                                <ActionButton key={id}
                                                icon={<i className="fa-solid fa-magnifying-glass me-3"></i>}
                                                text={name}
                                                color={selectedCategory === name ? "var(--primary-purple-04)" : "var(--primary-purple-01)"}
                                                textColor={selectedCategory === name ? "white" : "black"}
                                                style={{ margin: "0 1rem 0 0" }}
                                                data-value={name}
                                                onClick={onSelectCategory}
                                                />
                            ))
                        }
                    </div>
                    <Grid maxSize="175px" className='py-3'>
                        {
                            products.map(product => (
                                <ProductCard to={`${PRODUCTS_ROUTE}/${product.id}`} product={product} />
                            ))
                        }
                    </Grid>
                </div>

            </Content>

            <Link to={ADD_PRODUCT_ROUTE} style={{ borderRadius: "12px", position: "fixed", bottom: '2.5%', left: "50%", transform: "translateX(-50%)", boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)"}}>

                <ActionButton text="Jual" 
                                color="var(--primary-purple-04)"
                                icon={<i className="fa-solid fa-plus me-3"></i>}
                                textColor="white"
                                style={{ borderRadius: "12px" }}
                                />
            </Link>
        </Wrapper>
    )
}

export default Home