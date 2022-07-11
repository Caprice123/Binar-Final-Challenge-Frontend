import styled from "styled-components";

export const Wrapper = styled.div`

`

export const Content = styled.div`
    margin-top: calc(var(--navbar-height) * 1.25);
    
    .swiper{
        height: 42.5vh;

        .swiper-slide{
            width: 62.5vw !important;
            height: 87.5%;
            border-radius: 20px;
            overflow: hidden;
            transition: height 0.5s;
            margin: auto 0;

            &.swiper-slide-active{
                height: 100%;
            }
    
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        @media screen and (max-width: var(--tablet-size)) {
            height: 32.5vh;
            .swiper-slide{
                width: 90vw !important;
            }
        }
    }

    .main-content{
        width: 90%;
        h3{
            font-size: 16px;
            line-height: 24px;
            font-weight: 700;
        }

        .category-buttons{
            overflow: auto;

            &::-webkit-scrollbar {
                height: 5px;               /* width of the entire scrollbar */
            }
            &::-webkit-scrollbar-track {
                background: transparent;     /* color of the tracking area */
            }
            &::-webkit-scrollbar-thumb {
                background: transparent;
            }
        }
    }
`

