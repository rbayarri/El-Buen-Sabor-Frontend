import {Header} from "../../components/Header/Header.tsx";
import NavbarTabs from "../../components/Home/NavbarTabs.tsx";
import {useEffect, useState} from "react";
import {doRequest} from "../../lib/fetch.ts";
import {settings} from "../../lib/settings.ts";
import {Category} from "../../models/categories/categories.ts";
import CategorySection from "../../components/Home/CategorySection.tsx";
import {Container} from "react-bootstrap";


export default function Home() {

    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);

    const getCategories = async () => {

        const api = settings.api.home.findActiveCategories;
        const response = await doRequest<Category[]>({path: api.path, method: api.method});
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
            <Header/>
            {isLoading ? <h1>Loading</h1> : (
                <>
                    <NavbarTabs categories={categories}/>
                    <Container>
                        {categories.map(c => {
                            return <CategorySection category={c}/>
                        })}
                    </Container>
                </>)}
        </>
    )
}