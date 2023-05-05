import productoJson from "../../data/producto.json"
import "./StyleCards.css";
import { Card } from "./Card";
import Producto from '../../models/producto';

export const cardinfo: Producto[] = productoJson.producto

export const Cards = () => {
  return (
    
      <div className='container d-flex justify-content-center align-items-center h-100 '>
          <div className='row'>
              {
                  cardinfo.map((card: Producto) => (
                      <div className='col-md-4' key={card.id}>
                          <Card cardinfo={card} />
                      </div>
                  ))
              }
          </div>
      </div>

     
  )
}

