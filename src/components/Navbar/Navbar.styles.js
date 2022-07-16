import styled from "styled-components";

export const Wrapper = styled.nav`
    max-width: 100vw;
    background-color: white;
    min-height: var(--navbar-height);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
`

export const Content = styled.div`
    width: 90%;
    
    .centered-text{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-weight: 900;
    }

    input{
        background: #EEEEEE !important;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-color:  #EEEEEE;
    }

    .search-btn{
        background: #EEEEEE !important;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        color: grey;
        border-color: #EEEEEE;
    }

    .offcanvas{
        width: 50vw;
    }
    .offcanvas-header,
    .offcanvas-body{
        width: 75%;
        margin: 0 auto;
        padding: 1rem 0;
    }
    
    .offcanvas-header{
        margin-top: calc(var(--navbar-height) / 2);
    }

    .offcanvas-body{
        *{
            padding: 0;
            margin: 7.5px 0 !important;

        }
    }

    @media screen and (min-width: calc(992px + 1px)) {
        
        .offcanvas{
            display: none;
        }        
    }

    @media screen and (max-width: 992px){
        width: 90%;
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

    .nav-link{
        padding: 0;
        i{
            font-size: 1.5rem;
            transition: 0.25s; 
            &:hover{
                color: var(--primary-purple-04);
            }  
        }
    }
    @media screen and (max-width: 992px) {
        display: none;
    }
`
