import {Button, Table} from "react-bootstrap";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {Category} from "../../models/categories/categories.ts";
import {ReactElement, useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Link} from "react-router-dom";

const categoryLine = (target: string, category: Category, parent: Category | null, level: number): ReactElement => {

    const spacer = "   ".repeat(level);

    return (
        <>
            <tr>
                <td style={{whiteSpace: 'pre-wrap'}}>{spacer + category.name}</td>
                <td className='text-center'>{category.container ? "No" : "Si"}</td>
                <td className='text-center'>{category.active ? "Si" : "No"}</td>
                <td className='text-center'><Link state={
                {
                    actual: category,
                    parent: parent
                }} to={`/rubros/${target}/${category.id}`}>
                    <Button size="sm">Editar</Button>
                </Link>
                </td>
            </tr>
            {category.subCategories.map((sub: Category) => categoryLine(target, sub, category, level + 1))}
        </>
    )
}
export const CategoriesTable = (props: { target: string }) => {

    const [categories, setCategories] = useState<Category[] | undefined>();
    const myContext = useContext(globalContext);

    const target = props.target;

    useEffect((() => {
        const getCategories = async () => {
            let apiSettings;
            if (target === "ingredientes") {
                apiSettings = settings.api.categories.findAllIngredients;
            } else {
                apiSettings = settings.api.categories.findAllProducts;
            }

            const response = await doRequest<Category[]>({
                path: apiSettings.path,
                method: apiSettings.method,
                jwt: myContext.userContext.jwt
            });
            if (response) {
                setCategories(response);
            }
        }
        getCategories();
    }), [target])

    if (categories && categories.length > 0) {
        return (
            <Table striped bordered hover size="sm" responsive>
                <thead className='table-dark'>
                <tr>
                    <th>Nombre</th>
                    <th className='text-center'>Final</th>
                    <th className='text-center'>Activo</th>
                    <th className='text-center'>Editar</th>
                </tr>
                </thead>
                <tbody>
                {categories.map(cat => {
                    return (
                        <>
                            {categoryLine(target, cat, null, 0)}
                        </>
                    )
                })}
                </tbody>
            </Table>
        );
    }
    return <p>Sin registros</p>
}