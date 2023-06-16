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
                    <div className='row'>
                        {products && products.length > 0 ?
                            products.map((card: ClientProduct) => (
                                <div className='col-md-4' key={card.id}>
                                    <ProductCard cardinfo={card}/>
                                </div>
                            )) : <p>No hay productos</p>
                        }
                    </div>
                </div>
            </>}
        </>
    )
}
