import styled from "styled-components";

export const Wrapper = styled.button`
    border-color: ${({ color }) => color} !important;
    color: black !important;
    padding: 12px 24px;
    background-color: var(--white-color) !important;
    width: ${({ width }) => width} !important;
    border-radius: 16px;
    
    &:hover{
        background-color: var(--white-color) !important;
    }
`
