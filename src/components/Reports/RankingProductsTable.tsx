import {RankingProduct} from "../../models/reports/ranking-product.ts";

const RankingProductsTable = (props: { products: RankingProduct[] }) => {

    const products = props.products;

    return (
        <table className="table table-sm table-responsive table-striped w-75 small mt-2">
            <thead className="table-dark">
            <tr>
                <th>Producto</th>
                <th className="text-center">Cantidad</th>
            </tr>
            </thead>
            <tbody>
            {products.map((p, i) => (
                <tr key={i}>
                    <td>{p.productName}</td>
                    <td className="text-center">{p.quantity}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default RankingProductsTable;