import  { Header }  from "./components/Header/Header";

import { Cards } from "./components/Card/Cards";
import './components/Card/StyleCards.css'

export default function App() {

  return (
    <>
    <Header />
    <div className="StyleCards">
    <Cards />
    </div>
 
   
    </>
   
    
  )
}