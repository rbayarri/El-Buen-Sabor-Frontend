import {Header} from "../../components/Header/Header.tsx";
import NavbarTabs from "../../components/Home/NavbarTabs.tsx";
import {useEffect, useState} from "react";
import {doRequest} from "../../lib/fetch.ts";
import {settings} from "../../lib/settings.ts";
import {Category} from "../../models/categories/categories.ts";
import {Container} from "react-bootstrap";
import {ClientProduct} from "../../models/products/client-product.ts";
import {ProductCard} from "../../components/Home/ProductCard.tsx";
import CategorySection from "../../components/Home/CategorySection.tsx";


export default function Home(props: { products: ClientProduct[] | undefined }) {

    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const {products} = props;

    const getCategories = async () => {

        const api = settings.api.home.findActiveCategories;
        const response = await doRequest<Category[]>({path: api.path, method: api.method});
        if (response) {
            setCategories(response);
            setIsLoading(false);
        }
    }


    useEffect((() => {
        if (!products) {
            getCategories();
        } else {
            setIsLoading(false);
        }
    }), [products]);

    return (
        <>
            <Header/>
            {isLoading ? <h1>Loading</h1> : (
                <>
                    <NavbarTabs categories={categories}/>
                    <Container className="mb-5 pb-5">
                        {products ?
                            <>
                                <div className="mt-5 mb-3">
                                    <h2> Resultado de tu búsqueda</h2>
                                </div>
                                {products.length > 0 ?
                                    <div className="d-flex flex-wrap">
                                        {products.map((card: ClientProduct) => (
                                            <div className='col-12 col-sm-6 col-md-4 col-xl-3 d-flex justify-content-center mt-3' key={card.id}>
                                                <ProductCard product={card}/>
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    <p>No se encontraron resultados para tu búsqueda</p>
                                }
                            </> :
                            <>
                                {
                                    categories.map(c => {
                                        return <CategorySection category={c}/>
                                    })
                                }
                            </>
                        }
                    </Container>
                </>)}
        </>
    )
}