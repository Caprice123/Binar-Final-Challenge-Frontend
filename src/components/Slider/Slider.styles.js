import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    background-color: red;
    top: 0;
    left: calc(-100% - 5px);
    width: 100vw;
    height: 100vh;
    z-index: 1000000;
    background-color: var(--white-color);
    transition: 0.5s;

    &.show{
        top: 0;
        left: 0;
    }

`

export const Content = styled.div`

.title{
        width: 90%;
        margin: 0 auto;
    }

    .content{
        width: 90%;
        margin: 0 auto;
        
        img{
            width: 100px;
            height: 100px;
        }

        i{
            font-size: 24px;
            color: var(--primary-purple-04);
        }

        p{
            text-align: center;
            color: var(--neutral-03);
            font-size: 12px;
            line-height: 18px;
        }
    }
`
