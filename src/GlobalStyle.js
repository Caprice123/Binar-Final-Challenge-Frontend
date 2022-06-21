import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        --neutral-02: #d0d0d0;
        --neutral-03: #8A8A8A;
        --primary-purple-01: #E2D4F0;
        --primary-purple-04: #7126B5;
        --primary-purple-05: #4B1979;

        --alert-success: #73CA5C;

        --navbar-height: 67.5px;
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

`
export default GlobalStyle
