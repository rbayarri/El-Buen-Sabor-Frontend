import { Header } from "./components/Header/Header";
import NavbarTabs from "./components/NavbarTabs/NavbarTabs";
import Section from "./components/Section/Section";
import { useEffect, useState } from "react";
import { doRequest } from "./lib/fetch";
import { settings } from "./lib/settings";
import { Category } from "./models/categories/categories";



export default function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {

    const api = settings.api.home.findActiveCategories;
    const response = await doRequest<Category[]>({ path: api.path, method: api.method});
    if (response) {
      setCategories(response);
      setIsLoading(false);
    }
  }

  useEffect((() => {
    getCategories();
  }), []);

  return (
    <>
       <Header />
       <NavbarTabs />      
      {isLoading ? <h1>Loading</h1> : (<>
        {categories.map(c => {
          return <Section category={c} />
        })}
      </>)}
    </>
  )
}