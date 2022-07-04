import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 12px;
    margin: 0 auto;
    overflow: hidden;
    object-fit: contain;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    i {
        position: absolute;
        right: 0;
        top: 0;
        padding: 5px;
        background-color: #FA2C5A;
        color: white;
        cursor: pointer;
    }
`

