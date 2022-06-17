import styled from "styled-components";


export const Wrapper = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 12px;
    background-color: var(--primary-purple-01);
    cursor: pointer;
    i{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: var(--primary-purple-04);
        font-size: 2rem;
    }
`
