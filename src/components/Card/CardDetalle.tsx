// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { Producto } from '../../models/products';
// import { settings } from '../../lib/settings';
// import { doRequest } from '../../lib/fetch';
// import swal from 'sweetalert';
// import './CardDetalle.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
// import { Col, Row } from 'react-bootstrap';

// export default function CardDetalle() {
//   const { id } = useParams();
//   const [product, setProduct] = useState<Producto>();
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
//   const getProduct = async (id: string) => {
//     const api = settings.api.products.findById;

//     const fetchedProduct = await doRequest<Producto>({
//       path: api.path + "/" + id,
//       method: api.method,

//     });
//     if (fetchedProduct) {
//       setProduct(fetchedProduct);
//       setIsLoading(false);
//     } else {
//       swal("Producto no encontrado", '', "error")
//       navigate('/');
//     }
//   }

//   useEffect((() => {
//     if (id) {
//       getProduct(id);
//     }
//   }), []);

//   return (
//     <>
//       {isLoading ? <h1>Loading...</h1> : (
//         <div className='carddetalle'>
//           <Row>
//             <Col xs={12} md={8}>
//             {product?.image && <img className='imagenDetalle' src={`${product.image.location}`} alt='' />}
//             <Link className='btn btn-outline-secondary' style={{ placeItems: 'center', width: '200px' }} to={''}>
//               Continuar Comprando
//             </Link>
//             </Col>
//             <Col xs={6} md={4}>
//             <p className='nombre'>{product?.name}</p>
//             <p className='precio'>Precio: {product?.price}</p>
//             <p className='descripcion'>{product?.description}</p>
//             <Link className='btn btn-outline-secondary' style={{ placeItems: 'center', display: 'grid', width: '200px' }} to={''}>
//               <FontAwesomeIcon icon={faCartArrowDown} size="xs" />
//               Agregar al Carrito
//             </Link>
//             </Col>
//           </Row>
//         </div>
//       )}
//     </>
//   );
// }