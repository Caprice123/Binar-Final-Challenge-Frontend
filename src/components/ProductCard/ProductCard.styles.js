import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled(Link)`
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    border: none !important;

`


export const Content = styled.div`
height: 100%;
    img{
        width: 100%;
        height: 125px;
        object-fit: cover;
    }

    h5{
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        margin: 0;
    }

    p{
        font-weight: 400;
        font-size: 10px;
        line-height: 14px;
        color: var(--neutral-03)
    }

`
