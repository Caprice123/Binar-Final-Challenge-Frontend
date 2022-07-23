import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    background-color: red;
    top: ${({ slideFrom }) => {
        if (slideFrom === "top"){
            return "calc(-100% - 5px)"
        } else if (slideFrom === "bottom"){
            return "calc(100% + 5px)"
        } else{
            return "0%"
        }
    }};
    left: ${({ slideFrom }) => {
        if (slideFrom === "left"){
            return "calc(-100% - 5px)"
        } else if (slideFrom === "right"){
            return "calc(100% + 5px)"
        } else{
            return "0%"
        }
    }};
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
