import styled from "styled-components";

export const Wrapper = styled.div`
    
`

export const Content = styled.div`
    max-width: 500px;
    margin-top: var(--navbar-height);

    .back-icon{
        position: absolute;
        top: 0;
        left: -10vw;
    }

    @media screen and (max-width: 992px) {
        max-width: initial;
        width: 90%;
        margin: 0 auto;
        margin-top: calc(var(--navbar-height) + 3rem);

        .back-icon{
            position: relative;
            left: 0;
        }
    }
`

