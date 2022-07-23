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

    .options{
        position: absolute;
        top: 95%;
        left: 0;
        width: 100%;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.5);
        // animation: 0.175s close ease-in-out forwards;
        opacity: 0;
        z-index: -1;
        &.show{
            opacity: 1;
            z-index: 100;
            animation: 0.175s open ease-in-out forwards;
        }
    
        p{
            height: 50px;
            padding: 16px;
            cursor: pointer;
            background-color: var(--white-color);
            border-bottom: 1px solid black;
        }
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
    
        @keyframes open {
            0%{
                height: 0;
                opacity: 0;
                z-index: -1;
            }
            100%{
                opacity: 1;
                z-index: 10;
            }
        }
    
        // @keyframes close {
        //     0%{
        //         opacity: 1;
        //         z-index: 10;
        //     }
        //     100%{
        //         height: 0;
        //         opacity: 0;
        //         z-index: -1;
        //     }
        // }
    }
`
