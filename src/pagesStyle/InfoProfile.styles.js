import styled from "styled-components";


export const Wrapper = styled.div`
    
`

export const Content = styled.div`
    margin-top: var(--navbar-height);
    max-width: 500px;

    .back-icon{
        position: absolute;
        top: 0;
        left: -10vw;
    }

    @media screen and (max-width: 768px) {
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