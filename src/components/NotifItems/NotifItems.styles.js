import styled from "styled-components";

import { Link } from "react-router-dom";

export const Wrapper = styled(Link)`
    width: 90%;
    margin: 0 auto;
    transition: 0.5s;
    &.seen{
        background-color: var(--neutral-02);
    }

    img{
        width: 48px;
        height: 48px;
        border-radius: 12px;
    }
`

export const Content = styled.div`
    width: 100%;

    h5{
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        margin: 0;
    }
`

export const Title = styled.div`
    *{
        font-size: 10px;
        line-height: 14px;
        color: var(--neutral-03);
    }
`
