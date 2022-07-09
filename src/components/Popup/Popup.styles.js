import styled from "styled-components";

export const Wrapper = styled.div`
    max-width: 360px;
    
    @media screen and (max-width: 992px){
        margin: 0;
        height: 100vh;
        max-width: initial;
        width: 100%;
    }
`

export const Content = styled.div`
    border-radius: 16px;

    @media screen and (max-width: 992px){
        position: absolute;
        top: none;
        left: 0;
        bottom: 0;
        background-color: white;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        height: auto !important;
        animation: open 0.375s ease-in-out forwards;
    }

    @keyframes open {
        0%{
            height: 0;
        }
        100%{
            height: 62.5vh;
        }
    }
`

export const Header = styled.div`
    border: none;
`

export const Body = styled.div`
    width: 87.5%;
    margin: 0 auto;
`
