import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
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
    background-color: white;
    transition: 0.5s;

    &.show{
        top: 0;
        left: 0;
    }

`

export const Content = styled.div`

`
