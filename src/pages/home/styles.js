import styled from "styled-components"
export const HomeHeader = styled.section`
    margin-bottom: 1rem;
    h1 {
        font-size: 1.5rem;
        margin: 0;
    }
`

export const ProductItemsRaw = styled.article`
    border-radius: 1rem;
    box-shadow: -1px 1px 4px 0px rgba(0,0,0,0.3);
    height: 100px;
    width:100%;
    margin-bottom: 1rem;
`

export const ServicesContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    margin:3rem 0;
    article {
        width:10rem;
        height:10rem;
        border: 0.1rem solid black;
        border-right: none;
        &:first-child{
            border-radius: 0.5rem 0 0 0.5rem;
        }
        &:last-child{
            border-right: 0.1rem solid black;
            border-radius:  0 0.5rem 0.5rem 0;
        }
    }
    
`
