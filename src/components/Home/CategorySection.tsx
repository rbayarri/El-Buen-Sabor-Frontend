import {ProductCard} from "./ProductCard.tsx";
import {ClientProduct} from '../../models/products/client-product.ts';
import {Category} from '../../models/categories/categories.ts';
import {settings} from '../../lib/settings.ts';
import {doRequest} from '../../lib/fetch.ts';
import {useEffect, useState} from 'react';

export default function CategorySection(props: { category: Category }) {

    const {category} = props;
    const [products, setProducts] = useState<ClientProduct[]>();
    const [isLoading, setIsLoading] = useState(true);

    const getProducts = async () => {
        const api = settings.api.home.findProductsByCategoryId;
        const response = await doRequest<ClientProduct[]>({path: api.path + "/" + category.id, method: api.method});
        if (response) {
            setProducts(response)
            setIsLoading(false)
        }
    }

    useEffect((() => {
        getProducts();
    }), []);


    return (
        <>
            {isLoading ? <p>Loading</p> : <>
                <div className="mt-5 mb-3">
                    <h2 id={category.name}>{category.name}</h2>
                </div>
                <div className="">
                    <div className='d-flex justify-content-center flex-wrap'>
                        {products && products.length > 0 ?
                            products.map((card: ClientProduct) => (
                                <div className='col-12 col-sm-6 col-md-4 col-xl-3 d-flex justify-content-center mt-3' key={card.id}>
                                    <ProductCard product={card}/>
                                </div>
                            )) : <p>No hay productos</p>
                        }
                    </div>
                </div>
            </>}
        </>
    )
}
