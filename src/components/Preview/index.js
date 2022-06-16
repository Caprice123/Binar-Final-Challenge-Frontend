import React, { useEffect, useState } from 'react'

// components
import ActiveButton from '../ActionButton'
import BorderOnlyButton from '../BorderOnlyButton'
import Image from '../../200774.jpg'

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

// styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Wrapper, Content, LeftSection, RightSection } from './Preview.styles'

const Preview = ({ active, images, name, price, category, description, onClick, onSubmit }) => {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const checkMobile = () => {
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            console.log(vw, vw<=768)
            setIsMobile(vw <= 768)
        }
        window.addEventListener("resize", checkMobile)
        checkMobile()
    }, [])
    return (
        <Wrapper className={active && "active"}>
            <Content className="position-relative py-5">
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

                        <div className="users my-5 ">
                            <div className="container-users py-3 d-flex align-items-center">
                                <img src={Image} alt="profile" />
                                <div className="mx-3 d-flex flex-column justify-content-center">
                                    <h5>Nama Penjual</h5>
                                    <p>Kota</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </LeftSection>
                
                <RightSection className='d-flex'>
                    <div className='description d-flex flex-column align-items-center my-5'>
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
                { 
                    isMobile && (
                        <ActiveButton text="Terbitakan"
                                        width="92.5%"
                                        color="#7126B5"
                                        onClick={onSubmit}
                                        style={
                                                { 
                                                    position: "fixed", 
                                                    bottom: "10px", 
                                                    left: `${active ? '50%' : '100%'}`, 
                                                    transform: `${active ? 'translateX(-48.5%)' : 'translateX(0)'}`, 
                                                    zIndex: "1000", 
                                                    transition: "0.5s" 
                                                }
                                            }
                                        />
                        
                    )
                }
            </Content>
        </Wrapper>
    )
}

export default Preview