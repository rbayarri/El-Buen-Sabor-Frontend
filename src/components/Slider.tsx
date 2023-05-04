import React from "react";

import pizza from "../assets/img/pizza.png"
import hamburguesa from "../assets/img/hamburguesa.png"
import sand from "../assets/img/sand.png"
import "../components/Slider.css"

 export const Slider = () => {
    return (
<div className="carousel">
<table>
<thead>
    <tr>
      <th scope="col">
      <img src={pizza} className="d-block w-70 rounded mx-auto d-block" alt="" />
      </th>
      <th scope="col">
      <img src={hamburguesa} className="d-block w-70 rounded mx-auto d-block" alt="" />
      </th>
      <th scope="col">
      <img src={sand} className="d-block w-70 rounded mx-auto d-block" alt="" />
      </th>
    </tr>
  </thead>
</table>
</div>
    )
}
export default Slider