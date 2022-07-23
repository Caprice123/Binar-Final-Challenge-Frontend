import styled from "styled-components";

export const Wrapper = styled.button`
    background-color: ${({ disabled, color }) => disabled ? "grey" : color} !important;
    color: ${({ textColor }) => textColor} !important;
    padding: 12px 24px;
    width: ${({ width }) => width} !important;
    border-radius: 16px;
    border: none;

`

