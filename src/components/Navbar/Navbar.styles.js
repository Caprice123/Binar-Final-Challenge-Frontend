import styled from "styled-components";

export const Wrapper = styled.nav`
    max-width: 100vw;
    background-color: white;
    min-height: var(--navbar-height);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
`

export const Content = styled.div`
    max-width: 90%;
    margin: 0 auto;
`

export const Actions = styled.div`
    .navbar-brand{
        min-width: 100px;
        height: 35px;
        background-color: var(--primary-purple-05);
    }
    .centered-text{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

`
