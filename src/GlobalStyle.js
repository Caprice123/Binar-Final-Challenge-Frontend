import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        
    }
    html{
        scroll-behavior: smooth;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    a{
        text-decoration: none !important;
        color: black !important;
    }


`
export default GlobalStyle
