import styled from "styled-components";


export const Wrapper = styled.div`
    position: absolute;
    top: 0%;
    left: 100%;
    width: 100vw;
    height: 100vh;
    background-color: white;
    transition: 0.5s;
    overflow: hidden;

    &.active{
        overflow: initial;
        left: 0;
        height: auto;
    }

    i.fa-xmark{
        position: absolute;
        top: 5%;
        right: 5%;
        font-size: 2rem;
        cursor: pointer;
    }
`

export const Content = styled.div`
`

export const LeftSection = styled.div`
    width: 100%;

    .image-preview{
        margin: 0 auto;
        width: 45%;
        min-height: 436px;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
        border-radius: 16px;
        overflow: hidden;

        img{
            flex: none;
            width: inherit;
            height: 436px;
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
    }

    .description{
        width: 25%;
        margin: 0 auto;
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
    
`

export const RightSection = styled.div`
    

    .description{
        width: 45%;
        margin: 0 auto;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
        border-radius: 16px;

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
        margin: 0 auto;
        
    }
    
`
