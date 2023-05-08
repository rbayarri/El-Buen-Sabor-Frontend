import  { Header }  from "./components/Header/Header";

import { Cards } from "./components/Card/Cards";
import './components/Card/StyleCards.css'
import NavbarTabs from "./components/NavbarTabs/NavbarTabs";

export default function App() {

  return (
    <>
    <Header />
    < NavbarTabs />
    <div className="StyleCards">
    <Cards />
    </div>
 
   
    </>
   
    
  )
}