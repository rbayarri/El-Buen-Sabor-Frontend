import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Producto } from '../../models/productos';
import { settings } from '../../lib/settings';
import { doRequest } from '../../lib/fetch';
import swal from 'sweetalert';

export default function CardDetalle() {
  const { id } = useParams();
  const [product, setProduct] = useState<Producto>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getProduct = async (id: string) => {
    const api = settings.api.products.findById;

    const fetchedProduct = await doRequest<Producto>({
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
        <div className='contenedor'>
          <table>
            <tr>
              <td>
                {product && <img className='imagen' src={`/src/assets/img/${product.image}`} alt='' />}
              </td>
              <td>
                <p className='nombre'>{product?.name}</p>
                <p className='precio'>Precio: {product?.price}</p>
                <p className='descripcion'>{product?.description}</p>
              </td>
            </tr>
            <tr>
              <td>
                <Link className='btn btn-outline-secondary' style={{ placeItems: 'center', display: 'grid' }} to={''}>
                  Continuar Comprando
                </Link>
              </td>
              <td>
                <Link className='btn btn-outline-secondary' style={{ placeItems: 'center', display: 'grid' }} to={''}>
                  Agregar al Carrito
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div>
     )}
    </>
  );
}