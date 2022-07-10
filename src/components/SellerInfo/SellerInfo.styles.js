import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 12px 16px;
    box-shadow: ${({ withShadow }) => withShadow ? "0px 0px 10px rgba(0, 0, 0, 0.15)" : "none" };
    border-radius: 16px;
`

export const Content = styled.div`
    width: ${({ width }) => width};
    margin: 0 auto;
    img{
        width: 48px;
        height: 48px;
        object-fit: cover;
        border-radius: 1rem;
    }

    @media screen and (max-width: 992px) {
        width: 90%;
        margin: 0 auto;
    }
`

export const Information = styled.div`
    h5{
        font-size: 14px !important;
        line-height: 20px !important;
        margin: 0 !important;
    }

    p{
        font-size: 10px !important;
        line-height: 14px !important;
        color: var(--neutral-03) !important;
    }
`

