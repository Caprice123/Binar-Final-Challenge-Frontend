import styled from "styled-components";

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${({ maxSize }) => maxSize}, 1fr));
    grid-gap: 2rem;
`


