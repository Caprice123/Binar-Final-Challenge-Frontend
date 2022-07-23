import styled from "styled-components";

export const Wrapper = styled.div`
    min-width: 500px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
    background-color: ${({ backgroundColor }) => backgroundColor};
    color:  ${({ color }) => color};
    z-index: 1000;
    border-radius: 16px;
    transition: 0.5s;
    
    i{
        cursor: pointer;
    }

    @media screen and (max-width: 992px){
        min-width: initial;
        width: calc(90% + 5px);
        transform: translate(calc(-50% + 2.5px), -100%);
    }

    &.show{
        top: 125px;
    }
`


