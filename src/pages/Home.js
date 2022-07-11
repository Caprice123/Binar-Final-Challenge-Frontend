
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Alert from '../components/Alert'

import { Wrapper, Content } from '../pagesStyle/Home.styles'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import ImageBanner from '../img-banner.png'
// styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getProducts } from '../services/product';
import ActionButton from '../components/ActionButton';
import Grid from '../components/Grid';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';


const Home = () => {
    const navLinks = [
        {
            type: "button",
            to: '/login',
            text: "Masuk",
            additionalIcon: <i className="fa-solid fa-arrow-right-to-bracket me-3" style={{ color: "white" }}></i>,
        }
    ]

    const { currentUser } = useSelector(state => state.user)
    const { loading, error } = useSelector(state => state.product)
    
    const [isNavbarOn, setIsNavbarOn] = useState(false)

    const [availableCategories, setAvailableCategories] = useState([])
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    const dispatch = useDispatch()

    const onOpen = (value) => {
        setIsNavbarOn(value)
    }

    useEffect(() => {
        const fetchData = async () => {
            // const responseGetAllCategories = await dispatch(
            //     getAllCategories()
            // ).unwrap()
            
            const [ responseGetAllCategories, responseGetProducts ]= await Promise.all([
                dispatch(getAllCategories()).unwrap(),
                dispatch(getProducts({
                    excludeStatusProduct: "sold",
                    excludeUserId: currentUser.user.id
                })).unwrap()
            ])
            setAvailableCategories(responseGetAllCategories)
            setProducts(responseGetProducts)

        }


        fetchData()
    }, [dispatch, currentUser.user.id])

    const onSelectCategory = async(e) => {
        const { value } = e.currentTarget.dataset

        setSelectedCategory(value)
        const response = await dispatch(getProducts({
            excludeStatusProduct: "sold",
            excludeUserId: currentUser.user.id,
            category: value
        })).unwrap()
        setProducts(response)
    }

    console.log(availableCategories)
    return (
        <Wrapper>
            <Alert />
            <Navbar navLinks={navLinks}
                    isOffcanvasOn={isNavbarOn}
                    onClick={onOpen}
                    withSearchBar   
                    />
            <Content>
                <Swiper autoplay={{
                                delay: 1000,
                                disableOnInteraction: false,
                            }}
                            scrollbar={{ draggable: true }}
                            modules={[Pagination, Navigation, Autoplay]}
                            className="mySwiper"
                            slidesPerView={"auto"}
                            spaceBetween={40}
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
                    <Grid maxSize="175px">

                        {
                            products.map(product => (
                                <ProductCard product={product} />
                            ))
                        }
                    </Grid>
                </div>

            </Content>

            <Link to='/product/add' style={{ borderRadius: "12px", position: "fixed", bottom: '2.5%', left: "50%", transform: "translateX(-50%)", boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)"}}>

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