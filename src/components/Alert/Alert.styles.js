import styled from "styled-components";

export const Wrapper = styled.div`
    min-width: 500px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ backgroundColor }) => backgroundColor};
    color:  ${({ color }) => color};
    z-index: 1000;
    border-radius: 16px;
    transition: 0.5s;
    animation: close 0.5s ease-in-out forwards;
    
    &.show{
        top: 100px;
        animation: show 5s ease-in-out forwards;
    }

    @keyframes show {
        0%{
            top: 0;
        }

        10%, 90%{
            top: 100px;
        }

        100%{
            top: 0;
        }
    }

    @keyframes close {
        0%{
            top: 100px;
        }

        100%{
            top: 0;
        }
    }
`


