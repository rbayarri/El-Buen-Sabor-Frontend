
import  CardInstrument  from "./CardInstrument"
import productoJson from "../data/producto.json"
import React from "react"
import Producto from "../models/producto"
import { Link } from "react-router-dom"



export const productox: Producto[] = productoJson.producto

export const Productos = () => {

  return (
    <>
      
    <div className="card width: 18rem;">
      <img src="" className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      
      {productox.map((actual: Producto) =>
        <Link to={`/detalle/${actual.id}`}>
        <CardInstrument productox={actual} />
        </Link>
        
      )}
      
    </>
  )
}






