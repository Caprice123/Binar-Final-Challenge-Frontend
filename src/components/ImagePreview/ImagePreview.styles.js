import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100px;
    border-radius: 12px;
    overflow: hidden;
    img{
        width: 100px;
        height: 100px;
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

