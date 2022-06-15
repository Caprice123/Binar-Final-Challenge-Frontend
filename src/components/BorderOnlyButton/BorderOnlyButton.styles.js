import styled from "styled-components";

export const Wrapper = styled.button`
    border-color: ${({ color }) => color} !important;
    color: black !important;
    padding: 12px 24px;
    width: ${({ width }) => width};
    
    &:hover{
        background-color: white !important;
    }
`
