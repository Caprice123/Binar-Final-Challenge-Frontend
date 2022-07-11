import styled from "styled-components";

export const Wrapper = styled.div`

    .title{
        width: 90%;
        margin: 0 auto;
    }
    
    .Notifications-slider{

    }

    .Account-slider{
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
    }
`

export const Content = styled.div`
    .modal-body{
        h4{
            font-size: 14px;
            line-height: 20px;
            font-weight: 500;
            text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
        }
        
        p{
            font-size: 14px;
            line-height: 20px;
            color: var(--neutral-03);
            text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
        }
    }
`

