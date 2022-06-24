import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 12px 16px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
`

export const Content = styled.div`
    width: ${({ width }) => width};
    margin: 0 auto;
    img{
        width: 48px;
        height: 48px;
        object-fit: cover;
    }

    @media screen and (max-width: 768px) {
        width: 90%;
        margin: 0 auto;
    }
`

export const Information = styled.div`
    h5{
        font-size: 14px;
        line-height: 20px;
        margin: 0;
    }

    p{
        font-size: 10px;
        line-height: 14px;
        color: var(--neutral-03);
    }
`

