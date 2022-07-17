import styled from "styled-components";

export const Wrapper = styled.button`
    border-color: ${({ color }) => color} !important;
    color: black !important;
    padding: 12px 24px;
    width: ${({ width }) => width};
    border-radius: 16px;
    
    &:hover{
        background-color: var(--white-color) !important;
    }
`
