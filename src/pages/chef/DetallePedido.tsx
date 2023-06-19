import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { settings } from '../../lib/settings';
import { doRequest } from '../../lib/fetch';
import swal from 'sweetalert';
import { ClientProduct } from '../../models/products/client-product.ts';
export default function DetallePedido() {

  const { id } = useParams();
  const [product, setProduct] = useState<ClientProduct>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getProduct = async (id: string) => {
    const api = settings.api.products.findById;

    const fetchedProduct = await doRequest<ClientProduct>({
      path: api.path + "/" + id,
      method: api.method,

    });
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setIsLoading(false);
    } else {
      swal("Producto no encontrado", '', "error")
      navigate('/');
    }
  }

  useEffect((() => {
    if (id) {
      getProduct(id);
    }
  }), []);

  return (
    <>
      {isLoading ? <h1>Loading...</h1> : (
        <div className='carddetalle'>
          {
            product?.image && <img className='imagenDetalle' src={`${product.image.location}`} alt='' />}
          <p className='nombre'>{product?.name}</p>
          <p className='precio'>Precio: {product?.price}</p>
          <p className='descripcion'>{product?.description}</p>
        </div>
      )}
    </>
  );
}
