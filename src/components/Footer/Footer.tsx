
import './Footer.css'
import logo from "../../assets/el_buen_sabor.png"

export default function 
() {
  return (
      <>
          <footer className="footer-dark">
              <div className="row">
                  <div className="col-sm-6 col-md-3 item">
                      <ul>
                          <img className="logoF" alt="El Buen Sabor Logo" src={logo} height="150" />
                      </ul>
                  </div>
                  <div className="col-sm-6 col-md-3 item">
                      <h3>Medios de Contacto</h3>
                      <ul>
                          <li><a>+ 54 261 2512525</a></li>
                          <li><a href="#">elbuensabor@gmail.com</a></li>
                          <li><a href="#">Av. del Sol 123, Mendoza</a></li>
                      </ul>
                  </div>
                  <div className="col-md-6 item text">
                      <h3>Seguinos en nuestras Redes</h3>
                      <li><a href="#">@ElBuenSabor-Restaurante</a></li>
                      <li><a href="#">El Buen Sabor</a></li>
                  </div>
              </div>
              <p className="copyright">© Copyright 2023 Website by La Codigoneta. All Rights reserved.</p>
          </footer>
      </>
  )
}
