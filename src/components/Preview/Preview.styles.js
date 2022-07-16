import styled from "styled-components";


export const Wrapper = styled.div`
    position: absolute;
    top: 0%;
    left: 100vw;
    width: 100vw;
    height: calc(100vh - var(--navbar-height));
    z-index: 100;
    background-color: white;
    transition: 0.5s;
    overflow-x: hidden;
    overflow-y: scroll;
    margin-top: var(--navbar-height);
    
    &.active{
        overflow: initial;
        left: 0;
        height: auto;
    }

    i.fa-xmark{
        position: absolute;
        top: 3rem;
        right: 3rem;
        font-size: 2rem;
        width: 37.5px;
        height: 37.5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 100;
        background-color: white;
        border-radius: 50%;
    }
`

export const Content = styled.div`
    @media screen and (max-width: 992px) {
        padding: 0 !important;
    }

    /* .btn-primary{
        position: fixed;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
    } */
`

export const LeftSection = styled.div`
    width: 100%;

    .image-preview{
        width: 45%;
        min-height: 436px;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
        border-radius: 16px;
        overflow: hidden;

        .swiper-slide{
            height: 476px;
        }
        img{
            flex: none;
            height: 100%;
            width: inherit;
            object-fit: cover;
        }

        i{
            position: absolute;
            top: 50%;
            font-size: 37.5px;
            z-index: 100;
            transform: translate(0, -50%);
            cursor: pointer;
            color: blue;
        }
        i.fa-circle-chevron-left{
            left: 2.5%;
        }

        i.fa-circle-chevron-right{
            right: 2.5%;
        }

        .swiper-pagination-bullet{
            border: 1px solid white;
        }
        .swiper-pagination-bullet-active{
            background-color: white;
        }
    }

    .description{
        width: 25%;
        .overview{
            width: 100%;
            margin: 0 auto;
            padding: 25px 16px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
            border-radius: 16px;
    
            *{
                width: 90%;
            }
    
            button{
                margin: 1rem 0;
            }
    
            p{
                font-size: 10px;
                line-height: 14px;
                color: var(--neutral-03);
            }
    
            h5{
                font-size: 16px;
                line-height: 24px;
                margin: 0;
            }
        }
    
        .users{
            padding: 12px 16px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
            border-radius: 16px;
    
            img{
                width: 48px;
                height: 48px;
                object-fit: cover;
            }
    
            h5{
                font-size: 14px;
                line-height: 20px;
                margin: 0;
            }
    
            p{
                font-size: 10px;
                line-height: 14px;
                color: var(--neutral-03);
            }
        }
    }
    
    @media screen and (max-width: 992px) {
        display: block !important;

        .image-preview{
            width: 100%;
            margin: 0 auto;
            border-radius: 0;


            .swiper-pagination{
                transform: translateY(-50px);
            }
        }

        .description {
            position: relative;
            z-index: 1000;
            width: 90%;
            margin: 0 auto !important;
            transform: translateY(-50px);
            .overview{
                
                background-color: white;
                *{
                    width: 90%;
                }

                /* button.btn-primary{
                    position: fixed;
                    left: 50%;
                    bottom: 10px;
                    transform: translateX(-50%);
                    width: 90%
                } */
                button{
                    display: none !important;
                }
            }
            .users{
                .container-users{
                    width: 90%;
                    margin: 0 auto;
                }
            }
        }
    }
`

export const RightSection = styled.div`
    

    .description{
        width: 45%;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
        border-radius: 16px;
        min-height: 50vh;

        *{
            padding: 12px 16px;
        }

        label{
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
        }

        p{
            font-weight: 400;
            line-height: 20px;
            font-size: 14px;
            color: var(--neutral-03);
        }
    }

    .empty{
        width: 25%;
    }

    @media screen and (max-width: 992px) {
        transform: translateY(-50px);
        .description{
            margin-top: 0 !important;
            margin: 0 auto !important;
            width: 90%;
            *{
                width: 90%;
                margin: 0 auto;
            }
            label{
                padding-top: 25px;

            }
            p{
                padding-bottom: 25px;
            }
        }

        .empty{
            display: none;
        }
    }
    
`
