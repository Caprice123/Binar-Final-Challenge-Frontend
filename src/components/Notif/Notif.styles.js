import styled from "styled-components";

export const Wrapper = styled.div`
    cursor: initial;
    button{
        background-color: transparent !important;
        border: none;
        padding: 0;
    }

`


export const Content = styled.div`
    position: absolute;
    top: 100%;
    left: -350px;
    display: none;
    background-color: var(--white-color);
    min-width: 400px;
    height: 212.5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
    overflow: hidden auto;

    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }

    &.show{
        display: initial;
    }
    hr{
        width: 90%;
        margin: 0 auto;
    }
    .actions{
        div{
            width: 90%;
            margin: 0 auto;
            h6{
                font-size: 1rem;
                font-weight: 500;
                margin: 0;
            }
    
            a{
                text-align: right;
            }
        }
    }
`
