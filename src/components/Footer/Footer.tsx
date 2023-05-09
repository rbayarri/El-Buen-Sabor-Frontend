
import './Footer.css'
import logo from "../../assets/el_buen_sabor.png"

export default function 
() {
  return (
      <>
          <div className="footer-dark">
              <footer>
                  <div className="container">
                      <div className="row">
                          <div className="col-sm-6 col-md-3 item">
                              <ul>
                              <img className="logo" alt="El Buen Sabor Logo" src={logo} height="300" />
                              </ul>
                          </div>
                          <div className="col-sm-6 col-md-3 item">
                              <h3>Madios de Contacto</h3>
                              <ul>
                                  <li><a href="#">Company</a></li>
                                  <li><a href="#">Team</a></li>
                                  <li><a href="#">Careers</a></li>
                              </ul>
                          </div>
                          <div className="col-md-6 item text">
                              <h3>Seguinos en nuestras Redes</h3>
                              <li><a href="#">@ElBuenSabor-Restaurante</a></li>
                              <li><a href="#">El Buen Sabor</a></li>
                          </div>
                      </div>
                      <p className="copyright">© Copyright 2023 Website by La Codigoneta. All Rights reserved.</p>
                  </div>
              </footer>
          </div>
      </>
  )
}
