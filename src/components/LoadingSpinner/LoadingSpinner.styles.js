import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0,0,0,0.125);
    width: 100vw;
    height: 100vh;
    z-index: 1000000;
`

export const Content = styled.div`
    position: relative;
    height: 100%;

    p{
        position: absolute;
        top: calc(50% + 25px);
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

export const Dot = styled.div`
    --space: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    left: calc(50% - (1.5 * var(--space)));
    transform: translate(calc(-50%), calc(-50%)) scale(0);
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: var(--primary-purple-04);

    :nth-child(1){
        animation: movingDots 3s linear infinite;
    }

    :nth-child(2){
        animation: movingDots 3s linear infinite -1s;
    }

    :nth-child(3){
        animation: movingDots 3s linear infinite -2s;
    }

    @keyframes movingDots {
        0%{
            left: calc(50% - (1.5 * var(--space)));
            transform: translate(calc(-50%), calc(-50%)) scale(0);
        }
        10%{
            transform: translate(calc(-50%), calc(-50%)) scale(1);
        }
        90%{
            transform: translate(calc(-50%), calc(-50%)) scale(1);
        }
        100%{
            left: calc(50% - (-1.5 * var(--space)));
            transform: translate(calc(-50%), calc(-50%)) scale(0);
        }
    }

    @media screen and (max-width: 992px){
        width: 12.5px;
        height: 12.5px;
    }
    /* bikin fungsi untuk ngeshow component dots */
`