import '../Card/StyleCard.css';
import { Card } from "../Card/Card";
import { Producto } from '../../models/productos';
import { Category } from '../../models/categories/categories';
import { settings } from '../../lib/settings';
import { doRequest } from '../../lib/fetch';
import { useEffect, useState } from 'react';

export default function Section(props: { category: Category }) {
  const { category } = props;
  const [products, setProducts] = useState <Producto[]>();
  const getProducts = async () => {

    const api = settings.api.home.findProductsByCategoryId;
    const response = await doRequest<Producto[]>({ path: api.path + "/" + category.id, method: api.method });
    if (response) {
     setProducts(response) 
    }
  }

  useEffect((() => {
    getProducts();
  }), []);


  return (
    <>
      <div className="titulo">
        <h2 id={category.name}>{category.name}</h2>
      </div>
      <div className="StyleCards">
        <div className=' '>
          <div className='row'>
            {
              products?.map((card: Producto) => (
                <div className='col-md-4' key={card.id} style={{ margin: ".5rem 0rem", width: '20%', height: '20% ' }}>
                  <Card cardinfo={card} />
                </div>
              ))
            }
          </div>
        </div>
      </div>

    </>
  )
}
