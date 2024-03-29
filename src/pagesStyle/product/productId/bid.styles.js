import styled from "styled-components";

export const Wrapper = styled.div`
    .modal-body{
        h4{
            font-size: 14px;
            line-height: 20px;
            font-weight: 500;
            text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
        }
        
        p{
            font-size: 14px;
            line-height: 20px;
            color: var(--neutral-03);
            text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
        }

        .product-match{
            background-color: var(--grey-color);
            border-radius: 1rem;
            
            .seller-info{
                width: 90%;
                padding: 12px 0;
                margin: 0 auto;
            }

            .notif-items{
                .original-price{
                    text-decoration: line-through;
                }
            }
        }
        
        .label-text{
            color: var(--neutral-03);
        }
    }

    @media screen and (max-width: 992px) {
        .seller-info{
            margin-top: 1rem;

            div:first-child{
                width: 100% !important;
            }
        }
    }
`

export const Content = styled.div`
    max-width: 500px;
    margin-top: calc(var(--navbar-height) * 1.25);
    .back-icon{
        position: absolute;
        top: 0;
        left: -10vw;
    }

    h4{
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
    }

    @media screen and (max-width: 992px) {
        max-width: initial;
        width: 90%;
        margin: 0 auto;
        margin-top: calc(var(--navbar-height) * 1.25);
        /* background-color: red; */

        .back-icon{
            position: relative;
            left: 0;
            margin-bottom: 1rem !important;
        }

        .buttons{
            justify-content: space-between !important;

            button{
                width: 45%;
            }
        }
    }
    
`
