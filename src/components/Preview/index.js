import React, { useEffect, useState } from 'react'

// components
import Image from '../../200774.jpg'

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

// styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Wrapper, Content, LeftSection, RightSection } from './Preview.styles'
import SellerInfo from '../SellerInfo';

const Preview = ({ active, images, name, price, category, owner, description, onClose, actionButtons, mobileButton }) => {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const checkMobile = () => {
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            setIsMobile(vw <= 992)
        }
        window.addEventListener("resize", checkMobile)
        checkMobile()
    }, [])
    console.log(description)
    return (
        <Wrapper className={active ? "active" : ""}>
            <Content className="position-relative py-5">
                <LeftSection className='d-flex justify-content-center'>
                    <div className="image-preview d-flex me-5 position-relative">
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
                                    <img src={image} alt="preview" />
                                </SwiperSlide>
                            ))
                        }
                        </Swiper>
                        <i className="fa-solid fa-circle-chevron-left" ></i>
                        <i className="fa-solid fa-circle-chevron-right" ></i> 
                        
                        
                    </div>
                    <div className='description ms-5'>
                        <div className="overview d-flex flex-column align-items-center">
                            <h5>{name}</h5>
                            <p className="my-1">{category}</p>
                            <h5 className="mt-2">Rp {price.toLocaleString()}</h5>
                            {
                                actionButtons.map((button, id) => (
                                    <div key={id}>
                                        {button}
                                    </div>    
                                ))
                            }
                        </div>
                        

                        <SellerInfo width="90%"
                                    imageUrl={owner.image_url}
                                    sellerName={owner.name}
                                    sellerCity={owner.city}
                                    additionalClass="my-5"
                                    withShadow
                                    />
                    </div>
                </LeftSection>
                
                <RightSection className='d-flex justify-content-center'>
                    <div className='description d-flex flex-column me-5 my-5'>
                        <label>Description</label>
                        {
                            description.split("\n").map((paragraph, id) => (
                                <p key={id}>
                                    {
                                        paragraph
                                    }
                                </p>
                            ))

                        }
                    </div>
                    <div className='empty ms-5'>&nbsp;</div>

                </RightSection>
                {
                    onClose && (
                        <i className="fa-solid fa-xmark" 
                            onClick={onClose}>
                        </i>
                    )
                }
                { 
                    isMobile && (
                        mobileButton
                        
                    )
                }
            </Content>
        </Wrapper>
    )
}

export default Preview