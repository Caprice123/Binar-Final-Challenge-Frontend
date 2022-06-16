import styled from "styled-components";

export const Wrapper = styled.nav`
    max-width: 100vw;
    background-color: white;
    min-height: var(--navbar-height);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
`

export const Content = styled.div`
    max-width: 90%;
    
    .centered-text{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-weight: 900;
    }

    .offcanvas{
        width: 50vw;
    }
    .offcanvas-header,
    .offcanvas-body{
        width: 75%;
        margin: 0 auto;
    }
    
    .offcanvas-header{
        margin-top: calc(var(--navbar-height) / 2);
    }

    .offcanvas-body{
        a{
            padding: 0;
        }
    }

    @media screen and (min-width: 769px) {
        
        .offcanvas{
            display: none;
        }        
    }

    @media screen and (max-width: 768px){
        max-width: 100vw;

        .centered-text{
            font-size: 12px;
        }
    }
`

export const Actions = styled.div`
    .navbar-brand{
        min-width: 100px;
        height: 35px;
        background-color: var(--primary-purple-05);
    }
    @media screen and (max-width: 768px) {
        display: none;
    }
`
