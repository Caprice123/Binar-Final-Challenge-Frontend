import styled from "styled-components";

export const Wrapper = styled.div`
    cursor: initial;
    button{
        background-color: transparent !important;
        border: none;
        padding: 0;
    }
`

export const Content = styled.div`
    position: absolute;
    top: 100%;
    display: none;
    width: 200px;
    background-color: var(--white-color);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
    overflow: hidden auto;
    transform: translateX(-87.5%);

    *{
        text-align: right;
    }
    &.show{
        display: flex;
        flex-direction: column;
        align-items: right;
    }
    hr{
        width: 90%;
        margin: 0 auto;
    }
`
