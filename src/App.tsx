import  { Header }  from "./components/Header/Header";
import './components/Card/StyleCards.css'
import NavbarTabs from "./components/NavbarTabs/NavbarTabs";
import Footer from "./components/Footer/Footer";
import SectionPizzas from "./components/Section/SectionPizzas";
import SectionLomos from "./components/Section/SectionLomos";
import SectionHamburguesa from "./components/Section/SectionHamburguesa";
import SectionTacos from "./components/Section/SectionTacos";
import SectionBebidas from "./components/Section/SectionBebidas";


export default function App() {

  return (
    <>
    <Header />
    <NavbarTabs />
    <SectionPizzas />
    <SectionLomos />
    <SectionHamburguesa />
    <SectionTacos />
    <SectionBebidas />
    <Footer />
   
    </>
   
    
  )
}