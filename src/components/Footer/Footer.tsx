import logo from "../../assets/el_buen_sabor.png";
import {Col, Container, Row} from 'react-bootstrap';

export default function Footer() {

    const font10pt = {
        fontSize: "10pt"
    }

    return (
        <footer className="bg-dark text-bg-dark mb-0 pb-2 mt-auto">
            <Container>
                <Row>
                    <Col>
                        <img className="logoF" alt="El Buen Sabor Logo" src={logo} height="150"/>
                    </Col>
                    <Col>
                        <h3 className={"mt-3 mb-3 fs-6"}>Medios de Contacto</h3>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="icon icon-tabler icon-tabler-device-mobile" width="20" height="20"
                                 viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                    d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z"></path>
                                <path d="M11 4h2"></path>
                                <path d="M12 17v.01"></path>
                            </svg>
                            <a className="text-white text-decoration-none ms-2" style={font10pt}>+ 54 261
                                2512525</a>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail"
                                 width="20" height="20" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor"
                                 fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                    d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                                <path d="M3 7l9 6l9 -6"></path>
                            </svg>
                            <a className="text-white text-decoration-none ms-2" style={font10pt}
                               href="#">elbuensabor@gmail.com</a>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="icon icon-tabler icon-tabler-map-pin-filled" width="20" height="20"
                                 viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                    d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z"
                                    strokeWidth="0" fill="currentColor"></path>
                            </svg>
                            <a className="text-white text-decoration-none ms-2" style={font10pt} href="#">Av. del
                                Sol 123, Mendoza</a>
                        </div>
                    </Col>
                    <Col>
                        <h3 className={"mt-3 mb-3 fs-6"}>Seguinos en nuestras Redes</h3>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="icon icon-tabler icon-tabler-brand-instagram" width="20" height="20"
                                 viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                    d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                <path d="M16.5 7.5l0 .01"></path>
                            </svg>
                            <a className="text-white text-decoration-none ms-2" style={font10pt}
                               href="#">@ElBuenSabor-Restaurante</a>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="icon icon-tabler icon-tabler-brand-twitter"
                                 width="20" height="20" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor"
                                 fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                    d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z"></path>
                            </svg>
                            <a className="text-white text-decoration-none ms-2" style={font10pt}
                               href="https://www.facebook.com/profile.php?id=100093135940429&sk=about">El Buen
                                Sabor</a>
                        </div>
                    </Col>
                </Row>
                <p className="small text-center mb-0 pb-2" style={{fontSize: "9pt"}}>© Copyright 2023 Website by La
                    Codigoneta. All Rights reserved.</p>
            </Container>
        </footer>
    )
}
