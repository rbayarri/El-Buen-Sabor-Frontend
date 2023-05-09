import productoJson from "../../data/producto.json"
import "./StyleCards.css";
import { Card } from "./Card";
import Producto from '../../models/producto';

export const cardinfo: Producto[] = productoJson.producto

export const Cards = () => {
  return (
    
    <>
    <div className="titulo">
        <h2>Pizzas</h2>
    </div>
      <div className='container d-flex justify-content-center align-items-center'>
          <div className='row'>
              {
                  cardinfo.map((card: Producto) => (
                      <div className='col-md-4' key={card.id} style={{margin:".5rem 0rem", width: '20%', height: '20% '}}>
                          <Card cardinfo={card} />
                      </div>
                  ))
              }
          </div>
      </div>
      </>
     
  )
}

