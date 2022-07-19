import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        --neutral-02: #d0d0d0;
        --neutral-03: #8A8A8A;
        --primary-purple-01: #E2D4F0;
        --primary-purple-04: #7126B5;
        --primary-purple-05: #4B1979;
        --grey-color: #EEEEEE;

        --alert-success: #73CA5C;
        --redalert-font: #f1dbdc;
        --redalert-background: #D00C1A;
        --white-color: #ffffff;

        --navbar-height: 67.5px;

        --tablet-size: 992px;
    }
    html{
        scroll-behavior: smooth;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
    }

    body{
        width: 100vw;
        overflow-x: hidden;
    }
    
    body::-webkit-scrollbar {
        width: 5px;               /* width of the entire scrollbar */
    }
    body::-webkit-scrollbar-track {
        background: transparent;     /* color of the tracking area */
    }
    body::-webkit-scrollbar-thumb {
        background: #555;
    }

    a{
        text-decoration: none !important;
        color: black !important;
    }

    p{
        margin: 0;
    }

    label{
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
    }

    *:focus{
        box-shadow: none !important;
        outline: none !important;
    }

    .form-control:focus{
        border-color: transparent !important;
    }

`
export default GlobalStyle
