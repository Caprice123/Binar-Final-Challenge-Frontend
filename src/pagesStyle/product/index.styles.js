import styled from "styled-components";

export const Wrapper = styled.div`

`

export const Content = styled.div`
    width: 75%;
    margin-top: calc(var(--navbar-height) * 1.25);


    .border-only-button{
        position: absolute;
        top: 50%;
        right: 2.5%;
        transform: translateY(-50%);
    }


    .products{
        display: flex;
        justify-content: space-between;

        .category{
            min-width: 250px;
            max-height: 200px;
            padding: 25px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
            border-radius: 16px;
            flex: none;

            a{
                transition: 20s;

                &.active{
                    *{
                        color: var(--primary-purple-04) !important;
                    }
                }

                &:hover{
                    *{
                        color: var(--primary-purple-04) !important;
                    }
                }
            }

            hr{
                height: 1px !important;
            }
        }

        .grid{
            width: calc(95% - 250px);

            a{
                width: 100%;
                height: 250px;
                border: 1px dashed var(--neutral-02);
                border-radius: 4px;

                p{
                    font-size: 12px;
                    color: var(--neutral-03);
                }
            }
        }
    }

    @media screen and (max-width: 992px){
        .products{
            display: initial;

            .grid{
                width: calc(100%);
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

                a{
                    width: 100%;
                    height: 200px;
                    border: 1px dashed var(--neutral-02);
                    border-radius: 4px;

                    p{
                        font-size: 12px;
                        color: var(--neutral-03);
                    }
                }
            }
        }
    }
`