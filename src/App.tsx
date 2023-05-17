import  { Header }  from "./components/Header/Header";

import { Cards } from "./components/Card/Cards";
import './components/Card/StyleCards.css'
import NavbarTabs from "./components/NavbarTabs/NavbarTabs";
import Footer from "./components/Footer/Footer";
import Section from "./components/Section/SectionPizzas";
import SectionPizzas from "./components/Section/SectionPizzas";
import SectionLomos from "./components/Section/SectionLomos";
import SectionHamburguesa from "./components/Section/SectionHamburguesa";
import SectionTacos from "./components/Section/SectionTacos";

export default function App() {

  return (
    <>
    <Header />
    <SectionPizzas />
    <SectionLomos />
    <SectionHamburguesa />
    <SectionTacos />
    <Footer />
   
    </>
   
    
  )
}