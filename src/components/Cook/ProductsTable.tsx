import {CompleteProduct} from "../../models/products/complete-product.ts";
import {Link} from "react-router-dom";

export default function ProductsTable(props: { products: CompleteProduct[] }) {

    const {products} = props;

    return (
        <>
            {products.length === 0 ? <p>No hay registros</p> : (
                <table className="table">
                    <thead style={{textAlign: "center"}}>
                    <tr className="table-dark">
                        <th>Nombre</th>
                        <th>Rubro</th>
                        <th>Tiempo de preparacion</th>
                        <th>Margen de ganancia</th>
                        <th>Editar</th>
                    </tr>
                    </thead>
                    <tbody style={{textAlign: "center"}}>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.category.name}</td>
                            <td style={{textAlign: "center"}}>
                                {product.cookingTime}
                            </td>
                            <td>{product.profitMargin}</td>
                            <td>
                                <Link
                                    to={`/productos/${product.id}`}
                                    className={"btn btn-primary"}
                                    style={
                                        {
                                            "--bs-btn-padding-y": ".25rem",
                                            "--bs-btn-padding-x": ".9rem",
                                            "--bs-btn-font-size": ".75rem",
                                        } as any
                                    }>Editar</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )
            }
        </>
    )
        ;
}
