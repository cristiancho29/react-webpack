import { HomeHeader, ProductItemsRaw, ServicesContainer } from "./styles"

export const Home =()=>{
    return (
        <div>
            <HomeHeader>
                <h1>Home</h1>
            </HomeHeader>
            <section>
                <ProductItemsRaw />
                <ProductItemsRaw />
                <ProductItemsRaw />
            </section>
            <ServicesContainer>
                <article></article>
                <article></article>
                <article></article>
            </ServicesContainer>
        </div>
    )
}