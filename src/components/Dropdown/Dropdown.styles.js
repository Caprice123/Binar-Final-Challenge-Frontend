import styled from "styled-components";

export const Wrapper = styled.div`
    input{
        padding: 12px 16px;
        border: 1px solid var(--neutral-02);
        outline: 1px solid var(--neutral-02);
        border-radius: 16px;
        cursor: pointer;
    }
    span{
        color: red;
    }

    i{
        position: absolute;
        bottom: 25%;
        right: 3.75%;
    }
`

export const Options = styled.div`
    position: absolute;
    top: 95%;
    left: 0;
    height: 100px;
    width: 100%;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.5);
    overflow: auto;
    animation: 0.175s close ease-in-out forwards;

    &.show{
        animation: 0.175s open ease-in-out forwards;
    }

    p{
        height: 50px;
        padding: 16px;
        cursor: pointer;
        background-color: white;
        border-bottom: 1px solid black;
    }

    @keyframes open {
        0%{
            height: 0;
            opacity: 0;
        }
        100%{
            height: 100px;
            opacity: 1;
        }
    }

    @keyframes close {
        0%{
            height: 100px;
            opacity: 1;
        }
        100%{
            height: 0;
            opacity: 0;
        }
    }
`