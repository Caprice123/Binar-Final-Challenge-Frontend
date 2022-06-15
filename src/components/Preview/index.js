import React from 'react'
import ActiveButton from '../ActionButton'
import BorderOnlyButton from '../BorderOnlyButton'
import Image from '../../200774.jpg'
import { Wrapper, Content, LeftSection, RightSection } from './Preview.styles'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper";


const Preview = ({ active, images, name, price, category, description, onClick, onSubmit }) => {

    return (
        <Wrapper className={active && "active"} style={{ marginTop: "var(--navbar-height)"}}>
            <Content className="py-5">
                <LeftSection className='d-flex'>
                    <div className="image-preview d-flex position-relative">
                        <Swiper
                            pagination={{
                            clickable: true,
                            }}
                            navigation={{
                                nextEl: ".fa-circle-chevron-right",
                                prevEl: ".fa-circle-chevron-left"
                            }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            scrollbar={{ draggable: true }}
                            modules={[Pagination, Navigation, Autoplay]}
                            className="mySwiper"
                            loop
                        >
                        { 
                            images.map((image, id) => (
                                <SwiperSlide key={id}>
                                    <img src={image.imageUrl} alt="preview" />
                                </SwiperSlide>
                            ))
                        }
                        </Swiper>
                        <i className="fa-solid fa-circle-chevron-left" ></i>
                        <i className="fa-solid fa-circle-chevron-right" ></i> 
                        
                        
                    </div>
                    <div className='description'>
                        <div className="overview d-flex flex-column align-items-center">
                            <h5>{name}</h5>
                            <p className="my-1">{category}</p>
                            <h5 className="mt-2">{price.toLocaleString()}</h5>
                            <ActiveButton text="Terbitakan"
                                            width="90%"
                                            color="#7126B5"
                                            onClick={onSubmit}
                                            />
                            <BorderOnlyButton text="Edit"
                                            width="90%" 
                                            color="#7126B5"
                                            onClick={onClick}
                                            />
                        </div>

                        <div className="users my-5 d-flex align-items-center">
                            <img src={Image} alt="profile" />
                            <div className="mx-3 d-flex flex-column justify-content-center">
                                <h5>Nama Penjual</h5>
                                <p>Kota</p>
                            </div>
                        </div>
                    </div>
                </LeftSection>
                
                <RightSection className='d-flex'>
                    <div className='description my-5'>
                        <label>Description</label>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div className='empty'>&nbsp;</div>

                </RightSection>
                <i className="fa-solid fa-xmark" 
                    onClick={onClick}>

                </i>
            </Content>
        </Wrapper>
    )
}

export default Preview